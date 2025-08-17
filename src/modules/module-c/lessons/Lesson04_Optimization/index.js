import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

// Componentes especializados para optimización
const OptimizationTechniques = ({ onTechniqueSelect, selectedTechnique }) => {
  const techniques = [
    {
      id: 'compression',
      name: 'Compresión de Datos',
      description: 'Algoritmos para reducir el tamaño de memorias extensas',
      impact: 'Alto',
      complexity: 'Media',
      savings: '60-80%',
      icon: '🗜️'
    },
    {
      id: 'caching',
      name: 'Cache Inteligente',
      description: 'Sistemas de cache multi-nivel con invalidación automática',
      impact: 'Muy Alto',
      complexity: 'Alta',
      savings: '40-90%',
      icon: '⚡'
    },
    {
      id: 'indexing',
      name: 'Indexación Semántica',
      description: 'Índices optimizados para búsqueda vectorial',
      impact: 'Alto',
      complexity: 'Alta',
      savings: '70-95%',
      icon: '🔍'
    },
    {
      id: 'partitioning',
      name: 'Particionado Temporal',
      description: 'Distribución de datos por relevancia temporal',
      impact: 'Medio',
      complexity: 'Media',
      savings: '30-50%',
      icon: '📅'
    },
    {
      id: 'pruning',
      name: 'Poda Automática',
      description: 'Eliminación inteligente de información redundante',
      impact: 'Alto',
      complexity: 'Baja',
      savings: '20-40%',
      icon: '✂️'
    },
    {
      id: 'streaming',
      name: 'Streaming de Datos',
      description: 'Procesamiento en tiempo real sin almacenamiento completo',
      impact: 'Muy Alto',
      complexity: 'Alta',
      savings: '80-95%',
      icon: '🌊'
    }
  ];

  const getImpactClass = (impact) => {
    const map = {
      'Muy Alto': 'impact-very-high',
      'Alto': 'impact-high',
      'Medio': 'impact-medium',
      'Bajo': 'impact-low'
    };
    return map[impact] || 'impact-medium';
  };

  const getComplexityClass = (complexity) => {
    const map = {
      'Alta': 'complexity-high',
      'Media': 'complexity-medium',
      'Baja': 'complexity-low'
    };
    return map[complexity] || 'complexity-medium';
  };

  return (
    <div className="optimization-techniques">
      <div className="techniques-header">
        <h3>🚀 Técnicas de Optimización Avanzadas</h3>
        <p>Selecciona una técnica para ver detalles de implementación y benchmarks</p>
      </div>
      
      <div className="techniques-grid">
        {techniques.map((technique) => (
          <div
            key={technique.id}
            className={`technique-card ${selectedTechnique === technique.id ? 'selected' : ''}`}
            onClick={() => onTechniqueSelect(technique.id)}
            tabIndex={0}
            role="button"
            aria-pressed={selectedTechnique === technique.id}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onTechniqueSelect(technique.id);
              }
            }}
          >
            <div className="technique-header">
              <span className="technique-icon" aria-hidden="true">{technique.icon}</span>
              <h4>{technique.name}</h4>
            </div>
            
            <p className="technique-description">{technique.description}</p>
            
            <div className="technique-metrics">
              <div className="metric">
                <span className="metric-label">Impacto:</span>
                <span className={`metric-value ${getImpactClass(technique.impact)}`}>
                  {technique.impact}
                </span>
              </div>
              
              <div className="metric">
                <span className="metric-label">Complejidad:</span>
                <span className={`metric-value ${getComplexityClass(technique.complexity)}`}>
                  {technique.complexity}
                </span>
              </div>
              
              <div className="metric">
                <span className="metric-label">Ahorro:</span>
                <span className="metric-value savings">
                  {technique.savings}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BenchmarkingTools = ({ activeTool, onToolChange }) => {
  const [benchmarkData, setBenchmarkData] = useState({
    baseline: { latency: 245, throughput: 850, memory: 125 },
    optimized: { latency: 89, throughput: 2340, memory: 45 },
    target: { latency: 50, throughput: 3000, memory: 30 }
  });

  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);

  const tools = [
    {
      id: 'performance',
      name: 'Performance Profiler',
      description: 'Análisis detallado de latencia y throughput',
      icon: '📊'
    },
    {
      id: 'memory',
      name: 'Memory Analyzer',
      description: 'Profiling de uso de memoria y garbage collection',
      icon: '💾'
    },
    {
      id: 'network',
      name: 'Network Monitor',
      description: 'Análisis de transferencia de datos y compresión',
      icon: '🌐'
    },
    {
      id: 'stress',
      name: 'Stress Testing',
      description: 'Pruebas de carga y escalabilidad',
      icon: '🔥'
    }
  ];

  const runBenchmark = useCallback(async (testType) => {
    setIsRunning(true);
    setCurrentTest(testType);

    // Simular prueba de rendimiento
    const duration = 3000 + Math.random() * 2000;
    
    const interval = setInterval(() => {
      setBenchmarkData(prev => ({
        ...prev,
        optimized: {
          latency: Math.max(50, prev.optimized.latency - Math.random() * 10),
          throughput: Math.min(3000, prev.optimized.throughput + Math.random() * 50),
          memory: Math.max(30, prev.optimized.memory - Math.random() * 2)
        }
      }));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setIsRunning(false);
      setCurrentTest(null);
    }, duration);
  }, []);

  const calculateImprovement = (baseline, optimized) => {
    return ((baseline - optimized) / baseline * 100).toFixed(1);
  };

  const getProgressColor = (current, target, baseline) => {
    const progress = (baseline - current) / (baseline - target);
    if (progress >= 0.9) return '#22c55e';
    if (progress >= 0.7) return '#eab308';
    if (progress >= 0.5) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className="benchmarking-tools">
      <div className="tools-header">
        <h3>🔬 Herramientas de Benchmarking</h3>
        <p>Mide y optimiza el rendimiento de tu sistema de memoria</p>
      </div>

      <div className="tools-grid">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className={`tool-card ${activeTool === tool.id ? 'active' : ''}`}
            onClick={() => onToolChange(tool.id)}
            tabIndex={0}
            role="button"
            aria-pressed={activeTool === tool.id}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToolChange(tool.id);
              }
            }}
          >
            <span className="tool-icon" aria-hidden="true">{tool.icon}</span>
            <h4>{tool.name}</h4>
            <p>{tool.description}</p>
          </div>
        ))}
      </div>

      <div className="benchmark-dashboard">
        <div className="dashboard-header">
          <h4>📈 Dashboard de Rendimiento</h4>
          <button
            className={`run-benchmark-btn ${isRunning ? 'running' : ''}`}
            onClick={() => runBenchmark(activeTool)}
            disabled={isRunning}
            aria-label={isRunning ? 'Ejecutando benchmark...' : 'Ejecutar benchmark'}
          >
            {isRunning ? '⏳ Ejecutando...' : '▶️ Ejecutar Benchmark'}
          </button>
        </div>

        <div className="metrics-comparison">
          <div className="metric-card">
            <h5>🚀 Latencia (ms)</h5>
            <div className="metric-bars">
              <div className="metric-bar baseline">
                <span className="bar-label">Baseline</span>
                <div className="bar-fill" style={{ width: '100%' }}>
                  {benchmarkData.baseline.latency}ms
                </div>
              </div>
              <div className="metric-bar optimized">
                <span className="bar-label">Optimizado</span>
                <div 
                  className="bar-fill" 
                  style={{ 
                    width: `${(benchmarkData.optimized.latency / benchmarkData.baseline.latency) * 100}%`,
                    backgroundColor: getProgressColor(
                      benchmarkData.optimized.latency,
                      benchmarkData.target.latency,
                      benchmarkData.baseline.latency
                    )
                  }}
                >
                  {Math.round(benchmarkData.optimized.latency)}ms
                </div>
              </div>
              <div className="metric-bar target">
                <span className="bar-label">Objetivo</span>
                <div className="bar-fill target-fill" style={{ width: `${(benchmarkData.target.latency / benchmarkData.baseline.latency) * 100}%` }}>
                  {benchmarkData.target.latency}ms
                </div>
              </div>
            </div>
            <div className="improvement">
              Mejora: {calculateImprovement(benchmarkData.baseline.latency, benchmarkData.optimized.latency)}%
            </div>
          </div>

          <div className="metric-card">
            <h5>⚡ Throughput (ops/s)</h5>
            <div className="metric-bars">
              <div className="metric-bar baseline">
                <span className="bar-label">Baseline</span>
                <div className="bar-fill">
                  {benchmarkData.baseline.throughput}
                </div>
              </div>
              <div className="metric-bar optimized">
                <span className="bar-label">Optimizado</span>
                <div 
                  className="bar-fill"
                  style={{ 
                    width: `${Math.min(100, (benchmarkData.optimized.throughput / benchmarkData.target.throughput) * 100)}%`,
                    backgroundColor: getProgressColor(
                      benchmarkData.baseline.throughput,
                      benchmarkData.optimized.throughput,
                      benchmarkData.target.throughput
                    )
                  }}
                >
                  {Math.round(benchmarkData.optimized.throughput)}
                </div>
              </div>
              <div className="metric-bar target">
                <span className="bar-label">Objetivo</span>
                <div className="bar-fill target-fill">
                  {benchmarkData.target.throughput}
                </div>
              </div>
            </div>
            <div className="improvement">
              Mejora: {calculateImprovement(benchmarkData.baseline.throughput, benchmarkData.optimized.throughput) * -1}%
            </div>
          </div>

          <div className="metric-card">
            <h5>💾 Memoria (MB)</h5>
            <div className="metric-bars">
              <div className="metric-bar baseline">
                <span className="bar-label">Baseline</span>
                <div className="bar-fill">
                  {benchmarkData.baseline.memory}MB
                </div>
              </div>
              <div className="metric-bar optimized">
                <span className="bar-label">Optimizado</span>
                <div 
                  className="bar-fill"
                  style={{ 
                    width: `${(benchmarkData.optimized.memory / benchmarkData.baseline.memory) * 100}%`,
                    backgroundColor: getProgressColor(
                      benchmarkData.optimized.memory,
                      benchmarkData.target.memory,
                      benchmarkData.baseline.memory
                    )
                  }}
                >
                  {Math.round(benchmarkData.optimized.memory)}MB
                </div>
              </div>
              <div className="metric-bar target">
                <span className="bar-label">Objetivo</span>
                <div className="bar-fill target-fill" style={{ width: `${(benchmarkData.target.memory / benchmarkData.baseline.memory) * 100}%` }}>
                  {benchmarkData.target.memory}MB
                </div>
              </div>
            </div>
            <div className="improvement">
              Mejora: {calculateImprovement(benchmarkData.baseline.memory, benchmarkData.optimized.memory)}%
            </div>
          </div>
        </div>

        {currentTest && (
          <div className="test-status" aria-live="polite">
            <div className="status-indicator">
              <div className="spinner" aria-hidden="true"></div>
              <span>Ejecutando {tools.find(t => t.id === currentTest)?.name}...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CodeOptimization = ({ selectedExample, onExampleChange }) => {
  const examples = [
    {
      id: 'compression',
      title: 'Compresión de Memoria',
      description: 'Implementación de algoritmo de compresión para mensajes largos',
      before: `// ❌ Sin optimización
class MemoryStore {
  constructor() {
    this.messages = [];
  }
  
  addMessage(message) {
    this.messages.push({
      id: Date.now(),
      content: message,
      timestamp: new Date(),
      metadata: {
        wordCount: message.split(' ').length,
        hasEntities: this.extractEntities(message).length > 0,
        sentiment: this.analyzeSentiment(message),
        topics: this.extractTopics(message)
      }
    });
  }
  
  getRecentMessages(count = 10) {
    return this.messages.slice(-count);
  }
}`,
      after: `// ✅ Con compresión optimizada
class OptimizedMemoryStore {
  constructor() {
    this.messages = new Map();
    this.compressed = new Map();
    this.index = new SearchIndex();
    this.compressionThreshold = 500; // chars
  }
  
  addMessage(message) {
    const id = this.generateId();
    const messageObj = {
      id,
      content: message.length > this.compressionThreshold 
        ? this.compress(message) 
        : message,
      isCompressed: message.length > this.compressionThreshold,
      timestamp: Date.now(),
      hash: this.hashContent(message)
    };
    
    this.messages.set(id, messageObj);
    this.index.addDocument(id, message);
    
    // Auto-cleanup de mensajes antiguos
    this.pruneOldMessages();
  }
  
  getMessage(id) {
    const msg = this.messages.get(id);
    if (msg?.isCompressed) {
      return {
        ...msg,
        content: this.decompress(msg.content)
      };
    }
    return msg;
  }
  
  compress(text) {
    // Implementación simplificada de compresión
    return btoa(text).replace(/(.{1,76})/g, '$1\\n');
  }
  
  decompress(compressed) {
    return atob(compressed.replace(/\\n/g, ''));
  }
}`,
      improvements: [
        '🗜️ Compresión automática para mensajes >500 caracteres',
        '📊 Reducción de memoria del 60-80%',
        '🔍 Indexación separada para búsqueda rápida',
        '🧹 Auto-limpieza de mensajes antiguos',
        '⚡ Lazy decompression solo cuando se necesita'
      ]
    },
    {
      id: 'caching',
      title: 'Sistema de Cache Multi-Nivel',
      description: 'Cache inteligente con invalidación automática y warming predictivo',
      before: `// ❌ Sin sistema de cache
class MemoryRetrieval {
  constructor(store) {
    this.store = store;
  }
  
  async searchMessages(query) {
    const allMessages = await this.store.getAllMessages();
    
    // Búsqueda lineal costosa
    const results = allMessages.filter(msg => 
      msg.content.toLowerCase().includes(query.toLowerCase())
    );
    
    // Scoring básico
    return results.map(msg => ({
      ...msg,
      score: this.calculateScore(msg, query)
    })).sort((a, b) => b.score - a.score);
  }
  
  calculateScore(message, query) {
    const matches = (message.content.match(
      new RegExp(query, 'gi')
    ) || []).length;
    return matches / message.content.length;
  }
}`,
      after: `// ✅ Con cache multi-nivel optimizado
class CachedMemoryRetrieval {
  constructor(store) {
    this.store = store;
    this.l1Cache = new Map(); // Cache de consultas frecuentes
    this.l2Cache = new LRUCache(1000); // Cache LRU para resultados
    this.embeddingsCache = new Map(); // Cache de embeddings
    this.queryPatterns = new Map(); // Patrones de consulta
  }
  
  async searchMessages(query) {
    const cacheKey = this.hashQuery(query);
    
    // L1 Cache - consultas exactas
    if (this.l1Cache.has(cacheKey)) {
      this.updateQueryPattern(query);
      return this.l1Cache.get(cacheKey);
    }
    
    // L2 Cache - consultas similares
    const similarResults = this.findSimilarQuery(query);
    if (similarResults) {
      return this.adaptResults(similarResults, query);
    }
    
    // Búsqueda completa con optimizaciones
    const results = await this.performOptimizedSearch(query);
    
    // Cache warming predictivo
    this.predictAndWarmCache(query);
    
    // Almacenar en cache
    this.l1Cache.set(cacheKey, results);
    this.l2Cache.set(cacheKey, results);
    
    return results;
  }
  
  async performOptimizedSearch(query) {
    const embedding = await this.getOrCreateEmbedding(query);
    const candidates = await this.store.findSimilarVectors(
      embedding, 
      { limit: 100 }
    );
    
    // Scoring híbrido
    return candidates.map(msg => ({
      ...msg,
      score: this.hybridScore(msg, query, embedding)
    })).sort((a, b) => b.score - a.score);
  }
  
  predictAndWarmCache(query) {
    // Predicción de próximas consultas
    const relatedQueries = this.predictRelatedQueries(query);
    
    // Cache warming en background
    setTimeout(() => {
      relatedQueries.forEach(q => this.searchMessages(q));
    }, 100);
  }
  
  hybridScore(message, query, embedding) {
    const textScore = this.textSimilarity(message.content, query);
    const semanticScore = this.cosineSimilarity(
      message.embedding, 
      embedding
    );
    const recencyScore = this.recencyBoost(message.timestamp);
    
    return (textScore * 0.4) + (semanticScore * 0.5) + (recencyScore * 0.1);
  }
}`,
      improvements: [
        '⚡ Cache L1 para consultas exactas (>95% hit rate)',
        '🔄 Cache L2 LRU para consultas similares',
        '🧠 Cache warming predictivo basado en patrones',
        '📊 Scoring híbrido texto + semántico + recencia',
        '🚀 Mejora de 10x en consultas repetidas'
      ]
    },
    {
      id: 'streaming',
      title: 'Streaming y Procesamiento Asíncrono',
      description: 'Procesamiento en tiempo real sin almacenamiento completo en memoria',
      before: `// ❌ Procesamiento síncrono y bloquente
class MessageProcessor {
  constructor() {
    this.messages = [];
    this.entities = [];
    this.summaries = [];
  }
  
  async processConversation(messages) {
    // Procesar todo en memoria
    for (const message of messages) {
      // Bloquea el hilo principal
      const entities = await this.extractEntities(message);
      const sentiment = await this.analyzeSentiment(message);
      const topics = await this.extractTopics(message);
      
      this.messages.push({
        ...message,
        entities,
        sentiment,
        topics,
        processed: true
      });
    }
    
    // Generar resumen al final
    const summary = await this.generateSummary(this.messages);
    this.summaries.push(summary);
    
    return {
      messages: this.messages,
      summary: summary,
      entities: this.entities
    };
  }
}`,
      after: `// ✅ Con streaming y procesamiento asíncrono
class StreamingMessageProcessor {
  constructor() {
    this.processQueue = new Queue();
    this.resultStream = new EventEmitter();
    this.entityExtractor = new WorkerPool('entity-worker.js');
    this.summaryBuffer = new SlidingWindow(50);
  }
  
  async processConversationStream(messageStream) {
    const processor = this.createProcessingPipeline();
    
    return new ReadableStream({
      async start(controller) {
        for await (const message of messageStream) {
          // Procesamiento no-bloqueante
          const processed = await processor.process(message);
          controller.enqueue(processed);
          
          // Emitir progreso en tiempo real
          this.resultStream.emit('progress', {
            message: processed,
            progress: this.calculateProgress()
          });
        }
        controller.close();
      }
    });
  }
  
  createProcessingPipeline() {
    return {
      async process(message) {
        // Pipeline asíncrono en paralelo
        const [entities, sentiment, topics] = await Promise.all([
          this.entityExtractor.extract(message.content),
          this.sentimentAnalyzer.analyze(message.content),
          this.topicExtractor.extract(message.content)
        ]);
        
        // Actualización incremental del buffer
        this.summaryBuffer.add(message);
        
        // Generar resumen incremental si necesario
        const needsUpdate = this.summaryBuffer.shouldUpdate();
        const summary = needsUpdate 
          ? await this.generateIncrementalSummary()
          : null;
        
        return {
          ...message,
          entities,
          sentiment,
          topics,
          summary,
          processedAt: Date.now()
        };
      }
    };
  }
  
  async generateIncrementalSummary() {
    // Solo procesar mensajes nuevos desde último resumen
    const newMessages = this.summaryBuffer.getNewMessages();
    const previousSummary = this.summaryBuffer.getLastSummary();
    
    // Actualización incremental más eficiente
    return await this.summaryGenerator.updateSummary(
      previousSummary,
      newMessages
    );
  }
  
  // API de streaming para el frontend
  subscribeToProgress(callback) {
    this.resultStream.on('progress', callback);
    return () => this.resultStream.off('progress', callback);
  }
}`,
      improvements: [
        '🌊 Procesamiento streaming sin bloqueo del UI',
        '⚡ Paralelización de análisis con Workers',
        '📊 Resúmenes incrementales vs regeneración completa',
        '🔄 Sliding window para memoria limitada',
        '📡 Progreso en tiempo real para UX mejorada'
      ]
    }
  ];

  const currentExample = examples.find(ex => ex.id === selectedExample) || examples[0];

  return (
    <div className="code-optimization">
      <div className="optimization-header">
        <h3>💻 Optimización de Código</h3>
        <p>Compara implementaciones antes y después de aplicar técnicas de optimización</p>
      </div>

      <div className="example-selector">
        {examples.map((example) => (
          <button
            key={example.id}
            className={`example-btn ${selectedExample === example.id ? 'active' : ''}`}
            onClick={() => onExampleChange(example.id)}
            aria-pressed={selectedExample === example.id}
          >
            {example.title}
          </button>
        ))}
      </div>

      <div className="code-comparison">
        <div className="comparison-header">
          <h4>{currentExample.title}</h4>
          <p>{currentExample.description}</p>
        </div>

        <div className="code-blocks">
          <div className="code-block before">
            <div className="code-header">
              <span className="status-indicator before">❌ Antes</span>
              <span className="performance-badge slow">Lento</span>
            </div>
            <pre>
              <code>{currentExample.before}</code>
            </pre>
          </div>

          <div className="code-block after">
            <div className="code-header">
              <span className="status-indicator after">✅ Después</span>
              <span className="performance-badge fast">Optimizado</span>
            </div>
            <pre>
              <code>{currentExample.after}</code>
            </pre>
          </div>
        </div>

        <div className="improvements-summary">
          <h5>🚀 Mejoras Implementadas</h5>
          <ul>
            {currentExample.improvements.map((improvement, index) => (
              <li key={index}>{improvement}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const PerformanceMonitoring = ({ isActive }) => {
  const [metrics, setMetrics] = useState({
    responseTime: 0,
    throughput: 0,
    errorRate: 0,
    memoryUsage: 0,
    cacheHitRate: 0,
    queueSize: 0
  });

  const [alerts, setAlerts] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const newMetrics = {
        responseTime: 50 + Math.sin(Date.now() / 10000) * 30 + Math.random() * 20,
        throughput: 2000 + Math.cos(Date.now() / 8000) * 500 + Math.random() * 100,
        errorRate: Math.max(0, 0.5 + Math.sin(Date.now() / 15000) * 0.3 + Math.random() * 0.2),
        memoryUsage: 45 + Math.sin(Date.now() / 12000) * 15 + Math.random() * 5,
        cacheHitRate: 85 + Math.cos(Date.now() / 9000) * 10 + Math.random() * 3,
        queueSize: Math.max(0, 10 + Math.sin(Date.now() / 7000) * 8 + Math.random() * 5)
      };

      setMetrics(newMetrics);

      // Generar alertas basadas en umbrales
      const newAlerts = [];
      if (newMetrics.responseTime > 100) {
        newAlerts.push({
          id: Date.now() + Math.random(),
          type: 'warning',
          message: `Alta latencia detectada: ${newMetrics.responseTime.toFixed(1)}ms`,
          timestamp: new Date(),
          severity: newMetrics.responseTime > 150 ? 'high' : 'medium'
        });
      }

      if (newMetrics.errorRate > 1) {
        newAlerts.push({
          id: Date.now() + Math.random() + 1,
          type: 'error',
          message: `Tasa de error elevada: ${newMetrics.errorRate.toFixed(2)}%`,
          timestamp: new Date(),
          severity: 'high'
        });
      }

      if (newMetrics.memoryUsage > 80) {
        newAlerts.push({
          id: Date.now() + Math.random() + 2,
          type: 'warning',
          message: `Uso de memoria alto: ${newMetrics.memoryUsage.toFixed(1)}%`,
          timestamp: new Date(),
          severity: 'medium'
        });
      }

      if (newAlerts.length > 0) {
        setAlerts(prev => [...newAlerts, ...prev.slice(0, 4)]);
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const getMetricStatus = (value, thresholds) => {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.warning) return 'warning';
    return 'critical';
  };

  const thresholds = {
    responseTime: { good: 50, warning: 100 },
    throughput: { good: 2000, warning: 1500 },
    errorRate: { good: 0.5, warning: 1 },
    memoryUsage: { good: 60, warning: 80 },
    cacheHitRate: { good: 90, warning: 80 },
    queueSize: { good: 5, warning: 15 }
  };

  return (
    <div className="performance-monitoring">
      <div className="monitoring-header">
        <h3>📊 Monitoreo en Tiempo Real</h3>
        <p>Dashboard de métricas clave para sistemas de memoria en producción</p>
      </div>

      <div className="metrics-grid">
        <div className={`metric-card ${getMetricStatus(metrics.responseTime, thresholds.responseTime)}`}>
          <div className="metric-header">
            <span className="metric-icon">⚡</span>
            <span className="metric-name">Tiempo de Respuesta</span>
          </div>
          <div className="metric-value">
            {metrics.responseTime.toFixed(1)}
            <span className="metric-unit">ms</span>
          </div>
          <div className="metric-change">
            <span className="change-indicator">↓ 15%</span>
            <span className="change-text">vs último período</span>
          </div>
        </div>

        <div className={`metric-card ${getMetricStatus(metrics.throughput, thresholds.throughput)}`}>
          <div className="metric-header">
            <span className="metric-icon">🚀</span>
            <span className="metric-name">Throughput</span>
          </div>
          <div className="metric-value">
            {Math.round(metrics.throughput)}
            <span className="metric-unit">ops/s</span>
          </div>
          <div className="metric-change">
            <span className="change-indicator">↑ 23%</span>
            <span className="change-text">vs último período</span>
          </div>
        </div>

        <div className={`metric-card ${getMetricStatus(metrics.errorRate, thresholds.errorRate)}`}>
          <div className="metric-header">
            <span className="metric-icon">🎯</span>
            <span className="metric-name">Tasa de Error</span>
          </div>
          <div className="metric-value">
            {metrics.errorRate.toFixed(2)}
            <span className="metric-unit">%</span>
          </div>
          <div className="metric-change">
            <span className="change-indicator">↓ 8%</span>
            <span className="change-text">vs último período</span>
          </div>
        </div>

        <div className={`metric-card ${getMetricStatus(metrics.memoryUsage, thresholds.memoryUsage)}`}>
          <div className="metric-header">
            <span className="metric-icon">💾</span>
            <span className="metric-name">Uso de Memoria</span>
          </div>
          <div className="metric-value">
            {metrics.memoryUsage.toFixed(1)}
            <span className="metric-unit">%</span>
          </div>
          <div className="metric-change">
            <span className="change-indicator">↓ 35%</span>
            <span className="change-text">vs baseline</span>
          </div>
        </div>

        <div className={`metric-card ${getMetricStatus(metrics.cacheHitRate, thresholds.cacheHitRate)}`}>
          <div className="metric-header">
            <span className="metric-icon">🎪</span>
            <span className="metric-name">Cache Hit Rate</span>
          </div>
          <div className="metric-value">
            {metrics.cacheHitRate.toFixed(1)}
            <span className="metric-unit">%</span>
          </div>
          <div className="metric-change">
            <span className="change-indicator">↑ 12%</span>
            <span className="change-text">vs último período</span>
          </div>
        </div>

        <div className={`metric-card ${getMetricStatus(metrics.queueSize, thresholds.queueSize)}`}>
          <div className="metric-header">
            <span className="metric-icon">📋</span>
            <span className="metric-name">Cola de Procesamiento</span>
          </div>
          <div className="metric-value">
            {Math.round(metrics.queueSize)}
            <span className="metric-unit">items</span>
          </div>
          <div className="metric-change">
            <span className="change-indicator">↓ 42%</span>
            <span className="change-text">vs pico máximo</span>
          </div>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="alerts-panel">
          <h4>🚨 Alertas Recientes</h4>
          <div className="alerts-list">
            {alerts.map((alert) => (
              <div key={alert.id} className={`alert ${alert.type} ${alert.severity}`}>
                <div className="alert-content">
                  <span className="alert-message">{alert.message}</span>
                  <span className="alert-time">
                    {alert.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <button
                  className="alert-dismiss"
                  onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
                  aria-label="Descartar alerta"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="monitoring-recommendations">
        <h4>💡 Recomendaciones de Optimización</h4>
        <div className="recommendations-list">
          <div className="recommendation high-priority">
            <span className="priority-indicator">🔴 Alta</span>
            <span className="recommendation-text">
              Implementar circuit breaker para reducir tasa de error
            </span>
          </div>
          <div className="recommendation medium-priority">
            <span className="priority-indicator">🟡 Media</span>
            <span className="recommendation-text">
              Optimizar índices de búsqueda para mejorar throughput
            </span>
          </div>
          <div className="recommendation low-priority">
            <span className="priority-indicator">🟢 Baja</span>
            <span className="recommendation-text">
              Considerar pre-calentamiento de cache durante horas valle
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const Lesson04Optimization = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState('techniques');
  const [selectedTechnique, setSelectedTechnique] = useState('compression');
  const [activeTool, setActiveTool] = useState('performance');
  const [selectedExample, setSelectedExample] = useState('compression');

  const tabs = [
    {
      id: 'techniques',
      label: 'Técnicas de Optimización',
      icon: '🚀',
      description: 'Algoritmos y estrategias avanzadas'
    },
    {
      id: 'benchmarking',
      label: 'Benchmarking',
      icon: '🔬',
      description: 'Herramientas de medición de rendimiento'
    },
    {
      id: 'code',
      label: 'Código Optimizado',
      icon: '💻',
      description: 'Ejemplos de implementación práctica'
    },
    {
      id: 'monitoring',
      label: 'Monitoreo',
      icon: '📊',
      description: 'Métricas en tiempo real'
    }
  ];

  const handleTabClick = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  const handleKeyDown = useCallback((e, tabId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tabId);
    }
  }, []);

  return (
    <div className={`lesson04-optimization ${className}`}>
      <header className="lesson-header">
        <div className="header-content">
          <h1>🚀 Lección 4: Optimización y Performance</h1>
          <p className="lesson-description">
            Domina las técnicas avanzadas de optimización para crear sistemas de memoria 
            ultra-eficientes que escalen a nivel empresarial.
          </p>
        </div>
      </header>

      <nav className="lesson-navigation" role="tablist" aria-label="Navegación de lección">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id)}
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
          id="panel-techniques"
          className={`content-panel ${activeTab === 'techniques' ? 'active' : ''}`}
          role="tabpanel"
          aria-labelledby="tab-techniques"
          hidden={activeTab !== 'techniques'}
        >
          <OptimizationTechniques
            selectedTechnique={selectedTechnique}
            onTechniqueSelect={setSelectedTechnique}
          />
        </div>

        <div
          id="panel-benchmarking"
          className={`content-panel ${activeTab === 'benchmarking' ? 'active' : ''}`}
          role="tabpanel"
          aria-labelledby="tab-benchmarking"
          hidden={activeTab !== 'benchmarking'}
        >
          <BenchmarkingTools
            activeTool={activeTool}
            onToolChange={setActiveTool}
          />
        </div>

        <div
          id="panel-code"
          className={`content-panel ${activeTab === 'code' ? 'active' : ''}`}
          role="tabpanel"
          aria-labelledby="tab-code"
          hidden={activeTab !== 'code'}
        >
          <CodeOptimization
            selectedExample={selectedExample}
            onExampleChange={setSelectedExample}
          />
        </div>

        <div
          id="panel-monitoring"
          className={`content-panel ${activeTab === 'monitoring' ? 'active' : ''}`}
          role="tabpanel"
          aria-labelledby="tab-monitoring"
          hidden={activeTab !== 'monitoring'}
        >
          <PerformanceMonitoring isActive={activeTab === 'monitoring'} />
        </div>
      </main>

      <footer className="lesson-footer">
        <div className="footer-content">
          <div className="progress-summary">
            <h3>📈 Progreso de Optimización</h3>
            <div className="optimization-metrics">
              <div className="metric">
                <span className="metric-label">Técnicas Dominadas:</span>
                <span className="metric-value">6/6</span>
              </div>
              <div className="metric">
                <span className="metric-label">Mejora Promedio:</span>
                <span className="metric-value">65%</span>
              </div>
              <div className="metric">
                <span className="metric-label">Tiempo de Implementación:</span>
                <span className="metric-value">2-4 semanas</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

Lesson04Optimization.propTypes = {
  className: PropTypes.string
};

OptimizationTechniques.propTypes = {
  onTechniqueSelect: PropTypes.func.isRequired,
  selectedTechnique: PropTypes.string.isRequired
};

BenchmarkingTools.propTypes = {
  activeTool: PropTypes.string.isRequired,
  onToolChange: PropTypes.func.isRequired
};

CodeOptimization.propTypes = {
  selectedExample: PropTypes.string.isRequired,
  onExampleChange: PropTypes.func.isRequired
};

PerformanceMonitoring.propTypes = {
  isActive: PropTypes.bool.isRequired
};

export default Lesson04Optimization;
