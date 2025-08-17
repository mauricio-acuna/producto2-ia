import React, { useState, useEffect, useRef, useMemo, useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

// Reducer para manejo de estado complejo de casos de uso
const useCaseReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_CASE':
      return {
        ...state,
        activeCase: action.payload,
        caseData: action.data || state.caseData
      };
    case 'UPDATE_SIMULATION':
      return {
        ...state,
        simulationData: {
          ...state.simulationData,
          ...action.payload
        }
      };
    case 'ADD_LOG_ENTRY':
      return {
        ...state,
        systemLogs: [
          ...state.systemLogs.slice(-49), // Mantener últimas 50 entradas
          {
            id: Date.now(),
            timestamp: new Date(),
            level: action.level,
            message: action.message,
            source: action.source
          }
        ]
      };
    case 'TOGGLE_REAL_TIME':
      return {
        ...state,
        realTimeEnabled: !state.realTimeEnabled
      };
    default:
      return state;
  }
};

// Componente de Casos de Uso por Industria
const IndustryUseCases = ({ selectedCase, onCaseSelect, onSimulationStart }) => {
  const industries = [
    {
      id: 'fintech',
      name: 'FinTech & Trading',
      icon: '💰',
      description: 'Sistemas de alta frecuencia con latencia sub-milisegundo',
      cases: [
        {
          id: 'hft-memory',
          title: 'High-Frequency Trading Memory',
          challenge: 'Procesar 1M+ órdenes/segundo con latencia <100μs',
          solution: 'Memory pool pre-allocada + zero-copy messaging',
          metrics: { latency: '85μs', throughput: '1.2M ops/s', accuracy: '99.99%' },
          complexity: 'Extrema',
          roi: '300%'
        },
        {
          id: 'fraud-detection',
          title: 'Detección de Fraude en Tiempo Real',
          challenge: 'Analizar patrones en streaming de transacciones',
          solution: 'Sliding window + ML incremental + cache predictivo',
          metrics: { detection: '15ms', accuracy: '98.7%', falsePos: '0.02%' },
          complexity: 'Alta',
          roi: '500%'
        },
        {
          id: 'risk-engine',
          title: 'Motor de Riesgo Distribuido',
          challenge: 'Cálculo de riesgo portfolio en tiempo real',
          solution: 'Partición por asset class + cache jerárquico',
          metrics: { calculation: '2.1s', accuracy: '99.5%', coverage: '100%' },
          complexity: 'Alta',
          roi: '250%'
        }
      ]
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Medical',
      icon: '🏥',
      description: 'Sistemas críticos con compliance HIPAA y disponibilidad 99.99%',
      cases: [
        {
          id: 'patient-monitoring',
          title: 'Monitoreo de Pacientes IoT',
          challenge: 'Procesar 10K+ sensores con alertas críticas instantáneas',
          solution: 'Event-driven architecture + priority queues + redundancia',
          metrics: { latency: '50ms', reliability: '99.99%', sensors: '12K' },
          complexity: 'Alta',
          roi: 'Vida humana'
        },
        {
          id: 'ehr-optimization',
          title: 'Electronic Health Records',
          challenge: 'Búsqueda instantánea en 50M+ registros médicos',
          solution: 'Índices especializados + cache inteligente + encriptación',
          metrics: { search: '120ms', records: '50M', security: 'HIPAA' },
          complexity: 'Alta',
          roi: '180%'
        },
        {
          id: 'drug-interaction',
          title: 'Análisis de Interacciones Medicamentosas',
          challenge: 'Validación en tiempo real contra 100K+ interacciones',
          solution: 'Graph database + memoria asociativa + ML predictions',
          metrics: { validation: '5ms', accuracy: '99.8%', drugs: '100K+' },
          complexity: 'Media',
          roi: '400%'
        }
      ]
    },
    {
      id: 'gaming',
      name: 'Gaming & Entertainment',
      icon: '🎮',
      description: 'Experiencias inmersivas con sincronización masiva en tiempo real',
      cases: [
        {
          id: 'mmorpg-state',
          title: 'MMORPG State Management',
          challenge: '10K+ jugadores simultáneos con mundo persistente',
          solution: 'Spatial partitioning + delta compression + P2P hybrid',
          metrics: { players: '15K', latency: '16ms', sync: '60fps' },
          complexity: 'Extrema',
          roi: '200%'
        },
        {
          id: 'esports-analytics',
          title: 'eSports Analytics Real-time',
          challenge: 'Análisis de gameplay para 1M+ espectadores',
          solution: 'Stream processing + edge computing + CDN optimization',
          metrics: { viewers: '1.2M', delay: '2s', analytics: 'Real-time' },
          complexity: 'Alta',
          roi: '350%'
        },
        {
          id: 'procedural-world',
          title: 'Generación Procedural de Mundos',
          challenge: 'Generar contenido infinito sin loading screens',
          solution: 'Predictive loading + chunk management + noise algorithms',
          metrics: { generation: '100ms', seamless: '100%', variety: 'Infinite' },
          complexity: 'Media',
          roi: '220%'
        }
      ]
    },
    {
      id: 'automotive',
      name: 'Automotive & Autonomous',
      icon: '🚗',
      description: 'Sistemas críticos de seguridad con decisiones en microsegundos',
      cases: [
        {
          id: 'autonomous-decision',
          title: 'Autonomous Decision Engine',
          challenge: 'Decisiones de conducción en <10ms con 360° awareness',
          solution: 'Sensor fusion + predictive models + failsafe redundancy',
          metrics: { decision: '8ms', accuracy: '99.99%', safety: 'ISO26262' },
          complexity: 'Extrema',
          roi: 'Seguridad'
        },
        {
          id: 'traffic-optimization',
          title: 'Optimización de Tráfico Urbano',
          challenge: 'Coordinar 1000+ semáforos con flujo dinámico',
          solution: 'Swarm intelligence + traffic prediction + edge computing',
          metrics: { response: '500ms', efficiency: '35%', coverage: '1000+' },
          complexity: 'Alta',
          roi: '180%'
        },
        {
          id: 'fleet-management',
          title: 'Fleet Management Predictivo',
          challenge: 'Optimizar rutas de 10K+ vehículos en tiempo real',
          solution: 'Multi-objective optimization + ML routing + IoT telemetry',
          metrics: { optimization: '30s', vehicles: '12K', savings: '25%' },
          complexity: 'Alta',
          roi: '300%'
        }
      ]
    },
    {
      id: 'iot',
      name: 'IoT & Smart Cities',
      icon: '🌐',
      description: 'Ecosistemas masivos con millones de dispositivos conectados',
      cases: [
        {
          id: 'smart-grid',
          title: 'Smart Grid Management',
          challenge: 'Balanceo energético con 1M+ medidores inteligentes',
          solution: 'Time-series optimization + predictive load + auto-scaling',
          metrics: { devices: '1.2M', response: '100ms', efficiency: '22%' },
          complexity: 'Extrema',
          roi: '400%'
        },
        {
          id: 'environmental-monitoring',
          title: 'Monitoreo Ambiental Global',
          challenge: 'Procesar datos de 100K+ sensores ambientales',
          solution: 'Edge processing + data aggregation + anomaly detection',
          metrics: { sensors: '120K', latency: '200ms', accuracy: '99.5%' },
          complexity: 'Alta',
          roi: '250%'
        },
        {
          id: 'waste-optimization',
          title: 'Optimización de Recolección de Residuos',
          challenge: 'Rutas dinámicas basadas en nivel de llenado',
          solution: 'Sensor networks + route optimization + predictive analytics',
          metrics: { routes: '500+', optimization: '40%', savings: '30%' },
          complexity: 'Media',
          roi: '320%'
        }
      ]
    }
  ];

  const selectedIndustry = industries.find(ind => 
    ind.cases.some(c => c.id === selectedCase)
  ) || industries[0];

  const getComplexityColor = (complexity) => {
    const colors = {
      'Media': '#22c55e',
      'Alta': '#f59e0b', 
      'Extrema': '#ef4444'
    };
    return colors[complexity] || '#6b7280';
  };

  return (
    <div className="industry-use-cases">
      <div className="use-cases-header">
        <h3>🏢 Casos de Uso por Industria</h3>
        <p>Implementaciones reales de sistemas de memoria en entornos de producción críticos</p>
      </div>

      <div className="industry-selector">
        {industries.map((industry) => (
          <div
            key={industry.id}
            className={`industry-card ${selectedIndustry.id === industry.id ? 'active' : ''}`}
            onClick={() => onCaseSelect(industry.cases[0].id)}
            tabIndex={0}
            role="button"
            aria-pressed={selectedIndustry.id === industry.id}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCaseSelect(industry.cases[0].id);
              }
            }}
          >
            <div className="industry-icon" aria-hidden="true">{industry.icon}</div>
            <h4>{industry.name}</h4>
            <p>{industry.description}</p>
            <div className="industry-stats">
              <span>{industry.cases.length} casos</span>
            </div>
          </div>
        ))}
      </div>

      <div className="cases-grid">
        {selectedIndustry.cases.map((useCase) => (
          <div
            key={useCase.id}
            className={`case-card ${selectedCase === useCase.id ? 'selected' : ''}`}
            onClick={() => onCaseSelect(useCase.id)}
            tabIndex={0}
            role="button"
            aria-pressed={selectedCase === useCase.id}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCaseSelect(useCase.id);
              }
            }}
          >
            <div className="case-header">
              <h5>{useCase.title}</h5>
              <div 
                className="complexity-badge"
                style={{ backgroundColor: getComplexityColor(useCase.complexity) }}
              >
                {useCase.complexity}
              </div>
            </div>

            <div className="case-challenge">
              <strong>Desafío:</strong> {useCase.challenge}
            </div>

            <div className="case-solution">
              <strong>Solución:</strong> {useCase.solution}
            </div>

            <div className="case-metrics">
              {Object.entries(useCase.metrics).map(([key, value]) => (
                <div key={key} className="metric">
                  <span className="metric-key">{key}:</span>
                  <span className="metric-value">{value}</span>
                </div>
              ))}
            </div>

            <div className="case-footer">
              <div className="roi-indicator">
                ROI: {useCase.roi}
              </div>
              <button
                className="simulate-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onSimulationStart(useCase.id);
                }}
                aria-label={`Simular ${useCase.title}`}
              >
                🧪 Simular
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente de Arquitecturas Multi-Agente
const MultiAgentArchitectures = ({ selectedArchitecture, onArchitectureChange }) => {
  const [activeDemo, setActiveDemo] = useState('memory-sharing');
  const [agentStates, setAgentStates] = useState({
    agent1: { memory: [], processing: false },
    agent2: { memory: [], processing: false },
    agent3: { memory: [], processing: false },
    shared: { memory: [], conflicts: 0 }
  });

  const architectures = [
    {
      id: 'centralized',
      name: 'Memoria Centralizada',
      description: 'Todos los agentes acceden a un repositorio central de memoria',
      pros: ['Consistencia garantizada', 'Fácil sincronización', 'Control centralizado'],
      cons: ['Punto único de falla', 'Bottleneck de performance', 'Escalabilidad limitada'],
      useCases: ['Equipos pequeños', 'Datos críticos', 'Baja latencia requerida']
    },
    {
      id: 'distributed',
      name: 'Memoria Distribuida',
      description: 'Cada agente mantiene su propia memoria con sincronización eventual',
      pros: ['Alta disponibilidad', 'Escalabilidad horizontal', 'Tolerancia a fallos'],
      cons: ['Eventual consistency', 'Complejidad de sincronización', 'Conflictos posibles'],
      useCases: ['Sistemas masivos', 'Tolerancia a particiones', 'Global distribution']
    },
    {
      id: 'hybrid',
      name: 'Híbrida (Hot/Cold)',
      description: 'Memoria caliente local + memoria fría compartida',
      pros: ['Balance performance/consistencia', 'Optimización por uso', 'Flexibilidad'],
      cons: ['Complejidad de gestión', 'Overhead de coordinación', 'Tuning requerido'],
      useCases: ['Aplicaciones enterprise', 'Workloads mixtos', 'Optimización costs']
    },
    {
      id: 'federated',
      name: 'Federada',
      description: 'Clusters de agentes con memoria compartida por dominio',
      pros: ['Aislamiento por dominio', 'Escalabilidad modular', 'Governance distribuido'],
      cons: ['Cross-domain complexity', 'Overhead de federación', 'Latencia inter-cluster'],
      useCases: ['Multi-tenant systems', 'Regulatory compliance', 'Domain separation']
    }
  ];

  const runMemorySharingDemo = useCallback(() => {
    const simulateAgentOperation = (agentId, operation) => {
      setAgentStates(prev => ({
        ...prev,
        [agentId]: { ...prev[agentId], processing: true }
      }));

      setTimeout(() => {
        setAgentStates(prev => {
          const newMemoryEntry = {
            id: Date.now() + Math.random(),
            timestamp: Date.now(),
            content: `${operation} - Agent ${agentId}`,
            type: operation,
            agent: agentId
          };

          const updatedAgent = {
            ...prev[agentId],
            memory: [...prev[agentId].memory.slice(-4), newMemoryEntry],
            processing: false
          };

          // Simular sincronización con memoria compartida
          const updatedShared = {
            ...prev.shared,
            memory: [...prev.shared.memory.slice(-9), newMemoryEntry]
          };

          return {
            ...prev,
            [agentId]: updatedAgent,
            shared: updatedShared
          };
        });
      }, 1000 + Math.random() * 2000);
    };

    // Simular operaciones concurrentes
    const operations = ['Learn', 'Query', 'Update', 'Analyze'];
    const agents = ['agent1', 'agent2', 'agent3'];
    
    agents.forEach(agent => {
      const operation = operations[Math.floor(Math.random() * operations.length)];
      simulateAgentOperation(agent, operation);
    });
  }, []);

  useEffect(() => {
    if (activeDemo === 'memory-sharing') {
      const interval = setInterval(runMemorySharingDemo, 5000);
      return () => clearInterval(interval);
    }
  }, [activeDemo, runMemorySharingDemo]);

  const currentArchitecture = architectures.find(arch => arch.id === selectedArchitecture) || architectures[0];

  return (
    <div className="multi-agent-architectures">
      <div className="architectures-header">
        <h3>🤖 Arquitecturas Multi-Agente</h3>
        <p>Patrones avanzados para sistemas de memoria distribuida entre múltiples agentes</p>
      </div>

      <div className="architecture-selector">
        {architectures.map((arch) => (
          <div
            key={arch.id}
            className={`architecture-option ${selectedArchitecture === arch.id ? 'selected' : ''}`}
            onClick={() => onArchitectureChange(arch.id)}
            tabIndex={0}
            role="button"
            aria-pressed={selectedArchitecture === arch.id}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onArchitectureChange(arch.id);
              }
            }}
          >
            <h4>{arch.name}</h4>
            <p>{arch.description}</p>
          </div>
        ))}
      </div>

      <div className="architecture-details">
        <div className="architecture-analysis">
          <div className="pros-cons">
            <div className="pros">
              <h5>✅ Ventajas</h5>
              <ul>
                {currentArchitecture.pros.map((pro, index) => (
                  <li key={index}>{pro}</li>
                ))}
              </ul>
            </div>

            <div className="cons">
              <h5>❌ Desventajas</h5>
              <ul>
                {currentArchitecture.cons.map((con, index) => (
                  <li key={index}>{con}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="use-cases">
            <h5>🎯 Casos de Uso Ideales</h5>
            <ul>
              {currentArchitecture.useCases.map((useCase, index) => (
                <li key={index}>{useCase}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="memory-sharing-demo">
          <h5>🧪 Demo de Memoria Compartida</h5>
          <div className="demo-controls">
            <button
              className={`demo-btn ${activeDemo === 'memory-sharing' ? 'active' : ''}`}
              onClick={() => setActiveDemo('memory-sharing')}
            >
              Compartición de Memoria
            </button>
            <button
              className={`demo-btn ${activeDemo === 'conflict-resolution' ? 'active' : ''}`}
              onClick={() => setActiveDemo('conflict-resolution')}
            >
              Resolución de Conflictos
            </button>
            <button
              className="trigger-btn"
              onClick={runMemorySharingDemo}
            >
              🚀 Ejecutar Operación
            </button>
          </div>

          <div className="agents-visualization">
            {['agent1', 'agent2', 'agent3'].map((agentId) => (
              <div key={agentId} className="agent-container">
                <div className="agent-header">
                  <h6>Agent {agentId.slice(-1)}</h6>
                  {agentStates[agentId].processing && (
                    <div className="processing-indicator" aria-label="Procesando">
                      <div className="spinner"></div>
                    </div>
                  )}
                </div>
                <div className="agent-memory">
                  {agentStates[agentId].memory.map((item) => (
                    <div key={item.id} className="memory-item">
                      <span className="memory-type">{item.type}</span>
                      <span className="memory-content">{item.content}</span>
                      <span className="memory-time">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                  {agentStates[agentId].memory.length === 0 && (
                    <div className="empty-memory">Sin memoria local</div>
                  )}
                </div>
              </div>
            ))}

            <div className="shared-memory-container">
              <div className="shared-header">
                <h6>Memoria Compartida</h6>
                <div className="conflict-counter">
                  Conflictos: {agentStates.shared.conflicts}
                </div>
              </div>
              <div className="shared-memory">
                {agentStates.shared.memory.map((item) => (
                  <div key={item.id} className="shared-memory-item">
                    <span className="item-agent">Agent {item.agent.slice(-1)}</span>
                    <span className="item-type">{item.type}</span>
                    <span className="item-time">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
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

// Componente de Integración con APIs Externas
const ExternalAPIIntegration = ({ selectedAPI, onAPIChange, onIntegrationTest }) => {
  const [connectionStatus, setConnectionStatus] = useState({});
  const [testResults, setTestResults] = useState({});
  const [isRunningTest, setIsRunningTest] = useState(false);

  const apiProviders = [
    {
      id: 'openai',
      name: 'OpenAI GPT-4',
      description: 'Integración con modelos de lenguaje avanzados para memoria semántica',
      capabilities: ['Text generation', 'Embeddings', 'Code completion', 'Summarization'],
      memoryFeatures: [
        'Semantic memory compression',
        'Context-aware retrieval', 
        'Automatic summarization',
        'Entity extraction'
      ],
      pricing: '$0.03/1K tokens',
      latency: '200-800ms',
      reliability: '99.9%'
    },
    {
      id: 'anthropic',
      name: 'Anthropic Claude',
      description: 'Análisis profundo y razonamiento para memoria contextual avanzada',
      capabilities: ['Long context', 'Constitutional AI', 'Code analysis', 'Research'],
      memoryFeatures: [
        'Long-term context retention',
        'Ethical memory filtering',
        'Multi-step reasoning',
        'Knowledge synthesis'
      ],
      pricing: '$0.25/1K tokens',
      latency: '300-1200ms', 
      reliability: '99.5%'
    },
    {
      id: 'cohere',
      name: 'Cohere Command',
      description: 'Búsqueda semántica y embeddings optimizados para sistemas enterprise',
      capabilities: ['Semantic search', 'Reranking', 'Embeddings', 'Classification'],
      memoryFeatures: [
        'Optimized embeddings',
        'Semantic clustering',
        'Multi-lingual support',
        'Enterprise security'
      ],
      pricing: '$0.015/1K tokens',
      latency: '100-400ms',
      reliability: '99.8%'
    },
    {
      id: 'pinecone',
      name: 'Pinecone Vector DB',
      description: 'Base de datos vectorial especializada para memoria semántica masiva',
      capabilities: ['Vector search', 'Real-time updates', 'Metadata filtering', 'Hybrid search'],
      memoryFeatures: [
        'Billion-scale vectors',
        'Sub-100ms queries',
        'Real-time indexing',
        'Hybrid filtering'
      ],
      pricing: '$0.096/pod/hour',
      latency: '10-50ms',
      reliability: '99.95%'
    },
    {
      id: 'weaviate',
      name: 'Weaviate Graph+Vector',
      description: 'Base de datos híbrida que combina búsqueda vectorial con grafos de conocimiento',
      capabilities: ['Vector + Graph', 'GraphQL API', 'Multi-modal', 'Auto-schema'],
      memoryFeatures: [
        'Knowledge graphs',
        'Contextual search',
        'Multi-modal memory',
        'Automatic schema'
      ],
      pricing: '$0.12/GB/month',
      latency: '20-100ms',
      reliability: '99.7%'
    }
  ];

  const testAPIConnection = useCallback(async (apiId) => {
    setIsRunningTest(true);
    setConnectionStatus(prev => ({ ...prev, [apiId]: 'testing' }));

    // Simular test de conexión
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

    const success = Math.random() > 0.1; // 90% success rate
    const latency = Math.random() * 500 + 100;
    
    const result = {
      success,
      latency: Math.round(latency),
      timestamp: new Date(),
      details: success 
        ? `Conexión exitosa en ${Math.round(latency)}ms`
        : `Error de conexión: ${Math.random() > 0.5 ? 'Timeout' : 'Authentication failed'}`
    };

    setConnectionStatus(prev => ({ 
      ...prev, 
      [apiId]: success ? 'connected' : 'error' 
    }));
    
    setTestResults(prev => ({ ...prev, [apiId]: result }));
    setIsRunningTest(false);
    
    onIntegrationTest?.(apiId, result);
  }, [onIntegrationTest]);

  const currentAPI = apiProviders.find(api => api.id === selectedAPI) || apiProviders[0];

  const getStatusColor = (status) => {
    const colors = {
      'connected': '#22c55e',
      'error': '#ef4444',
      'testing': '#f59e0b',
      'disconnected': '#6b7280'
    };
    return colors[status] || colors.disconnected;
  };

  const getStatusIcon = (status) => {
    const icons = {
      'connected': '✅',
      'error': '❌', 
      'testing': '⏳',
      'disconnected': '⚪'
    };
    return icons[status] || icons.disconnected;
  };

  return (
    <div className="external-api-integration">
      <div className="integration-header">
        <h3>🔌 Integración con APIs Externas</h3>
        <p>Conecta sistemas de memoria con servicios de IA líderes para capacidades avanzadas</p>
      </div>

      <div className="api-grid">
        {apiProviders.map((api) => (
          <div
            key={api.id}
            className={`api-card ${selectedAPI === api.id ? 'selected' : ''}`}
            onClick={() => onAPIChange(api.id)}
            tabIndex={0}
            role="button"
            aria-pressed={selectedAPI === api.id}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onAPIChange(api.id);
              }
            }}
          >
            <div className="api-header">
              <h4>{api.name}</h4>
              <div 
                className="connection-status"
                style={{ color: getStatusColor(connectionStatus[api.id]) }}
                title={`Estado: ${connectionStatus[api.id] || 'disconnected'}`}
              >
                {getStatusIcon(connectionStatus[api.id])}
              </div>
            </div>

            <p className="api-description">{api.description}</p>

            <div className="api-specs">
              <div className="spec">
                <span className="spec-label">Precio:</span>
                <span className="spec-value">{api.pricing}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Latencia:</span>
                <span className="spec-value">{api.latency}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Confiabilidad:</span>
                <span className="spec-value">{api.reliability}</span>
              </div>
            </div>

            <div className="api-capabilities">
              <h6>Capacidades:</h6>
              <div className="capability-tags">
                {api.capabilities.slice(0, 3).map((cap, index) => (
                  <span key={index} className="capability-tag">{cap}</span>
                ))}
                {api.capabilities.length > 3 && (
                  <span className="capability-tag more">+{api.capabilities.length - 3}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="api-details">
        <div className="details-header">
          <h4>{currentAPI.name} - Configuración de Memoria</h4>
          <button
            className={`test-connection-btn ${isRunningTest ? 'testing' : ''}`}
            onClick={() => testAPIConnection(currentAPI.id)}
            disabled={isRunningTest}
            aria-label={`Probar conexión con ${currentAPI.name}`}
          >
            {isRunningTest ? '⏳ Probando...' : '🔌 Probar Conexión'}
          </button>
        </div>

        <div className="memory-features">
          <h5>🧠 Características de Memoria</h5>
          <div className="features-grid">
            {currentAPI.memoryFeatures.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-icon">✨</span>
                <span className="feature-text">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="integration-example">
          <h5>💻 Ejemplo de Integración</h5>
          <div className="code-example">
            <pre>
              <code>{`// Integración con ${currentAPI.name}
const memorySystem = new EnhancedMemorySystem({
  provider: '${currentAPI.id}',
  config: {
    apiKey: process.env.${currentAPI.id.toUpperCase()}_API_KEY,
    model: '${currentAPI.id === 'openai' ? 'gpt-4' : currentAPI.id === 'anthropic' ? 'claude-3' : 'command'}',
    embeddingDimensions: ${currentAPI.id === 'pinecone' ? '1536' : '1024'},
    maxContextLength: ${currentAPI.id === 'anthropic' ? '200000' : '8192'}
  }
});

// Agregar memoria con procesamiento semántico
await memorySystem.addMemory({
  content: "Usuario pregunta sobre optimización de performance",
  metadata: { priority: "high", domain: "technical" },
  enableSemanticProcessing: true,
  enableSummarization: ${currentAPI.id !== 'pinecone'},
  enableEntityExtraction: true
});

// Búsqueda semántica avanzada
const results = await memorySystem.semanticSearch({
  query: "¿Cómo optimizar la latencia del sistema?",
  limit: 10,
  threshold: 0.8,
  includeMetadata: true,
  rerank: ${currentAPI.id === 'cohere'}
});`}</code>
            </pre>
          </div>
        </div>

        {testResults[currentAPI.id] && (
          <div className="test-results">
            <h5>📊 Resultados de Prueba</h5>
            <div className={`result-card ${testResults[currentAPI.id].success ? 'success' : 'error'}`}>
              <div className="result-status">
                {testResults[currentAPI.id].success ? '✅ Exitoso' : '❌ Error'}
              </div>
              <div className="result-details">
                <div className="result-item">
                  <span>Latencia:</span>
                  <span>{testResults[currentAPI.id].latency}ms</span>
                </div>
                <div className="result-item">
                  <span>Timestamp:</span>
                  <span>{testResults[currentAPI.id].timestamp.toLocaleTimeString()}</span>
                </div>
                <div className="result-message">
                  {testResults[currentAPI.id].details}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Sistema de Logging y Troubleshooting
const SystemLogging = ({ logs, onClearLogs, realTimeEnabled, onToggleRealTime }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const logsRef = useRef(null);

  const filteredLogs = useMemo(() => {
    return logs
      .filter(log => filter === 'all' || log.level === filter)
      .filter(log => 
        searchTerm === '' || 
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.source.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(-100); // Últimos 100 logs
  }, [logs, filter, searchTerm]);

  useEffect(() => {
    if (logsRef.current && realTimeEnabled) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [filteredLogs, realTimeEnabled]);

  const getLogIcon = (level) => {
    const icons = {
      'info': 'ℹ️',
      'warn': '⚠️',
      'error': '❌',
      'success': '✅',
      'debug': '🐛'
    };
    return icons[level] || 'ℹ️';
  };

  const getLogColor = (level) => {
    const colors = {
      'info': '#3b82f6',
      'warn': '#f59e0b',
      'error': '#ef4444',
      'success': '#22c55e',
      'debug': '#6b7280'
    };
    return colors[level] || colors.info;
  };

  return (
    <div className="system-logging">
      <div className="logging-header">
        <h3>📋 System Logging & Troubleshooting</h3>
        <p>Monitoreo en tiempo real de operaciones del sistema de memoria</p>
      </div>

      <div className="logging-controls">
        <div className="filter-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="log-filter"
            aria-label="Filtrar logs por nivel"
          >
            <option value="all">Todos los niveles</option>
            <option value="info">Info</option>
            <option value="warn">Warning</option>
            <option value="error">Error</option>
            <option value="success">Success</option>
            <option value="debug">Debug</option>
          </select>

          <input
            type="text"
            placeholder="Buscar en logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="log-search"
            aria-label="Buscar en logs"
          />
        </div>

        <div className="action-controls">
          <button
            className={`realtime-toggle ${realTimeEnabled ? 'active' : ''}`}
            onClick={onToggleRealTime}
            aria-label={realTimeEnabled ? 'Pausar tiempo real' : 'Activar tiempo real'}
          >
            {realTimeEnabled ? '⏸️ Pausar' : '▶️ Tiempo Real'}
          </button>

          <button
            className="clear-logs-btn"
            onClick={onClearLogs}
            aria-label="Limpiar logs"
          >
            🗑️ Limpiar
          </button>
        </div>
      </div>

      <div className="logs-stats">
        <div className="stat">
          <span className="stat-label">Total Logs:</span>
          <span className="stat-value">{logs.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Filtrados:</span>
          <span className="stat-value">{filteredLogs.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Errores:</span>
          <span className="stat-value error">{logs.filter(l => l.level === 'error').length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Warnings:</span>
          <span className="stat-value warning">{logs.filter(l => l.level === 'warn').length}</span>
        </div>
      </div>

      <div className="logs-container" ref={logsRef}>
        {filteredLogs.length === 0 ? (
          <div className="empty-logs">
            {searchTerm || filter !== 'all' 
              ? 'No se encontraron logs con los filtros aplicados' 
              : 'No hay logs disponibles'
            }
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div 
              key={log.id} 
              className="log-entry"
              style={{ borderLeftColor: getLogColor(log.level) }}
            >
              <div className="log-header">
                <span className="log-icon" aria-hidden="true">
                  {getLogIcon(log.level)}
                </span>
                <span className="log-level" style={{ color: getLogColor(log.level) }}>
                  {log.level.toUpperCase()}
                </span>
                <span className="log-source">{log.source}</span>
                <span className="log-timestamp">
                  {log.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <div className="log-message">{log.message}</div>
            </div>
          ))
        )}
      </div>

      {realTimeEnabled && (
        <div className="realtime-indicator">
          <div className="pulse-dot"></div>
          <span>Monitoreo en tiempo real activo</span>
        </div>
      )}
    </div>
  );
};

// Componente principal
const Lesson05AdvancedCases = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState('industry-cases');
  const [selectedCase, setSelectedCase] = useState('hft-memory');
  const [selectedArchitecture, setSelectedArchitecture] = useState('centralized');
  const [selectedAPI, setSelectedAPI] = useState('openai');

  const [state, dispatch] = useReducer(useCaseReducer, {
    activeCase: 'hft-memory',
    caseData: {},
    simulationData: {},
    systemLogs: [],
    realTimeEnabled: true
  });

  const tabs = [
    {
      id: 'industry-cases',
      label: 'Casos por Industria',
      icon: '🏢',
      description: 'Implementaciones reales en sectores críticos'
    },
    {
      id: 'multi-agent',
      label: 'Multi-Agente',
      icon: '🤖',
      description: 'Arquitecturas distribuidas avanzadas'
    },
    {
      id: 'api-integration',
      label: 'Integración APIs',
      icon: '🔌',
      description: 'Conectores con servicios externos'
    },
    {
      id: 'troubleshooting',
      label: 'Troubleshooting',
      icon: '🔧',
      description: 'Debugging y resolución de problemas'
    }
  ];

  // Generar logs simulados
  useEffect(() => {
    if (!state.realTimeEnabled) return;

    const interval = setInterval(() => {
      const logSources = ['MemoryManager', 'APIConnector', 'AgentCoordinator', 'CacheLayer', 'SearchEngine'];
      const logLevels = ['info', 'warn', 'error', 'success', 'debug'];
      const logMessages = [
        'Memory optimization completed successfully',
        'Cache hit rate: 94.2%',
        'API connection timeout detected',
        'Agent synchronization in progress',
        'Search index updated with 1,250 new entries',
        'Warning: Memory usage above 80%',
        'Error: Failed to connect to external API',
        'Compression algorithm improved efficiency by 15%',
        'Multi-agent consensus reached',
        'Real-time monitoring active'
      ];

      if (Math.random() > 0.3) { // 70% probabilidad de generar log
        dispatch({
          type: 'ADD_LOG_ENTRY',
          level: logLevels[Math.floor(Math.random() * logLevels.length)],
          message: logMessages[Math.floor(Math.random() * logMessages.length)],
          source: logSources[Math.floor(Math.random() * logSources.length)]
        });
      }
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, [state.realTimeEnabled]);

  const handleTabClick = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  const handleCaseSelect = useCallback((caseId) => {
    setSelectedCase(caseId);
    dispatch({ type: 'SET_ACTIVE_CASE', payload: caseId });
  }, []);

  const handleSimulationStart = useCallback((caseId) => {
    dispatch({
      type: 'ADD_LOG_ENTRY',
      level: 'info',
      message: `Starting simulation for case: ${caseId}`,
      source: 'SimulationEngine'
    });
  }, []);

  const handleIntegrationTest = useCallback((apiId, result) => {
    dispatch({
      type: 'ADD_LOG_ENTRY',
      level: result.success ? 'success' : 'error',
      message: `API integration test: ${apiId} - ${result.details}`,
      source: 'APITester'
    });
  }, []);

  const handleClearLogs = useCallback(() => {
    dispatch({ type: 'SET_ACTIVE_CASE', payload: state.activeCase, data: { systemLogs: [] } });
  }, [state.activeCase]);

  const handleToggleRealTime = useCallback(() => {
    dispatch({ type: 'TOGGLE_REAL_TIME' });
  }, []);

  return (
    <div className={`lesson05-advanced-cases ${className}`}>
      <header className="lesson-header">
        <div className="header-content">
          <h1>🚀 Lección 5: Casos Avanzados y Aplicaciones Empresariales</h1>
          <p className="lesson-description">
            Explora implementaciones reales de sistemas de memoria en entornos de producción críticos,
            desde trading de alta frecuencia hasta sistemas autónomos de misión crítica.
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
          id="panel-industry-cases"
          className={`content-panel ${activeTab === 'industry-cases' ? 'active' : ''}`}
          role="tabpanel"
          aria-labelledby="tab-industry-cases"
          hidden={activeTab !== 'industry-cases'}
        >
          <IndustryUseCases
            selectedCase={selectedCase}
            onCaseSelect={handleCaseSelect}
            onSimulationStart={handleSimulationStart}
          />
        </div>

        <div
          id="panel-multi-agent"
          className={`content-panel ${activeTab === 'multi-agent' ? 'active' : ''}`}
          role="tabpanel"
          aria-labelledby="tab-multi-agent"
          hidden={activeTab !== 'multi-agent'}
        >
          <MultiAgentArchitectures
            selectedArchitecture={selectedArchitecture}
            onArchitectureChange={setSelectedArchitecture}
          />
        </div>

        <div
          id="panel-api-integration"
          className={`content-panel ${activeTab === 'api-integration' ? 'active' : ''}`}
          role="tabpanel"
          aria-labelledby="tab-api-integration"
          hidden={activeTab !== 'api-integration'}
        >
          <ExternalAPIIntegration
            selectedAPI={selectedAPI}
            onAPIChange={setSelectedAPI}
            onIntegrationTest={handleIntegrationTest}
          />
        </div>

        <div
          id="panel-troubleshooting"
          className={`content-panel ${activeTab === 'troubleshooting' ? 'active' : ''}`}
          role="tabpanel"
          aria-labelledby="tab-troubleshooting"
          hidden={activeTab !== 'troubleshooting'}
        >
          <SystemLogging
            logs={state.systemLogs}
            onClearLogs={handleClearLogs}
            realTimeEnabled={state.realTimeEnabled}
            onToggleRealTime={handleToggleRealTime}
          />
        </div>
      </main>

      <footer className="lesson-footer">
        <div className="footer-content">
          <div className="implementation-summary">
            <h3>📊 Resumen de Implementaciones Empresariales</h3>
            <div className="implementation-metrics">
              <div className="metric">
                <span className="metric-label">Industrias Cubiertas:</span>
                <span className="metric-value">5 sectores</span>
              </div>
              <div className="metric">
                <span className="metric-label">Casos de Uso:</span>
                <span className="metric-value">15 implementaciones</span>
              </div>
              <div className="metric">
                <span className="metric-label">APIs Integradas:</span>
                <span className="metric-value">5 proveedores</span>
              </div>
              <div className="metric">
                <span className="metric-label">ROI Promedio:</span>
                <span className="metric-value">280%</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

Lesson05AdvancedCases.propTypes = {
  className: PropTypes.string
};

IndustryUseCases.propTypes = {
  selectedCase: PropTypes.string.isRequired,
  onCaseSelect: PropTypes.func.isRequired,
  onSimulationStart: PropTypes.func.isRequired
};

MultiAgentArchitectures.propTypes = {
  selectedArchitecture: PropTypes.string.isRequired,
  onArchitectureChange: PropTypes.func.isRequired
};

ExternalAPIIntegration.propTypes = {
  selectedAPI: PropTypes.string.isRequired,
  onAPIChange: PropTypes.func.isRequired,
  onIntegrationTest: PropTypes.func
};

SystemLogging.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
    level: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired
  })).isRequired,
  onClearLogs: PropTypes.func.isRequired,
  realTimeEnabled: PropTypes.bool.isRequired,
  onToggleRealTime: PropTypes.func.isRequired
};

export default Lesson05AdvancedCases;
