import React from 'react';
import PropTypes from 'prop-types';

/**
 * MemoryComparison - Visual comparison between agents with and without memory
 * 
 * Displays a side-by-side comparison highlighting the problems of stateless
 * agents versus the benefits of memory-enabled agents.
 */
export const MemoryComparison = () => {
  return (
    <div className="memory-comparison">
      <div className="comparison-card without-memory">
        <h4>🚫 Sin Memoria</h4>
        <ul>
          <li>Cada conversación empieza desde cero</li>
          <li>No recuerda preferencias del usuario</li>
          <li>Repite preguntas ya contestadas</li>
          <li>No aprende de interacciones pasadas</li>
          <li>Experiencia inconsistente</li>
        </ul>
        
        <div className="example-conversation">
          <div className="message user">
            <strong>Usuario:</strong> "Mi nombre es Ana y trabajo en marketing"
          </div>
          <div className="message agent">
            <strong>Agente:</strong> "¡Hola! ¿En qué puedo ayudarte?"
          </div>
          <div className="message user">
            <strong>Usuario:</strong> "¿Qué opinas de mi trabajo?"
          </div>
          <div className="message agent error">
            <strong>Agente:</strong> "¿Cuál es tu trabajo? No tengo esa información."
          </div>
        </div>
      </div>
      
      <div className="comparison-card with-memory">
        <h4>✅ Con Memoria</h4>
        <ul>
          <li>Mantiene contexto entre conversaciones</li>
          <li>Recuerda preferencias y datos del usuario</li>
          <li>Evita repetir información</li>
          <li>Mejora con cada interacción</li>
          <li>Experiencia personalizada y coherente</li>
        </ul>
        
        <div className="example-conversation">
          <div className="message user">
            <strong>Usuario:</strong> "Mi nombre es Ana y trabajo en marketing"
          </div>
          <div className="message agent">
            <strong>Agente:</strong> "¡Hola Ana! El marketing es fascinante. ¿En qué área te especializas?"
          </div>
          <div className="message user">
            <strong>Usuario:</strong> "¿Qué opinas de mi trabajo?"
          </div>
          <div className="message agent success">
            <strong>Agente:</strong> "Ana, el marketing es una disciplina muy dinámica. ¿Trabajas más en digital o tradicional?"
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * RealWorldExample - Detailed customer service scenario showing memory benefits
 * 
 * Shows a multi-channel customer service interaction across phone, email, and chat
 * demonstrating how memory maintains context across different touchpoints.
 */
export const RealWorldExample = () => {
  const scenarios = [
    {
      day: "Lunes",
      channel: "📞 Primera Llamada",
      interactions: [
        {
          speaker: "Cliente",
          message: "Hola, soy María González. Tengo un problema con mi pedido #12345",
          type: "user"
        },
        {
          speaker: "Agente con Memoria",
          message: "Hola María, veo que es su primera vez contactando sobre el pedido #12345. ¿Cuál es el problema específico?",
          type: "agent"
        }
      ],
      memoryNote: "Nombre cliente, pedido #12345, es primera llamada sobre este tema"
    },
    {
      day: "Martes",
      channel: "📧 Email de Seguimiento",
      interactions: [
        {
          speaker: "María",
          message: "¿Hay actualizaciones sobre mi problema de ayer?",
          type: "user"
        },
        {
          speaker: "Agente con Memoria",
          message: "Hola de nuevo María. Sobre el problema con su pedido #12345 que discutimos ayer por teléfono, he estado trabajando con nuestro equipo de logística...",
          type: "agent"
        }
      ],
      memoryNote: "Cliente anterior, problema en curso, canal diferente, continúa contexto"
    },
    {
      day: "Miércoles",
      channel: "💬 Chat en Línea",
      interactions: [
        {
          speaker: "María",
          message: "Soy María González, ¿el pedido ya fue enviado?",
          type: "user"
        },
        {
          speaker: "Agente con Memoria",
          message: "¡Excelentes noticias María! Su pedido #12345 fue enviado esta mañana. Basándome en nuestras conversaciones anteriores, quería informarle que...",
          type: "agent"
        }
      ],
      memoryNote: "Historial completo, preferencias de comunicación, contexto del problema resuelto"
    }
  ];

  return (
    <div className="real-world-example">
      {scenarios.map((scenario, index) => (
        <div key={index} className="scenario-card">
          <h4>{scenario.channel} ({scenario.day})</h4>
          <div className="conversation-flow">
            {scenario.interactions.map((interaction, idx) => (
              <div key={idx} className={`message ${interaction.type}-message`}>
                <strong>{interaction.speaker}:</strong> "{interaction.message}"
              </div>
            ))}
            <div className="memory-note">
              💾 <strong>Memoria almacena/utiliza:</strong> {scenario.memoryNote}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * ImpactMetrics - Quantified benefits of memory in customer service
 * 
 * Shows concrete metrics and improvements that memory systems provide
 * in real customer service scenarios.
 */
export const ImpactMetrics = () => {
  return (
    <div className="impact-comparison">
      <div className="without-memory">
        <h5>❌ Sin Memoria (Experiencia Fragmentada)</h5>
        <ul>
          <li>Cliente debe repetir información en cada contacto</li>
          <li>Agente no conoce historial previo</li>
          <li>Resolución lenta e ineficiente</li>
          <li>Experiencia frustrante para el cliente</li>
          <li>Mayor tiempo de resolución: <strong>8.5 minutos promedio</strong></li>
          <li>Satisfacción del cliente: <strong>3.2/5</strong></li>
          <li>Casos que requieren escalamiento: <strong>35%</strong></li>
        </ul>
      </div>
      
      <div className="with-memory">
        <h5>✅ Con Memoria (Experiencia Continua)</h5>
        <ul>
          <li>Reconocimiento inmediato del cliente</li>
          <li>Contexto completo en todas las interacciones</li>
          <li>Resolución rápida y personalizada</li>
          <li>Experiencia fluida y profesional</li>
          <li>Tiempo de resolución reducido: <strong>3.0 minutos promedio (-65%)</strong></li>
          <li>Satisfacción del cliente: <strong>4.6/5 (+44%)</strong></li>
          <li>Casos que requieren escalamiento: <strong>12% (-66%)</strong></li>
        </ul>
      </div>
      
      <div className="metrics-summary">
        <h5>📊 Impacto Cuantificado</h5>
        <div className="metrics-grid">
          <div className="metric">
            <span className="metric-value">65%</span>
            <span className="metric-label">Reducción en tiempo de resolución</span>
          </div>
          <div className="metric">
            <span className="metric-value">44%</span>
            <span className="metric-label">Mejora en satisfacción</span>
          </div>
          <div className="metric">
            <span className="metric-value">66%</span>
            <span className="metric-label">Menos escalamientos</span>
          </div>
          <div className="metric">
            <span className="metric-value">85%</span>
            <span className="metric-label">Clientes prefieren agentes con memoria</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes for better development experience
MemoryComparison.propTypes = {};
RealWorldExample.propTypes = {};
ImpactMetrics.propTypes = {};
