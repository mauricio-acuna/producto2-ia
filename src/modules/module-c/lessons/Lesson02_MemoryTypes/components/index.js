import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * MemoryTypesGrid - Interactive grid showing different types of memory in AI agents
 * 
 * Displays comprehensive information about working memory, short-term, long-term,
 * episodic, and semantic memory with interactive cards.
 */
export const MemoryTypesGrid = () => {
  const [activeCard, setActiveCard] = useState(null);

  const memoryTypes = [
    {
      id: 'working',
      title: '🔄 Memoria de Trabajo',
      subtitle: 'Información activa para la tarea actual',
      description: 'Mantiene datos temporales necesarios para completar la tarea en curso',
      features: [
        'Variables temporales',
        'Resultados intermedios', 
        'Estado de la tarea',
        'Contexto inmediato'
      ],
      example: 'Durante un cálculo matemático, mantiene números intermedios',
      duration: 'Segundos a minutos',
      capacity: 'Muy limitada (7±2 elementos)',
      color: '#e74c3c'
    },
    {
      id: 'short-term',
      title: '⏰ Memoria de Corto Plazo',
      subtitle: 'Contexto de la sesión actual',
      description: 'Almacena información relevante para la conversación en curso',
      features: [
        'Conversación reciente',
        'Entidades mencionadas',
        'Objetivos actuales',
        'Preferencias temporales'
      ],
      example: 'Recuerda que el usuario mencionó su nombre al inicio de la sesión',
      duration: 'Minutos a horas',
      capacity: 'Limitada (buffer circular)',
      color: '#f39c12'
    },
    {
      id: 'long-term',
      title: '💾 Memoria de Largo Plazo',
      subtitle: 'Información persistente entre sesiones',
      description: 'Conserva datos importantes del usuario y experiencias pasadas',
      features: [
        'Perfil del usuario',
        'Preferencias establecidas',
        'Historial de interacciones',
        'Patrones de comportamiento'
      ],
      example: 'Recuerda que el usuario prefiere explicaciones técnicas detalladas',
      duration: 'Días a años',
      capacity: 'Prácticamente ilimitada',
      color: '#27ae60'
    },
    {
      id: 'episodic',
      title: '📖 Memoria Episódica',
      subtitle: 'Eventos específicos y contextos',
      description: 'Almacena experiencias específicas con contexto temporal y emocional',
      features: [
        'Conversaciones importantes',
        'Momentos emocionales',
        'Soluciones exitosas',
        'Contexto de eventos'
      ],
      example: 'Recuerda una conversación específica donde resolvió un problema complejo',
      duration: 'Semanas a años',
      capacity: 'Selectiva (alta relevancia)',
      color: '#8e44ad'
    },
    {
      id: 'semantic',
      title: '🧩 Memoria Semántica',
      subtitle: 'Conocimiento general y conceptual',
      description: 'Contiene conocimiento factual y relaciones conceptuales',
      features: [
        'Conocimiento del dominio',
        'Procedimientos establecidos',
        'Relaciones entre conceptos',
        'Patrones generales'
      ],
      example: 'Conoce que Python es un lenguaje de programación interpretado',
      duration: 'Permanente',
      capacity: 'Extensiva (base de conocimiento)',
      color: '#3498db'
    }
  ];

  const handleCardClick = (cardId) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  return (
    <div className="memory-types-grid">
      {memoryTypes.map((type) => (
        <div
          key={type.id}
          className={`memory-type-card ${activeCard === type.id ? 'active' : ''}`}
          style={{ borderLeftColor: type.color }}
          onClick={() => handleCardClick(type.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardClick(type.id);
            }
          }}
          tabIndex={0}
          role="button"
          aria-expanded={activeCard === type.id}
          aria-label={`Ver detalles de ${type.title}`}
        >
          <div className="card-header">
            <h3 style={{ color: type.color }}>
              {type.title}
            </h3>
            <p className="card-subtitle">{type.subtitle}</p>
          </div>

          <div className="card-content">
            <p className="card-description">{type.description}</p>
            
            <div className="card-features">
              <h4>Características:</h4>
              <ul>
                {type.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {activeCard === type.id && (
              <div className="card-details" aria-live="polite">
                <div className="detail-row">
                  <strong>Ejemplo:</strong> {type.example}
                </div>
                <div className="detail-row">
                  <strong>Duración:</strong> {type.duration}
                </div>
                <div className="detail-row">
                  <strong>Capacidad:</strong> {type.capacity}
                </div>
              </div>
            )}
          </div>

          <div className="card-indicator">
            {activeCard === type.id ? '▼' : '▶'}
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * ConversationFlow - Demonstrates how short-term memory evolves during conversation
 * 
 * Shows a real conversation with memory state changes at each step.
 */
export const ConversationFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const conversationSteps = [
    {
      id: 1,
      speaker: 'Usuario',
      message: 'Hola, me llamo Carlos y soy desarrollador de Python',
      type: 'user',
      memoryState: {
        entities: ['Carlos', 'desarrollador', 'Python'],
        context: 'Presentación inicial',
        topics: ['identidad', 'profesión'],
        buffer: ['Usuario se presenta como Carlos, desarrollador de Python']
      }
    },
    {
      id: 2,
      speaker: 'Agente',
      message: '¡Hola Carlos! Encantado de conocerte. Python es un excelente lenguaje. ¿En qué tipo de proyectos trabajas?',
      type: 'agent',
      memoryState: {
        entities: ['Carlos', 'desarrollador', 'Python', 'proyectos'],
        context: 'Conversación sobre desarrollo',
        topics: ['identidad', 'profesión', 'proyectos'],
        buffer: [
          'Usuario se presenta como Carlos, desarrollador de Python',
          'Agente pregunta sobre tipo de proyectos'
        ]
      }
    },
    {
      id: 3,
      speaker: 'Usuario',
      message: 'Principalmente desarrollo APIs REST y trabajo con machine learning',
      type: 'user',
      memoryState: {
        entities: ['Carlos', 'desarrollador', 'Python', 'APIs REST', 'machine learning'],
        context: 'Especialización en desarrollo',
        topics: ['identidad', 'profesión', 'proyectos', 'especialización'],
        buffer: [
          'Usuario se presenta como Carlos, desarrollador de Python',
          'Agente pregunta sobre tipo de proyectos',
          'Carlos trabaja en APIs REST y machine learning'
        ]
      }
    },
    {
      id: 4,
      speaker: 'Agente',
      message: 'Perfecto Carlos! Las APIs REST son fundamentales. ¿Has trabajado con FastAPI? Es muy popular para ML en Python.',
      type: 'agent',
      memoryState: {
        entities: ['Carlos', 'desarrollador', 'Python', 'APIs REST', 'machine learning', 'FastAPI'],
        context: 'Discusión técnica sobre herramientas',
        topics: ['identidad', 'profesión', 'proyectos', 'especialización', 'herramientas'],
        buffer: [
          'Usuario se presenta como Carlos, desarrollador de Python',
          'Agente pregunta sobre tipo de proyectos',
          'Carlos trabaja en APIs REST y machine learning',
          'Agente sugiere FastAPI para ML'
        ]
      }
    },
    {
      id: 5,
      speaker: 'Usuario',
      message: 'Sí, uso FastAPI bastante. De hecho, tengo un problema con la validación de datos',
      type: 'user',
      memoryState: {
        entities: ['Carlos', 'desarrollador', 'Python', 'APIs REST', 'machine learning', 'FastAPI', 'validación de datos'],
        context: 'Problema específico con FastAPI',
        topics: ['identidad', 'profesión', 'proyectos', 'especialización', 'herramientas', 'problema'],
        buffer: [
          'Agente pregunta sobre tipo de proyectos',
          'Carlos trabaja en APIs REST y machine learning',
          'Agente sugiere FastAPI para ML',
          'Carlos usa FastAPI, tiene problema con validación'
        ]
      }
    }
  ];

  const nextStep = () => {
    if (currentStep < conversationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetConversation = () => {
    setCurrentStep(0);
  };

  const currentStepData = conversationSteps[currentStep];

  return (
    <div className="conversation-flow">
      <div className="conversation-controls">
        <button 
          onClick={prevStep}
          disabled={currentStep === 0}
          className="btn btn-secondary"
          aria-label="Paso anterior"
        >
          ← Anterior
        </button>
        <span className="step-indicator">
          Paso {currentStep + 1} de {conversationSteps.length}
        </span>
        <button 
          onClick={nextStep}
          disabled={currentStep === conversationSteps.length - 1}
          className="btn btn-secondary"
          aria-label="Siguiente paso"
        >
          Siguiente →
        </button>
        <button 
          onClick={resetConversation}
          className="btn btn-outline"
          aria-label="Reiniciar conversación"
        >
          🔄 Reiniciar
        </button>
      </div>

      <div className="conversation-display">
        <div className="conversation-side">
          <h4>💬 Conversación</h4>
          <div className="messages-container">
            {conversationSteps.slice(0, currentStep + 1).map((step, index) => (
              <div 
                key={step.id}
                className={`message ${step.type}-message ${index === currentStep ? 'current' : ''}`}
              >
                <strong>{step.speaker}:</strong> {step.message}
              </div>
            ))}
          </div>
        </div>

        <div className="memory-side">
          <h4>🧠 Estado de la Memoria de Corto Plazo</h4>
          <div className="memory-display">
            <div className="memory-section">
              <h5>📝 Buffer de Conversación</h5>
              <div className="buffer-list">
                {currentStepData.memoryState.buffer.map((item, index) => (
                  <div key={index} className="buffer-item">
                    <span className="buffer-index">{index + 1}.</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="memory-section">
              <h5>🏷️ Entidades Reconocidas</h5>
              <div className="entities-list">
                {currentStepData.memoryState.entities.map((entity, index) => (
                  <span key={index} className="entity-tag">
                    {entity}
                  </span>
                ))}
              </div>
            </div>

            <div className="memory-section">
              <h5>📋 Contexto Actual</h5>
              <p className="context-display">
                {currentStepData.memoryState.context}
              </p>
            </div>

            <div className="memory-section">
              <h5>🔍 Temas Activos</h5>
              <div className="topics-list">
                {currentStepData.memoryState.topics.map((topic, index) => (
                  <span key={index} className="topic-tag">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * ConversationBuffer - Interactive demonstration of conversation buffer implementation
 * 
 * Shows how a circular buffer manages conversation history with size limits.
 */
export const ConversationBuffer = () => {
  const [bufferSize, setBufferSize] = useState(5);
  const [messages, setMessages] = useState([
    'Usuario: Hola, me llamo Ana',
    'Agente: ¡Hola Ana! ¿En qué puedo ayudarte?',
    'Usuario: Tengo una pregunta sobre Python',
    'Agente: Claro, soy experto en Python. ¿Cuál es tu pregunta?'
  ]);
  const [newMessage, setNewMessage] = useState('');

  const addMessage = () => {
    if (newMessage.trim()) {
      const updatedMessages = [...messages, newMessage.trim()];
      // Implement circular buffer logic
      const finalMessages = updatedMessages.length > bufferSize 
        ? updatedMessages.slice(-bufferSize) 
        : updatedMessages;
      
      setMessages(finalMessages);
      setNewMessage('');
    }
  };

  const clearBuffer = () => {
    setMessages([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addMessage();
    }
  };

  return (
    <div className="conversation-buffer">
      <div className="buffer-controls">
        <div className="control-group">
          <label htmlFor="buffer-size">
            Tamaño del Buffer: {bufferSize}
          </label>
          <input
            id="buffer-size"
            type="range"
            min="2"
            max="10"
            value={bufferSize}
            onChange={(e) => setBufferSize(parseInt(e.target.value))}
            className="buffer-slider"
          />
        </div>
        
        <div className="buffer-stats">
          <span className="stat">
            Usado: {messages.length}/{bufferSize}
          </span>
          <span className={`stat ${messages.length >= bufferSize ? 'warning' : ''}`}>
            {messages.length >= bufferSize ? '⚠️ Buffer lleno' : '✅ Espacio disponible'}
          </span>
        </div>
      </div>

      <div className="buffer-visualization">
        <h4>🗂️ Buffer Circular de Conversación</h4>
        <div className="buffer-container">
          {Array.from({ length: bufferSize }, (_, index) => (
            <div
              key={index}
              className={`buffer-slot ${index < messages.length ? 'filled' : 'empty'}`}
            >
              <div className="slot-number">{index + 1}</div>
              <div className="slot-content">
                {messages[index] || 'Vacío'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="buffer-interaction">
        <h4>📝 Agregar Mensaje</h4>
        <div className="message-input-group">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe un mensaje para agregar al buffer..."
            className="message-input"
            rows="2"
          />
          <div className="input-actions">
            <button 
              onClick={addMessage}
              disabled={!newMessage.trim()}
              className="btn btn-primary"
            >
              Agregar Mensaje
            </button>
            <button 
              onClick={clearBuffer}
              className="btn btn-secondary"
            >
              Limpiar Buffer
            </button>
          </div>
        </div>
      </div>

      <div className="buffer-explanation">
        <h4>💡 Cómo Funciona</h4>
        <ul>
          <li>
            <strong>Capacidad Fija:</strong> El buffer mantiene un número máximo de mensajes
          </li>
          <li>
            <strong>FIFO (First In, First Out):</strong> Los mensajes más antiguos se eliminan cuando se alcanza la capacidad
          </li>
          <li>
            <strong>Acceso Secuencial:</strong> Los mensajes se almacenan en orden cronológico
          </li>
          <li>
            <strong>Gestión Automática:</strong> No requiere intervención manual para la limpieza
          </li>
        </ul>
      </div>
    </div>
  );
};

// PropTypes for better development experience
MemoryTypesGrid.propTypes = {};
ConversationFlow.propTypes = {};
ConversationBuffer.propTypes = {};
