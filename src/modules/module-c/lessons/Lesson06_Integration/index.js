import React, { useState, useEffect, useRef, useMemo, useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

// Reducer para manejo de estado de integración y deployment
const integrationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_DEPLOYMENT':
      return {
        ...state,
        activeDeployment: action.payload,
        deploymentStatus: action.status || state.deploymentStatus
      };
    case 'UPDATE_DEPLOYMENT_STATUS':
      return {
        ...state,
        deploymentStatus: {
          ...state.deploymentStatus,
          [action.service]: action.status
        }
      };
    case 'ADD_DEPLOYMENT_LOG':
      return {
        ...state,
        deploymentLogs: [
          ...state.deploymentLogs.slice(-99), // Mantener últimas 100 entradas
          {
            id: Date.now() + Math.random(),
            timestamp: new Date(),
            level: action.level,
            message: action.message,
            service: action.service,
            environment: action.environment
          }
        ]
      };
    case 'SET_MIGRATION_STEP':
      return {
        ...state,
        migrationStep: action.step,
        migrationProgress: action.progress || state.migrationProgress
      };
    case 'UPDATE_MONITORING_METRICS':
      return {
        ...state,
        monitoringMetrics: {
          ...state.monitoringMetrics,
          ...action.payload
        }
      };
    case 'SET_INTEGRATION_MODE':
      return {
        ...state,
        integrationMode: action.mode,
        selectedIntegration: action.integration || state.selectedIntegration
      };
    default:
      return state;
  }
};

