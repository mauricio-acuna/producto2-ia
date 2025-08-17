// Componentes especializados para la Lección 4: Optimización y Performance
// Este archivo contiene componentes avanzados para visualización de técnicas de optimización

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

// Worker Pool para simulación de procesamiento pesado
export class WorkerPool {
  constructor(workerScript, poolSize = 4) {
    this.workerScript = workerScript;
    this.poolSize = poolSize;
    this.workers = [];
    this.taskQueue = [];
    this.activeJobs = new Map();
    this.jobCounter = 0;
    
    this.initializeWorkers();
  }
  
  initializeWorkers() {
    // Simulación de workers para el demo
    for (let i = 0; i < this.poolSize; i++) {
      this.workers.push({
        id: i,
        busy: false,
        process: this.simulateWorkerProcess.bind(this)
      });
    }
  }
  
  async simulateWorkerProcess(data) {
    // Simula procesamiento pesado con delay realista
    const delay = 100 + Math.random() * 200;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Simulación de extracción de entidades
    const entities = this.extractMockEntities(data);
    return entities;
  }
  
  extractMockEntities(text) {
    const mockEntities = [
      { type: 'PERSON', text: 'usuario', confidence: 0.95 },
      { type: 'ORG', text: 'empresa', confidence: 0.87 },
      { type: 'LOCATION', text: 'oficina', confidence: 0.82 },
      { type: 'PRODUCT', text: 'sistema', confidence: 0.91 }
    ];
    
    return mockEntities.filter(() => Math.random() > 0.3);
  }
  
  async extract(text) {
    return new Promise((resolve, reject) => {
      const jobId = ++this.jobCounter;
      const job = { id: jobId, text, resolve, reject };
      
      const availableWorker = this.workers.find(w => !w.busy);
      
      if (availableWorker) {
        this.executeJob(availableWorker, job);
      } else {
        this.taskQueue.push(job);
      }
    });
  }
  
  async executeJob(worker, job) {
    worker.busy = true;
    this.activeJobs.set(job.id, worker);
    
    try {
      const result = await worker.process(job.text);
      job.resolve(result);
    } catch (error) {
      job.reject(error);
    } finally {
      worker.busy = false;
      this.activeJobs.delete(job.id);
      
      // Procesar próximo trabajo en cola
      if (this.taskQueue.length > 0) {
        const nextJob = this.taskQueue.shift();
        this.executeJob(worker, nextJob);
      }
    }
  }
}

// LRU Cache implementation
export class LRUCache {
  constructor(maxSize = 1000) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }
  
  get(key) {
    if (this.cache.has(key)) {
      // Mover al final (más reciente)
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return null;
  }
  
  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Eliminar el más antiguo (primer elemento)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, value);
  }
  
  has(key) {
    return this.cache.has(key);
  }
  
  size() {
    return this.cache.size;
  }
  
  clear() {
    this.cache.clear();
  }
}

// Sliding Window para procesamiento incremental
export class SlidingWindow {
  constructor(size = 50) {
    this.size = size;
    this.window = [];
    this.lastSummaryIndex = 0;
  }
  
  add(item) {
    this.window.push({
      ...item,
      index: this.window.length,
      timestamp: Date.now()
    });
    
    if (this.window.length > this.size) {
      this.window.shift();
      this.lastSummaryIndex = Math.max(0, this.lastSummaryIndex - 1);
    }
  }
  
  getNewMessages() {
    return this.window.slice(this.lastSummaryIndex);
  }
  
  getLastSummary() {
    return this.lastSummary || null;
  }
  
  shouldUpdate() {
    const newMessageCount = this.window.length - this.lastSummaryIndex;
    return newMessageCount >= 10 || 
           (newMessageCount > 0 && Date.now() - this.lastUpdateTime > 30000);
  }
  
  markSummaryUpdated(summary) {
    this.lastSummary = summary;
    this.lastSummaryIndex = this.window.length;
    this.lastUpdateTime = Date.now();
  }
}

// Search Index para búsquedas optimizadas
export class SearchIndex {
  constructor() {
    this.documents = new Map();
    this.invertedIndex = new Map();
    this.embeddings = new Map();
  }
  
  addDocument(id, content) {
    this.documents.set(id, content);
    
    // Indexación simple por palabras
    const words = content.toLowerCase().split(/\W+/);
    words.forEach(word => {
      if (word.length > 2) {
        if (!this.invertedIndex.has(word)) {
          this.invertedIndex.set(word, new Set());
        }
        this.invertedIndex.get(word).add(id);
      }
    });
    
    // Simular embedding
    this.embeddings.set(id, this.generateMockEmbedding(content));
  }
  
  generateMockEmbedding(text) {
    // Simulación de embedding de 512 dimensiones
    const embedding = new Array(512);
    for (let i = 0; i < 512; i++) {
      embedding[i] = (Math.random() - 0.5) * 2;
    }
    return embedding;
  }
  
