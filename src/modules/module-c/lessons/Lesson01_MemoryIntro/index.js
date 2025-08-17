import React from 'react';
import PropTypes from 'prop-types';
import CodeBlock from '../../../components/CodeBlock';
import { RealWorldExample } from './components/RealWorldExample';
import { MemoryComparison } from './components/MemoryComparison';
import { ImpactMetrics } from './components/ImpactMetrics';

/**
 * Lesson 1: Why Memory in Agents?
 * 
 * This lesson introduces the fundamental concept of memory in AI agents,
 * demonstrating the problems of stateless agents and the benefits of 
 * implementing memory systems.
 * 
 * Learning Objectives:
 * - Understand why memory is crucial for agent functionality
 * - Identify different types of memory systems
 * - Recognize real-world applications and benefits
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onComplete - Callback when lesson is completed
 */
const MemoryIntroLesson = ({ onComplete }) => {
  const withoutMemoryExample = `# Agente SIN memoria - Cada interacción es aislada

def simple_agent_without_memory(user_input):
    # Solo ve el input actual, no recuerda nada
    prompt = f"""
    Eres un asistente útil.
    Usuario: {user_input}
    Asistente:
    """
    
    response = llm.complete(prompt)
    return response

# Problema: Conversaciones fragmentadas
user1 = "Mi nombre es Ana y trabajo en marketing"
agent_response1 = simple_agent_without_memory(user1)
# → "Hola! ¿En qué puedo ayudarte?"

user2 = "¿Qué opinas de mi trabajo?"
agent_response2 = simple_agent_without_memory(user2)
# → "No sé cuál es tu trabajo. ¿Podrías contarme más?"

# 😞 El agente ya olvidó que Ana trabaja en marketing!`;

  const withMemoryExample = `# Agente CON memoria - Mantiene contexto

class MemoryAwareAgent:
    def __init__(self):
        self.conversation_history = []
        self.user_profile = {}
        self.session_context = {}
    
    def process_message(self, user_input):
        # 1. Recuperar contexto relevante
        relevant_context = self.retrieve_relevant_context(user_input)
        
        # 2. Construir prompt con memoria
        prompt = self.build_contextual_prompt(
            user_input, 
            relevant_context,
            self.conversation_history[-5:]  # Últimos 5 mensajes
        )
        
        # 3. Generar respuesta
        response = llm.complete(prompt)
        
        # 4. Actualizar memoria
        self.update_memory(user_input, response)
        
        return response
    
    def update_memory(self, user_input, response):
        # Guardar en historial de conversación
        self.conversation_history.append({
            "user": user_input,
            "assistant": response,
            "timestamp": datetime.now()
        })
        
        # Extraer y actualizar información del usuario
        user_info = self.extract_user_info(user_input)
        self.user_profile.update(user_info)
        
        # Actualizar contexto de sesión
        self.session_context.update({
            "last_topic": self.extract_topic(user_input),
            "mood": self.detect_mood(user_input),
            "preferences": self.extract_preferences(user_input)
        })

# Ahora sí mantiene contexto!
agent = MemoryAwareAgent()

response1 = agent.process_message("Mi nombre es Ana y trabajo en marketing")
# → "¡Hola Ana! Es un placer conocerte. El marketing es un campo fascinante..."

response2 = agent.process_message("¿Qué opinas de mi trabajo?")
# → "Ana, el marketing es una disciplina muy dinámica y creativa..."

# 🎉 ¡El agente recuerda que Ana trabaja en marketing!`;

  const memoryTypesCode = `# Tipos de Memoria en Agentes IA

class AgentMemorySystem:
    def __init__(self):
        # 1. MEMORIA DE TRABAJO (Working Memory)
        # Información inmediatamente relevante para la tarea actual
        self.working_memory = {
            "current_task": None,
            "active_variables": {},
            "temp_calculations": {},
            "intermediate_results": []
        }
        
        # 2. MEMORIA DE CORTO PLAZO (Short-term Memory)
        # Conversación actual, contexto de sesión
        self.short_term_memory = {
            "conversation_history": [],  # Últimos N mensajes
            "session_context": {},       # Estado de la sesión actual
            "recent_entities": set(),    # Entidades mencionadas recientemente
            "current_goals": []          # Objetivos de la conversación actual
        }
        
        # 3. MEMORIA DE LARGO PLAZO (Long-term Memory)
        # Información persistente entre sesiones
        self.long_term_memory = {
            "user_profile": {},          # Información personal del usuario
            "preferences": {},           # Preferencias conocidas
            "past_interactions": [],     # Resúmenes de conversaciones pasadas
            "learned_facts": {},         # Hechos aprendidos sobre el usuario/dominio
            "relationship_graph": {}     # Relaciones entre conceptos/personas
        }
        
        # 4. MEMORIA EPISÓDICA (Episodic Memory)
        # Eventos específicos y sus contextos
        self.episodic_memory = {
            "important_events": [],      # Eventos marcados como importantes
            "emotional_moments": [],     # Momentos con carga emocional
            "successful_solutions": [],  # Soluciones que funcionaron bien
            "failed_attempts": []        # Intentos que no funcionaron
        }
        
        # 5. MEMORIA SEMÁNTICA (Semantic Memory)
        # Conocimiento general y conceptual
        self.semantic_memory = {
            "domain_knowledge": {},      # Conocimiento del dominio
            "procedures": {},            # Cómo hacer tareas específicas
            "relationships": {},         # Relaciones entre conceptos
            "patterns": {}               # Patrones reconocidos
        }

    def store_memory(self, memory_type, key, value, metadata=None):
        """Almacenar información en el tipo de memoria apropiado"""
        memory_store = getattr(self, f"{memory_type}_memory")
        
        if isinstance(memory_store, dict):
            memory_store[key] = {
                "value": value,
                "timestamp": datetime.now(),
                "metadata": metadata or {},
                "access_count": 0
            }
    
    def retrieve_memory(self, memory_type, key=None, query=None):
        """Recuperar información de la memoria"""
        memory_store = getattr(self, f"{memory_type}_memory")
        
        if key:
            # Búsqueda directa por clave
            item = memory_store.get(key)
            if item:
                item["access_count"] += 1  # Tracking de acceso
                return item["value"]
        
        return None`;

  return (
    <div className="lesson" role="main" aria-labelledby="lesson-title">
      <h2 id="lesson-title" tabIndex="-1">
        🧠 ¿Por qué Memoria en Agentes?
      </h2>
      
      <div className="lesson-section">
        <h3>El Problema de los Agentes sin Memoria</h3>
        <p>
          Los agentes básicos procesan cada interacción de forma aislada, como si fuera 
          la primera vez que interactúan con el usuario. Esto crea experiencias fragmentadas 
          y frustrantes.
        </p>
        
        <MemoryComparison />
      </div>

      <div className="lesson-section">
        <h3>🔄 Comparación de Código: Sin vs Con Memoria</h3>
        
        <div className="code-comparison">
          <div className="code-example">
            <h4>❌ Agente Sin Memoria</h4>
            <CodeBlock 
              language="python"
              title="simple_agent.py"
              code={withoutMemoryExample}
            />
          </div>
          
          <div className="code-example">
            <h4>✅ Agente Con Memoria</h4>
            <CodeBlock 
              language="python"
              title="memory_aware_agent.py"
              code={withMemoryExample}
            />
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🎯 Caso de Uso Real: Asistente de Atención al Cliente</h3>
        <p>
          Imaginemos un asistente de atención al cliente que debe recordar información 
          del cliente a lo largo de múltiples interacciones. Veamos cómo la memoria 
          transforma completamente la experiencia:
        </p>

        <RealWorldExample />
        <ImpactMetrics />
      </div>

      <div className="lesson-section">
        <h3>🧠 Tipos de Memoria en Agentes</h3>
        <p>
          Los agentes inteligentes implementan diferentes tipos de memoria, cada uno 
          optimizado para diferentes aspectos del procesamiento de información:
        </p>
        
        <CodeBlock 
          language="python"
          title="memory_types.py"
          code={memoryTypesCode}
        />

        <div className="memory-types-overview">
          <div className="memory-type-card">
            <h4>🔄 Memoria de Trabajo</h4>
            <p>Información temporalmente activa para la tarea actual</p>
            <ul>
              <li>Variables de la conversación en curso</li>
              <li>Cálculos intermedios</li>
              <li>Estado actual de la tarea</li>
            </ul>
          </div>
          
          <div className="memory-type-card">
            <h4>⏱️ Memoria de Corto Plazo</h4>
            <p>Contexto de la sesión actual y conversación reciente</p>
            <ul>
              <li>Últimos mensajes de la conversación</li>
              <li>Entidades mencionadas recientemente</li>
              <li>Objetivos actuales del usuario</li>
            </ul>
          </div>
          
          <div className="memory-type-card">
            <h4>💾 Memoria de Largo Plazo</h4>
            <p>Información persistente entre sesiones</p>
            <ul>
              <li>Perfil del usuario</li>
              <li>Preferencias conocidas</li>
              <li>Historial de interacciones</li>
            </ul>
          </div>
          
          <div className="memory-type-card">
            <h4>📚 Memoria Episódica</h4>
            <p>Eventos específicos y sus contextos</p>
            <ul>
              <li>Momentos importantes</li>
              <li>Soluciones exitosas</li>
              <li>Situaciones problemáticas</li>
            </ul>
          </div>
          
          <div className="memory-type-card">
            <h4>🎯 Memoria Semántica</h4>
            <p>Conocimiento general y conceptual</p>
            <ul>
              <li>Conocimiento del dominio</li>
              <li>Procedimientos aprendidos</li>
              <li>Patrones reconocidos</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🎯 Beneficios de la Memoria en Agentes</h3>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h4>📈 Personalización</h4>
            <p>El agente adapta su comportamiento basándose en preferencias y historial del usuario</p>
          </div>
          
          <div className="benefit-card">
            <h4>⚡ Eficiencia</h4>
            <p>Evita repetir información ya conocida, acelera la resolución de problemas</p>
          </div>
          
          <div className="benefit-card">
            <h4>🤝 Construcción de Relaciones</h4>
            <p>Permite desarrollar rapport y comprensión más profunda del usuario</p>
          </div>
          
          <div className="benefit-card">
            <h4>🎯 Relevancia Contextual</h4>
            <p>Respuestas más relevantes basadas en el contexto completo de la interacción</p>
          </div>
          
          <div className="benefit-card">
            <h4>📊 Aprendizaje Continuo</h4>
            <p>El agente mejora con cada interacción, volviéndose más efectivo</p>
          </div>
          
          <div className="benefit-card">
            <h4>🔄 Continuidad</h4>
            <p>Conversaciones fluidas que se extienden a través de múltiples sesiones</p>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🎯 Próximos Pasos</h3>
        <p>
          En las siguientes lecciones exploraremos cómo implementar cada tipo de memoria:
        </p>
        
        <div className="next-lessons-preview">
          <div className="lesson-preview">
            <h4>Lección 2: Memoria de Corto Plazo</h4>
            <p>Implementación de memoria conversacional y gestión de sesiones</p>
          </div>
          
          <div className="lesson-preview">
            <h4>Lección 3: Memoria de Largo Plazo</h4>
            <p>Persistencia de datos y búsqueda vectorial para memoria extendida</p>
          </div>
          
          <div className="lesson-preview">
            <h4>Lección 4: Resúmenes Inteligentes</h4>
            <p>Compresión y síntesis automática de información</p>
          </div>
        </div>
      </div>

      <div className="lesson-actions">
        <button 
          className="btn btn-primary"
          onClick={onComplete}
          aria-label="Marcar lección como completada y continuar"
        >
          Fundamentos Claros ✓
        </button>
      </div>
    </div>
  );
};

MemoryIntroLesson.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default MemoryIntroLesson;
