import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * MemoryArchitecture - Interactive diagram showing memory system architecture
 * 
 * Displays a comprehensive view of memory system components and their relationships
 */
export const MemoryArchitecture = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const architectureComponents = [
    {
      id: 'input-layer',
      title: 'Capa de Entrada',
      description: 'Procesa y normaliza datos de entrada',
      features: ['Validación de entrada', 'Normalización de texto', 'Extracción de metadatos'],
      connections: ['processing-layer'],
      position: { x: 10, y: 20 },
      color: '#3498db'
    },
    {
      id: 'processing-layer',
      title: 'Capa de Procesamiento',
      description: 'Analiza contenido y extrae información relevante',
      features: ['Extracción de entidades', 'Análisis de temas', 'Cálculo de importancia'],
      connections: ['storage-layer', 'indexing-layer'],
      position: { x: 10, y: 40 },
      color: '#e74c3c'
    },
    {
      id: 'storage-layer',
      title: 'Capa de Almacenamiento',
      description: 'Gestiona persistencia y organización de datos',
      features: ['Buffer circular', 'Almacenamiento persistente', 'Compresión de datos'],
      connections: ['retrieval-layer'],
      position: { x: 50, y: 40 },
      color: '#27ae60'
    },
    {
      id: 'indexing-layer',
      title: 'Capa de Indexación',
      description: 'Crea índices para búsqueda eficiente',
      features: ['Índices invertidos', 'Embeddings vectoriales', 'Índices temporales'],
      connections: ['retrieval-layer'],
      position: { x: 30, y: 60 },
      color: '#f39c12'
    },
    {
      id: 'retrieval-layer',
      title: 'Capa de Recuperación',
      description: 'Busca y recupera información relevante',
      features: ['Búsqueda semántica', 'Filtrado por relevancia', 'Ranking de resultados'],
      connections: ['output-layer'],
      position: { x: 70, y: 60 },
      color: '#9b59b6'
    },
    {
      id: 'output-layer',
      title: 'Capa de Salida',
      description: 'Formatea y entrega resultados finales',
      features: ['Formateo de respuestas', 'Agregación de contexto', 'Optimización de salida'],
      connections: [],
      position: { x: 90, y: 40 },
      color: '#1abc9c'
    }
  ];

  const handleComponentClick = (componentId) => {
    setSelectedComponent(componentId === selectedComponent ? null : componentId);
  };

  const getComponentById = (id) => {
    return architectureComponents.find(comp => comp.id === id);
  };

  return (
    <div className="memory-architecture">
      <div className="architecture-diagram">
        <svg 
          viewBox="0 0 100 80" 
          className="architecture-svg"
          role="img"
          aria-labelledby="architecture-title"
        >
          <title id="architecture-title">Diagrama de Arquitectura de Sistema de Memoria</title>
          
          {/* Connection lines */}
          {architectureComponents.map(component => 
            component.connections.map(connectionId => {
              const target = getComponentById(connectionId);
              if (!target) return null;
              
              return (
                <line
                  key={`${component.id}-${connectionId}`}
                  x1={component.position.x + 5}
                  y1={component.position.y + 2}
                  x2={target.position.x + 5}
                  y2={target.position.y + 2}
                  stroke="#7f8c8d"
                  strokeWidth="0.3"
                  strokeDasharray="0.5,0.5"
                />
              );
            })
          )}
          
          {/* Component boxes */}
          {architectureComponents.map(component => (
            <g key={component.id}>
              <rect
                x={component.position.x}
                y={component.position.y}
                width="10"
                height="4"
                fill={selectedComponent === component.id ? component.color : '#ecf0f1'}
                stroke={component.color}
                strokeWidth="0.2"
                rx="0.5"
                className="component-box clickable"
                onClick={() => handleComponentClick(component.id)}
                style={{ cursor: 'pointer' }}
              />
              <text
                x={component.position.x + 5}
                y={component.position.y + 2.5}
                textAnchor="middle"
                fontSize="1.2"
                fill={selectedComponent === component.id ? 'white' : '#2c3e50'}
                className="component-label"
                style={{ pointerEvents: 'none' }}
              >
                {component.title}
              </text>
            </g>
          ))}
        </svg>
      </div>
      
      <div className="architecture-details">
        <h3>🔍 Detalles de Componentes</h3>
        {selectedComponent ? (
          <div className="component-detail">
            {(() => {
              const component = getComponentById(selectedComponent);
              return (
                <div className="detail-card" style={{ borderLeftColor: component.color }}>
                  <h4 style={{ color: component.color }}>{component.title}</h4>
                  <p>{component.description}</p>
                  
                  <div className="component-features">
                    <h5>Características principales:</h5>
                    <ul>
                      {component.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {component.connections.length > 0 && (
                    <div className="component-connections">
                      <h5>Se conecta con:</h5>
                      <div className="connections-list">
                        {component.connections.map(connectionId => {
                          const connectedComponent = getComponentById(connectionId);
                          return (
                            <span 
                              key={connectionId}
                              className="connection-tag"
                              style={{ backgroundColor: connectedComponent.color }}
                            >
                              {connectedComponent.title}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="no-selection">
            <p>👆 Haz clic en cualquier componente del diagrama para ver sus detalles</p>
          </div>
        )}
      </div>
      
      <div className="architecture-flow">
        <h3>🔄 Flujo de Información</h3>
        <div className="flow-steps">
          <div className="flow-step">
            <span className="step-number">1</span>
            <div className="step-content">
              <h4>Entrada de Datos</h4>
              <p>Los datos llegan a la capa de entrada donde son validados y normalizados</p>
            </div>
          </div>
          <div className="flow-step">
            <span className="step-number">2</span>
            <div className="step-content">
              <h4>Procesamiento</h4>
              <p>Se extraen entidades, temas y se calcula la importancia del contenido</p>
            </div>
          </div>
          <div className="flow-step">
            <span className="step-number">3</span>
            <div className="step-content">
              <h4>Almacenamiento e Indexación</h4>
              <p>Los datos se almacenan y se crean índices para búsqueda eficiente</p>
            </div>
          </div>
          <div className="flow-step">
            <span className="step-number">4</span>
            <div className="step-content">
              <h4>Recuperación</h4>
              <p>Se busca y recupera información relevante basada en consultas</p>
            </div>
          </div>
          <div className="flow-step">
            <span className="step-number">5</span>
            <div className="step-content">
              <h4>Salida</h4>
              <p>Los resultados se formatean y entregan al usuario o sistema</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * CodeImplementation - Interactive code examples and explanations
 * 
 * Shows real implementation code with syntax highlighting and explanations
 */
export const CodeImplementation = () => {
  const [activeExample, setActiveExample] = useState('message-class');

  const codeExamples = [
    {
      id: 'message-class',
      title: 'Clase ConversationMessage',
      description: 'Estructura básica para representar mensajes en memoria',
      language: 'python',
      code: `class ConversationMessage:
    """Representa un mensaje en la conversación con metadatos enriquecidos"""
    
    def __init__(self, role: str, content: str, metadata: Dict[str, Any] = None):
        self.role = role  # 'user', 'assistant', 'system'
        self.content = content
        self.timestamp = datetime.now()
        self.metadata = metadata or {}
        self.importance_score = 1.0  # 0.0 - 1.0
        self.entity_mentions = set()
        self.topics = set()
    
    def to_dict(self) -> Dict[str, Any]:
        """Convierte el mensaje a diccionario para serialización"""
        return {
            "role": self.role,
            "content": self.content,
            "timestamp": self.timestamp.isoformat(),
            "metadata": self.metadata,
            "importance_score": self.importance_score,
            "entity_mentions": list(self.entity_mentions),
            "topics": list(self.topics)
        }
    
    def calculate_age_factor(self) -> float:
        """Calcula factor de envejecimiento basado en timestamp"""
        age_seconds = (datetime.now() - self.timestamp).total_seconds()
        age_hours = age_seconds / 3600
        return max(0.1, 1.0 - (age_hours / 24))  # Decay over 24 hours`,
      explanation: [
        'La clase ConversationMessage encapsula toda la información de un mensaje',
        'Incluye metadatos automáticos como timestamp y puntuación de importancia',
        'Los métodos to_dict() y calculate_age_factor() facilitan serialización y gestión temporal'
      ]
    },
    {
      id: 'memory-manager',
      title: 'Gestor de Memoria Principal',
      description: 'Implementación del sistema de gestión de memoria de corto plazo',
      language: 'python',
      code: `class ShortTermMemory:
    """Sistema de memoria de corto plazo optimizado para velocidad y relevancia"""
    
    def __init__(self, max_messages: int = 50, max_age_hours: int = 2):
        self.max_messages = max_messages
        self.max_age = timedelta(hours=max_age_hours)
        
        # Estructuras de datos optimizadas
        self.conversation_history = deque(maxlen=max_messages)
        self.entity_index = defaultdict(list)  # entidad -> [message_indices]
        self.topic_index = defaultdict(list)   # topic -> [message_indices]
        self.importance_heap = []              # heap para mensajes más importantes
        
        # Caches para acelerar consultas frecuentes
        self._recent_cache = {}
        self._context_cache = {}
        self._cache_ttl = 300  # 5 minutos
    
    def add_message(self, role: str, content: str, metadata: Dict = None) -> ConversationMessage:
        """Agregar mensaje con procesamiento automático optimizado"""
        message = ConversationMessage(role, content, metadata)
        
        # Procesamiento paralelo de características
        self._extract_features(message)
        self._calculate_importance(message)
        
        # Almacenamiento eficiente
        message_index = len(self.conversation_history)
        self.conversation_history.append(message)
        
        # Actualización de índices
        self._update_indices(message, message_index)
        
        # Limpieza automática
        if len(self.conversation_history) >= self.max_messages * 0.9:
            self._cleanup_old_data()
        
        # Invalidar caches afectados
        self._invalidate_caches()
        
        return message`,
      explanation: [
        'Utiliza deque para buffer circular con límite automático de tamaño',
        'Mantiene índices separados para entidades y temas para búsqueda O(1)',
        'Implementa sistema de cache con TTL para acelerar consultas repetidas',
        'Limpieza automática cuando se acerca al límite de capacidad'
      ]
    },
    {
      id: 'search-algorithm',
      title: 'Algoritmo de Búsqueda Semántica',
      description: 'Implementación de búsqueda inteligente con ranking de relevancia',
      language: 'python',
      code: `def search_relevant_context(self, query: str, max_results: int = 5) -> List[Dict]:
    """Búsqueda semántica optimizada con múltiples estrategias de ranking"""
    
    # Cache check first
    cache_key = f"search:{hash(query)}:{max_results}"
    if cache_key in self._context_cache:
        cache_entry = self._context_cache[cache_key]
        if time.time() - cache_entry['timestamp'] < self._cache_ttl:
            return cache_entry['results']
    
    # Extracción de características de la consulta
    query_entities = self._extract_entities(query)
    query_topics = self._extract_topics(query)
    query_embedding = self._get_embedding(query)  # Vector semántico
    
    scored_messages = []
    
    for idx, message in enumerate(self.conversation_history):
        relevance_score = 0.0
        
        # 1. Similitud por entidades (peso: 30%)
        entity_overlap = query_entities.intersection(message.entity_mentions)
        entity_score = len(entity_overlap) / max(len(query_entities), 1)
        relevance_score += entity_score * 0.3
        
        # 2. Similitud por temas (peso: 25%)
        topic_overlap = query_topics.intersection(message.topics)
        topic_score = len(topic_overlap) / max(len(query_topics), 1)
        relevance_score += topic_score * 0.25
        
        # 3. Similitud semántica vectorial (peso: 35%)
        message_embedding = self._get_embedding(message.content)
        semantic_score = self._cosine_similarity(query_embedding, message_embedding)
        relevance_score += semantic_score * 0.35
        
        # 4. Factor de importancia y recencia (peso: 10%)
        temporal_factor = message.calculate_age_factor()
        importance_factor = message.importance_score
        meta_score = (temporal_factor + importance_factor) / 2
        relevance_score += meta_score * 0.1
        
        if relevance_score > 0.1:  # Threshold mínimo
            scored_messages.append({
                'message': message,
                'relevance_score': relevance_score,
                'components': {
                    'entity': entity_score,
                    'topic': topic_score,
                    'semantic': semantic_score,
                    'meta': meta_score
                }
            })
    
    # Ordenar por relevancia y retornar top results
    scored_messages.sort(key=lambda x: x['relevance_score'], reverse=True)
    results = scored_messages[:max_results]
    
    # Cache results
    self._context_cache[cache_key] = {
        'results': results,
        'timestamp': time.time()
    }
    
    return results`,
      explanation: [
        'Combina múltiples estrategias: entidades, temas, similitud semántica y metadatos',
        'Utiliza embeddings vectoriales para capturar similitud semántica profunda',
        'Implementa sistema de pesos balanceado para diferentes tipos de relevancia',
        'Cache inteligente con TTL para evitar recálculos innecesarios'
      ]
    },
    {
      id: 'optimization',
      title: 'Optimizaciones de Rendimiento',
      description: 'Técnicas avanzadas para mejorar velocidad y eficiencia',
      language: 'python',
      code: `class MemoryOptimizer:
    """Optimizaciones avanzadas para sistemas de memoria de alto rendimiento"""
    
    def __init__(self, memory_system):
        self.memory = memory_system
        self.metrics = PerformanceMetrics()
        
    @lru_cache(maxsize=1000)
    def get_embedding_cached(self, text: str) -> np.ndarray:
        """Cache de embeddings con LRU para evitar recálculos"""
        return self._compute_embedding(text)
    
    async def batch_process_messages(self, messages: List[Dict]) -> List[ConversationMessage]:
        """Procesamiento en lotes para mejor throughput"""
        
        # Separar por tipo de procesamiento
        text_batch = [msg['content'] for msg in messages]
        
        # Procesamiento paralelo de embeddings
        embeddings = await self._batch_compute_embeddings(text_batch)
        
        # Procesamiento paralelo de entidades
        entities_batch = await self._batch_extract_entities(text_batch)
        
        # Procesamiento paralelo de temas
        topics_batch = await self._batch_extract_topics(text_batch)
        
        # Ensamblar resultados
        processed_messages = []
        for i, msg_data in enumerate(messages):
            message = ConversationMessage(
                msg_data['role'], 
                msg_data['content'], 
                msg_data.get('metadata')
            )
            message.embedding = embeddings[i]
            message.entity_mentions = entities_batch[i]
            message.topics = topics_batch[i]
            processed_messages.append(message)
        
        return processed_messages
    
    def compress_old_messages(self, age_threshold_hours: int = 24):
        """Compresión inteligente de mensajes antiguos"""
        
        current_time = datetime.now()
        compressed_count = 0
        
        for message in self.memory.conversation_history:
            age_hours = (current_time - message.timestamp).total_seconds() / 3600
            
            if age_hours > age_threshold_hours and not message.metadata.get('compressed'):
                # Comprimir contenido manteniendo información clave
                compressed_content = self._extract_key_information(message.content)
                
                # Mantener entidades y temas importantes
                important_entities = self._filter_important_entities(message.entity_mentions)
                important_topics = self._filter_important_topics(message.topics)
                
                # Actualizar mensaje comprimido
                message.content = compressed_content
                message.entity_mentions = important_entities
                message.topics = important_topics
                message.metadata['compressed'] = True
                message.metadata['original_length'] = len(message.content)
                
                compressed_count += 1
        
        return compressed_count
    
    def optimize_indices(self):
        """Optimización periódica de índices para mejor rendimiento"""
        
        # Reconstruir índices fragmentados
        self.memory._rebuild_entity_index()
        self.memory._rebuild_topic_index()
        
        # Limpiar entradas obsoletas
        self.memory._cleanup_stale_cache_entries()
        
        # Rebalancear heap de importancia
        heapq.heapify(self.memory.importance_heap)
        
        # Actualizar estadísticas de uso
        self._update_access_patterns()`,
      explanation: [
        'LRU cache para embeddings evita recálculos costosos',
        'Procesamiento en lotes reduce overhead de llamadas individuales',
        'Compresión inteligente mantiene información clave mientras reduce memoria',
        'Optimización periódica de índices mantiene rendimiento constante'
      ]
    }
  ];

  const activeCode = codeExamples.find(ex => ex.id === activeExample);

  return (
    <div className="code-implementation">
      <div className="code-navigation">
        <h3>📚 Ejemplos de Implementación</h3>
        <div className="code-tabs">
          {codeExamples.map(example => (
            <button
              key={example.id}
              className={`code-tab ${activeExample === example.id ? 'active' : ''}`}
              onClick={() => setActiveExample(example.id)}
            >
              {example.title}
            </button>
          ))}
        </div>
      </div>
      
      <div className="code-content">
        <div className="code-header">
          <h4>{activeCode.title}</h4>
          <p>{activeCode.description}</p>
        </div>
        
        <div className="code-block">
          <div className="code-meta">
            <span className="language-tag">{activeCode.language}</span>
            <button className="copy-button" title="Copiar código">
              📋 Copiar
            </button>
          </div>
          <pre className="code-pre">
            <code className={`language-${activeCode.language}`}>
              {activeCode.code}
            </code>
          </pre>
        </div>
        
        <div className="code-explanation">
          <h5>💡 Puntos Clave:</h5>
          <ul>
            {activeCode.explanation.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/**
 * LiveDemo - Interactive demonstration of memory system
 * 
 * Allows users to interact with a working memory system
 */
export const LiveDemo = () => {
  const [messages, setMessages] = useState([
    { role: 'user', content: 'Hola, me llamo María y soy desarrolladora', timestamp: new Date() },
    { role: 'assistant', content: 'Hola María, encantado de conocerte. ¿En qué tecnologías trabajas?', timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [memoryStats, setMemoryStats] = useState({
    totalMessages: 2,
    entities: ['María', 'desarrolladora'],
    topics: ['tecnología', 'trabajo'],
    memoryUsage: '15.2 KB'
  });

  // Simulated memory system methods
  const addMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      role: 'user',
      content: newMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, message]);
    
    // Simulate entity and topic extraction
    const entities = extractEntities(newMessage);
    const topics = extractTopics(newMessage);
    
    setMemoryStats(prev => ({
      totalMessages: prev.totalMessages + 1,
      entities: [...new Set([...prev.entities, ...entities])],
      topics: [...new Set([...prev.topics, ...topics])],
      memoryUsage: `${(prev.totalMessages + 1) * 8.5}KB`
    }));
    
    setNewMessage('');
  };

  const searchMemory = () => {
    if (!searchQuery.trim()) return;
    
    // Simulate search algorithm
    const results = messages.filter(msg => 
      msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      extractEntities(msg.content).some(entity => 
        entity.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ).map(msg => ({
      ...msg,
      relevanceScore: Math.random() * 0.8 + 0.2 // Simulate scoring
    }));
    
    setSearchResults(results);
  };

  // Helper functions (simplified)
  const extractEntities = (text) => {
    const words = text.split(' ');
    return words.filter(word => 
      word.charAt(0) === word.charAt(0).toUpperCase() && word.length > 2
    );
  };

  const extractTopics = (text) => {
    const topicKeywords = {
      'tecnología': ['desarrollo', 'código', 'programación', 'software'],
      'trabajo': ['proyecto', 'equipo', 'empresa', 'oficina'],
      'personal': ['familia', 'casa', 'hobby', 'vacaciones']
    };
    
    const detected = [];
    const textLower = text.toLowerCase();
    
    Object.entries(topicKeywords).forEach(([topic, keywords]) => {
      if (keywords.some(keyword => textLower.includes(keyword))) {
        detected.push(topic);
      }
    });
    
    return detected;
  };

  return (
    <div className="live-demo">
      <div className="demo-container">
        <div className="demo-section conversation-section">
          <h3>💬 Conversación Activa</h3>
          <div className="conversation-display">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.role}-message`}>
                <div className="message-header">
                  <strong>{message.role === 'user' ? 'Usuario' : 'Asistente'}</strong>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="message-content">{message.content}</div>
              </div>
            ))}
          </div>
          
          <div className="message-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              onKeyPress={(e) => e.key === 'Enter' && addMessage()}
            />
            <button onClick={addMessage} disabled={!newMessage.trim()}>
              Enviar
            </button>
          </div>
        </div>
        
        <div className="demo-section search-section">
          <h3>🔍 Búsqueda en Memoria</h3>
          <div className="search-input">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en la memoria..."
              onKeyPress={(e) => e.key === 'Enter' && searchMemory()}
            />
            <button onClick={searchMemory} disabled={!searchQuery.trim()}>
              Buscar
            </button>
          </div>
          
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div key={index} className="search-result">
                  <div className="result-header">
                    <span className="result-role">{result.role}</span>
                    <span className="result-score">
                      Relevancia: {(result.relevanceScore * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="result-content">{result.content}</div>
                </div>
              ))
            ) : searchQuery ? (
              <p>No se encontraron resultados para "{searchQuery}"</p>
            ) : (
              <p>Ingresa una consulta para buscar en la memoria</p>
            )}
          </div>
        </div>
        
        <div className="demo-section stats-section">
          <h3>📊 Estadísticas de Memoria</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{memoryStats.totalMessages}</div>
              <div className="stat-label">Mensajes Totales</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{memoryStats.entities.length}</div>
              <div className="stat-label">Entidades Activas</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{memoryStats.topics.length}</div>
              <div className="stat-label">Temas Detectados</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{memoryStats.memoryUsage}</div>
              <div className="stat-label">Uso de Memoria</div>
            </div>
          </div>
          
          <div className="entities-display">
            <h4>🏷️ Entidades Reconocidas</h4>
            <div className="entities-list">
              {memoryStats.entities.map((entity, index) => (
                <span key={index} className="entity-tag">{entity}</span>
              ))}
            </div>
          </div>
          
          <div className="topics-display">
            <h4>📋 Temas Activos</h4>
            <div className="topics-list">
              {memoryStats.topics.map((topic, index) => (
                <span key={index} className="topic-tag">{topic}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * PerformanceMetrics - Display of performance metrics and optimization tips
 * 
 * Shows real-time performance data and optimization recommendations
 */
export const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({
    responseTime: 8.2,
    throughput: 1250,
    memoryUsage: 85.3,
    cacheHitRate: 94.7,
    indexEfficiency: 92.1
  });

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        responseTime: prev.responseTime + (Math.random() - 0.5) * 0.5,
        throughput: prev.throughput + (Math.random() - 0.5) * 50,
        memoryUsage: Math.max(60, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 2)),
        cacheHitRate: Math.max(85, Math.min(98, prev.cacheHitRate + (Math.random() - 0.5) * 1)),
        indexEfficiency: Math.max(88, Math.min(96, prev.indexEfficiency + (Math.random() - 0.5) * 1))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getMetricStatus = (value, thresholds) => {
    if (value <= thresholds.excellent) return 'excellent';
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.warning) return 'warning';
    return 'critical';
  };

  const metricConfigs = [
    {
      key: 'responseTime',
      label: 'Tiempo de Respuesta',
      value: metrics.responseTime,
      unit: 'ms',
      thresholds: { excellent: 10, good: 25, warning: 50 },
      description: 'Tiempo promedio para responder a consultas'
    },
    {
      key: 'throughput',
      label: 'Throughput',
      value: metrics.throughput,
      unit: 'ops/seg',
      thresholds: { excellent: 1000, good: 500, warning: 200 },
      reverse: true,
      description: 'Operaciones procesadas por segundo'
    },
    {
      key: 'memoryUsage',
      label: 'Uso de Memoria',
      value: metrics.memoryUsage,
      unit: 'MB',
      thresholds: { excellent: 70, good: 85, warning: 95 },
      description: 'Memoria RAM utilizada por el sistema'
    },
    {
      key: 'cacheHitRate',
      label: 'Tasa de Acierto de Cache',
      value: metrics.cacheHitRate,
      unit: '%',
      thresholds: { excellent: 90, good: 80, warning: 70 },
      reverse: true,
      description: 'Porcentaje de consultas resueltas desde cache'
    },
    {
      key: 'indexEfficiency',
      label: 'Eficiencia de Índices',
      value: metrics.indexEfficiency,
      unit: '%',
      thresholds: { excellent: 90, good: 85, warning: 80 },
      reverse: true,
      description: 'Eficiencia de los índices de búsqueda'
    }
  ];

  return (
    <div className="performance-metrics">
      <div className="metrics-dashboard">
        <h3>📊 Métricas en Tiempo Real</h3>
        <div className="metrics-grid">
          {metricConfigs.map(config => {
            const status = config.reverse 
              ? (config.value >= config.thresholds.excellent ? 'excellent' : 
                 config.value >= config.thresholds.good ? 'good' : 
                 config.value >= config.thresholds.warning ? 'warning' : 'critical')
              : getMetricStatus(config.value, config.thresholds);
            
            return (
              <div key={config.key} className={`metric-card ${status}`}>
                <div className="metric-header">
                  <h4>{config.label}</h4>
                  <span className={`status-indicator ${status}`}></span>
                </div>
                <div className="metric-value">
                  {config.value.toFixed(1)}{config.unit}
                </div>
                <div className="metric-description">
                  {config.description}
                </div>
                <div className="metric-trend">
                  <div className={`trend-indicator ${Math.random() > 0.5 ? 'up' : 'down'}`}>
                    {Math.random() > 0.5 ? '↗' : '↘'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="optimization-recommendations">
        <h3>🚀 Recomendaciones de Optimización</h3>
        <div className="recommendations-list">
          <div className="recommendation-item high-priority">
            <div className="recommendation-header">
              <span className="priority-badge high">Alta Prioridad</span>
              <h4>Optimizar Cache de Embeddings</h4>
            </div>
            <p>
              Implementar cache LRU para embeddings vectoriales. Reducción estimada 
              de tiempo de respuesta: 40-60%.
            </p>
            <div className="recommendation-actions">
              <button className="btn btn-primary">Implementar</button>
              <button className="btn btn-secondary">Más detalles</button>
            </div>
          </div>
          
          <div className="recommendation-item medium-priority">
            <div className="recommendation-header">
              <span className="priority-badge medium">Media Prioridad</span>
              <h4>Compresión de Mensajes Antiguos</h4>
            </div>
            <p>
              Comprimir mensajes de más de 24 horas manteniendo información clave. 
              Reducción estimada de memoria: 30-45%.
            </p>
            <div className="recommendation-actions">
              <button className="btn btn-secondary">Planificar</button>
              <button className="btn btn-outline">Evaluar</button>
            </div>
          </div>
          
          <div className="recommendation-item low-priority">
            <div className="recommendation-header">
              <span className="priority-badge low">Baja Prioridad</span>
              <h4>Índices Especializados</h4>
            </div>
            <p>
              Crear índices especializados para consultas frecuentes. Mejora estimada 
              en throughput: 15-25%.
            </p>
            <div className="recommendation-actions">
              <button className="btn btn-outline">Considerar</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="benchmarks-comparison">
        <h3>⚖️ Comparación con Benchmarks</h3>
        <div className="benchmark-table">
          <table>
            <thead>
              <tr>
                <th>Métrica</th>
                <th>Tu Sistema</th>
                <th>Promedio Industria</th>
                <th>Mejor en Clase</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tiempo de Respuesta</td>
                <td>{metrics.responseTime.toFixed(1)}ms</td>
                <td>15.0ms</td>
                <td>5.0ms</td>
                <td><span className="status excellent">Excelente</span></td>
              </tr>
              <tr>
                <td>Throughput</td>
                <td>{metrics.throughput.toFixed(0)} ops/seg</td>
                <td>800 ops/seg</td>
                <td>2000 ops/seg</td>
                <td><span className="status good">Bueno</span></td>
              </tr>
              <tr>
                <td>Uso de Memoria</td>
                <td>{metrics.memoryUsage.toFixed(1)}MB</td>
                <td>120MB</td>
                <td>50MB</td>
                <td><span className="status good">Bueno</span></td>
              </tr>
              <tr>
                <td>Cache Hit Rate</td>
                <td>{metrics.cacheHitRate.toFixed(1)}%</td>
                <td>85%</td>
                <td>98%</td>
                <td><span className="status excellent">Excelente</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// PropTypes for all components
MemoryArchitecture.propTypes = {};
CodeImplementation.propTypes = {};
LiveDemo.propTypes = {};
PerformanceMetrics.propTypes = {};