  search(query, options = {}) {
    const words = query.toLowerCase().split(/\W+/);
    const candidates = new Set();
    
    words.forEach(word => {
      if (this.invertedIndex.has(word)) {
        this.invertedIndex.get(word).forEach(id => candidates.add(id));
      }
    });
    
    const results = Array.from(candidates).map(id => ({
      id,
      content: this.documents.get(id),
      score: this.calculateScore(id, query)
    }));
    
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, options.limit || 10);
  }
  
  calculateScore(documentId, query) {
    const content = this.documents.get(documentId);
    const queryWords = query.toLowerCase().split(/\W+/);
    let score = 0;
    
    queryWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      const matches = (content.match(regex) || []).length;
      score += matches / content.length;
    });
    
    return score;
  }
}

// Queue para procesamiento asíncrono
export class Queue {
  constructor() {
    this.items = [];
    this.processing = false;
  }
  
  enqueue(item) {
    this.items.push(item);
    if (!this.processing) {
      this.process();
    }
  }
  
  dequeue() {
    return this.items.shift();
  }
  
  async process() {
    this.processing = true;
    
    while (this.items.length > 0) {
      const item = this.dequeue();
      if (item && typeof item.process === 'function') {
        try {
          await item.process();
        } catch (error) {
          console.error('Error procesando item de cola:', error);
        }
      }
    }
    
    this.processing = false;
  }
  
  size() {
    return this.items.length;
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}

// Componente de visualización de métricas en tiempo real
export const RealTimeChart = ({ data, width = 400, height = 200, color = '#3b82f6' }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio || 1;
    
    // Configurar canvas para alta resolución
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(pixelRatio, pixelRatio);
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);
    
    if (!data || data.length === 0) return;
    
    // Calcular escalas
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;
    
    // Dibujar grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Líneas horizontales
    for (let i = 0; i <= 4; i++) {
      const y = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Dibujar línea de datos
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((value, index) => {
      const x = (width / (data.length - 1)) * index;
      const y = height - ((value - minValue) / range) * height;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Área bajo la curva
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, height);
    
    data.forEach((value, index) => {
      const x = (width / (data.length - 1)) * index;
      const y = height - ((value - minValue) / range) * height;
      ctx.lineTo(x, y);
    });
    
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    
  }, [data, width, height, color]);
  
  return (
    <canvas
      ref={canvasRef}
      className="performance-chart"
      aria-label="Gráfico de rendimiento en tiempo real"
    />
  );
};

RealTimeChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string
};

