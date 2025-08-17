import React from 'react';
import PropTypes from 'prop-types';
import { MemoryTypesGrid, ConversationFlow, ConversationBuffer } from './components';
import './styles.css';

/**
 * Lesson02MemoryTypes - Exploring different types of memory in AI agents
 * 
 * This lesson covers the various types of memory systems used in AI agents,
 * focusing on short-term memory, working memory, and their implementation.
 * 
 * @component
 * @example
 * return <Lesson02MemoryTypes />
 */
const Lesson02MemoryTypes = () => {
  return (
    <main 
      className="lesson-memory-types"
      role="main"
      aria-labelledby="lesson-title"
      tabIndex={-1}
    >
      <header className="lesson-header">
        <h1 id="lesson-title">
          Lección 2: Tipos de Memoria en Agentes IA
        </h1>
        <p className="lesson-intro">
          Los sistemas de memoria para agentes se inspiran en la psicología cognitiva 
          y la neurociencia, adaptando conceptos de memoria humana para crear 
          experiencias de IA más coherentes y efectivas.
        </p>
      </header>

      <section 
        className="lesson-section"
        aria-labelledby="memory-types-title"
      >
        <h2 id="memory-types-title">
          🧠 Tipos de Memoria
        </h2>
        <p>
          Así como los humanos tienen diferentes tipos de memoria que sirven 
          para propósitos específicos, los agentes de IA necesitan sistemas 
          de memoria especializados para manejar diferentes tipos de información.
        </p>
        
        <MemoryTypesGrid />
      </section>

      <section 
        className="lesson-section"
        aria-labelledby="short-term-focus-title"
      >
        <h2 id="short-term-focus-title">
          ⏰ Enfoque en Memoria de Corto Plazo
        </h2>
        <p>
          La memoria de corto plazo es fundamental para mantener el contexto 
          de la conversación actual. Es donde el agente almacena información 
          relevante para la sesión en curso.
        </p>

        <div className="key-concepts">
          <h3>Características Clave:</h3>
          <ul>
            <li>
              <strong>Capacidad limitada:</strong> Mantiene solo información reciente y relevante
            </li>
            <li>
              <strong>Duración temporal:</strong> Se mantiene durante la sesión activa
            </li>
            <li>
              <strong>Acceso rápido:</strong> Optimizada para recuperación inmediata
            </li>
            <li>
              <strong>Gestión automática:</strong> Se actualiza continuamente con nueva información
            </li>
          </ul>
        </div>
      </section>

      <section 
        className="lesson-section"
        aria-labelledby="conversation-example-title"
      >
        <h2 id="conversation-example-title">
          💬 Memoria en Acción: Conversación Completa
        </h2>
        <p>
          Veamos cómo la memoria de corto plazo evoluciona durante una 
          conversación real entre un usuario y un agente de IA:
        </p>
        
        <ConversationFlow />
      </section>

      <section 
        className="lesson-section"
        aria-labelledby="buffer-implementation-title"
      >
        <h2 id="buffer-implementation-title">
          🔧 Implementación: Buffer de Conversación
        </h2>
        <p>
          La implementación técnica de la memoria de corto plazo utiliza 
          estructuras de datos eficientes como buffers circulares y 
          sistemas de gestión temporal.
        </p>
        
        <ConversationBuffer />
      </section>

      <section 
        className="lesson-section"
        aria-labelledby="benefits-challenges-title"
      >
        <h2 id="benefits-challenges-title">
          ⚖️ Beneficios y Desafíos
        </h2>
        
        <div className="benefits-challenges-grid">
          <div className="benefits-card">
            <h3>✅ Beneficios</h3>
            <ul>
              <li>Mantiene coherencia conversacional</li>
              <li>Permite referencias a información previa</li>
              <li>Mejora la experiencia del usuario</li>
              <li>Optimiza el rendimiento del agente</li>
              <li>Facilita seguimiento de temas complejos</li>
            </ul>
          </div>
          
          <div className="challenges-card">
            <h3>⚠️ Desafíos</h3>
            <ul>
              <li>Gestión de capacidad limitada</li>
              <li>Determinación de relevancia</li>
              <li>Balanceo entre velocidad y completitud</li>
              <li>Manejo de cambios de contexto</li>
              <li>Integración con memoria a largo plazo</li>
            </ul>
          </div>
        </div>
      </section>

      <section 
        className="lesson-section"
        aria-labelledby="best-practices-title"
      >
        <h2 id="best-practices-title">
          🎯 Mejores Prácticas
        </h2>
        
        <div className="best-practices-list">
          <div className="practice-item">
            <h4>🔄 Rotación Inteligente</h4>
            <p>
              Implementa algoritmos que mantengan la información más relevante 
              y descarten automáticamente datos obsoletos.
            </p>
          </div>
          
          <div className="practice-item">
            <h4>📊 Puntuación de Relevancia</h4>
            <p>
              Asigna puntuaciones dinámicas a la información basadas en 
              recencia, frecuencia de uso y importancia contextual.
            </p>
          </div>
          
          <div className="practice-item">
            <h4>🎛️ Configuración Adaptable</h4>
            <p>
              Permite ajustar el tamaño del buffer y las políticas de retención 
              según el tipo de conversación y usuario.
            </p>
          </div>
          
          <div className="practice-item">
            <h4>🔗 Integración Seamless</h4>
            <p>
              Asegura una transición fluida entre memoria de corto y largo plazo 
              para información importante.
            </p>
          </div>
        </div>
      </section>

      <footer className="lesson-footer">
        <div className="lesson-summary">
          <h3>📝 Resumen de la Lección</h3>
          <p>
            Los diferentes tipos de memoria en agentes IA cumplen funciones específicas. 
            La memoria de corto plazo es esencial para mantener coherencia conversacional 
            y debe ser implementada con estructuras de datos eficientes y políticas 
            inteligentes de gestión.
          </p>
        </div>
        
        <div className="lesson-navigation">
          <button 
            className="btn btn-secondary"
            aria-label="Volver a la lección anterior"
          >
            ← Lección 1
          </button>
          <button 
            className="btn btn-primary"
            aria-label="Continuar a la siguiente lección"
          >
            Lección 3 →
          </button>
        </div>
      </footer>
    </main>
  );
};

// PropTypes for development validation
Lesson02MemoryTypes.propTypes = {};

// Default export
export default Lesson02MemoryTypes;