// Componente de Arquitecturas de Integración
const IntegrationArchitectures = ({ selectedArchitecture, onArchitectureSelect, onDeploymentStart }) => {
  const [activeDemo, setActiveDemo] = useState('microservices');
  const [deploymentProgress, setDeploymentProgress] = useState({});

  const architectures = [
    {
      id: 'microservices',
      name: 'Microservicios',
      description: 'Arquitectura distribuida con servicios independientes',
      components: [
        { name: 'Memory Service', port: 3001, status: 'running', instances: 3 },
        { name: 'API Gateway', port: 3000, status: 'running', instances: 2 },
        { name: 'Auth Service', port: 3002, status: 'running', instances: 2 },
        { name: 'Analytics Service', port: 3003, status: 'running', instances: 1 },
        { name: 'Cache Layer', port: 6379, status: 'running', instances: 3 }
      ],
      pros: [
        'Escalabilidad independiente',
        'Deployment isolado',
        'Tecnologías heterogéneas',
        'Fault isolation',
        'Team autonomy'
      ],
      cons: [
        'Complejidad de red',
        'Distributed debugging',
        'Data consistency',
        'Overhead de comunicación',
        'Service discovery'
      ],
      useCases: [
        'Aplicaciones enterprise',
        'Equipos grandes',
        'Escalabilidad masiva',
        'Multi-tenant systems'
      ]
    },
    {
      id: 'serverless',
      name: 'Serverless',
      description: 'Funciones como servicio con escalado automático',
      components: [
        { name: 'Memory Functions', provider: 'AWS Lambda', instances: 'auto' },
        { name: 'API Gateway', provider: 'AWS API Gateway', instances: 'managed' },
        { name: 'Database', provider: 'DynamoDB', instances: 'managed' },
        { name: 'Cache', provider: 'ElastiCache', instances: 'managed' },
        { name: 'Monitoring', provider: 'CloudWatch', instances: 'managed' }
      ],
      pros: [
        'Zero server management',
        'Automatic scaling',
        'Pay per execution',
        'Built-in availability',
        'Rapid deployment'
      ],
      cons: [
        'Cold start latency',
        'Vendor lock-in',
        'Limited execution time',
        'Debugging complexity',
        'Cost unpredictability'
      ],
      useCases: [
        'Event-driven apps',
        'Startups y MVPs',
        'Variable workloads',
        'Rapid prototyping'
      ]
    },
    {
      id: 'hybrid-cloud',
      name: 'Hybrid Cloud',
      description: 'Combinación de on-premises y cloud público',
      components: [
        { name: 'On-Prem Memory Core', location: 'Private DC', security: 'High' },
        { name: 'Cloud Analytics', location: 'AWS/Azure', security: 'Medium' },
        { name: 'Edge Nodes', location: 'CDN/Edge', security: 'Medium' },
        { name: 'Backup & DR', location: 'Multi-Cloud', security: 'High' },
        { name: 'API Gateway', location: 'Hybrid', security: 'High' }
      ],
      pros: [
        'Data sovereignty',
        'Regulatory compliance',
        'Cost optimization',
        'Disaster recovery',
        'Gradual migration'
      ],
      cons: [
        'Network complexity',
        'Security challenges',
        'Management overhead',
        'Latency variability',
        'Integration complexity'
      ],
      useCases: [
        'Regulated industries',
        'Large enterprises',
        'Legacy migration',
        'Geographic distribution'
      ]
    },
    {
      id: 'edge-computing',
      name: 'Edge Computing',
      description: 'Procesamiento distribuido cerca del usuario final',
      components: [
        { name: 'Central Memory Hub', location: 'Core DC', latency: '50-100ms' },
        { name: 'Regional Edges', location: 'Regional DC', latency: '10-20ms' },
        { name: 'Local Edges', location: 'City/ISP', latency: '1-5ms' },
        { name: 'Device Edge', location: 'On-device', latency: '<1ms' },
        { name: 'Sync Manager', location: 'Distributed', latency: 'Variable' }
      ],
      pros: [
        'Ultra-low latency',
        'Bandwidth optimization',
        'Offline capability',
        'Privacy preservation',
        'Local processing'
      ],
      cons: [
        'Management complexity',
        'Consistency challenges',
        'Limited resources',
        'Update propagation',
        'Security distributed'
      ],
      useCases: [
        'IoT applications',
        'Real-time gaming',
        'Autonomous vehicles',
        'AR/VR experiences'
      ]
    }
  ];

  const startDeploymentDemo = useCallback(async (architectureId) => {
    const architecture = architectures.find(arch => arch.id === architectureId);
    if (!architecture) return;

    setDeploymentProgress({ [architectureId]: 0 });

    const steps = architecture.components || [];
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      const progress = Math.round(((i + 1) / steps.length) * 100);
      setDeploymentProgress({ [architectureId]: progress });
      
      onDeploymentStart?.(architectureId, {
        step: i + 1,
        total: steps.length,
        component: steps[i].name,
        progress
      });
    }

    setTimeout(() => {
      setDeploymentProgress({ [architectureId]: 100 });
    }, 500);
  }, [architectures, onDeploymentStart]);

  const currentArchitecture = architectures.find(arch => arch.id === selectedArchitecture) || architectures[0];

  return (
    <div className="integration-architectures">
      <div className="architectures-header">
        <h3>🏗️ Arquitecturas de Integración</h3>
        <p>Patrones empresariales para deployment y integración de sistemas de memoria</p>
      </div>

      <div className="architecture-selector">
        {architectures.map((arch) => (
          <div
            key={arch.id}
            className={`architecture-card ${selectedArchitecture === arch.id ? 'selected' : ''}`}
            onClick={() => onArchitectureSelect(arch.id)}
            tabIndex={0}
            role="button"
            aria-pressed={selectedArchitecture === arch.id}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onArchitectureSelect(arch.id);
              }
            }}
          >
            <div className="arch-header">
              <h4>{arch.name}</h4>
              {deploymentProgress[arch.id] !== undefined && (
                <div className="deployment-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${deploymentProgress[arch.id]}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{deploymentProgress[arch.id]}%</span>
                </div>
              )}
            </div>
            <p>{arch.description}</p>
          </div>
        ))}
      </div>

      <div className="architecture-details">
        <div className="details-header">
          <h4>{currentArchitecture.name} - Detalles de Implementación</h4>
          <button
            className="deploy-demo-btn"
            onClick={() => startDeploymentDemo(currentArchitecture.id)}
            disabled={deploymentProgress[currentArchitecture.id] !== undefined && deploymentProgress[currentArchitecture.id] < 100}
          >
            {deploymentProgress[currentArchitecture.id] !== undefined && deploymentProgress[currentArchitecture.id] < 100 
              ? '⏳ Deploying...' 
              : '🚀 Demo Deployment'
            }
          </button>
        </div>

        <div className="architecture-analysis">
          <div className="components-grid">
            <h5>📦 Componentes de la Arquitectura</h5>
            <div className="components-list">
              {currentArchitecture.components.map((component, index) => (
                <div key={index} className="component-item">
                  <div className="component-name">{component.name}</div>
                  <div className="component-details">
                    {component.port && <span className="detail">Port: {component.port}</span>}
                    {component.provider && <span className="detail">Provider: {component.provider}</span>}
                    {component.location && <span className="detail">Location: {component.location}</span>}
                    {component.instances && <span className="detail">Instances: {component.instances}</span>}
                    {component.status && (
                      <span className={`status ${component.status}`}>{component.status}</span>
                    )}
                    {component.latency && <span className="detail">Latency: {component.latency}</span>}
                    {component.security && <span className="detail">Security: {component.security}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pros-cons-analysis">
            <div className="pros-section">
              <h5>✅ Ventajas</h5>
              <ul>
                {currentArchitecture.pros.map((pro, index) => (
                  <li key={index}>{pro}</li>
                ))}
              </ul>
            </div>

            <div className="cons-section">
              <h5>❌ Desventajas</h5>
              <ul>
                {currentArchitecture.cons.map((con, index) => (
                  <li key={index}>{con}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="use-cases-section">
            <h5>🎯 Casos de Uso Ideales</h5>
            <div className="use-cases-grid">
              {currentArchitecture.useCases.map((useCase, index) => (
                <div key={index} className="use-case-item">
                  <span className="use-case-icon">→</span>
                  <span>{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Estrategias de Migración
const MigrationStrategies = ({ selectedStrategy, onStrategyChange, onMigrationStart }) => {
  const [migrationProgress, setMigrationProgress] = useState({});
  const [migrationLogs, setMigrationLogs] = useState([]);

  const strategies = [
    {
      id: 'strangler-fig',
      name: 'Strangler Fig Pattern',
      description: 'Reemplazo gradual del sistema legacy envolviendo funcionalidad',
      duration: '6-18 meses',
      risk: 'Bajo',
      complexity: 'Media',
      steps: [
        'Análisis del sistema legacy',
        'Identificación de boundaries',
        'Implementación del proxy/facade',
        'Migración incremental por módulos',
        'Redirección progresiva de tráfico',
        'Desmantelamiento del legacy'
      ],
      pros: [
        'Riesgo mínimo',
        'Rollback sencillo',
        'Operación continua',
        'Aprendizaje iterativo'
      ],
      cons: [
        'Duración extendida',
        'Overhead temporal',
        'Complejidad de routing'
      ]
    },
    {
      id: 'big-bang',
      name: 'Big Bang Migration',
      description: 'Reemplazo completo del sistema en una sola implementación',
      duration: '3-6 meses',
      risk: 'Alto',
      complexity: 'Alta',
      steps: [
        'Análisis exhaustivo',
        'Desarrollo completo en paralelo',
        'Testing intensivo',
        'Preparación de infraestructura',
        'Migración de datos',
        'Switchover completo'
      ],
      pros: [
        'Implementación rápida',
        'Sin overhead de transición',
        'Arquitectura limpia'
      ],
      cons: [
        'Alto riesgo',
        'Rollback complejo',
        'Downtime potencial'
      ]
    },
    {
      id: 'parallel-run',
      name: 'Parallel Running',
      description: 'Ejecución simultánea de sistemas legacy y nuevo con comparación',
      duration: '4-8 meses',
      risk: 'Medio',
      complexity: 'Alta',
      steps: [
        'Setup de infraestructura dual',
        'Implementación de data sync',
        'Configuración de load balancing',
        'Ejecución paralela',
        'Comparación de resultados',
        'Migración gradual de usuarios'
      ],
      pros: [
        'Validación continua',
        'Riesgo controlado',
        'Debugging facilitado'
      ],
      cons: [
        'Costos duplicados',
        'Complejidad de sincronización',
        'Overhead operacional'
      ]
    },
    {
      id: 'database-first',
      name: 'Database-First Migration',
      description: 'Migración comenzando por la capa de datos y persistencia',
      duration: '5-12 meses',
      risk: 'Medio',
      complexity: 'Media',
      steps: [
        'Análisis de esquema de datos',
        'Diseño de nueva estructura',
        'Migración de base de datos',
        'Adaptación de APIs',
        'Migración de servicios',
        'Migración de interfaces'
      ],
      pros: [
        'Base sólida',
        'Mejora de performance',
        'Modernización de datos'
      ],
      cons: [
        'Acoplamiento temporal',
        'Riesgo de datos',
        'Coordinación compleja'
      ]
    }
  ];

  const startMigrationDemo = useCallback(async (strategyId) => {
    const strategy = strategies.find(s => s.id === strategyId);
    if (!strategy) return;

    setMigrationProgress({ [strategyId]: 0 });
    setMigrationLogs([]);

    const addLog = (message, level = 'info') => {
      setMigrationLogs(prev => [...prev.slice(-19), {
        id: Date.now() + Math.random(),
        timestamp: new Date(),
        message,
        level,
        strategy: strategyId
      }]);
    };

    addLog(`Iniciando migración con estrategia: ${strategy.name}`, 'info');

    for (let i = 0; i < strategy.steps.length; i++) {
      const step = strategy.steps[i];
      addLog(`Ejecutando paso ${i + 1}: ${step}`, 'info');
      
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
      
      const progress = Math.round(((i + 1) / strategy.steps.length) * 100);
      setMigrationProgress({ [strategyId]: progress });

      if (Math.random() > 0.8) { // 20% chance de warning
        addLog(`Advertencia en paso ${i + 1}: Optimización recomendada`, 'warn');
      }

      addLog(`Completado paso ${i + 1}: ${step}`, 'success');
      
      onMigrationStart?.(strategyId, {
        step: i + 1,
        total: strategy.steps.length,
        stepName: step,
        progress
      });
    }

    addLog(`Migración completada exitosamente con ${strategy.name}`, 'success');
  }, [strategies, onMigrationStart]);

  const currentStrategy = strategies.find(s => s.id === selectedStrategy) || strategies[0];

  const getRiskColor = (risk) => {
    const colors = { 'Bajo': '#22c55e', 'Medio': '#f59e0b', 'Alto': '#ef4444' };
    return colors[risk] || '#6b7280';
  };

  const getComplexityColor = (complexity) => {
    const colors = { 'Baja': '#22c55e', 'Media': '#f59e0b', 'Alta': '#ef4444' };
    return colors[complexity] || '#6b7280';
  };

  return (
    <div className="migration-strategies">
      <div className="strategies-header">
        <h3>🔄 Estrategias de Migración</h3>
        <p>Patrones probados para migrar sistemas legacy a arquitecturas modernas</p>
      </div>

      <div className="strategies-grid">
        {strategies.map((strategy) => (
          <div
            key={strategy.id}
            className={`strategy-card ${selectedStrategy === strategy.id ? 'selected' : ''}`}
            onClick={() => onStrategyChange(strategy.id)}
            tabIndex={0}
            role="button"
            aria-pressed={selectedStrategy === strategy.id}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onStrategyChange(strategy.id);
              }
            }}
          >
            <div className="strategy-header">
              <h4>{strategy.name}</h4>
              {migrationProgress[strategy.id] !== undefined && (
                <div className="migration-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${migrationProgress[strategy.id]}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{migrationProgress[strategy.id]}%</span>
                </div>
              )}
            </div>

            <p className="strategy-description">{strategy.description}</p>

            <div className="strategy-metrics">
              <div className="metric">
                <span className="metric-label">Duración:</span>
                <span className="metric-value">{strategy.duration}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Riesgo:</span>
                <span 
                  className="metric-value risk"
                  style={{ color: getRiskColor(strategy.risk) }}
                >
                  {strategy.risk}
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Complejidad:</span>
                <span 
                  className="metric-value complexity"
                  style={{ color: getComplexityColor(strategy.complexity) }}
                >
                  {strategy.complexity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="strategy-details">
        <div className="details-header">
          <h4>{currentStrategy.name} - Plan de Implementación</h4>
          <button
            className="start-migration-btn"
            onClick={() => startMigrationDemo(currentStrategy.id)}
            disabled={migrationProgress[currentStrategy.id] !== undefined && migrationProgress[currentStrategy.id] < 100}
          >
            {migrationProgress[currentStrategy.id] !== undefined && migrationProgress[currentStrategy.id] < 100 
              ? '⏳ Migrando...' 
              : '🚀 Iniciar Migración Demo'
            }
          </button>
        </div>

        <div className="strategy-implementation">
          <div className="steps-section">
            <h5>📋 Pasos de Implementación</h5>
            <ol className="steps-list">
              {currentStrategy.steps.map((step, index) => (
                <li key={index} className="step-item">
                  <span className="step-number">{index + 1}</span>
                  <span className="step-text">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="pros-cons-section">
            <div className="pros">
              <h6>✅ Ventajas</h6>
              <ul>
                {currentStrategy.pros.map((pro, index) => (
                  <li key={index}>{pro}</li>
                ))}
              </ul>
            </div>

            <div className="cons">
              <h6>❌ Desventajas</h6>
              <ul>
                {currentStrategy.cons.map((con, index) => (
                  <li key={index}>{con}</li>
                ))}
              </ul>
            </div>
          </div>

          {migrationLogs.length > 0 && (
            <div className="migration-logs">
              <h5>📄 Logs de Migración</h5>
              <div className="logs-container">
                {migrationLogs.map((log) => (
                  <div key={log.id} className={`log-entry ${log.level}`}>
                    <span className="log-timestamp">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                    <span className="log-message">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente de Monitoreo y Observabilidad
const MonitoringObservability = ({ selectedTool, onToolChange, monitoringMetrics }) => {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    uptime: 99.97,
    responseTime: 245,
    errorRate: 0.03,
    throughput: 1247,
    memoryUsage: 78,
    cpuUsage: 45
  });

  const tools = [
    {
      id: 'prometheus-grafana',
      name: 'Prometheus + Grafana',
      description: 'Stack completo de monitoreo con métricas y visualización',
      category: 'Open Source',
      features: [
        'Time-series database',
        'PromQL query language',
        'Rich dashboards',
        'Alerting rules',
        'Service discovery',
        'Multi-dimensional data'
      ],
      metrics: {
        cost: 'Gratis',
        complexity: 'Media',
        scalability: 'Alta',
        performance: 'Excelente'
      },
      useCases: [
        'Kubernetes monitoring',
        'Microservices observability',
        'Infrastructure metrics',
        'Application performance'
      ]
    },
    {
      id: 'datadog',
      name: 'Datadog',
      description: 'Plataforma SaaS completa para monitoreo y observabilidad',
      category: 'SaaS',
      features: [
        'Infrastructure monitoring',
        'APM distributed tracing',
        'Log aggregation',
        'Real user monitoring',
        'Security monitoring',
        'AI-powered insights'
      ],
      metrics: {
        cost: '$15-23/host/mes',
        complexity: 'Baja',
        scalability: 'Muy Alta',
        performance: 'Excelente'
      },
      useCases: [
        'Enterprise monitoring',
        'Cloud-native apps',
        'DevOps automation',
        'Business intelligence'
      ]
    },
    {
      id: 'newrelic',
      name: 'New Relic',
      description: 'Plataforma de observabilidad full-stack para aplicaciones modernas',
      category: 'SaaS',
      features: [
        'Full-stack observability',
        'AI-powered anomaly detection',
        'Error tracking',
        'Mobile monitoring',
        'Browser monitoring',
        'Infrastructure insights'
      ],
      metrics: {
        cost: '$99-349/mes',
        complexity: 'Baja',
        scalability: 'Alta',
        performance: 'Muy Buena'
      },
      useCases: [
        'Application performance',
        'Digital experience',
        'Cloud migration',
        'Incident response'
      ]
    },
    {
      id: 'elastic-stack',
      name: 'Elastic Stack (ELK)',
      description: 'Suite de herramientas para búsqueda, análisis y visualización',
      category: 'Open Source',
      features: [
        'Elasticsearch search',
        'Logstash data processing',
        'Kibana visualization',
        'Beats data shippers',
        'Machine learning',
        'Security analytics'
      ],
      metrics: {
        cost: 'Gratis/Premium',
        complexity: 'Alta',
        scalability: 'Muy Alta',
        performance: 'Buena'
      },
      useCases: [
        'Log analytics',
        'Search applications',
        'Security monitoring',
        'Business analytics'
      ]
    },
    {
      id: 'jaeger-zipkin',
      name: 'Jaeger + Zipkin',
      description: 'Distributed tracing para microservicios y sistemas complejos',
      category: 'Open Source',
      features: [
        'Distributed tracing',
        'Service dependency analysis',
        'Performance optimization',
        'Root cause analysis',
        'OpenTracing compatible',
        'Sampling strategies'
      ],
      metrics: {
        cost: 'Gratis',
        complexity: 'Media',
        scalability: 'Alta',
        performance: 'Buena'
      },
      useCases: [
        'Microservices debugging',
        'Performance analysis',
        'Service mesh monitoring',
        'Latency optimization'
      ]
    }
  ];

  // Simular actualización de métricas en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        uptime: Math.max(99.0, prev.uptime + (Math.random() - 0.5) * 0.01),
        responseTime: Math.max(100, prev.responseTime + (Math.random() - 0.5) * 50),
        errorRate: Math.max(0, prev.errorRate + (Math.random() - 0.5) * 0.02),
        throughput: Math.max(800, prev.throughput + (Math.random() - 0.5) * 200),
        memoryUsage: Math.max(30, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        cpuUsage: Math.max(20, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentTool = tools.find(tool => tool.id === selectedTool) || tools[0];

  const getMetricColor = (value, type) => {
    switch (type) {
      case 'uptime':
        return value >= 99.9 ? '#22c55e' : value >= 99.5 ? '#f59e0b' : '#ef4444';
      case 'responseTime':
        return value <= 200 ? '#22c55e' : value <= 500 ? '#f59e0b' : '#ef4444';
      case 'errorRate':
        return value <= 0.05 ? '#22c55e' : value <= 0.1 ? '#f59e0b' : '#ef4444';
      case 'usage':
        return value <= 70 ? '#22c55e' : value <= 85 ? '#f59e0b' : '#ef4444';
      default:
        return '#3b82f6';
    }
  };

  return (
    <div className="monitoring-observability">
      <div className="monitoring-header">
        <h3>📊 Monitoreo y Observabilidad</h3>
        <p>Herramientas y estrategias para monitoreo continuo en producción</p>
      </div>

      <div className="real-time-dashboard">
        <div className="dashboard-header">
          <h4>📈 Dashboard en Tiempo Real</h4>
          <div className="dashboard-controls">
            <label className="alert-toggle">
              <input
                type="checkbox"
                checked={alertsEnabled}
                onChange={(e) => setAlertsEnabled(e.target.checked)}
              />
              <span>Alertas Activas</span>
            </label>
          </div>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <h5>Uptime</h5>
              <span className="metric-trend">↗️</span>
            </div>
            <div 
              className="metric-value"
              style={{ color: getMetricColor(dashboardData.uptime, 'uptime') }}
            >
              {dashboardData.uptime.toFixed(2)}%
            </div>
            <div className="metric-subtitle">Últimas 24h</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h5>Response Time</h5>
              <span className="metric-trend">↘️</span>
            </div>
            <div 
              className="metric-value"
              style={{ color: getMetricColor(dashboardData.responseTime, 'responseTime') }}
            >
              {Math.round(dashboardData.responseTime)}ms
            </div>
            <div className="metric-subtitle">Promedio</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h5>Error Rate</h5>
              <span className="metric-trend">↘️</span>
            </div>
            <div 
              className="metric-value"
              style={{ color: getMetricColor(dashboardData.errorRate, 'errorRate') }}
            >
              {dashboardData.errorRate.toFixed(3)}%
            </div>
            <div className="metric-subtitle">Último minuto</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h5>Throughput</h5>
              <span className="metric-trend">↗️</span>
            </div>
            <div className="metric-value">
              {Math.round(dashboardData.throughput)}
            </div>
            <div className="metric-subtitle">req/min</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h5>Memory Usage</h5>
              <span className="metric-trend">↗️</span>
            </div>
            <div 
              className="metric-value"
              style={{ color: getMetricColor(dashboardData.memoryUsage, 'usage') }}
            >
              {Math.round(dashboardData.memoryUsage)}%
            </div>
            <div className="metric-subtitle">Sistema</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h5>CPU Usage</h5>
              <span className="metric-trend">↘️</span>
            </div>
            <div 
              className="metric-value"
              style={{ color: getMetricColor(dashboardData.cpuUsage, 'usage') }}
            >
              {Math.round(dashboardData.cpuUsage)}%
            </div>
            <div className="metric-subtitle">Promedio</div>
          </div>
        </div>
      </div>

      <div className="monitoring-tools">
        <h4>🛠️ Herramientas de Monitoreo</h4>
        <div className="tools-grid">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className={`tool-card ${selectedTool === tool.id ? 'selected' : ''}`}
              onClick={() => onToolChange(tool.id)}
              tabIndex={0}
              role="button"
              aria-pressed={selectedTool === tool.id}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToolChange(tool.id);
                }
              }}
            >
              <div className="tool-header">
                <h5>{tool.name}</h5>
                <span className="tool-category">{tool.category}</span>
              </div>
              <p className="tool-description">{tool.description}</p>
            </div>
          ))}
        </div>

        <div className="tool-details">
          <h5>{currentTool.name} - Detalles</h5>
          
          <div className="tool-info">
            <div className="features-section">
              <h6>✨ Características Principales</h6>
              <div className="features-grid">
                {currentTool.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-bullet">•</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="metrics-section">
              <h6>📊 Métricas de Evaluación</h6>
              <div className="tool-metrics">
                {Object.entries(currentTool.metrics).map(([key, value]) => (
                  <div key={key} className="tool-metric">
                    <span className="metric-key">{key}:</span>
                    <span className="metric-val">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="use-cases-section">
              <h6>🎯 Casos de Uso</h6>
              <div className="use-cases-list">
                {currentTool.useCases.map((useCase, index) => (
                  <div key={index} className="use-case">
                    <span className="use-case-icon">→</span>
                    <span>{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Best Practices de Producción
const ProductionBestPractices = ({ selectedPractice, onPracticeChange }) => {
  const [checklistProgress, setChecklistProgress] = useState({});

  const practices = [
    {
      id: 'security',
      name: 'Seguridad',
      icon: '🔒',
      description: 'Implementación de prácticas de seguridad enterprise-grade',
      checklist: [
        'Implementar autenticación y autorización robusta',
        'Configurar HTTPS/TLS en todos los endpoints',
        'Aplicar principio de least privilege',
        'Implementar rate limiting y throttling',
        'Configurar logging de seguridad',
        'Realizar auditorías de seguridad regulares',
        'Implementar secrets management',
        'Configurar WAF (Web Application Firewall)',
        'Implementar detección de intrusiones',
        'Configurar backup y disaster recovery'
      ],
      importance: 'Crítico',
      effort: 'Alto'
    },
    {
      id: 'performance',
      name: 'Performance',
      icon: '⚡',
      description: 'Optimización para máximo rendimiento y escalabilidad',
      checklist: [
        'Implementar caché distribuido',
        'Optimizar queries de base de datos',
        'Configurar CDN para assets estáticos',
        'Implementar lazy loading',
        'Optimizar bundle sizes',
        'Configurar connection pooling',
        'Implementar database indexing',
        'Configurar load balancing',
        'Optimizar images y multimedia',
        'Implementar performance monitoring'
      ],
      importance: 'Alto',
      effort: 'Medio'
    },
    {
      id: 'reliability',
      name: 'Confiabilidad',
      icon: '🛡️',
      description: 'Garantizar alta disponibilidad y resilencia del sistema',
      checklist: [
        'Implementar health checks',
        'Configurar circuit breakers',
        'Implementar retry mechanisms',
        'Configurar graceful shutdowns',
        'Implementar bulkhead patterns',
        'Configurar timeout policies',
        'Implementar distributed tracing',
        'Configurar alerting systems',
        'Implementar chaos engineering',
        'Configurar disaster recovery'
      ],
      importance: 'Crítico',
      effort: 'Alto'
    },
    {
      id: 'scalability',
      name: 'Escalabilidad',
      icon: '📈',
      description: 'Arquitectura preparada para crecimiento exponencial',
      checklist: [
        'Implementar horizontal scaling',
        'Configurar auto-scaling policies',
        'Implementar database sharding',
        'Configurar message queues',
        'Implementar microservices architecture',
        'Configurar container orchestration',
        'Implementar API versioning',
        'Configurar distributed caching',
        'Implementar event-driven architecture',
        'Configurar resource monitoring'
      ],
      importance: 'Alto',
      effort: 'Alto'
    },
    {
      id: 'maintainability',
      name: 'Mantenibilidad',
      icon: '🔧',
      description: 'Código limpio y arquitectura sostenible a largo plazo',
      checklist: [
        'Implementar clean code practices',
        'Configurar automated testing',
        'Implementar CI/CD pipelines',
        'Configurar code quality gates',
        'Implementar documentation standards',
        'Configurar dependency management',
        'Implementar logging standards',
        'Configurar error handling',
        'Implementar code reviews',
        'Configurar technical debt tracking'
      ],
      importance: 'Alto',
      effort: 'Medio'
    }
  ];

  const toggleChecklistItem = useCallback((practiceId, itemIndex) => {
    setChecklistProgress(prev => {
      const practiceProgress = prev[practiceId] || [];
      const newProgress = [...practiceProgress];
      newProgress[itemIndex] = !newProgress[itemIndex];
      return {
        ...prev,
        [practiceId]: newProgress
      };
    });
  }, []);

  const getCompletionPercentage = useCallback((practiceId) => {
    const progress = checklistProgress[practiceId] || [];
    const practice = practices.find(p => p.id === practiceId);
    if (!practice) return 0;
    
    const completed = progress.filter(Boolean).length;
    return Math.round((completed / practice.checklist.length) * 100);
  }, [checklistProgress, practices]);

  const getImportanceColor = (importance) => {
    const colors = {
      'Crítico': '#ef4444',
      'Alto': '#f59e0b',
      'Medio': '#3b82f6',
      'Bajo': '#22c55e'
    };
    return colors[importance] || '#6b7280';
  };

  const currentPractice = practices.find(p => p.id === selectedPractice) || practices[0];

  return (
    <div className="production-best-practices">
      <div className="practices-header">
        <h3>⭐ Best Practices de Producción</h3>
        <p>Checklist completo para deployment enterprise-ready</p>
      </div>

      <div className="practices-overview">
        {practices.map((practice) => {
          const completion = getCompletionPercentage(practice.id);
          return (
            <div
              key={practice.id}
              className={`practice-card ${selectedPractice === practice.id ? 'selected' : ''}`}
              onClick={() => onPracticeChange(practice.id)}
              tabIndex={0}
              role="button"
              aria-pressed={selectedPractice === practice.id}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onPracticeChange(practice.id);
                }
              }}
            >
              <div className="practice-header">
                <div className="practice-icon">{practice.icon}</div>
                <div className="practice-info">
                  <h4>{practice.name}</h4>
                  <p>{practice.description}</p>
                </div>
              </div>

              <div className="practice-metrics">
                <div className="completion-circle">
                  <svg width="60" height="60" viewBox="0 0 60 60">
                    <circle
                      cx="30"
                      cy="30"
                      r="25"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="4"
                    />
                    <circle
                      cx="30"
                      cy="30"
                      r="25"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="4"
                      strokeDasharray={`${completion * 1.57} 157`}
                      strokeLinecap="round"
                      transform="rotate(-90 30 30)"
                    />
                  </svg>
                  <span className="completion-text">{completion}%</span>
                </div>

                <div className="practice-badges">
                  <span 
                    className="importance-badge"
                    style={{ backgroundColor: getImportanceColor(practice.importance) }}
                  >
                    {practice.importance}
                  </span>
                  <span className="effort-badge">{practice.effort}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="practice-details">
        <div className="details-header">
          <div className="practice-title">
            <span className="practice-icon-large">{currentPractice.icon}</span>
            <div>
              <h4>{currentPractice.name}</h4>
              <p>{currentPractice.description}</p>
            </div>
          </div>
          <div className="practice-stats">
            <div className="stat">
              <span className="stat-label">Completado:</span>
              <span className="stat-value">{getCompletionPercentage(currentPractice.id)}%</span>
            </div>
            <div className="stat">
              <span className="stat-label">Items:</span>
              <span className="stat-value">{currentPractice.checklist.length}</span>
            </div>
          </div>
        </div>

        <div className="practice-checklist">
          <h5>📋 Checklist de Implementación</h5>
          <div className="checklist-items">
            {currentPractice.checklist.map((item, index) => {
              const isCompleted = checklistProgress[currentPractice.id]?.[index] || false;
              return (
                <div
                  key={index}
                  className={`checklist-item ${isCompleted ? 'completed' : ''}`}
                  onClick={() => toggleChecklistItem(currentPractice.id, index)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isCompleted}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleChecklistItem(currentPractice.id, index);
                    }
                  }}
                >
                  <div className="checkbox">
                    {isCompleted && <span className="checkmark">✓</span>}
                  </div>
                  <span className="item-text">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const Lesson06Integration = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState('integration-arch');
  const [selectedArchitecture, setSelectedArchitecture] = useState('microservices');
  const [selectedStrategy, setSelectedStrategy] = useState('strangler-fig');
  const [selectedTool, setSelectedTool] = useState('prometheus-grafana');
  const [selectedPractice, setSelectedPractice] = useState('security');

  const [state, dispatch] = useReducer(integrationReducer, {
    activeDeployment: 'microservices',
    deploymentStatus: {},
    deploymentLogs: [],
    migrationStep: 0,
    migrationProgress: {},
    monitoringMetrics: {
      uptime: 99.97,
      responseTime: 245,
      errorRate: 0.03,
      memoryUsage: 78
    },
    integrationMode: 'production',
    selectedIntegration: null
  });

  const tabs = [
    {
      id: 'integration-arch',
      label: 'Arquitecturas',
      icon: '🏗️',
      description: 'Patrones de integración y deployment'
    },
    {
      id: 'migration',
      label: 'Migración',
      icon: '🔄',
      description: 'Estrategias para sistemas legacy'
    },
    {
      id: 'monitoring',
      label: 'Monitoreo',
      icon: '📊',
      description: 'Observabilidad y métricas'
    },
    {
      id: 'best-practices',
      label: 'Best Practices',
      icon: '⭐',
      description: 'Estándares de producción'
    }
  ];

  // Generar logs de deployment simulados
  useEffect(() => {
    const interval = setInterval(() => {
      const services = ['MemoryService', 'APIGateway', 'AuthService', 'AnalyticsService', 'CacheLayer'];
      const environments = ['development', 'staging', 'production'];
      const logLevels = ['info', 'warn', 'success', 'debug'];
      const logMessages = [
        'Service deployed successfully',
        'Health check passed',
        'Configuration updated',
        'Auto-scaling triggered',
        'Database migration completed',
        'Cache warmed up',
        'Load balancer updated',
        'SSL certificate renewed',
        'Monitoring alerts configured',
        'Backup completed successfully'
      ];

      if (Math.random() > 0.4) { // 60% probabilidad de generar log
        dispatch({
          type: 'ADD_DEPLOYMENT_LOG',
          level: logLevels[Math.floor(Math.random() * logLevels.length)],
          message: logMessages[Math.floor(Math.random() * logMessages.length)],
          service: services[Math.floor(Math.random() * services.length)],
          environment: environments[Math.floor(Math.random() * environments.length)]
        });
      }
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, []);

  const handleTabClick = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  const handleDeploymentStart = useCallback((architectureId, deploymentInfo) => {
    dispatch({
      type: 'ADD_DEPLOYMENT_LOG',
      level: 'info',
      message: `Deployment step ${deploymentInfo.step}/${deploymentInfo.total}: ${deploymentInfo.component}`,
      service: 'DeploymentManager',
      environment: 'production'
    });
  }, []);

  const handleMigrationStart = useCallback((strategyId, migrationInfo) => {
    dispatch({
      type: 'SET_MIGRATION_STEP',
      step: migrationInfo.step,
      progress: migrationInfo.progress
    });

    dispatch({
      type: 'ADD_DEPLOYMENT_LOG',
      level: 'info',
      message: `Migration step ${migrationInfo.step}/${migrationInfo.total}: ${migrationInfo.stepName}`,
      service: 'MigrationManager',
      environment: 'staging'
    });
  }, []);

  return (
    <div className={`lesson06-integration ${className}`}>
      <header className="lesson-header">
        <div className="header-content">
          <h1>🚀 Lección 6: Integración y Deployment</h1>
          <p className="lesson-description">
            Completa tu dominio de sistemas de memoria con estrategias enterprise para 
            integración, migración y deployment en entornos de producción críticos.
          </p>
        </div>
      </header>

      <nav className="lesson-navigation" role="tablist" aria-label="Navegación de lección">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
          >
            <span className="tab-icon" aria-hidden="true">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            <span className="tab-description">{tab.description}</span>
          </button>
        ))}
      </nav>

      <main className="lesson-content">
        <div
          id="panel-integration-arch"
          className={`content-panel ${activeTab === 'integration-arch' ? 'active' : ''}`}
          role="tabpanel"
          aria-labelledby="tab-integration-arch"
          hidden={activeTab !== 'integration-arch'}
        >
          <IntegrationArchitectures
            selectedArchitecture={selectedArchitecture}
            onArchitectureSelect={setSelectedArchitecture}
            onDeploymentStart={handleDeploymentStart}
          />
        </div>

        <div
          id="panel-migration"
          className={`content-panel ${activeTab === 'migration' ? 'active' : ''}`}
          role="tabpanel"
          aria-labelledby="tab-migration"
          hidden={activeTab !== 'migration'}
        >
          <MigrationStrategies
            selectedStrategy={selectedStrategy}
            onStrategyChange={setSelectedStrategy}
            onMigrationStart={handleMigrationStart}
          />
        </div>

        <div
          id="panel-monitoring"
          className={`content-panel ${activeTab === 'monitoring' ? 'active' : ''}`}
          role="tabpanel"
          aria-labelledby="tab-monitoring"
          hidden={activeTab !== 'monitoring'}
        >
          <MonitoringObservability
            selectedTool={selectedTool}
            onToolChange={setSelectedTool}
            monitoringMetrics={state.monitoringMetrics}
          />
        </div>

        <div
          id="panel-best-practices"
          className={`content-panel ${activeTab === 'best-practices' ? 'active' : ''}`}
          role="tabpanel"
          aria-labelledby="tab-best-practices"
          hidden={activeTab !== 'best-practices'}
        >
          <ProductionBestPractices
            selectedPractice={selectedPractice}
            onPracticeChange={setSelectedPractice}
          />
        </div>
      </main>

      <footer className="lesson-footer">
        <div className="footer-content">
          <div className="completion-summary">
            <h3>🎉 ¡Felicidades! Has Completado el Módulo de Memoria</h3>
            <div className="achievement-metrics">
              <div className="metric">
                <span className="metric-label">Lecciones Completadas:</span>
                <span className="metric-value">6/6</span>
              </div>
              <div className="metric">
                <span className="metric-label">Conceptos Dominados:</span>
                <span className="metric-value">50+ técnicas</span>
              </div>
              <div className="metric">
                <span className="metric-label">Casos de Uso:</span>
                <span className="metric-value">25+ implementaciones</span>
              </div>
              <div className="metric">
                <span className="metric-label">Tiempo Invertido:</span>
                <span className="metric-value">15+ horas</span>
              </div>
            </div>
            <div className="next-steps">
              <h4>🚀 Próximos Pasos Recomendados:</h4>
              <ul>
                <li>Implementar un sistema de memoria en tu proyecto actual</li>
                <li>Experimentar con diferentes patrones de arquitectura</li>
                <li>Contribuir a proyectos open source relacionados</li>
                <li>Explorar módulos avanzados de IA y Machine Learning</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

Lesson06Integration.propTypes = {
  className: PropTypes.string
};

IntegrationArchitectures.propTypes = {
  selectedArchitecture: PropTypes.string.isRequired,
  onArchitectureSelect: PropTypes.func.isRequired,
  onDeploymentStart: PropTypes.func
};

MigrationStrategies.propTypes = {
  selectedStrategy: PropTypes.string.isRequired,
  onStrategyChange: PropTypes.func.isRequired,
  onMigrationStart: PropTypes.func
};

MonitoringObservability.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  onToolChange: PropTypes.func.isRequired,
  monitoringMetrics: PropTypes.object
};

ProductionBestPractices.propTypes = {
  selectedPractice: PropTypes.string.isRequired,
  onPracticeChange: PropTypes.func.isRequired
};

export default Lesson06Integration;