// Componente de benchmark comparativo
export const BenchmarkComparison = ({ baselines, optimized, labels }) => {
  const maxValue = Math.max(
    ...baselines,
    ...optimized
  );
  
  return (
    <div className="benchmark-comparison">
      {labels.map((label, index) => {
        const baselineValue = baselines[index];
        const optimizedValue = optimized[index];
        const improvement = ((baselineValue - optimizedValue) / baselineValue * 100).toFixed(1);
        
        return (
          <div key={label} className="benchmark-item">
            <div className="benchmark-label">{label}</div>
            <div className="benchmark-bars">
              <div className="bar-group">
                <div className="bar baseline">
                  <div 
                    className="bar-fill"
                    style={{ width: `${(baselineValue / maxValue) * 100}%` }}
                  >
                    <span className="bar-value">{baselineValue}</span>
                  </div>
                </div>
                <div className="bar optimized">
                  <div 
                    className="bar-fill"
                    style={{ width: `${(optimizedValue / maxValue) * 100}%` }}
                  >
                    <span className="bar-value">{optimizedValue}</span>
                  </div>
                </div>
              </div>
              <div className={`improvement ${improvement > 0 ? 'positive' : 'negative'}`}>
                {improvement > 0 ? '↓' : '↑'} {Math.abs(improvement)}%
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

BenchmarkComparison.propTypes = {
  baselines: PropTypes.arrayOf(PropTypes.number).isRequired,
  optimized: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired
};

// Componente de algoritmo de compresión visual
export const CompressionVisualization = ({ text, compressionRatio = 0.6 }) => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressed, setCompressed] = useState(false);
  
  const originalSize = text.length;
  const compressedSize = Math.round(originalSize * compressionRatio);
  
  const handleCompress = useCallback(() => {
    setIsCompressing(true);
    
    setTimeout(() => {
      setCompressed(true);
      setIsCompressing(false);
    }, 2000);
  }, []);
  
  const handleDecompress = useCallback(() => {
    setCompressed(false);
  }, []);
  
  return (
    <div className="compression-visualization">
      <div className="compression-controls">
        <button 
          onClick={compressed ? handleDecompress : handleCompress}
          disabled={isCompressing}
          className="compression-btn"
        >
          {isCompressing ? '⏳ Comprimiendo...' : compressed ? '📤 Descomprimir' : '🗜️ Comprimir'}
        </button>
      </div>
      
      <div className="compression-display">
        <div className="data-block original">
          <div className="block-header">
            <span className="block-title">📄 Original</span>
            <span className="block-size">{originalSize} bytes</span>
          </div>
          <div className="block-content">
            {compressed ? (
              <div className="compressed-preview">
                Datos comprimidos (no legibles directamente)
              </div>
            ) : (
              <div className="original-text">{text.substring(0, 200)}...</div>
            )}
          </div>
        </div>
        
        {isCompressing && (
          <div className="compression-process">
            <div className="process-arrow">➡️</div>
            <div className="process-status">
              <div className="spinner"></div>
              <span>Aplicando algoritmo de compresión...</span>
            </div>
          </div>
        )}
        
        {compressed && (
          <div className="data-block compressed">
            <div className="block-header">
              <span className="block-title">🗜️ Comprimido</span>
              <span className="block-size">{compressedSize} bytes</span>
            </div>
            <div className="block-content">
              <div className="compressed-data">
                {Array.from({ length: 20 }, (_, i) => (
                  <span key={i} className="hex-byte">
                    {Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}
                  </span>
                ))}
                <span className="ellipsis">...</span>
              </div>
            </div>
            <div className="compression-ratio">
              Ratio: {((1 - compressionRatio) * 100).toFixed(1)}% de ahorro
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

CompressionVisualization.propTypes = {
  text: PropTypes.string.isRequired,
  compressionRatio: PropTypes.number
};

// Componente de cache hit/miss visualization
export const CacheVisualization = ({ requests = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cacheState, setCacheState] = useState(new Map());
  const [isPlaying, setIsPlaying] = useState(false);
  
  const hitRate = useMemo(() => {
    const hits = requests.slice(0, currentIndex + 1).filter(req => 
      cacheState.has(req.key)
    ).length;
    return currentIndex > 0 ? (hits / (currentIndex + 1) * 100).toFixed(1) : 0;
  }, [requests, currentIndex, cacheState]);
  
  const playSimulation = useCallback(() => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setCurrentIndex(0);
    setCacheState(new Map());
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= requests.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        
        const request = requests[prev + 1];
        setCacheState(cache => {
          const newCache = new Map(cache);
          if (!newCache.has(request.key)) {
            newCache.set(request.key, request.value);
            
            // Simular LRU eviction
            if (newCache.size > 5) {
              const firstKey = newCache.keys().next().value;
              newCache.delete(firstKey);
            }
          }
          return newCache;
        });
        
        return prev + 1;
      });
    }, 800);
    
    return () => clearInterval(interval);
  }, [requests, isPlaying]);
  
  const currentRequest = requests[currentIndex];
  const isHit = currentRequest && cacheState.has(currentRequest.key);
  
  return (
    <div className="cache-visualization">
      <div className="cache-controls">
        <button 
          onClick={playSimulation}
          disabled={isPlaying}
          className="play-btn"
        >
          {isPlaying ? '⏸️ Pausar' : '▶️ Reproducir Simulación'}
        </button>
        <div className="cache-stats">
          <span className="stat">
            Solicitud: {currentIndex + 1}/{requests.length}
          </span>
          <span className="stat">
            Hit Rate: {hitRate}%
          </span>
        </div>
      </div>
      
      <div className="cache-display">
        <div className="request-panel">
          <h4>📥 Solicitud Actual</h4>
          {currentRequest && (
            <div className={`request-item ${isHit ? 'hit' : 'miss'}`}>
              <span className="request-key">Clave: {currentRequest.key}</span>
              <span className={`request-status ${isHit ? 'hit' : 'miss'}`}>
                {isHit ? '✅ HIT' : '❌ MISS'}
              </span>
            </div>
          )}
        </div>
        
        <div className="cache-panel">
          <h4>💾 Estado del Cache</h4>
          <div className="cache-items">
            {Array.from(cacheState.entries()).map(([key, value]) => (
              <div key={key} className={`cache-item ${currentRequest?.key === key ? 'active' : ''}`}>
                <span className="cache-key">{key}</span>
                <span className="cache-value">{value}</span>
              </div>
            ))}
            {cacheState.size === 0 && (
              <div className="empty-cache">Cache vacío</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

CacheVisualization.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }))
};

// Componente de loading states
export const LoadingSpinner = ({ size = 'medium', color = '#3b82f6' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8', 
    large: 'w-12 h-12'
  };
  
  return (
    <div 
      className={`loading-spinner ${sizeClasses[size]}`}
      style={{ borderTopColor: color }}
      role="status"
      aria-label="Cargando..."
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.string
};

export default {
  WorkerPool,
  LRUCache,
  SlidingWindow,
  SearchIndex,
  Queue,
  RealTimeChart,
  BenchmarkComparison,
  CompressionVisualization,
  CacheVisualization,
  LoadingSpinner
};
