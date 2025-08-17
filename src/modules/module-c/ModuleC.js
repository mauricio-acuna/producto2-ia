import React, { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

const ModuleC = () => {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [completedLessons, setCompletedLessons] = useState(new Set());

  const handleLessonComplete = (lessonNumber) => {
    setCompletedLessons(prev => new Set([...prev, lessonNumber]));
    if (lessonNumber < 6) {
      setCurrentLesson(lessonNumber + 1);
    }
  };

  const lessons = [
    { id: 1, title: "¿Por qué Memoria en Agentes?", component: MemoryIntroLesson },
    { id: 2, title: "Memoria de Corto Plazo", component: ShortTermMemoryLesson },
    { id: 3, title: "Memoria de Largo Plazo", component: LongTermMemoryLesson },
    { id: 4, title: "Resúmenes Inteligentes", component: IntelligentSummariesLesson },
    { id: 5, title: "Retrieval de Contexto", component: ContextRetrievalLesson },
    { id: 6, title: "Laboratorio: Sistema de Memoria", component: MemorySystemLabLesson }
  ];

  return (
    <div className="module-layout">
      <div className="module-header">
        <h1>🧠 Módulo C: Memoria en Agentes</h1>
        <p className="module-description">
          Aprende a implementar sistemas de memoria inteligente para agentes que pueden 
          recordar conversaciones pasadas, mantener contexto y mejorar con el tiempo.
        </p>
        <div className="module-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(completedLessons.size / 6) * 100}%` }}
            ></div>
          </div>
          <span>{completedLessons.size}/6 lecciones completadas</span>
        </div>
      </div>

      <div className="lesson-content">
        {React.createElement(lessons[currentLesson - 1].component, {
          onComplete: () => handleLessonComplete(currentLesson)
        })}
      </div>

      <div className="lessons-sidebar">
        <h3>📚 Lecciones</h3>
        <ul className="lessons-list">
          {lessons.map(lesson => (
            <li key={lesson.id} className={`lesson-item ${
              lesson.id === currentLesson ? 'active' : ''
            } ${
              completedLessons.has(lesson.id) ? 'completed' : ''
            }`}>
              <button
                onClick={() => setCurrentLesson(lesson.id)}
                className="lesson-button"
                disabled={lesson.id > Math.max(currentLesson, Math.max(...completedLessons) + 1)}
              >
                <span className="lesson-number">{lesson.id}</span>
                <span className="lesson-title">{lesson.title}</span>
                {completedLessons.has(lesson.id) && <span className="checkmark">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Lección 1: ¿Por qué Memoria en Agentes?
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
        elif isinstance(memory_store, list):
            memory_store.append({
                "key": key,
                "value": value,
                "timestamp": datetime.now(),
                "metadata": metadata or {}
            })
    
    def retrieve_memory(self, memory_type, key=None, query=None):
        """Recuperar información de la memoria"""
        memory_store = getattr(self, f"{memory_type}_memory")
        
        if key:
            # Búsqueda directa por clave
            item = memory_store.get(key)
            if item:
                item["access_count"] += 1  # Tracking de acceso
                return item["value"]
        
        if query:
            # Búsqueda semántica (simplificada)
            return self._semantic_search(memory_store, query)
        
        return None
    
    def _semantic_search(self, memory_store, query):
        """Búsqueda semántica en la memoria (implementación simplificada)"""
        # En una implementación real, usarías embeddings y búsqueda vectorial
        results = []
        query_lower = query.lower()
        
        for key, item in memory_store.items():
            if isinstance(item, dict) and "value" in item:
                value_text = str(item["value"]).lower()
                if query_lower in value_text:
                    results.append({
                        "key": key,
                        "value": item["value"],
                        "relevance": self._calculate_relevance(query, value_text),
                        "timestamp": item["timestamp"]
                    })
        
        # Ordenar por relevancia y recencia
        results.sort(key=lambda x: (x["relevance"], x["timestamp"]), reverse=True)
        return results[:5]  # Top 5 resultados
    
    def _calculate_relevance(self, query, text):
        """Calcular relevancia simple (en producción usarías modelos más sofisticados)"""
        query_words = set(query.lower().split())
        text_words = set(text.lower().split())
        intersection = query_words.intersection(text_words)
        union = query_words.union(text_words)
        return len(intersection) / len(union) if union else 0

# Ejemplo de uso
agent_memory = AgentMemorySystem()

# Almacenar diferentes tipos de información
agent_memory.store_memory("long_term", "user_name", "Ana García")
agent_memory.store_memory("long_term", "user_job", "Marketing Manager")
agent_memory.store_memory("short_term", "current_topic", "campaña publicitaria")
agent_memory.store_memory("episodic", "successful_advice", "Recomendé usar A/B testing")

# Recuperar información
user_name = agent_memory.retrieve_memory("long_term", "user_name")
print(f"Usuario: {user_name}")

# Búsqueda semántica
marketing_info = agent_memory.retrieve_memory("long_term", query="marketing trabajo")
print(f"Información de marketing: {marketing_info}")`;

  return (
    <div className="lesson">
      <h2>🧠 ¿Por qué Memoria en Agentes?</h2>
      
      <div className="lesson-section">
        <h3>El Problema de los Agentes sin Memoria</h3>
        <p>
          Los agentes básicos procesan cada interacción de forma aislada, como si fuera 
          la primera vez que interactúan con el usuario. Esto crea experiencias fragmentadas 
          y frustrantes.
        </p>
        
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

        <div className="real-world-example">
          <div className="scenario-card">
            <h4>📞 Primera Llamada (Lunes)</h4>
            <div className="conversation-flow">
              <div className="message user-message">
                <strong>Cliente:</strong> "Hola, soy María González. Tengo un problema con mi pedido #12345"
              </div>
              <div className="message agent-message">
                <strong>Agente con Memoria:</strong> "Hola María, veo que es su primera vez contactando sobre el pedido #12345. ¿Cuál es el problema específico?"
              </div>
              <div className="memory-note">
                💾 <strong>Memoria almacena:</strong> Nombre cliente, pedido #12345, es primera llamada sobre este tema
              </div>
            </div>
          </div>

          <div className="scenario-card">
            <h4>📧 Email de Seguimiento (Martes)</h4>
            <div className="conversation-flow">
              <div className="message user-message">
                <strong>María:</strong> "¿Hay actualizaciones sobre mi problema de ayer?"
              </div>
              <div className="message agent-message">
                <strong>Agente con Memoria:</strong> "Hola de nuevo María. Sobre el problema con su pedido #12345 que discutimos ayer por teléfono, he estado trabajando con nuestro equipo de logística..."
              </div>
              <div className="memory-note">
                💾 <strong>Memoria reconoce:</strong> Cliente anterior, problema en curso, canal diferente, continúa contexto
              </div>
            </div>
          </div>

          <div className="scenario-card">
            <h4>💬 Chat en Línea (Miércoles)</h4>
            <div className="conversation-flow">
              <div className="message user-message">
                <strong>María:</strong> "Soy María González, ¿el pedido ya fue enviado?"
              </div>
              <div className="message agent-message">
                <strong>Agente con Memoria:</strong> "¡Excelentes noticias María! Su pedido #12345 fue enviado esta mañana. Basándome en nuestras conversaciones anteriores, quería informarle que..."
              </div>
              <div className="memory-note">
                💾 <strong>Memoria utiliza:</strong> Historial completo, preferencias de comunicación, contexto del problema resuelto
              </div>
            </div>
          </div>
        </div>

        <div className="impact-comparison">
          <div className="without-memory">
            <h5>❌ Sin Memoria (Experiencia Fragmentada)</h5>
            <ul>
              <li>Cliente debe repetir información en cada contacto</li>
              <li>Agente no conoce historial previo</li>
              <li>Resolución lenta e ineficiente</li>
              <li>Experiencia frustrante para el cliente</li>
              <li>Mayor tiempo de resolución</li>
            </ul>
          </div>
          
          <div className="with-memory">
            <h5>✅ Con Memoria (Experiencia Continua)</h5>
            <ul>
              <li>Reconocimiento inmediato del cliente</li>
              <li>Contexto completo en todas las interacciones</li>
              <li>Resolución rápida y personalizada</li>
              <li>Experiencia fluida y profesional</li>
              <li>Construcción de relación a largo plazo</li>
            </ul>
          </div>
        </div>

        <div className="metrics-showcase">
          <h4>📊 Métricas del Impacto de la Memoria</h4>
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-value">65%</div>
              <div className="metric-label">Reducción en tiempo de resolución</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">40%</div>
              <div className="metric-label">Menos repetición de información</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">85%</div>
              <div className="metric-label">Mejora en satisfacción del cliente</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">3x</div>
              <div className="metric-label">Mayor eficiencia del agente</div>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Ejemplo: Agente Sin vs Con Memoria</h3>
        
        <CodeBlock
          language="python"
          title="agente_sin_memoria.py"
          code={withoutMemoryExample}
        />
        
        <CodeBlock
          language="python"
          title="agente_con_memoria.py"
          code={withMemoryExample}
        />
      </div>

      <div className="lesson-section">
        <h3>Tipos de Memoria en Agentes IA</h3>
        <p>
          Los sistemas de memoria para agentes se inspiran en la psicología cognitiva 
          y la neurociencia, adaptando conceptos de memoria humana para IA:
        </p>
        
        <div className="memory-types-grid">
          <div className="memory-type-card">
            <h4>🔄 Memoria de Trabajo</h4>
            <p>Información activa para la tarea actual</p>
            <ul>
              <li>Variables temporales</li>
              <li>Resultados intermedios</li>
              <li>Estado de la tarea</li>
            </ul>
          </div>
          <div className="memory-type-card">
            <h4>⏰ Memoria de Corto Plazo</h4>
            <p>Contexto de la sesión actual</p>
            <ul>
              <li>Conversación reciente</li>
              <li>Entidades mencionadas</li>
              <li>Objetivos actuales</li>
            </ul>
          </div>
          <div className="memory-type-card">
            <h4>💾 Memoria de Largo Plazo</h4>
            <p>Información persistente entre sesiones</p>
            <ul>
              <li>Perfil del usuario</li>
              <li>Preferencias</li>
              <li>Historial de interacciones</li>
            </ul>
          </div>
          <div className="memory-type-card">
            <h4>📖 Memoria Episódica</h4>
            <p>Eventos específicos y contextos</p>
            <ul>
              <li>Conversaciones importantes</li>
              <li>Momentos emocionales</li>
              <li>Soluciones exitosas</li>
            </ul>
          </div>
          <div className="memory-type-card">
            <h4>🧩 Memoria Semántica</h4>
            <p>Conocimiento general y conceptual</p>
            <ul>
              <li>Conocimiento del dominio</li>
              <li>Procedimientos</li>
              <li>Relaciones entre conceptos</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Sistema de Memoria Completo</h3>
        <p>
          Un sistema de memoria robusto para agentes debe integrar múltiples tipos 
          de memoria y proporcionar mecanismos eficientes de almacenamiento y recuperación:
        </p>
        
        <CodeBlock
          language="python"
          title="agent_memory_system.py"
          code={memoryTypesCode}
        />
      </div>

      <div className="lesson-section">
        <h3>Beneficios de la Memoria en Agentes</h3>
        
        <div className="benefits-grid">
          <div className="benefit-card">
            <h4>🎯 Personalización</h4>
            <p>Adapta respuestas al usuario específico</p>
          </div>
          <div className="benefit-card">
            <h4>🧠 Continuidad</h4>
            <p>Mantiene coherencia entre conversaciones</p>
          </div>
          <div className="benefit-card">
            <h4>📈 Aprendizaje</h4>
            <p>Mejora con cada interacción</p>
          </div>
          <div className="benefit-card">
            <h4>⚡ Eficiencia</h4>
            <p>Evita repetir información conocida</p>
          </div>
          <div className="benefit-card">
            <h4>🎭 Contexto</h4>
            <p>Comprende mejor las intenciones</p>
          </div>
          <div className="benefit-card">
            <h4>🤝 Relación</h4>
            <p>Construye rapport con el usuario</p>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Desafíos de Implementación</h3>
        
        <div className="challenges-list">
          <div className="challenge-item">
            <h4>🗄️ Almacenamiento Escalable</h4>
            <p>¿Cómo almacenar eficientemente grandes volúmenes de memoria?</p>
          </div>
          <div className="challenge-item">
            <h4>🔍 Recuperación Relevante</h4>
            <p>¿Cómo encontrar la información más relevante rápidamente?</p>
          </div>
          <div className="challenge-item">
            <h4>🧹 Gestión de Memoria</h4>
            <p>¿Cuándo olvidar información irrelevante o desactualizada?</p>
          </div>
          <div className="challenge-item">
            <h4>🔒 Privacidad y Seguridad</h4>
            <p>¿Cómo proteger información sensible del usuario?</p>
          </div>
          <div className="challenge-item">
            <h4>⚡ Rendimiento</h4>
            <p>¿Cómo mantener respuestas rápidas con mucha memoria?</p>
          </div>
          <div className="challenge-item">
            <h4>🎯 Relevancia</h4>
            <p>¿Cómo determinar qué información es importante recordar?</p>
          </div>
        </div>
      </div>

      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          Fundamentos Claros ✓
        </button>
      </div>
    </div>
  );
};

// Lección 2: Memoria de Corto Plazo
const ShortTermMemoryLesson = ({ onComplete }) => {
  const shortTermMemoryCode = `import time
from collections import deque
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
import json

class ConversationMessage:
    """Representa un mensaje en la conversación"""
    
    def __init__(self, role: str, content: str, metadata: Dict[str, Any] = None):
        self.role = role  # 'user', 'assistant', 'system'
        self.content = content
        self.timestamp = datetime.now()
        self.metadata = metadata or {}
        self.importance_score = 1.0  # 0.0 - 1.0
        self.entity_mentions = set()
        self.topics = set()
    
    def to_dict(self):
        return {
            "role": self.role,
            "content": self.content,
            "timestamp": self.timestamp.isoformat(),
            "metadata": self.metadata,
            "importance_score": self.importance_score,
            "entity_mentions": list(self.entity_mentions),
            "topics": list(self.topics)
        }
    
    def __repr__(self):
        return f"Message({self.role}: {self.content[:50]}...)"

class ShortTermMemory:
    """
    Gestiona la memoria de corto plazo para un agente.
    
    Características:
    - Mantiene conversación reciente en ventana deslizante
    - Detecta entidades y temas automáticamente
    - Gestiona contexto de sesión activa
    - Optimiza para velocidad de acceso
    """
    
    def __init__(self, max_messages: int = 50, max_age_hours: int = 2):
        self.max_messages = max_messages
        self.max_age = timedelta(hours=max_age_hours)
        
        # Almacenamiento principal
        self.conversation_history = deque(maxlen=max_messages)
        self.session_context = {}
        self.active_entities = {}  # entidad -> última_mención
        self.current_topics = {}   # topic -> score
        
        # Metadatos de sesión
        self.session_id = self._generate_session_id()
        self.session_start = datetime.now()
        self.last_activity = datetime.now()
        
        # Configuración
        self.entity_decay_hours = 1.0  # Cuándo empiezan a decaer las entidades
        self.topic_decay_factor = 0.9  # Factor de decay por mensaje
        
    def add_message(self, role: str, content: str, metadata: Dict[str, Any] = None):
        """Agregar nuevo mensaje a la memoria de corto plazo"""
        
        # Crear mensaje
        message = ConversationMessage(role, content, metadata)
        
        # Procesar contenido del mensaje
        self._process_message_content(message)
        
        # Calcular importancia
        message.importance_score = self._calculate_importance(message)
        
        # Agregar a historial
        self.conversation_history.append(message)
        
        # Actualizar contexto de sesión
        self._update_session_context(message)
        
        # Limpiar información antigua
        self._cleanup_old_data()
        
        # Actualizar actividad
        self.last_activity = datetime.now()
        
        return message
    
    def get_recent_messages(self, count: int = 10, role_filter: str = None) -> List[ConversationMessage]:
        """Obtener mensajes recientes"""
        messages = list(self.conversation_history)
        
        # Filtrar por rol si se especifica
        if role_filter:
            messages = [msg for msg in messages if msg.role == role_filter]
        
        # Retornar los más recientes
        return messages[-count:] if count > 0 else messages
    
    def get_conversation_window(self, max_tokens: int = 4000) -> List[ConversationMessage]:
        """
        Obtener ventana de conversación que quepa en el límite de tokens.
        Prioriza mensajes más importantes y recientes.
        """
        messages = list(self.conversation_history)
        
        # Estimación simple: ~4 caracteres por token
        current_tokens = 0
        selected_messages = []
        
        # Empezar desde los más recientes
        for message in reversed(messages):
            estimated_tokens = len(message.content) // 4
            
            if current_tokens + estimated_tokens <= max_tokens:
                selected_messages.insert(0, message)  # Insertar al principio
                current_tokens += estimated_tokens
            else:
                # Si no cabe, verificar si es muy importante
                if message.importance_score > 0.8 and estimated_tokens < max_tokens // 4:
                    # Remover mensaje menos importante para hacer espacio
                    if selected_messages:
                        min_importance_idx = min(
                            range(len(selected_messages)),
                            key=lambda i: selected_messages[i].importance_score
                        )
                        if selected_messages[min_importance_idx].importance_score < message.importance_score:
                            removed = selected_messages.pop(min_importance_idx)
                            current_tokens -= len(removed.content) // 4
                            selected_messages.insert(0, message)
                            current_tokens += estimated_tokens
        
        return selected_messages
    
    def get_context_for_query(self, query: str) -> Dict[str, Any]:
        """Obtener contexto relevante para una consulta específica"""
        
        # Extraer entidades y temas de la consulta
        query_entities = self._extract_entities(query)
        query_topics = self._extract_topics(query)
        
        # Buscar mensajes relevantes
        relevant_messages = []
        for message in self.conversation_history:
            relevance_score = 0.0
            
            # Relevancia por entidades compartidas
            entity_overlap = query_entities.intersection(message.entity_mentions)
            relevance_score += len(entity_overlap) * 0.3
            
            # Relevancia por temas compartidos
            topic_overlap = query_topics.intersection(message.topics)
            relevance_score += len(topic_overlap) * 0.2
            
            # Relevancia por contenido similar (simplificado)
            if self._calculate_text_similarity(query, message.content) > 0.5:
                relevance_score += 0.3
            
            # Bonus por importancia y recencia
            relevance_score *= message.importance_score
            age_factor = 1.0 - min(1.0, (datetime.now() - message.timestamp).total_seconds() / 3600)
            relevance_score *= (0.5 + 0.5 * age_factor)
            
            if relevance_score > 0.1:
                relevant_messages.append((message, relevance_score))
        
        # Ordenar por relevancia
        relevant_messages.sort(key=lambda x: x[1], reverse=True)
        
        return {
            "relevant_messages": [msg for msg, score in relevant_messages[:5]],
            "active_entities": {
                entity: info for entity, info in self.active_entities.items()
                if entity in query_entities
            },
            "current_topics": {
                topic: score for topic, score in self.current_topics.items()
                if topic in query_topics
            },
            "session_context": self.session_context.copy()
        }
    
    def _process_message_content(self, message: ConversationMessage):
        """Procesar contenido del mensaje para extraer información"""
        
        # Extraer entidades (simplificado - en producción usarías NER)
        entities = self._extract_entities(message.content)
        message.entity_mentions = entities
        
        # Actualizar entidades activas
        for entity in entities:
            self.active_entities[entity] = {
                "last_mentioned": datetime.now(),
                "mention_count": self.active_entities.get(entity, {}).get("mention_count", 0) + 1,
                "context": message.content[:100] + "..."
            }
        
        # Extraer temas
        topics = self._extract_topics(message.content)
        message.topics = topics
        
        # Actualizar temas actuales con decay
        for topic in self.current_topics:
            self.current_topics[topic] *= self.topic_decay_factor
        
        # Agregar nuevos temas
        for topic in topics:
            self.current_topics[topic] = self.current_topics.get(topic, 0) + 1.0
    
    def _extract_entities(self, text: str) -> set:
        """Extracción simple de entidades (en producción usar spaCy o similar)"""
        import re
        
        entities = set()
        
        # Nombres propios (palabras que empiezan con mayúscula)
        proper_nouns = re.findall(r'\\b[A-Z][a-z]+\\b', text)
        entities.update(proper_nouns)
        
        # Números y fechas
        numbers = re.findall(r'\\b\\d+\\b', text)
        entities.update(numbers)
        
        # Emails
        emails = re.findall(r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b', text)
        entities.update(emails)
        
        return entities
    
    def _extract_topics(self, text: str) -> set:
        """Extracción simple de temas (en producción usar modelos de topic modeling)"""
        # Lista simple de palabras clave por dominio
        topic_keywords = {
            "tecnología": ["python", "código", "api", "desarrollo", "software", "programación"],
            "negocios": ["venta", "cliente", "mercado", "estrategia", "competencia"],
            "personal": ["familia", "casa", "vacaciones", "salud", "hobby"],
            "trabajo": ["proyecto", "equipo", "reunión", "deadline", "presupuesto"],
            "educación": ["curso", "aprender", "estudio", "universidad", "certificación"]
        }
        
        text_lower = text.lower()
        detected_topics = set()
        
        for topic, keywords in topic_keywords.items():
            if any(keyword in text_lower for keyword in keywords):
                detected_topics.add(topic)
        
        return detected_topics
    
    def _calculate_importance(self, message: ConversationMessage) -> float:
        """Calcular la importancia de un mensaje"""
        importance = 0.5  # Base score
        
        # Longitud del mensaje (mensajes más largos pueden ser más importantes)
        length_factor = min(1.0, len(message.content) / 500)
        importance += length_factor * 0.2
        
        # Presencia de entidades (más entidades = más importante)
        entity_factor = min(1.0, len(message.entity_mentions) / 5)
        importance += entity_factor * 0.2
        
        # Palabras clave importantes
        important_keywords = ["importante", "crucial", "recordar", "no olvides", "clave"]
        keyword_score = sum(1 for keyword in important_keywords if keyword in message.content.lower())
        importance += min(0.3, keyword_score * 0.1)
        
        # Rol del mensaje (assistant puede ser menos importante para recordar)
        if message.role == "system":
            importance += 0.1
        elif message.role == "user":
            importance += 0.0  # Neutral
        else:  # assistant
            importance -= 0.1
        
        return max(0.0, min(1.0, importance))
    
    def _calculate_text_similarity(self, text1: str, text2: str) -> float:
        """Calcular similitud simple entre textos"""
        words1 = set(text1.lower().split())
        words2 = set(text2.lower().split())
        
        intersection = words1.intersection(words2)
        union = words1.union(words2)
        
        return len(intersection) / len(union) if union else 0.0
    
    def _update_session_context(self, message: ConversationMessage):
        """Actualizar contexto de sesión basado en el nuevo mensaje"""
        
        # Actualizar último tema discutido
        if message.topics:
            self.session_context["last_topics"] = list(message.topics)
        
        # Actualizar último usuario activo
        if message.role == "user":
            self.session_context["last_user_message"] = {
                "content": message.content,
                "timestamp": message.timestamp.isoformat()
            }
        
        # Contar mensajes por rol
        role_counts = self.session_context.get("message_counts", {})
        role_counts[message.role] = role_counts.get(message.role, 0) + 1
        self.session_context["message_counts"] = role_counts
        
        # Detectar cambios de tema
        if len(self.conversation_history) > 1:
            prev_message = self.conversation_history[-2]
            topic_change = not bool(message.topics.intersection(prev_message.topics))
            if topic_change:
                self.session_context["recent_topic_changes"] = self.session_context.get("recent_topic_changes", 0) + 1
    
    def _cleanup_old_data(self):
        """Limpiar datos antiguos de la memoria"""
        current_time = datetime.now()
        
        # Limpiar entidades inactivas
        entities_to_remove = []
        for entity, info in self.active_entities.items():
            age = current_time - info["last_mentioned"]
            if age > timedelta(hours=self.entity_decay_hours):
                entities_to_remove.append(entity)
        
        for entity in entities_to_remove:
            del self.active_entities[entity]
        
        # Limpiar temas con score muy bajo
        topics_to_remove = [
            topic for topic, score in self.current_topics.items()
            if score < 0.1
        ]
        for topic in topics_to_remove:
            del self.current_topics[topic]
    
    def _generate_session_id(self) -> str:
        """Generar ID único para la sesión"""
        import hashlib
        timestamp = str(time.time())
        return hashlib.md5(timestamp.encode()).hexdigest()[:12]
    
    def get_memory_summary(self) -> Dict[str, Any]:
        """Obtener resumen del estado actual de la memoria"""
        return {
            "session_id": self.session_id,
            "session_duration_minutes": (datetime.now() - self.session_start).total_seconds() / 60,
            "total_messages": len(self.conversation_history),
            "active_entities_count": len(self.active_entities),
            "current_topics_count": len(self.current_topics),
            "most_active_entities": sorted(
                self.active_entities.items(),
                key=lambda x: x[1]["mention_count"],
                reverse=True
            )[:5],
            "top_topics": sorted(
                self.current_topics.items(),
                key=lambda x: x[1],
                reverse=True
            )[:5],
            "session_context": self.session_context
        }

# Ejemplo de uso
def demo_short_term_memory():
    """Demostración del sistema de memoria de corto plazo"""
    
    memory = ShortTermMemory(max_messages=20, max_age_hours=1)
    
    # Simular conversación
    print("=== Simulando conversación ===")
    
    memory.add_message("user", "Hola, soy Ana García y trabajo en marketing digital")
    memory.add_message("assistant", "¡Hola Ana! Es un placer conocerte. El marketing digital es fascinante.")
    memory.add_message("user", "Estoy trabajando en una campaña para nuestro nuevo producto")
    memory.add_message("assistant", "Interesante. ¿Podrías contarme más sobre el producto y tu estrategia?")
    memory.add_message("user", "Es una aplicación móvil para fitness. Queremos targeting a millennials")
    memory.add_message("assistant", "Excelente nicho. Para millennials en fitness, te recomiendo...")
    
    # Mostrar estado de la memoria
    print("\\n=== Estado de la memoria ===")
    summary = memory.get_memory_summary()
    print(f"Duración de sesión: {summary['session_duration_minutes']:.1f} minutos")
    print(f"Total de mensajes: {summary['total_messages']}")
    print(f"Entidades activas: {list(memory.active_entities.keys())}")
    print(f"Temas actuales: {list(memory.current_topics.keys())}")
    
    # Consulta contextual
    print("\\n=== Consulta contextual ===")
    context = memory.get_context_for_query("¿Qué opinas de mi estrategia de marketing?")
    print(f"Mensajes relevantes encontrados: {len(context['relevant_messages'])}")
    for msg in context['relevant_messages']:
        print(f"  - {msg.role}: {msg.content[:50]}...")
    
    # Obtener ventana de conversación optimizada
    print("\\n=== Ventana de conversación optimizada ===")
    window = memory.get_conversation_window(max_tokens=1000)
    print(f"Mensajes en ventana: {len(window)}")
    for msg in window:
        print(f"  - {msg.role}: {msg.content[:40]}... (importancia: {msg.importance_score:.2f})")

if __name__ == "__main__":
    demo_short_term_memory()`;

  const integrationExample = `# Integración con LangChain y LangGraph

from langchain.memory import ConversationBufferWindowMemory
from langchain.schema import BaseMessage, HumanMessage, AIMessage
import json

class LangChainShortTermMemory(ConversationBufferWindowMemory):
    """Extensión de ConversationBufferWindowMemory con funcionalidades avanzadas"""
    
    def __init__(self, k=10, **kwargs):
        super().__init__(k=k, **kwargs)
        self.short_term_memory = ShortTermMemory(max_messages=k*2)
        self.context_extractor = ContextExtractor()
    
    def save_context(self, inputs: dict, outputs: dict):
        """Guardar contexto con procesamiento avanzado"""
        # Llamar al método padre
        super().save_context(inputs, outputs)
        
        # Procesar con nuestro sistema avanzado
        if "input" in inputs:
            self.short_term_memory.add_message("user", inputs["input"])
        
        if "output" in outputs:
            self.short_term_memory.add_message("assistant", outputs["output"])
    
    def get_contextual_messages(self, query: str = None) -> List[BaseMessage]:
        """Obtener mensajes más relevantes para el contexto actual"""
        
        if query:
            # Usar contexto específico para la consulta
            context = self.short_term_memory.get_context_for_query(query)
            relevant_messages = context["relevant_messages"]
        else:
            # Usar ventana optimizada
            relevant_messages = self.short_term_memory.get_conversation_window()
        
        # Convertir a formato LangChain
        langchain_messages = []
        for msg in relevant_messages:
            if msg.role == "user":
                langchain_messages.append(HumanMessage(content=msg.content))
            elif msg.role == "assistant":
                langchain_messages.append(AIMessage(content=msg.content))
        
        return langchain_messages

# Uso con LangGraph
class LangGraphMemoryNode:
    """Nodo de LangGraph que incorpora memoria de corto plazo"""
    
    def __init__(self):
        self.memory = ShortTermMemory()
        self.llm = ChatOpenAI()
    
    def __call__(self, state: dict) -> dict:
        """Procesar estado con memoria contextual"""
        
        # Obtener input del usuario
        user_input = state.get("input", "")
        
        # Agregar mensaje a memoria
        self.memory.add_message("user", user_input)
        
        # Obtener contexto relevante
        context = self.memory.get_context_for_query(user_input)
        
        # Construir prompt con contexto
        context_messages = context["relevant_messages"]
        conversation_context = "\\n".join([
            f"{msg.role}: {msg.content}" for msg in context_messages[-5:]
        ])
        
        prompt = f"""
        Contexto de conversación reciente:
        {conversation_context}
        
        Entidades activas: {list(context['active_entities'].keys())}
        Temas actuales: {list(context['current_topics'].keys())}
        
        Usuario: {user_input}
        Asistente:
        """
        
        # Generar respuesta
        response = self.llm.invoke(prompt).content
        
        # Guardar respuesta en memoria
        self.memory.add_message("assistant", response)
        
        # Actualizar estado
        return {
            **state,
            "output": response,
            "memory_context": context,
            "memory_summary": self.memory.get_memory_summary()
        }`;

  return (
    <div className="lesson">
      <h2>⏰ Memoria de Corto Plazo</h2>
      
      <div className="lesson-section">
        <h3>¿Qué es la Memoria de Corto Plazo en Agentes?</h3>
        <p>
          La memoria de corto plazo mantiene el contexto de la conversación actual, 
          permitiendo al agente recordar lo que se ha discutido recientemente y 
          mantener coherencia en la interacción inmediata.
        </p>
        
        <div className="memory-characteristics">
          <div className="characteristic-card">
            <h4>⚡ Velocidad</h4>
            <p>Acceso ultra-rápido para respuestas inmediatas</p>
          </div>
          <div className="characteristic-card">
            <h4>🔄 Temporal</h4>
            <p>Se limpia automáticamente después de un tiempo</p>
          </div>
          <div className="characteristic-card">
            <h4>📊 Contextual</h4>
            <p>Mantiene entidades y temas de la conversación actual</p>
          </div>
          <div className="characteristic-card">
            <h4>🎯 Relevante</h4>
            <p>Prioriza información más importante y reciente</p>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Componentes de la Memoria de Corto Plazo</h3>
        
        <div className="components-grid">
          <div className="component-card">
            <h4>💬 Historial de Conversación</h4>
            <p>Mensajes recientes con metadatos</p>
            <ul>
              <li>Rol (user/assistant/system)</li>
              <li>Timestamp</li>
              <li>Score de importancia</li>
              <li>Entidades mencionadas</li>
            </ul>
          </div>
          <div className="component-card">
            <h4>🏷️ Entidades Activas</h4>
            <p>Personas, lugares, objetos mencionados</p>
            <ul>
              <li>Nombres propios</li>
              <li>Números y fechas</li>
              <li>Contexto de mención</li>
              <li>Frecuencia de uso</li>
            </ul>
          </div>
          <div className="component-card">
            <h4>📋 Temas Actuales</h4>
            <p>Topics de conversación con scores</p>
            <ul>
              <li>Detección automática</li>
              <li>Score de relevancia</li>
              <li>Decay temporal</li>
              <li>Cambios de tema</li>
            </ul>
          </div>
          <div className="component-card">
            <h4>🎯 Contexto de Sesión</h4>
            <p>Metadatos de la sesión actual</p>
            <ul>
              <li>Duración de sesión</li>
              <li>Estadísticas de mensajes</li>
              <li>Estado de conversación</li>
              <li>Objetivos actuales</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Implementación Completa</h3>
        <p>
          Una implementación robusta de memoria de corto plazo debe manejar múltiples 
          aspectos: almacenamiento eficiente, extracción de información, gestión temporal 
          y recuperación contextual:
        </p>
        
        <CodeBlock
          language="python"
          title="short_term_memory.py"
          code={shortTermMemoryCode}
        />
      </div>

      <div className="lesson-section">
        <h3>🔍 Extractores de Entidades Avanzados</h3>
        <p>
          Los extractores de entidades son fundamentales para identificar información 
          importante en las conversaciones. Veamos implementaciones detalladas para 
          diferentes tipos de entidades:
        </p>

        <div className="entity-extractors">
          <div className="extractor-card">
            <h4>👤 Extractor de Personas</h4>
            <div className="extractor-example">
              <div className="code-block">
                <pre><code>{`def extract_people(text):
    """Extrae nombres de personas y sus contextos"""
    import re
    import spacy
    
    nlp = spacy.load("es_core_news_sm")
    doc = nlp(text)
    
    people = []
    for ent in doc.ents:
        if ent.label_ == "PER":
            context = text[max(0, ent.start_char-50):ent.end_char+50]
            people.append({
                "name": ent.text,
                "context": context.strip(),
                "position": (ent.start_char, ent.end_char),
                "confidence": ent._.confidence if hasattr(ent._, 'confidence') else 0.9
            })
    
    return people

# Ejemplo de uso:
text = "María García del departamento de marketing me comentó que Juan Pérez aprobó el proyecto"
people = extract_people(text)
# Resultado: [
#   {"name": "María García", "context": "...departamento de marketing...", ...},
#   {"name": "Juan Pérez", "context": "...aprobó el proyecto", ...}
# ]`}</code></pre>
              </div>
            </div>
          </div>

          <div className="extractor-card">
            <h4>🏢 Extractor de Organizaciones</h4>
            <div className="extractor-example">
              <div className="code-block">
                <pre><code>{`def extract_organizations(text):
    """Extrae organizaciones, empresas y departamentos"""
    import re
    
    # Patrones para diferentes tipos de organizaciones
    patterns = {
        'companies': r'\\b(?:S\\.A\\.|S\\.L\\.|Corp\\.|Inc\\.|Ltd\\.|Microsoft|Google|Apple)\\b',
        'departments': r'\\b(?:departamento de|división de|área de)\\s+(\\w+)\\b',
        'institutions': r'\\b(?:Universidad|Instituto|Ministerio|Hospital)\\s+([\\w\\s]+)\\b'
    }
    
    organizations = []
    
    for org_type, pattern in patterns.items():
        matches = re.finditer(pattern, text, re.IGNORECASE)
        for match in matches:
            organizations.append({
                "name": match.group().strip(),
                "type": org_type,
                "position": match.span(),
                "context": text[max(0, match.start()-30):match.end()+30]
            })
    
    return organizations

# Ejemplo:
text = "Trabajo en Microsoft en el departamento de IA"
orgs = extract_organizations(text)
# Resultado: [
#   {"name": "Microsoft", "type": "companies", ...},
#   {"name": "departamento de IA", "type": "departments", ...}
# ]`}</code></pre>
              </div>
            </div>
          </div>

          <div className="extractor-card">
            <h4>💰 Extractor de Información Financiera</h4>
            <div className="extractor-example">
              <div className="code-block">
                <pre><code>{`def extract_financial_info(text):
    """Extrae montos, números de cuenta, fechas de pago"""
    import re
    from datetime import datetime
    
    financial_data = []
    
    # Montos monetarios
    money_pattern = r'\\$?([0-9]{1,3}(?:,?[0-9]{3})*)(?:\\.[0-9]{2})?\\s*(?:USD|EUR|€|\\$)?'
    money_matches = re.finditer(money_pattern, text)
    
    for match in money_matches:
        amount_str = match.group(1).replace(',', '')
        try:
            amount = float(amount_str)
            financial_data.append({
                "type": "amount",
                "value": amount,
                "original_text": match.group(),
                "position": match.span()
            })
        except ValueError:
            continue
    
    # Números de cuenta/tarjeta (parcialmente enmascarados)
    account_pattern = r'\\b(?:cuenta|tarjeta|card)\\s*(?:n[úu]mero)?\\s*:?\\s*([\\d\\*]{4}[\\s\\-]?[\\d\\*]{4}[\\s\\-]?[\\d\\*]{4}[\\s\\-]?[\\d\\*]{4})\\b'
    account_matches = re.finditer(account_pattern, text, re.IGNORECASE)
    
    for match in account_matches:
        financial_data.append({
            "type": "account_number",
            "value": match.group(1),
            "masked": True,
            "position": match.span()
        })
    
    return financial_data`}</code></pre>
              </div>
            </div>
          </div>

          <div className="extractor-card">
            <h4>📅 Extractor de Fechas y Horarios</h4>
            <div className="extractor-example">
              <div className="code-block">
                <pre><code>{`def extract_temporal_info(text):
    """Extrae fechas, horarios y períodos temporales"""
    import re
    from datetime import datetime, timedelta
    import dateutil.parser as date_parser
    
    temporal_info = []
    
    # Fechas absolutas
    date_patterns = [
        r'\\b\\d{1,2}[/-]\\d{1,2}[/-]\\d{2,4}\\b',
        r'\\b\\d{4}[/-]\\d{1,2}[/-]\\d{1,2}\\b',
        r'\\b(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\\s+\\d{1,2},?\\s+\\d{4}\\b'
    ]
    
    for pattern in date_patterns:
        matches = re.finditer(pattern, text, re.IGNORECASE)
        for match in matches:
            try:
                parsed_date = date_parser.parse(match.group(), fuzzy=True)
                temporal_info.append({
                    "type": "absolute_date",
                    "value": parsed_date,
                    "original_text": match.group(),
                    "position": match.span()
                })
            except:
                continue
    
    # Fechas relativas
    relative_patterns = {
        r'\\b(?:hoy|today)\\b': 0,
        r'\\b(?:mañana|tomorrow)\\b': 1,
        r'\\b(?:ayer|yesterday)\\b': -1,
        r'\\b(?:la próxima semana|next week)\\b': 7,
        r'\\b(?:la semana pasada|last week)\\b': -7
    }
    
    for pattern, days_offset in relative_patterns.items():
        matches = re.finditer(pattern, text, re.IGNORECASE)
        for match in matches:
            target_date = datetime.now() + timedelta(days=days_offset)
            temporal_info.append({
                "type": "relative_date",
                "value": target_date,
                "offset_days": days_offset,
                "original_text": match.group(),
                "position": match.span()
            })
    
    return temporal_info`}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div className="extraction-tips">
          <h4>💡 Mejores Prácticas para Extracción de Entidades</h4>
          <div className="tips-grid">
            <div className="tip-card">
              <h5>🎯 Precisión vs Recall</h5>
              <p>Balancea entre encontrar todas las entidades (recall) y evitar falsos positivos (precisión)</p>
            </div>
            <div className="tip-card">
              <h5>🔄 Validación Cruzada</h5>
              <p>Usa múltiples métodos (regex + NLP + heurísticas) para mayor confiabilidad</p>
            </div>
            <div className="tip-card">
              <h5>📊 Scores de Confianza</h5>
              <p>Asigna scores de confianza a cada entidad extraída para filtrar resultados</p>
            </div>
            <div className="tip-card">
              <h5>🔒 Privacidad</h5>
              <p>Enmascara o anonimiza información sensible como números de cuenta</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Estrategias de Optimización</h3>
        
        <div className="optimization-strategies">
          <div className="strategy-card">
            <h4>🪟 Ventana Deslizante</h4>
            <p>Mantener solo los N mensajes más recientes</p>
            <div className="strategy-details">
              <strong>Ventajas:</strong> Uso predecible de memoria<br/>
              <strong>Desventajas:</strong> Puede perder contexto importante
            </div>
          </div>
          <div className="strategy-card">
            <h4>⭐ Basada en Importancia</h4>
            <p>Mantener mensajes según score de importancia</p>
            <div className="strategy-details">
              <strong>Ventajas:</strong> Retiene información clave<br/>
              <strong>Desventajas:</strong> Más complejo de implementar
            </div>
          </div>
          <div className="strategy-card">
            <h4>🎯 Contextual Adaptativa</h4>
            <p>Ajustar contenido según la consulta actual</p>
            <div className="strategy-details">
              <strong>Ventajas:</strong> Máxima relevancia<br/>
              <strong>Desventajas:</strong> Requiere procesamiento extra
            </div>
          </div>
          <div className="strategy-card">
            <h4>⏰ Decay Temporal</h4>
            <p>Reducir importancia con el tiempo</p>
            <div className="strategy-details">
              <strong>Ventajas:</strong> Prioriza información reciente<br/>
              <strong>Desventajas:</strong> Puede olvidar contexto válido
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Integración con Frameworks</h3>
        <p>
          La memoria de corto plazo puede integrarse fácilmente con LangChain y LangGraph:
        </p>
        
        <CodeBlock
          language="python"
          title="langchain_integration.py"
          code={integrationExample}
        />
      </div>

      <div className="lesson-section">
        <h3>🛠️ Ejercicio Práctico</h3>
        <div className="hands-on-box">
          <h4>Construye tu Sistema de Memoria de Corto Plazo</h4>
          <p>
            <strong>Objetivo:</strong> Implementar una memoria de corto plazo para un 
            chatbot de atención al cliente que debe recordar detalles de la consulta actual.
          </p>
          
          <p><strong>Requerimientos:</strong></p>
          <ul>
            <li>Mantener últimos 15 mensajes de la conversación</li>
            <li>Detectar automáticamente números de orden, nombres de productos</li>
            <li>Priorizar mensajes con información de contacto</li>
            <li>Identificar cambios de tema (ej: de consulta técnica a facturación)</li>
            <li>Proporcionar contexto relevante para respuestas</li>
          </ul>
          
          <p><strong>Casos de prueba:</strong></p>
          <ol>
            <li>Cliente pregunta por orden #12345</li>
            <li>Proporciona email: cliente@email.com</li>
            <li>Cambia tema a consulta sobre producto diferente</li>
            <li>Vuelve a referenciar la orden original</li>
          </ol>
          
          <div className="checklist">
            <label>
              <input type="checkbox" /> He implementado la clase ShortTermMemory básica
            </label>
            <label>
              <input type="checkbox" /> He agregado detección de entidades específicas del dominio
            </label>
            <label>
              <input type="checkbox" /> He implementado scoring de importancia personalizado
            </label>
            <label>
              <input type="checkbox" /> He probado con los casos de prueba
            </label>
            <label>
              <input type="checkbox" /> He optimizado la recuperación contextual
            </label>
          </div>
        </div>
      </div>

      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          Memoria de Corto Plazo Implementada ✓
        </button>
      </div>
    </div>
  );
};

// Lección 3: Memoria de Largo Plazo
const LongTermMemoryLesson = ({ onComplete }) => {
  const longTermMemoryCode = `import sqlite3
import numpy as np
from typing import Dict, List, Any, Optional, Tuple
from datetime import datetime, timedelta
import json
import hashlib
from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.config import Settings

class LongTermMemory:
    """Sistema de memoria persistente para agentes IA"""
    
    def __init__(self, db_path: str = "agent_memory.db", collection_name: str = "memories"):
        self.db_path = db_path
        self.collection_name = collection_name
        
        # Inicializar base de datos relacional
        self._init_sql_db()
        
        # Inicializar base de datos vectorial
        self.client = chromadb.PersistentClient(path="./chroma_db")
        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            metadata={"hnsw:space": "cosine"}
        )
        
        # Modelo para embeddings
        self.encoder = SentenceTransformer('all-MiniLM-L6-v2')
    
    def _init_sql_db(self):
        """Inicializa la base de datos SQL"""
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS memories (
                    id TEXT PRIMARY KEY,
                    content TEXT NOT NULL,
                    content_type TEXT NOT NULL,
                    created_at TIMESTAMP NOT NULL,
                    last_accessed TIMESTAMP,
                    access_count INTEGER DEFAULT 0,
                    importance_score REAL DEFAULT 1.0,
                    tags TEXT,
                    metadata TEXT
                )
            """)
            
            conn.execute("""
                CREATE TABLE IF NOT EXISTS relationships (
                    id INTEGER PRIMARY KEY,
                    memory_id_1 TEXT,
                    memory_id_2 TEXT,
                    relationship_type TEXT,
                    strength REAL DEFAULT 1.0,
                    created_at TIMESTAMP,
                    FOREIGN KEY (memory_id_1) REFERENCES memories (id),
                    FOREIGN KEY (memory_id_2) REFERENCES memories (id)
                )
            """)
            
            conn.execute("""
                CREATE INDEX IF NOT EXISTS idx_memories_type ON memories(content_type);
                CREATE INDEX IF NOT EXISTS idx_memories_importance ON memories(importance_score);
                CREATE INDEX IF NOT EXISTS idx_memories_created ON memories(created_at);
            """)
    
    def store_memory(self, content: str, content_type: str = "conversation", 
                    tags: List[str] = None, metadata: Dict[str, Any] = None) -> str:
        """Almacena un nuevo recuerdo"""
        # Generar ID único
        memory_id = hashlib.md5(f"{content}{datetime.now()}".encode()).hexdigest()
        
        # Calcular embedding
        embedding = self.encoder.encode([content])[0].tolist()
        
        # Almacenar en base de datos vectorial
        self.collection.add(
            documents=[content],
            embeddings=[embedding],
            ids=[memory_id],
            metadatas=[{
                "content_type": content_type,
                "created_at": datetime.now().isoformat(),
                "tags": ",".join(tags or []),
                **(metadata or {})
            }]
        )
        
        # Almacenar en base de datos relacional
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                INSERT INTO memories 
                (id, content, content_type, created_at, tags, metadata)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (
                memory_id,
                content,
                content_type,
                datetime.now(),
                ",".join(tags or []),
                json.dumps(metadata or {})
            ))
        
        return memory_id
    
    def retrieve_similar(self, query: str, n_results: int = 5, 
                        content_type: str = None) -> List[Dict[str, Any]]:
        """Recupera recuerdos similares usando búsqueda semántica"""
        # Construir filtros
        where_clause = {}
        if content_type:
            where_clause["content_type"] = content_type
        
        # Buscar en base vectorial
        results = self.collection.query(
            query_texts=[query],
            n_results=n_results,
            where=where_clause if where_clause else None
        )
        
        memories = []
        for i, memory_id in enumerate(results['ids'][0]):
            # Actualizar estadísticas de acceso
            self._update_access_stats(memory_id)
            
            # Obtener información completa de SQL
            memory_data = self._get_memory_from_sql(memory_id)
            memory_data.update({
                'similarity_score': 1 - results['distances'][0][i],
                'content': results['documents'][0][i]
            })
            memories.append(memory_data)
        
        return memories
    
    def _update_access_stats(self, memory_id: str):
        """Actualiza estadísticas de acceso"""
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                UPDATE memories 
                SET last_accessed = ?, access_count = access_count + 1
                WHERE id = ?
            """, (datetime.now(), memory_id))
    
    def _get_memory_from_sql(self, memory_id: str) -> Dict[str, Any]:
        """Obtiene datos completos de memoria desde SQL"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.execute("""
                SELECT content_type, created_at, last_accessed, 
                       access_count, importance_score, tags, metadata
                FROM memories WHERE id = ?
            """, (memory_id,))
            row = cursor.fetchone()
            
            if row:
                return {
                    'id': memory_id,
                    'content_type': row[0],
                    'created_at': row[1],
                    'last_accessed': row[2],
                    'access_count': row[3],
                    'importance_score': row[4],
                    'tags': row[5].split(',') if row[5] else [],
                    'metadata': json.loads(row[6]) if row[6] else {}
                }
            return {}

# Ejemplo de uso del sistema de memoria de largo plazo
memory_system = LongTermMemory()

# Almacenar diferentes tipos de información
conversation_id = memory_system.store_memory(
    "El usuario prefiere explicaciones técnicas detalladas",
    content_type="user_preference",
    tags=["preferencias", "comunicación"]
)

fact_id = memory_system.store_memory(
    "Las redes neuronales transformer fueron introducidas en 2017",
    content_type="knowledge",
    tags=["IA", "historia", "transformer"]
)

context_id = memory_system.store_memory(
    "Proyecto: Desarrollo de chatbot para atención al cliente",
    content_type="project_context",
    tags=["proyecto", "chatbot", "contexto"]
)

# Búsqueda semántica
similar_memories = memory_system.retrieve_similar(
    "¿Cómo explicar conceptos técnicos al usuario?",
    n_results=3
)

print("Recuerdos relevantes:")
for memory in similar_memories:
    print(f"Similitud: {memory['similarity_score']:.3f}")
    print(f"Tipo: {memory['content_type']}")
    print(f"Contenido: {memory['content']}")
    print(f"Accesos: {memory['access_count']}")
    print("---")`;

  const vectorDbCode = `# Configuración de ChromaDB para almacenamiento vectorial
import chromadb
from chromadb.config import Settings

# Cliente persistente
client = chromadb.PersistentClient(path="./vector_db")

# Crear colección con configuración específica
collection = client.get_or_create_collection(
    name="agent_memories",
    metadata={
        "hnsw:space": "cosine",  # Métrica de distancia
        "hnsw:M": 16,           # Conectividad del grafo
        "hnsw:ef_construction": 200,  # Tamaño de la lista de candidatos
        "hnsw:ef_search": 100   # Parámetro de búsqueda
    }
)

# Función para indexar documentos
def index_documents(documents, metadatas=None):
    """Indexa documentos en la base vectorial"""
    embeddings = encoder.encode(documents)
    ids = [f"doc_{i}" for i in range(len(documents))]
    
    collection.add(
        documents=documents,
        embeddings=embeddings.tolist(),
        ids=ids,
        metadatas=metadatas or [{}] * len(documents)
    )

# Búsqueda híbrida (semántica + filtros)
def hybrid_search(query, filters=None, n_results=5):
    """Combina búsqueda semántica con filtros de metadatos"""
    return collection.query(
        query_texts=[query],
        n_results=n_results,
        where=filters  # Filtros por metadatos
    )

# Ejemplo de búsqueda con filtros
results = hybrid_search(
    query="programación en Python",
    filters={"content_type": "tutorial"},
    n_results=3
)`;

  const memoryOptimizationCode = `class MemoryOptimizer:
    """Optimiza y gestiona la memoria de largo plazo"""
    
    def __init__(self, memory_system: LongTermMemory):
        self.memory = memory_system
        self.decay_factor = 0.95  # Factor de decaimiento de importancia
        
    def optimize_memory(self):
        """Ejecuta rutinas de optimización de memoria"""
        self._decay_importance()
        self._consolidate_similar_memories()
        self._archive_old_memories()
        self._update_memory_relationships()
    
    def _decay_importance(self):
        """Reduce la importancia de recuerdos no accedidos"""
        cutoff_date = datetime.now() - timedelta(days=30)
        
        with sqlite3.connect(self.memory.db_path) as conn:
            conn.execute("""
                UPDATE memories 
                SET importance_score = importance_score * ?
                WHERE (last_accessed IS NULL OR last_accessed < ?)
                AND importance_score > 0.1
            """, (self.decay_factor, cutoff_date))
    
    def _consolidate_similar_memories(self):
        """Consolida recuerdos muy similares"""
        # Buscar duplicados semánticos
        all_memories = self._get_all_memories()
        
        for i, memory1 in enumerate(all_memories):
            similar = self.memory.retrieve_similar(
                memory1['content'], 
                n_results=3
            )
            
            for sim_memory in similar[1:]:  # Excluir el mismo
                if sim_memory['similarity_score'] > 0.95:
                    self._merge_memories(memory1['id'], sim_memory['id'])
    
    def _archive_old_memories(self):
        """Archiva recuerdos antiguos de baja importancia"""
        cutoff_date = datetime.now() - timedelta(days=90)
        
        with sqlite3.connect(self.memory.db_path) as conn:
            # Mover a tabla de archivo
            conn.execute("""
                INSERT INTO archived_memories 
                SELECT * FROM memories 
                WHERE created_at < ? AND importance_score < 0.2
            """, (cutoff_date,))
            
            # Eliminar de memoria activa
            conn.execute("""
                DELETE FROM memories 
                WHERE created_at < ? AND importance_score < 0.2
            """, (cutoff_date,))
    
    def _update_memory_relationships(self):
        """Actualiza relaciones entre recuerdos"""
        # Implementar detección de patrones y relaciones
        pass`;

  return (
    <div className="lesson">
      <h2>💾 Memoria de Largo Plazo</h2>
      
      <div className="lesson-intro">
        <p>
          La memoria de largo plazo permite a los agentes IA mantener información entre sesiones, 
          construir conocimiento acumulativo y personalizar sus respuestas basándose en 
          interacciones pasadas.
        </p>
      </div>

      <div className="lesson-section">
        <h3>🏗️ Arquitectura de Memoria Persistente</h3>
        <p>
          Un sistema robusto de memoria de largo plazo requiere múltiples componentes trabajando 
          en conjunto para almacenar, indexar y recuperar información de manera eficiente.
        </p>

        <div className="memory-architecture">
          <div className="architecture-layer">
            <h4>🗃️ Capa de Almacenamiento</h4>
            <ul>
              <li><strong>Base de Datos Relacional:</strong> Metadatos, relaciones, estadísticas</li>
              <li><strong>Base de Datos Vectorial:</strong> Embeddings para búsqueda semántica</li>
              <li><strong>Almacenamiento de Archivos:</strong> Documentos, imágenes, audio</li>
            </ul>
          </div>
          
          <div className="architecture-layer">
            <h4>🔍 Capa de Indexación</h4>
            <ul>
              <li><strong>Índices Semánticos:</strong> Embeddings de texto</li>
              <li><strong>Índices Temporales:</strong> Ordenamiento cronológico</li>
              <li><strong>Índices de Metadatos:</strong> Filtrado por atributos</li>
            </ul>
          </div>
          
          <div className="architecture-layer">
            <h4>🎯 Capa de Recuperación</h4>
            <ul>
              <li><strong>Búsqueda Híbrida:</strong> Semántica + exacta</li>
              <li><strong>Filtrado Inteligente:</strong> Relevancia contextual</li>
              <li><strong>Ranking Adaptativo:</strong> Importancia dinámica</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>💻 Implementación del Sistema</h3>
        <p>
          Veamos cómo implementar un sistema completo de memoria de largo plazo que combine 
          almacenamiento relacional con búsqueda vectorial:
        </p>
        
        <CodeBlock code={longTermMemoryCode} language="python" />
      </div>

      <div className="lesson-section">
        <h3>🔍 Bases de Datos Vectoriales</h3>
        <p>
          Las bases de datos vectoriales permiten búsqueda semántica eficiente usando embeddings. 
          ChromaDB es una excelente opción para prototipos y aplicaciones medianas:
        </p>
        
        <CodeBlock code={vectorDbCode} language="python" />

        <div className="vector-db-comparison">
          <h4>📊 Comparación de Bases de Datos Vectoriales</h4>
          <div className="comparison-grid">
            <div className="db-option">
              <h5>ChromaDB</h5>
              <ul>
                <li>✅ Fácil de usar</li>
                <li>✅ Almacenamiento local</li>
                <li>✅ Filtros de metadatos</li>
                <li>⚠️ Escalabilidad limitada</li>
              </ul>
            </div>
            <div className="db-option">
              <h5>Pinecone</h5>
              <ul>
                <li>✅ Altamente escalable</li>
                <li>✅ Servicio gestionado</li>
                <li>✅ Baja latencia</li>
                <li>⚠️ Requiere suscripción</li>
              </ul>
            </div>
            <div className="db-option">
              <h5>Weaviate</h5>
              <ul>
                <li>✅ Open source</li>
                <li>✅ GraphQL API</li>
                <li>✅ Búsqueda híbrida</li>
                <li>⚠️ Configuración compleja</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>⚡ Optimización de Memoria</h3>
        <p>
          Un sistema de memoria efectivo debe gestionar automáticamente el crecimiento 
          y optimizar el rendimiento a lo largo del tiempo:
        </p>
        
        <CodeBlock code={memoryOptimizationCode} language="python" />

        <div className="optimization-strategies">
          <h4>🎯 Estrategias de Optimización</h4>
          <div className="strategies-grid">
            <div className="strategy-card">
              <h5>⏰ Decaimiento Temporal</h5>
              <p>Reduce la importancia de recuerdos antiguos no accedidos</p>
              <ul>
                <li>Factor de decaimiento configurable</li>
                <li>Preserva recuerdos importantes</li>
                <li>Ejecución automática periódica</li>
              </ul>
            </div>
            
            <div className="strategy-card">
              <h5>🔄 Consolidación</h5>
              <p>Combina recuerdos similares para reducir redundancia</p>
              <ul>
                <li>Detección de duplicados semánticos</li>
                <li>Fusión inteligente de metadatos</li>
                <li>Preservación de relaciones</li>
              </ul>
            </div>
            
            <div className="strategy-card">
              <h5>📦 Archivado</h5>
              <p>Mueve recuerdos antiguos a almacenamiento de largo plazo</p>
              <ul>
                <li>Criterios de edad e importancia</li>
                <li>Acceso bajo demanda</li>
                <li>Compresión de datos</li>
              </ul>
            </div>
            
            <div className="strategy-card">
              <h5>🕸️ Relaciones</h5>
              <p>Mantiene conexiones entre recuerdos relacionados</p>
              <ul>
                <li>Detección automática de patrones</li>
                <li>Fortalecimiento por uso</li>
                <li>Propagación de importancia</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🔒 Consideraciones de Privacidad y Seguridad</h3>
        <div className="privacy-considerations">
          <div className="privacy-item">
            <h4>🔐 Encriptación</h4>
            <p>Todos los datos sensibles deben estar encriptados en reposo y en tránsito</p>
          </div>
          <div className="privacy-item">
            <h4>🗑️ Derecho al Olvido</h4>
            <p>Implementar mecanismos para eliminar completamente información del usuario</p>
          </div>
          <div className="privacy-item">
            <h4>🏷️ Clasificación de Datos</h4>
            <p>Categorizar información por sensibilidad y aplicar políticas apropiadas</p>
          </div>
          <div className="privacy-item">
            <h4>⏱️ Retención Limitada</h4>
            <p>Establecer períodos máximos de retención para diferentes tipos de datos</p>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>📊 Métricas de Rendimiento</h3>
        <div className="performance-metrics">
          <div className="metric-item">
            <h4>⚡ Latencia de Búsqueda</h4>
            <p>Tiempo promedio para recuperar recuerdos relevantes</p>
            <span className="metric-target">Objetivo: &lt; 100ms</span>
          </div>
          <div className="metric-item">
            <h4>🎯 Precisión de Recuperación</h4>
            <p>Relevancia de los recuerdos recuperados</p>
            <span className="metric-target">Objetivo: &gt; 85%</span>
          </div>
          <div className="metric-item">
            <h4>💾 Eficiencia de Almacenamiento</h4>
            <p>Ratio de compresión y deduplicación</p>
            <span className="metric-target">Objetivo: 60% reducción</span>
          </div>
          <div className="metric-item">
            <h4>🔄 Tasa de Acceso</h4>
            <p>Frecuencia de uso de recuerdos almacenados</p>
            <span className="metric-target">Objetivo: &gt; 40%</span>
          </div>
        </div>
      </div>

      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          Memoria Persistente Implementada ✓
        </button>
      </div>
    </div>
  );
};

// Lección 4: Resúmenes Inteligentes
const IntelligentSummariesLesson = ({ onComplete }) => {
  const summarizerCode = `import openai
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
import tiktoken
import re

class IntelligentSummarizer:
    """Sistema de resúmenes inteligentes para conversaciones largas"""
    
    def __init__(self, model: str = "gpt-3.5-turbo", max_tokens: int = 4000):
        self.client = openai.OpenAI()
        self.model = model
        self.max_tokens = max_tokens
        self.encoding = tiktoken.encoding_for_model(model)
        
        # Templates de resúmenes por tipo
        self.summary_templates = {
            "conversation": {
                "system": """Eres un asistente experto en resumir conversaciones. 
                Crea un resumen conciso pero completo que capture:
                1. Temas principales discutidos
                2. Decisiones tomadas
                3. Tareas asignadas
                4. Puntos de seguimiento
                5. Información clave para el contexto futuro""",
                "max_length": 300
            },
            "technical": {
                "system": """Eres un asistente técnico especializado en resumir 
                discusiones técnicas. Enfócate en:
                1. Problemas identificados
                2. Soluciones propuestas
                3. Implementaciones realizadas
                4. Configuraciones importantes
                5. Próximos pasos técnicos""",
                "max_length": 400
            },
            "meeting": {
                "system": """Eres un asistente especializado en actas de reuniones.
                Estructura el resumen con:
                1. Participantes y roles
                2. Agenda cubierta
                3. Decisiones tomadas
                4. Acciones asignadas con responsables
                5. Próxima reunión/seguimiento""",
                "max_length": 350
            }
        }
    
    def summarize_conversation(self, messages: List[Dict[str, Any]], 
                             summary_type: str = "conversation",
                             preserve_entities: bool = True) -> Dict[str, Any]:
        """Crea un resumen inteligente de una conversación"""
        
        # 1. Filtrar y preparar mensajes
        filtered_messages = self._filter_relevant_messages(messages)
        
        # 2. Extraer entidades importantes si se requiere
        entities = []
        if preserve_entities:
            entities = self._extract_entities(filtered_messages)
        
        # 3. Verificar límites de tokens
        conversation_text = self._prepare_conversation_text(filtered_messages)
        
        if self._count_tokens(conversation_text) > self.max_tokens:
            # Usar resumen jerárquico para conversaciones muy largas
            return self._hierarchical_summarize(filtered_messages, summary_type, entities)
        else:
            # Resumen directo
            return self._direct_summarize(conversation_text, summary_type, entities)
    
    def _filter_relevant_messages(self, messages: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Filtra mensajes relevantes para el resumen"""
        filtered = []
        
        for msg in messages:
            # Filtrar mensajes del sistema redundantes
            if msg.get('role') == 'system' and len(msg.get('content', '')) < 50:
                continue
                
            # Filtrar confirmaciones simples
            content = msg.get('content', '').strip().lower()
            if content in ['ok', 'sí', 'no', 'gracias', 'entendido', '👍']:
                continue
                
            # Filtrar mensajes muy cortos que no aportan contexto
            if len(content) < 20:
                continue
                
            filtered.append(msg)
        
        return filtered
    
    def _extract_entities(self, messages: List[Dict[str, Any]]) -> List[str]:
        """Extrae entidades importantes de la conversación"""
        text = " ".join([msg.get('content', '') for msg in messages])
        
        # Patrones para extraer entidades
        patterns = {
            'emails': r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b',
            'urls': r'https?://(?:[-\\w.])+(?:[:\\d]+)?(?:/(?:[\\w/_.])*(?:\\?(?:[\\w&=%.])*)?(?:#(?:[\\w.])*)?)?',
            'dates': r'\\b(?:\\d{1,2}[/-]\\d{1,2}[/-]\\d{2,4}|\\d{2,4}[/-]\\d{1,2}[/-]\\d{1,2})\\b',
            'times': r'\\b(?:\\d{1,2}:\\d{2}(?::\\d{2})?(?:\\s?[AaPp][Mm])?)\\b',
            'phones': r'\\b(?:\\+?\\d{1,3}[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}\\b',
            'mentions': r'@\\w+',
            'hashtags': r'#\\w+',
            'codes': r'\\b[A-Z]{2,}[-_]?\\d{2,}\\b'
        }
        
        entities = []
        for entity_type, pattern in patterns.items():
            matches = re.findall(pattern, text, re.IGNORECASE)
            entities.extend([(entity_type, match) for match in matches])
        
        return list(set(entities))  # Eliminar duplicados
    
    def _prepare_conversation_text(self, messages: List[Dict[str, Any]]) -> str:
        """Prepara el texto de la conversación para resumen"""
        formatted_messages = []
        
        for i, msg in enumerate(messages):
            role = msg.get('role', 'unknown')
            content = msg.get('content', '')
            timestamp = msg.get('timestamp', '')
            
            # Formatear según el rol
            if role == 'user':
                prefix = f"Usuario ({timestamp}):"
            elif role == 'assistant':
                prefix = f"Asistente ({timestamp}):"
            else:
                prefix = f"{role.title()} ({timestamp}):"
            
            formatted_messages.append(f"{prefix} {content}")
        
        return "\\n\\n".join(formatted_messages)
    
    def _count_tokens(self, text: str) -> int:
        """Cuenta tokens en el texto"""
        return len(self.encoding.encode(text))
    
    def _direct_summarize(self, conversation_text: str, 
                         summary_type: str, entities: List[str]) -> Dict[str, Any]:
        """Crea resumen directo de la conversación"""
        template = self.summary_templates.get(summary_type, 
                                            self.summary_templates["conversation"])
        
        # Construir prompt con entidades
        entities_text = ""
        if entities:
            entities_text = f"\\n\\nEntidades importantes a preservar: {', '.join([f'{e[1]} ({e[0]})' for e in entities[:10]])}"
        
        messages = [
            {"role": "system", "content": template["system"] + entities_text},
            {"role": "user", "content": f"Conversación a resumir:\\n\\n{conversation_text}"}
        ]
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=template["max_length"],
                temperature=0.3
            )
            
            summary = response.choices[0].message.content.strip()
            
            return {
                "summary": summary,
                "type": summary_type,
                "entities": entities,
                "method": "direct",
                "original_length": len(conversation_text),
                "summary_length": len(summary),
                "compression_ratio": len(summary) / len(conversation_text),
                "created_at": datetime.now().isoformat()
            }
            
        except Exception as e:
            return {
                "error": f"Error al crear resumen: {str(e)}",
                "summary": "Error en la generación del resumen",
                "type": summary_type,
                "method": "direct"
            }
    
    def _hierarchical_summarize(self, messages: List[Dict[str, Any]], 
                              summary_type: str, entities: List[str]) -> Dict[str, Any]:
        """Resumen jerárquico para conversaciones muy largas"""
        
        # 1. Dividir en chunks
        chunks = self._split_into_chunks(messages)
        
        # 2. Resumir cada chunk
        chunk_summaries = []
        for i, chunk in enumerate(chunks):
            chunk_text = self._prepare_conversation_text(chunk)
            chunk_summary = self._direct_summarize(
                chunk_text, 
                summary_type, 
                entities
            )
            chunk_summaries.append({
                "chunk_id": i,
                "summary": chunk_summary.get("summary", ""),
                "messages_count": len(chunk)
            })
        
        # 3. Crear resumen final de los resúmenes
        combined_summaries = "\\n\\n".join([
            f"Sección {cs['chunk_id'] + 1} ({cs['messages_count']} mensajes): {cs['summary']}"
            for cs in chunk_summaries
        ])
        
        final_summary = self._direct_summarize(
            combined_summaries, 
            summary_type, 
            entities
        )
        
        return {
            **final_summary,
            "method": "hierarchical",
            "chunks_count": len(chunks),
            "chunk_summaries": chunk_summaries
        }
    
    def _split_into_chunks(self, messages: List[Dict[str, Any]], 
                          max_chunk_tokens: int = 2000) -> List[List[Dict[str, Any]]]:
        """Divide mensajes en chunks por límite de tokens"""
        chunks = []
        current_chunk = []
        current_tokens = 0
        
        for msg in messages:
            msg_tokens = self._count_tokens(msg.get('content', ''))
            
            if current_tokens + msg_tokens > max_chunk_tokens and current_chunk:
                chunks.append(current_chunk)
                current_chunk = [msg]
                current_tokens = msg_tokens
            else:
                current_chunk.append(msg)
                current_tokens += msg_tokens
        
        if current_chunk:
            chunks.append(current_chunk)
        
        return chunks

# Ejemplo de uso del sistema de resúmenes
summarizer = IntelligentSummarizer()

# Mensajes de ejemplo
messages = [
    {
        "role": "user",
        "content": "Necesito ayuda para implementar un sistema de autenticación en mi app web",
        "timestamp": "2024-01-15 10:00:00"
    },
    {
        "role": "assistant", 
        "content": "Te puedo ayudar. ¿Qué tipo de autenticación prefieres? JWT, OAuth, o sesiones tradicionales?",
        "timestamp": "2024-01-15 10:00:30"
    },
    {
        "role": "user",
        "content": "Creo que JWT sería mejor. Es para una API REST con React frontend",
        "timestamp": "2024-01-15 10:01:00"
    },
    {
        "role": "assistant",
        "content": "Perfecto. Para JWT necesitarás: 1) Endpoint de login que genere el token, 2) Middleware para validar tokens, 3) Refresh token para renovación. ¿Qué backend usas?",
        "timestamp": "2024-01-15 10:01:45"
    }
]

# Crear resumen técnico
summary_result = summarizer.summarize_conversation(
    messages=messages,
    summary_type="technical",
    preserve_entities=True
)

print("Resumen generado:")
print(f"Tipo: {summary_result['type']}")
print(f"Método: {summary_result['method']}")
print(f"Ratio de compresión: {summary_result['compression_ratio']:.2f}")
print(f"Resumen: {summary_result['summary']}")
print(f"Entidades: {summary_result['entities']}")`;

  const progressiveSummaryCode = `class ProgressiveSummarizer:
    """Sistema de resúmenes progresivos que se actualiza incrementalmente"""
    
    def __init__(self, base_summarizer: IntelligentSummarizer):
        self.base_summarizer = base_summarizer
        self.conversation_summaries = {}  # Cache de resúmenes por conversación
        
    def update_summary(self, conversation_id: str, 
                      new_messages: List[Dict[str, Any]],
                      update_threshold: int = 10) -> Dict[str, Any]:
        """Actualiza resumen existente con nuevos mensajes"""
        
        # Obtener resumen existente
        existing_summary = self.conversation_summaries.get(conversation_id)
        
        if not existing_summary:
            # Primera vez - crear resumen completo
            return self._create_initial_summary(conversation_id, new_messages)
        
        # Verificar si necesita actualización
        if len(new_messages) < update_threshold:
            # Pocos mensajes nuevos - actualización incremental
            return self._incremental_update(conversation_id, existing_summary, new_messages)
        else:
            # Muchos mensajes nuevos - re-resumir todo
            return self._full_update(conversation_id, new_messages)
    
    def _create_initial_summary(self, conversation_id: str, 
                              messages: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Crea el resumen inicial de una conversación"""
        summary = self.base_summarizer.summarize_conversation(messages)
        
        # Cachear el resumen
        self.conversation_summaries[conversation_id] = {
            **summary,
            "message_count": len(messages),
            "last_update": datetime.now(),
            "version": 1
        }
        
        return self.conversation_summaries[conversation_id]
    
    def _incremental_update(self, conversation_id: str,
                          existing_summary: Dict[str, Any],
                          new_messages: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Actualización incremental con pocos mensajes nuevos"""
        
        # Resumir solo los nuevos mensajes
        new_summary = self.base_summarizer.summarize_conversation(new_messages)
        
        # Combinar resúmenes
        combined_text = f"""
        Resumen existente: {existing_summary['summary']}
        
        Nuevos desarrollos: {new_summary['summary']}
        """
        
        # Crear resumen consolidado
        consolidated = self.base_summarizer._direct_summarize(
            combined_text, 
            existing_summary.get('type', 'conversation'),
            existing_summary.get('entities', [])
        )
        
        # Actualizar cache
        updated_summary = {
            **consolidated,
            "message_count": existing_summary["message_count"] + len(new_messages),
            "last_update": datetime.now(),
            "version": existing_summary["version"] + 1,
            "update_method": "incremental"
        }
        
        self.conversation_summaries[conversation_id] = updated_summary
        return updated_summary`;

  const multiModalSummaryCode = `class MultiModalSummarizer:
    """Resúmenes que incluyen diferentes tipos de contenido"""
    
    def __init__(self):
        self.content_processors = {
            'text': self._process_text,
            'code': self._process_code,
            'image': self._process_image_description,
            'file': self._process_file_reference,
            'link': self._process_link_content
        }
    
    def create_rich_summary(self, messages: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Crea resumen rico incluyendo múltiples tipos de contenido"""
        
        # Categorizar contenido por tipo
        content_by_type = {
            'text': [],
            'code': [],
            'images': [],
            'files': [],
            'links': []
        }
        
        for msg in messages:
            content_type = self._detect_content_type(msg)
            processed_content = self.content_processors[content_type](msg)
            content_by_type[content_type].append(processed_content)
        
        # Crear resúmenes específicos por tipo
        summaries = {}
        for content_type, items in content_by_type.items():
            if items:
                summaries[content_type] = self._summarize_by_type(content_type, items)
        
        # Combinar en resumen unificado
        unified_summary = self._create_unified_summary(summaries)
        
        return {
            "unified_summary": unified_summary,
            "content_breakdown": summaries,
            "content_stats": {k: len(v) for k, v in content_by_type.items()},
            "created_at": datetime.now().isoformat()
        }
    
    def _detect_content_type(self, message: Dict[str, Any]) -> str:
        """Detecta el tipo de contenido del mensaje"""
        content = message.get('content', '')
        
        # Detectar código
        if '```' in content or message.get('metadata', {}).get('type') == 'code':
            return 'code'
        
        # Detectar referencias a archivos
        if any(ext in content.lower() for ext in ['.pdf', '.doc', '.txt', '.csv', '.xlsx']):
            return 'file'
        
        # Detectar enlaces
        if 'http://' in content or 'https://' in content:
            return 'link'
        
        # Detectar descripciones de imágenes
        if message.get('metadata', {}).get('has_image') or 'imagen' in content.lower():
            return 'image'
        
        return 'text'
    
    def _process_code(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """Procesa contenido de código"""
        content = message.get('content', '')
        
        # Extraer bloques de código
        code_blocks = re.findall(r'```(?:\\w+)?\\n(.*?)```', content, re.DOTALL)
        
        # Detectar lenguaje de programación
        language = 'unknown'
        if '```python' in content:
            language = 'python'
        elif '```javascript' in content:
            language = 'javascript'
        elif '```sql' in content:
            language = 'sql'
        
        return {
            "type": "code",
            "language": language,
            "blocks_count": len(code_blocks),
            "total_lines": sum(block.count('\\n') for block in code_blocks),
            "content_preview": code_blocks[0][:200] if code_blocks else "",
            "timestamp": message.get('timestamp')
        }`;

  return (
    <div className="lesson">
      <h2>📝 Resúmenes Inteligentes</h2>
      
      <div className="lesson-intro">
        <p>
          Los resúmenes inteligentes son esenciales para gestionar conversaciones largas, 
          mantener contexto relevante y reducir costos de procesamiento sin perder 
          información importante.
        </p>
      </div>

      <div className="lesson-section">
        <h3>🎯 ¿Por qué Necesitamos Resúmenes Inteligentes?</h3>
        
        <div className="summary-benefits">
          <div className="benefit-card">
            <h4>💰 Reducción de Costos</h4>
            <p>Menor uso de tokens en APIs de LLM</p>
            <ul>
              <li>Conversaciones largas → resúmenes concisos</li>
              <li>Menos tokens = menor costo por request</li>
              <li>Optimización de recursos computacionales</li>
            </ul>
          </div>
          
          <div className="benefit-card">
            <h4>⚡ Mejor Rendimiento</h4>
            <p>Respuestas más rápidas y eficientes</p>
            <ul>
              <li>Menos tiempo de procesamiento</li>
              <li>Menor latencia en respuestas</li>
              <li>Mejor experiencia de usuario</li>
            </ul>
          </div>
          
          <div className="benefit-card">
            <h4>🎯 Contexto Relevante</h4>
            <p>Mantiene información clave</p>
            <ul>
              <li>Preserva decisiones importantes</li>
              <li>Conserva entidades mencionadas</li>
              <li>Elimina ruido conversacional</li>
            </ul>
          </div>
          
          <div className="benefit-card">
            <h4>📈 Escalabilidad</h4>
            <p>Gestiona conversaciones de cualquier tamaño</p>
            <ul>
              <li>Resúmenes jerárquicos para chats largos</li>
              <li>Actualización incremental</li>
              <li>Compresión inteligente de información</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>💻 Sistema Completo de Resúmenes</h3>
        <p>
          Implementemos un sistema robusto que maneja diferentes tipos de conversaciones 
          y preserva información crítica:
        </p>
        
        <CodeBlock code={summarizerCode} language="python" />
      </div>

      <div className="lesson-section">
        <h3>🔄 Resúmenes Progresivos</h3>
        <p>
          Para conversaciones en curso, necesitamos un sistema que actualice resúmenes 
          incrementalmente sin re-procesar toda la conversación:
        </p>
        
        <CodeBlock code={progressiveSummaryCode} language="python" />

        <div className="progressive-strategies">
          <h4>📊 Estrategias de Actualización</h4>
          <div className="strategies-comparison">
            <div className="strategy-option">
              <h5>🔄 Incremental</h5>
              <p><strong>Cuándo:</strong> Pocos mensajes nuevos (&lt;10)</p>
              <ul>
                <li>✅ Muy eficiente</li>
                <li>✅ Conserva contexto</li>
                <li>⚠️ Puede acumular ruido</li>
              </ul>
            </div>
            
            <div className="strategy-option">
              <h5>🔃 Completa</h5>
              <p><strong>Cuándo:</strong> Muchos mensajes nuevos (≥10)</p>
              <ul>
                <li>✅ Resumen fresco</li>
                <li>✅ Elimina información obsoleta</li>
                <li>⚠️ Más costoso computacionalmente</li>
              </ul>
            </div>
            
            <div className="strategy-option">
              <h5>⏰ Temporal</h5>
              <p><strong>Cuándo:</strong> Intervalos regulares</p>
              <ul>
                <li>✅ Predecible</li>
                <li>✅ Mantiene frescura</li>
                <li>⚠️ Puede ser innecesario</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🎨 Resúmenes Multi-Modal</h3>
        <p>
          Las conversaciones modernas incluyen texto, código, imágenes y archivos. 
          Nuestro sistema debe manejar todos estos tipos de contenido:
        </p>
        
        <CodeBlock code={multiModalSummaryCode} language="python" />

        <div className="content-types">
          <h4>📋 Tipos de Contenido Soportados</h4>
          <div className="content-grid">
            <div className="content-type">
              <h5>📝 Texto</h5>
              <p>Conversación natural, decisiones, conclusiones</p>
              <div className="processing-method">
                <strong>Procesamiento:</strong> Análisis semántico, extracción de temas
              </div>
            </div>
            
            <div className="content-type">
              <h5>💻 Código</h5>
              <p>Snippets, funciones, configuraciones</p>
              <div className="processing-method">
                <strong>Procesamiento:</strong> Detección de lenguaje, funcionalidad
              </div>
            </div>
            
            <div className="content-type">
              <h5>🖼️ Imágenes</h5>
              <p>Screenshots, diagramas, mockups</p>
              <div className="processing-method">
                <strong>Procesamiento:</strong> Descripción visual, elementos clave
              </div>
            </div>
            
            <div className="content-type">
              <h5>📎 Archivos</h5>
              <p>Documentos, PDFs, spreadsheets</p>
              <div className="processing-method">
                <strong>Procesamiento:</strong> Metadatos, contenido principal
              </div>
            </div>
            
            <div className="content-type">
              <h5>🔗 Enlaces</h5>
              <p>URLs, referencias externas</p>
              <div className="processing-method">
                <strong>Procesamiento:</strong> Contenido web, relevancia
              </div>
            </div>
            
            <div className="content-type">
              <h5>📊 Datos</h5>
              <p>Tablas, métricas, estadísticas</p>
              <div className="processing-method">
                <strong>Procesamiento:</strong> Tendencias, insights clave
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>⚙️ Configuración y Personalización</h3>
        <div className="configuration-options">
          <div className="config-category">
            <h4>📏 Longitud de Resúmenes</h4>
            <div className="config-options">
              <div className="config-option">
                <span className="option-name">Breve:</span>
                <span className="option-value">50-100 palabras</span>
                <span className="option-use">Para actualizaciones rápidas</span>
              </div>
              <div className="config-option">
                <span className="option-name">Estándar:</span>
                <span className="option-value">200-300 palabras</span>
                <span className="option-use">Para la mayoría de casos</span>
              </div>
              <div className="config-option">
                <span className="option-name">Detallado:</span>
                <span className="option-value">400-500 palabras</span>
                <span className="option-use">Para conversaciones complejas</span>
              </div>
            </div>
          </div>
          
          <div className="config-category">
            <h4>🎯 Nivel de Detalle</h4>
            <div className="config-options">
              <div className="config-option">
                <span className="option-name">Ejecutivo:</span>
                <span className="option-value">Solo decisiones clave</span>
                <span className="option-use">Para reportes de alto nivel</span>
              </div>
              <div className="config-option">
                <span className="option-name">Técnico:</span>
                <span className="option-value">Implementaciones y soluciones</span>
                <span className="option-use">Para desarrolladores</span>
              </div>
              <div className="config-option">
                <span className="option-name">Completo:</span>
                <span className="option-value">Todos los aspectos relevantes</span>
                <span className="option-use">Para documentación</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🧠 Selección Inteligente del Tipo de Resumen</h3>
        <p>
          El sistema debe elegir automáticamente el tipo de resumen más apropiado según 
          el contexto, contenido y objetivo. Veamos cómo implementar esta lógica de selección:
        </p>

        <div className="summary-selection-system">
          <div className="selection-flow">
            <h4>🔄 Flujo de Decisión</h4>
            <div className="decision-tree">
              <div className="decision-node">
                <div className="decision-question">¿Cuál es la longitud del contenido?</div>
                <div className="decision-branches">
                  <div className="branch">
                    <span className="branch-condition">&lt; 500 palabras</span>
                    <span className="branch-result">→ Resumen Extractivo</span>
                  </div>
                  <div className="branch">
                    <span className="branch-condition">500-2000 palabras</span>
                    <span className="branch-result">→ Resumen Híbrido</span>
                  </div>
                  <div className="branch">
                    <span className="branch-condition">&gt; 2000 palabras</span>
                    <span className="branch-result">→ Resumen Abstractivo</span>
                  </div>
                </div>
              </div>

              <div className="decision-node">
                <div className="decision-question">¿Cuál es el tipo de contenido?</div>
                <div className="decision-branches">
                  <div className="branch">
                    <span className="branch-condition">Conversación casual</span>
                    <span className="branch-result">→ Resumen Temático</span>
                  </div>
                  <div className="branch">
                    <span className="branch-condition">Reunión de trabajo</span>
                    <span className="branch-result">→ Resumen de Decisiones</span>
                  </div>
                  <div className="branch">
                    <span className="branch-condition">Soporte técnico</span>
                    <span className="branch-result">→ Resumen de Soluciones</span>
                  </div>
                  <div className="branch">
                    <span className="branch-condition">Documentación</span>
                    <span className="branch-result">→ Resumen Estructurado</span>
                  </div>
                </div>
              </div>

              <div className="decision-node">
                <div className="decision-question">¿Cuál es la urgencia?</div>
                <div className="decision-branches">
                  <div className="branch">
                    <span className="branch-condition">Alta urgencia</span>
                    <span className="branch-result">→ Resumen Bullet Points</span>
                  </div>
                  <div className="branch">
                    <span className="branch-condition">Media urgencia</span>
                    <span className="branch-result">→ Resumen Estándar</span>
                  </div>
                  <div className="branch">
                    <span className="branch-condition">Baja urgencia</span>
                    <span className="branch-result">→ Resumen Detallado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="implementation-example">
            <h4>⚙️ Implementación del Selector</h4>
            <div className="code-block">
              <pre><code>{`class SummaryTypeSelector:
    def __init__(self):
        self.content_analyzers = {
            'length': self._analyze_length,
            'complexity': self._analyze_complexity,
            'domain': self._analyze_domain,
            'urgency': self._analyze_urgency,
            'audience': self._analyze_audience
        }
        
        # Matriz de decisión: contexto -> tipo de resumen
        self.decision_matrix = {
            ('short', 'simple', 'casual', 'low', 'general'): 'extractive',
            ('medium', 'moderate', 'business', 'medium', 'professional'): 'hybrid',
            ('long', 'complex', 'technical', 'high', 'expert'): 'abstractive_detailed',
            ('any', 'any', 'support', 'high', 'any'): 'solution_focused',
            ('any', 'any', 'meeting', 'any', 'business'): 'decision_focused'
        }
    
    def select_summary_type(self, content: str, metadata: dict = None) -> dict:
        """Selecciona el tipo de resumen más apropiado"""
        
        # Analizar todas las dimensiones
        analysis = {}
        for dimension, analyzer in self.content_analyzers.items():
            analysis[dimension] = analyzer(content, metadata)
        
        # Encontrar la mejor coincidencia en la matriz
        best_match = self._find_best_match(analysis)
        
        # Configurar parámetros específicos
        config = self._configure_summary_params(best_match, analysis)
        
        return {
            'type': best_match,
            'config': config,
            'reasoning': self._explain_selection(analysis, best_match),
            'confidence': self._calculate_confidence(analysis, best_match)
        }
    
    def _analyze_length(self, content: str, metadata: dict) -> str:
        """Analiza la longitud del contenido"""
        word_count = len(content.split())
        if word_count < 200:
            return 'short'
        elif word_count < 1000:
            return 'medium'
        else:
            return 'long'
    
    def _analyze_complexity(self, content: str, metadata: dict) -> str:
        """Analiza la complejidad del contenido"""
        # Métricas de complejidad
        avg_sentence_length = len(content.split()) / (content.count('.') + 1)
        technical_terms = len(re.findall(r'\\b(?:API|SDK|framework|algorithm|implementation)\\b', content, re.I))
        
        complexity_score = avg_sentence_length * 0.1 + technical_terms * 0.3
        
        if complexity_score < 2:
            return 'simple'
        elif complexity_score < 5:
            return 'moderate'
        else:
            return 'complex'
    
    def _analyze_domain(self, content: str, metadata: dict) -> str:
        """Identifica el dominio/contexto del contenido"""
        domain_keywords = {
            'technical': ['código', 'API', 'bug', 'error', 'implementación', 'desarrollo'],
            'business': ['reunión', 'proyecto', 'presupuesto', 'cliente', 'venta', 'estrategia'],
            'support': ['problema', 'ayuda', 'solución', 'ticket', 'incidente', 'resolver'],
            'casual': ['hola', 'gracias', 'saludos', 'cómo estás', 'charla', 'conversación']
        }
        
        content_lower = content.lower()
        domain_scores = {}
        
        for domain, keywords in domain_keywords.items():
            score = sum(1 for keyword in keywords if keyword in content_lower)
            domain_scores[domain] = score
        
        return max(domain_scores, key=domain_scores.get) if domain_scores else 'general'
    
    def _configure_summary_params(self, summary_type: str, analysis: dict) -> dict:
        """Configura parámetros específicos para cada tipo"""
        base_configs = {
            'extractive': {
                'max_sentences': 3,
                'include_keywords': True,
                'preserve_order': True
            },
            'abstractive_detailed': {
                'max_words': 300,
                'include_examples': True,
                'technical_depth': 'high'
            },
            'hybrid': {
                'extractive_ratio': 0.4,
                'abstractive_ratio': 0.6,
                'max_words': 200
            },
            'solution_focused': {
                'highlight_solutions': True,
                'include_steps': True,
                'format': 'numbered_list'
            },
            'decision_focused': {
                'highlight_decisions': True,
                'include_action_items': True,
                'format': 'structured'
            }
        }
        
        config = base_configs.get(summary_type, base_configs['hybrid']).copy()
        
        # Ajustar según análisis
        if analysis['urgency'] == 'high':
            config['max_words'] = min(config.get('max_words', 200), 100)
            config['format'] = 'bullet_points'
        
        if analysis['audience'] == 'expert':
            config['technical_depth'] = 'high'
            config['include_details'] = True
        
        return config

# Ejemplo de uso
selector = SummaryTypeSelector()
result = selector.select_summary_type(
    content="En nuestra reunión de hoy discutimos el bug crítico en la API de pagos...",
    metadata={"urgency": "high", "participants": ["dev_team", "product_manager"]}
)

print(f"Tipo recomendado: {result['type']}")
print(f"Configuración: {result['config']}")
print(f"Razonamiento: {result['reasoning']}")
print(f"Confianza: {result['confidence']:.2f}")`}</code></pre>
            </div>
          </div>

          <div className="selection-examples">
            <h4>📝 Ejemplos de Selección</h4>
            <div className="example-scenarios">
              <div className="scenario-card">
                <h5>📞 Soporte al Cliente</h5>
                <div className="scenario-content">
                  <p><strong>Entrada:</strong> "El cliente reporta error 500 en checkout. Probé reiniciar el servicio..."</p>
                  <p><strong>Análisis:</strong> Dominio=soporte, Urgencia=alta, Complejidad=moderada</p>
                  <p><strong>Selección:</strong> solution_focused</p>
                  <p><strong>Resultado:</strong> Lista numerada con pasos de solución</p>
                </div>
              </div>

              <div className="scenario-card">
                <h5>💼 Reunión Ejecutiva</h5>
                <div className="scenario-content">
                  <p><strong>Entrada:</strong> "Discutimos el Q4 roadmap, aprobamos budget adicional..."</p>
                  <p><strong>Análisis:</strong> Dominio=business, Audiencia=ejecutiva, Longitud=media</p>
                  <p><strong>Selección:</strong> decision_focused</p>
                  <p><strong>Resultado:</strong> Decisiones clave y action items</p>
                </div>
              </div>

              <div className="scenario-card">
                <h5>💬 Chat Casual</h5>
                <div className="scenario-content">
                  <p><strong>Entrada:</strong> "Hola, ¿cómo vas con el proyecto? Todo bien por aquí..."</p>
                  <p><strong>Análisis:</strong> Dominio=casual, Longitud=corta, Complejidad=simple</p>
                  <p><strong>Selección:</strong> extractive</p>
                  <p><strong>Resultado:</strong> Frases clave extraídas directamente</p>
                </div>
              </div>

              <div className="scenario-card">
                <h5>📚 Documentación Técnica</h5>
                <div className="scenario-content">
                  <p><strong>Entrada:</strong> "La nueva API incluye endpoints para authentication, rate limiting..."</p>
                  <p><strong>Análisis:</strong> Dominio=técnico, Longitud=larga, Audiencia=desarrolladores</p>
                  <p><strong>Selección:</strong> abstractive_detailed</p>
                  <p><strong>Resultado:</strong> Resumen comprehensivo con ejemplos técnicos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>📊 Métricas de Calidad</h3>
        <div className="quality-metrics">
          <div className="metric-card">
            <h4>🎯 Cobertura</h4>
            <p>¿Se capturan todos los temas importantes?</p>
            <div className="metric-details">
              <strong>Medición:</strong> Porcentaje de conceptos clave incluidos
            </div>
          </div>
          
          <div className="metric-card">
            <h4>📏 Compresión</h4>
            <p>¿Qué tan eficiente es la reducción de tamaño?</p>
            <div className="metric-details">
              <strong>Target:</strong> 70-90% de reducción manteniendo calidad
            </div>
          </div>
          
          <div className="metric-card">
            <h4>✅ Precisión</h4>
            <p>¿La información resumida es correcta?</p>
            <div className="metric-details">
              <strong>Validación:</strong> Comparación con ground truth
            </div>
          </div>
          
          <div className="metric-card">
            <h4>⚡ Velocidad</h4>
            <p>¿Qué tan rápido se genera el resumen?</p>
            <div className="metric-details">
              <strong>Objetivo:</strong> &lt;5 segundos para conversaciones típicas
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          Resúmenes Implementados ✓
        </button>
      </div>
    </div>
  );
};

// Lección 5: Retrieval de Contexto
const ContextRetrievalLesson = ({ onComplete }) => {
  const contextRetrievalCode = `import numpy as np
from typing import List, Dict, Any, Optional, Tuple
from dataclasses import dataclass
from datetime import datetime, timedelta
import faiss
import sqlite3
from sentence_transformers import SentenceTransformer
import json

@dataclass
class ContextWindow:
    """Representa una ventana de contexto optimizada"""
    content: str
    relevance_score: float
    timestamp: datetime
    content_type: str
    tokens: int
    priority: int = 1

class HybridContextRetriever:
    """Sistema híbrido de recuperación de contexto"""
    
    def __init__(self, max_context_tokens: int = 8000, 
                 embedding_model: str = "all-MiniLM-L6-v2"):
        self.max_context_tokens = max_context_tokens
        self.encoder = SentenceTransformer(embedding_model)
        
        # Índice FAISS para búsqueda vectorial rápida
        self.vector_index = None
        self.document_store = {}  # Cache de documentos
        
        # Base de datos para metadatos
        self.db_path = "context_retrieval.db"
        self._init_db()
        
        # Configuración de retrieval
        self.retrieval_strategies = {
            'semantic': self._semantic_retrieval,
            'temporal': self._temporal_retrieval,
            'frequency': self._frequency_retrieval,
            'hybrid': self._hybrid_retrieval
        }
    
    def _init_db(self):
        """Inicializa base de datos para metadatos"""
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS context_entries (
                    id INTEGER PRIMARY KEY,
                    content_hash TEXT UNIQUE,
                    content_type TEXT,
                    created_at TIMESTAMP,
                    last_accessed TIMESTAMP,
                    access_count INTEGER DEFAULT 0,
                    relevance_score REAL DEFAULT 1.0,
                    token_count INTEGER,
                    metadata TEXT
                )
            """)
            
            conn.execute("""
                CREATE INDEX IF NOT EXISTS idx_content_type ON context_entries(content_type);
                CREATE INDEX IF NOT EXISTS idx_relevance ON context_entries(relevance_score);
                CREATE INDEX IF NOT EXISTS idx_access_count ON context_entries(access_count);
            """)
    
    def index_content(self, contents: List[str], 
                     content_types: List[str] = None,
                     metadatas: List[Dict[str, Any]] = None):
        """Indexa contenido para retrieval eficiente"""
        
        if not contents:
            return
        
        # Generar embeddings
        embeddings = self.encoder.encode(contents)
        
        # Crear o actualizar índice FAISS
        if self.vector_index is None:
            dimension = embeddings.shape[1]
            self.vector_index = faiss.IndexFlatIP(dimension)  # Inner Product
        
        # Normalizar embeddings para cosine similarity
        faiss.normalize_L2(embeddings)
        
        # Agregar al índice
        start_id = len(self.document_store)
        self.vector_index.add(embeddings)
        
        # Almacenar documentos y metadatos
        for i, content in enumerate(contents):
            doc_id = start_id + i
            content_type = content_types[i] if content_types else "unknown"
            metadata = metadatas[i] if metadatas else {}
            
            self.document_store[doc_id] = {
                'content': content,
                'content_type': content_type,
                'metadata': metadata,
                'indexed_at': datetime.now(),
                'token_count': len(content.split())  # Aproximación simple
            }
            
            # Guardar en base de datos
            self._store_metadata(doc_id, content, content_type, metadata)
    
    def retrieve_context(self, query: str, 
                        strategy: str = "hybrid",
                        filters: Dict[str, Any] = None,
                        max_results: int = 10) -> List[ContextWindow]:
        """Recupera contexto relevante usando la estrategia especificada"""
        
        if strategy not in self.retrieval_strategies:
            raise ValueError(f"Estrategia no soportada: {strategy}")
        
        # Aplicar estrategia de retrieval
        candidates = self.retrieval_strategies[strategy](
            query, filters, max_results * 2  # Obtener más candidatos
        )
        
        # Optimizar ventana de contexto
        optimized_context = self._optimize_context_window(candidates)
        
        # Actualizar estadísticas de acceso
        for context in optimized_context:
            self._update_access_stats(context)
        
        return optimized_context[:max_results]
    
    def _semantic_retrieval(self, query: str, 
                           filters: Dict[str, Any] = None,
                           max_results: int = 20) -> List[ContextWindow]:
        """Retrieval basado en similitud semántica"""
        
        if self.vector_index is None or not self.document_store:
            return []
        
        # Generar embedding de la query
        query_embedding = self.encoder.encode([query])
        faiss.normalize_L2(query_embedding)
        
        # Buscar documentos similares
        similarities, indices = self.vector_index.search(
            query_embedding, 
            min(max_results, len(self.document_store))
        )
        
        contexts = []
        for similarity, idx in zip(similarities[0], indices[0]):
            if idx == -1:  # FAISS retorna -1 para índices inválidos
                continue
                
            doc = self.document_store.get(idx)
            if doc and self._passes_filters(doc, filters):
                contexts.append(ContextWindow(
                    content=doc['content'],
                    relevance_score=float(similarity),
                    timestamp=doc['indexed_at'],
                    content_type=doc['content_type'],
                    tokens=doc['token_count'],
                    priority=1
                ))
        
        return contexts
    
    def _temporal_retrieval(self, query: str,
                           filters: Dict[str, Any] = None,
                           max_results: int = 20) -> List[ContextWindow]:
        """Retrieval basado en recencia temporal"""
        
        # Obtener documentos ordenados por fecha
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.execute("""
                SELECT content_hash, content_type, created_at, relevance_score, token_count
                FROM context_entries 
                ORDER BY created_at DESC 
                LIMIT ?
            """, (max_results,))
            
            contexts = []
            for row in cursor.fetchall():
                # Buscar contenido en document_store
                for doc_id, doc in self.document_store.items():
                    if hash(doc['content']) == hash(row[0]):  # Aproximación
                        if self._passes_filters(doc, filters):
                            # Calcular score temporal (más reciente = mayor score)
                            time_diff = datetime.now() - datetime.fromisoformat(row[2])
                            temporal_score = 1.0 / (1.0 + time_diff.days)
                            
                            contexts.append(ContextWindow(
                                content=doc['content'],
                                relevance_score=temporal_score,
                                timestamp=datetime.fromisoformat(row[2]),
                                content_type=row[1],
                                tokens=row[4],
                                priority=2
                            ))
                        break
        
        return contexts
    
    def _frequency_retrieval(self, query: str,
                            filters: Dict[str, Any] = None,
                            max_results: int = 20) -> List[ContextWindow]:
        """Retrieval basado en frecuencia de acceso"""
        
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.execute("""
                SELECT content_hash, content_type, created_at, access_count, token_count
                FROM context_entries 
                ORDER BY access_count DESC, relevance_score DESC
                LIMIT ?
            """, (max_results,))
            
            contexts = []
            for row in cursor.fetchall():
                for doc_id, doc in self.document_store.items():
                    if hash(doc['content']) == hash(row[0]):
                        if self._passes_filters(doc, filters):
                            # Score basado en frecuencia de acceso
                            frequency_score = min(row[3] / 100.0, 1.0)  # Normalizar
                            
                            contexts.append(ContextWindow(
                                content=doc['content'],
                                relevance_score=frequency_score,
                                timestamp=datetime.fromisoformat(row[2]),
                                content_type=row[1],
                                tokens=row[4],
                                priority=3
                            ))
                        break
        
        return contexts
    
    def _hybrid_retrieval(self, query: str,
                         filters: Dict[str, Any] = None,
                         max_results: int = 20) -> List[ContextWindow]:
        """Combina múltiples estrategias de retrieval"""
        
        # Obtener candidatos de diferentes estrategias
        semantic_contexts = self._semantic_retrieval(query, filters, max_results // 2)
        temporal_contexts = self._temporal_retrieval(query, filters, max_results // 3)
        frequency_contexts = self._frequency_retrieval(query, filters, max_results // 3)
        
        # Combinar y eliminar duplicados
        all_contexts = {}
        
        # Agregar contextos semánticos (mayor peso)
        for ctx in semantic_contexts:
            key = hash(ctx.content)
            if key not in all_contexts:
                ctx.relevance_score *= 1.5  # Boost semántico
                all_contexts[key] = ctx
        
        # Agregar contextos temporales
        for ctx in temporal_contexts:
            key = hash(ctx.content)
            if key in all_contexts:
                # Combinar scores si ya existe
                existing = all_contexts[key]
                existing.relevance_score = (existing.relevance_score + ctx.relevance_score) / 2
            else:
                ctx.relevance_score *= 1.2  # Boost temporal
                all_contexts[key] = ctx
        
        # Agregar contextos frecuentes
        for ctx in frequency_contexts:
            key = hash(ctx.content)
            if key in all_contexts:
                existing = all_contexts[key]
                existing.relevance_score = (existing.relevance_score + ctx.relevance_score) / 2
            else:
                all_contexts[key] = ctx
        
        # Ordenar por relevancia combinada
        combined_contexts = list(all_contexts.values())
        combined_contexts.sort(key=lambda x: x.relevance_score, reverse=True)
        
        return combined_contexts
    
    def _optimize_context_window(self, contexts: List[ContextWindow]) -> List[ContextWindow]:
        """Optimiza la ventana de contexto para maximizar relevancia dentro del límite de tokens"""
        
        if not contexts:
            return []
        
        # Ordenar por relevancia
        contexts.sort(key=lambda x: x.relevance_score, reverse=True)
        
        optimized = []
        total_tokens = 0
        
        for context in contexts:
            if total_tokens + context.tokens <= self.max_context_tokens:
                optimized.append(context)
                total_tokens += context.tokens
            else:
                # Intentar con versión truncada si es posible
                remaining_tokens = self.max_context_tokens - total_tokens
                if remaining_tokens > 50:  # Mínimo útil
                    truncated_content = self._truncate_content(
                        context.content, 
                        remaining_tokens
                    )
                    if truncated_content:
                        optimized.append(ContextWindow(
                            content=truncated_content,
                            relevance_score=context.relevance_score * 0.8,  # Penalizar truncamiento
                            timestamp=context.timestamp,
                            content_type=context.content_type,
                            tokens=remaining_tokens,
                            priority=context.priority
                        ))
                        break
                else:
                    break
        
        return optimized

# Ejemplo de uso del sistema de retrieval
retriever = HybridContextRetriever(max_context_tokens=4000)

# Indexar contenido de ejemplo
contents = [
    "El usuario prefiere explicaciones técnicas detalladas con ejemplos de código",
    "Implementamos autenticación JWT con refresh tokens en el proyecto",
    "La base de datos PostgreSQL está configurada con conexión pool",
    "El frontend React usa Redux para manejo de estado global",
    "Los tests unitarios están implementados con Jest y React Testing Library"
]

content_types = ["preference", "implementation", "configuration", "architecture", "testing"]

retriever.index_content(contents, content_types)

# Recuperar contexto relevante
relevant_context = retriever.retrieve_context(
    query="¿Cómo configurar autenticación en la aplicación?",
    strategy="hybrid",
    max_results=3
)

print("Contexto recuperado:")
for i, ctx in enumerate(relevant_context, 1):
    print(f"{i}. Relevancia: {ctx.relevance_score:.3f}")
    print(f"   Tipo: {ctx.content_type}")
    print(f"   Contenido: {ctx.content[:100]}...")
    print(f"   Tokens: {ctx.tokens}")
    print("---")`;

  const contextWindowingCode = `class AdaptiveContextWindowing:
    """Sistema de ventanas de contexto adaptativas"""
    
    def __init__(self, base_window_size: int = 4000):
        self.base_window_size = base_window_size
        self.conversation_history = []
        self.importance_weights = {
            'user_preferences': 2.0,
            'recent_decisions': 1.8,
            'current_task': 1.5,
            'background_context': 1.0,
            'historical_data': 0.8
        }
    
    def create_adaptive_window(self, current_query: str,
                              available_context: List[ContextWindow],
                              conversation_state: Dict[str, Any]) -> List[ContextWindow]:
        """Crea ventana de contexto adaptativa basada en la situación actual"""
        
        # 1. Analizar el tipo de consulta
        query_type = self._analyze_query_type(current_query)
        
        # 2. Determinar tamaño de ventana óptimo
        optimal_size = self._calculate_optimal_window_size(
            query_type, 
            conversation_state
        )
        
        # 3. Seleccionar contexto más relevante
        selected_context = self._select_contextual_content(
            available_context,
            query_type,
            optimal_size
        )
        
        # 4. Organizar contexto por prioridad
        organized_context = self._organize_context_by_priority(selected_context)
        
        return organized_context
    
    def _analyze_query_type(self, query: str) -> str:
        """Analiza el tipo de consulta para adaptar el contexto"""
        
        query_lower = query.lower()
        
        # Patterns para diferentes tipos de consulta
        patterns = {
            'technical_help': ['cómo', 'implementar', 'configurar', 'error', 'problema'],
            'information_request': ['qué es', 'cuál es', 'explicar', 'definir'],
            'task_planning': ['plan', 'estrategia', 'pasos', 'organizar'],
            'decision_making': ['debería', 'recomiendas', 'mejor opción', 'elegir'],
            'troubleshooting': ['no funciona', 'falla', 'bug', 'arreglar']
        }
        
        for query_type, keywords in patterns.items():
            if any(keyword in query_lower for keyword in keywords):
                return query_type
        
        return 'general'
    
    def _calculate_optimal_window_size(self, query_type: str,
                                     conversation_state: Dict[str, Any]) -> int:
        """Calcula el tamaño óptimo de ventana basado en el contexto"""
        
        base_size = self.base_window_size
        
        # Ajustes basados en tipo de consulta
        size_adjustments = {
            'technical_help': 1.5,  # Necesita más contexto técnico
            'troubleshooting': 1.3,  # Necesita historial de problemas
            'information_request': 0.8,  # Respuesta más directa
            'task_planning': 1.2,  # Contexto de proyecto
            'decision_making': 1.1   # Contexto de opciones
        }
        
        # Ajustes basados en estado de conversación
        if conversation_state.get('is_complex_task', False):
            base_size *= 1.3
        
        if conversation_state.get('has_code_context', False):
            base_size *= 1.2
        
        if conversation_state.get('is_follow_up', False):
            base_size *= 0.9  # Menos contexto para seguimientos
        
        multiplier = size_adjustments.get(query_type, 1.0)
        return int(base_size * multiplier)`;

  return (
    <div className="lesson">
      <h2>🔍 Retrieval de Contexto</h2>
      
      <div className="lesson-intro">
        <p>
          El retrieval de contexto eficiente es crucial para proporcionar respuestas relevantes 
          y mantener conversaciones coherentes, especialmente cuando trabajamos con grandes 
          volúmenes de información almacenada.
        </p>
      </div>

      <div className="lesson-section">
        <h3>🎯 Desafíos del Retrieval de Contexto</h3>
        
        <div className="retrieval-challenges">
          <div className="challenge-card">
            <h4>📏 Límites de Tokens</h4>
            <p>Los LLMs tienen límites de contexto que debemos optimizar</p>
            <ul>
              <li>GPT-3.5: ~4K tokens</li>
              <li>GPT-4: ~8K-32K tokens</li>
              <li>Claude: ~100K+ tokens</li>
            </ul>
          </div>
          
          <div className="challenge-card">
            <h4>⚡ Velocidad vs Precisión</h4>
            <p>Balance entre respuesta rápida y contexto relevante</p>
            <ul>
              <li>Búsqueda exacta: lenta pero precisa</li>
              <li>Búsqueda aproximada: rápida pero imprecisa</li>
              <li>Índices híbridos: balance óptimo</li>
            </ul>
          </div>
          
          <div className="challenge-card">
            <h4>🎯 Relevancia Contextual</h4>
            <p>Determinar qué información es más importante</p>
            <ul>
              <li>Relevancia semántica</li>
              <li>Recencia temporal</li>
              <li>Frecuencia de uso</li>
              <li>Prioridad de usuario</li>
            </ul>
          </div>
          
          <div className="challenge-card">
            <h4>🔄 Contexto Dinámico</h4>
            <p>Adaptar el contexto según la situación actual</p>
            <ul>
              <li>Tipo de consulta</li>
              <li>Historial de conversación</li>
              <li>Preferencias del usuario</li>
              <li>Estado de la tarea</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>💻 Sistema Híbrido de Retrieval</h3>
        <p>
          Implementemos un sistema que combine múltiples estrategias de retrieval 
          para maximizar la relevancia del contexto recuperado:
        </p>
        
        <CodeBlock code={contextRetrievalCode} language="python" />
      </div>

      <div className="lesson-section">
        <h3>🔧 Estrategias de Retrieval</h3>
        
        <div className="retrieval-strategies">
          <div className="strategy-card">
            <h4>🧠 Retrieval Semántico</h4>
            <p>Busca contenido similar en significado usando embeddings</p>
            <div className="strategy-details">
              <strong>Ventajas:</strong> Encuentra conexiones conceptuales
              <br/>
              <strong>Ideal para:</strong> Preguntas sobre temas relacionados
            </div>
          </div>
          
          <div className="strategy-card">
            <h4>⏰ Retrieval Temporal</h4>
            <p>Prioriza información reciente o cronológicamente relevante</p>
            <div className="strategy-details">
              <strong>Ventajas:</strong> Mantiene contexto actual
              <br/>
              <strong>Ideal para:</strong> Seguimiento de conversaciones
            </div>
          </div>
          
          <div className="strategy-card">
            <h4>📊 Retrieval por Frecuencia</h4>
            <p>Favorece contenido frecuentemente accedido o importante</p>
            <div className="strategy-details">
              <strong>Ventajas:</strong> Aprende de patrones de uso
              <br/>
              <strong>Ideal para:</strong> Información comúnmente referenciada
            </div>
          </div>
          
          <div className="strategy-card">
            <h4>🔀 Retrieval Híbrido</h4>
            <p>Combina múltiples estrategias con pesos adaptativos</p>
            <div className="strategy-details">
              <strong>Ventajas:</strong> Balanceado y robusto
              <br/>
              <strong>Ideal para:</strong> Uso general y casos complejos
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🪟 Ventanas de Contexto Adaptativas</h3>
        <p>
          Las ventanas de contexto deben adaptarse dinámicamente según el tipo de consulta 
          y el estado de la conversación:
        </p>
        
        <CodeBlock code={contextWindowingCode} language="python" />

        <div className="window-optimization">
          <h4>⚙️ Optimizaciones de Ventana</h4>
          <div className="optimization-grid">
            <div className="optimization-item">
              <h5>📐 Tamaño Dinámico</h5>
              <p>Ajusta el tamaño según la complejidad de la consulta</p>
              <ul>
                <li>Consultas simples: ventana pequeña</li>
                <li>Tareas complejas: ventana expandida</li>
                <li>Troubleshooting: contexto histórico</li>
              </ul>
            </div>
            
            <div className="optimization-item">
              <h5>🎯 Priorización Inteligente</h5>
              <p>Ordena el contexto por relevancia y importancia</p>
              <ul>
                <li>Información crítica primero</li>
                <li>Contexto reciente al inicio</li>
                <li>Detalles secundarios al final</li>
              </ul>
            </div>
            
            <div className="optimization-item">
              <h5>✂️ Truncamiento Inteligente</h5>
              <p>Corta contenido preservando información clave</p>
              <ul>
                <li>Mantiene conceptos principales</li>
                <li>Preserva conclusiones importantes</li>
                <li>Indica truncamiento al usuario</li>
              </ul>
            </div>
            
            <div className="optimization-item">
              <h5>🔄 Actualización Continua</h5>
              <p>Refina el contexto basado en interacciones</p>
              <ul>
                <li>Aprende de feedback del usuario</li>
                <li>Ajusta pesos de relevancia</li>
                <li>Mejora estrategias de retrieval</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>📊 Métricas de Rendimiento</h3>
        <div className="performance-grid">
          <div className="metric-card">
            <h4>⚡ Latencia de Retrieval</h4>
            <p>Tiempo para recuperar contexto relevante</p>
            <div className="metric-target">Objetivo: &lt; 50ms</div>
          </div>
          
          <div className="metric-card">
            <h4>🎯 Precisión</h4>
            <p>Porcentaje de contexto realmente útil</p>
            <div className="metric-target">Objetivo: &gt; 80%</div>
          </div>
          
          <div className="metric-card">
            <h4>📈 Recall</h4>
            <p>Porcentaje de información relevante recuperada</p>
            <div className="metric-target">Objetivo: &gt; 70%</div>
          </div>
          
          <div className="metric-card">
            <h4>💾 Eficiencia de Cache</h4>
            <p>Tasa de aciertos en cache de contexto</p>
            <div className="metric-target">Objetivo: &gt; 60%</div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🔧 Optimizaciones Avanzadas</h3>
        <div className="advanced-optimizations">
          <div className="optimization-technique">
            <h4>🧠 Re-ranking Neural</h4>
            <p>Usa modelos neuronales para re-ordenar resultados de retrieval</p>
          </div>
          
          <div className="optimization-technique">
            <h4>📱 Cache Predictivo</h4>
            <p>Pre-carga contexto probable basado en patrones de uso</p>
          </div>
          
          <div className="optimization-technique">
            <h4>🔀 Embedding Multiples</h4>
            <p>Usa diferentes modelos de embedding para diversos tipos de contenido</p>
          </div>
          
          <div className="optimization-technique">
            <h4>📊 Feedback Learning</h4>
            <p>Aprende de interacciones del usuario para mejorar relevancia</p>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🔧 Optimización Avanzada de Índices</h3>
        <p>
          Los índices son cruciales para el rendimiento del sistema. Una optimización 
          adecuada puede reducir la latencia de retrieval de segundos a milisegundos:
        </p>

        <div className="index-optimization-techniques">
          <div className="technique-card">
            <h4>⚡ Configuración de FAISS por Tamaño</h4>
            <div className="size-recommendations">
              <div className="size-option">
                <h5>&lt; 10K documentos</h5>
                <p><strong>IVFFlat:</strong> Precisión máxima, overhead mínimo</p>
                <code>nlist=100, nprobe=10</code>
              </div>
              <div className="size-option">
                <h5>10K - 100K documentos</h5>
                <p><strong>IVF_HNSW:</strong> Balance velocidad/precisión</p>
                <code>nlist=1000, nprobe=20, m=32</code>
              </div>
              <div className="size-option">
                <h5>&gt; 100K documentos</h5>
                <p><strong>IVF_PQ:</strong> Máxima compresión</p>
                <code>nlist=4000, nprobe=50, m=8</code>
              </div>
            </div>
          </div>

          <div className="technique-card">
            <h4>🗂️ Particionado Inteligente</h4>
            <div className="partitioning-strategies">
              <div className="strategy">
                <h5>Por Tipo de Contenido</h5>
                <ul>
                  <li>Conversaciones → modelo rápido</li>
                  <li>Documentos técnicos → modelo preciso</li>
                  <li>Código → modelo especializado</li>
                </ul>
              </div>
              <div className="strategy">
                <h5>Por Frecuencia de Acceso</h5>
                <ul>
                  <li>Hot data → índice en memoria</li>
                  <li>Warm data → índice comprimido</li>
                  <li>Cold data → almacenamiento</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="technique-card">
            <h4>📊 Monitoreo Automático</h4>
            <div className="monitoring-metrics">
              <div className="metric">
                <h5>Latencia de Búsqueda</h5>
                <p>Target: &lt; 50ms</p>
                <div className="alert-trigger">Alerta si &gt; 100ms</div>
              </div>
              <div className="metric">
                <h5>Uso de Memoria</h5>
                <p>Target: &lt; 80% disponible</p>
                <div className="alert-trigger">Optimizar si &gt; 90%</div>
              </div>
              <div className="metric">
                <h5>Precisión de Retrieval</h5>
                <p>Target: &gt; 80%</p>
                <div className="alert-trigger">Re-entrenar si &lt; 70%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          Retrieval Optimizado ✓
        </button>
      </div>
    </div>
  );
};

// Lección 6: Laboratorio
const MemorySystemLabLesson = ({ onComplete }) => {
  const completeMemorySystemCode = `import asyncio
import sqlite3
import json
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass, asdict
from sentence_transformers import SentenceTransformer
import chromadb
import openai
from enum import Enum

# Configuración de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MemoryType(Enum):
    """Tipos de memoria en el sistema"""
    SHORT_TERM = "short_term"
    LONG_TERM = "long_term"
    WORKING = "working"
    PROCEDURAL = "procedural"

@dataclass
class MemoryEntry:
    """Entrada de memoria unificada"""
    id: str
    content: str
    memory_type: MemoryType
    importance_score: float
    created_at: datetime
    last_accessed: datetime
    access_count: int
    tags: List[str]
    metadata: Dict[str, Any]
    embedding: Optional[List[float]] = None

class ComprehensiveMemorySystem:
    """Sistema completo de memoria para agentes IA"""
    
    def __init__(self, config: Dict[str, Any] = None):
        self.config = config or self._default_config()
        
        # Inicializar componentes
        self._init_databases()
        self._init_ai_models()
        self._init_memory_managers()
        
        logger.info("Sistema de memoria inicializado correctamente")
    
    def _default_config(self) -> Dict[str, Any]:
        """Configuración por defecto del sistema"""
        return {
            "max_short_term_entries": 50,
            "max_working_memory_tokens": 8000,
            "embedding_model": "all-MiniLM-L6-v2",
            "llm_model": "gpt-3.5-turbo",
            "memory_decay_rate": 0.95,
            "importance_threshold": 0.3,
            "auto_summarize_threshold": 100,
            "databases": {
                "sqlite_path": "comprehensive_memory.db",
                "chromadb_path": "./comprehensive_chroma_db"
            }
        }
    
    def _init_databases(self):
        """Inicializa todas las bases de datos"""
        # Base de datos relacional para metadatos
        self.sql_db_path = self.config["databases"]["sqlite_path"]
        self._create_sql_schema()
        
        # Base de datos vectorial para búsqueda semántica
        self.chroma_client = chromadb.PersistentClient(
            path=self.config["databases"]["chromadb_path"]
        )
        self.memory_collection = self.chroma_client.get_or_create_collection(
            name="memory_entries",
            metadata={"hnsw:space": "cosine"}
        )
    
    def _init_ai_models(self):
        """Inicializa modelos de IA"""
        self.encoder = SentenceTransformer(self.config["embedding_model"])
        self.openai_client = openai.OpenAI()
    
    def _init_memory_managers(self):
        """Inicializa gestores especializados de memoria"""
        from .short_term_memory import ShortTermMemoryManager
        from .long_term_memory import LongTermMemoryManager
        from .working_memory import WorkingMemoryManager
        from .summarizer import IntelligentSummarizer
        from .retriever import HybridContextRetriever
        
        self.short_term = ShortTermMemoryManager(self)
        self.long_term = LongTermMemoryManager(self)
        self.working = WorkingMemoryManager(self)
        self.summarizer = IntelligentSummarizer(self)
        self.retriever = HybridContextRetriever(self)
    
    def _create_sql_schema(self):
        """Crea el esquema de base de datos"""
        with sqlite3.connect(self.sql_db_path) as conn:
            conn.executescript("""
                CREATE TABLE IF NOT EXISTS memory_entries (
                    id TEXT PRIMARY KEY,
                    content TEXT NOT NULL,
                    memory_type TEXT NOT NULL,
                    importance_score REAL NOT NULL,
                    created_at TIMESTAMP NOT NULL,
                    last_accessed TIMESTAMP,
                    access_count INTEGER DEFAULT 0,
                    tags TEXT,
                    metadata TEXT,
                    is_active BOOLEAN DEFAULT 1
                );
                
                CREATE TABLE IF NOT EXISTS memory_relationships (
                    id INTEGER PRIMARY KEY,
                    source_memory_id TEXT,
                    target_memory_id TEXT,
                    relationship_type TEXT,
                    strength REAL DEFAULT 1.0,
                    created_at TIMESTAMP,
                    FOREIGN KEY (source_memory_id) REFERENCES memory_entries (id),
                    FOREIGN KEY (target_memory_id) REFERENCES memory_entries (id)
                );
                
                CREATE TABLE IF NOT EXISTS conversation_sessions (
                    id TEXT PRIMARY KEY,
                    user_id TEXT,
                    started_at TIMESTAMP,
                    ended_at TIMESTAMP,
                    summary TEXT,
                    metadata TEXT
                );
                
                CREATE TABLE IF NOT EXISTS memory_snapshots (
                    id INTEGER PRIMARY KEY,
                    session_id TEXT,
                    snapshot_data TEXT,
                    created_at TIMESTAMP,
                    FOREIGN KEY (session_id) REFERENCES conversation_sessions (id)
                );
                
                -- Índices para optimización
                CREATE INDEX IF NOT EXISTS idx_memory_type ON memory_entries(memory_type);
                CREATE INDEX IF NOT EXISTS idx_importance ON memory_entries(importance_score);
                CREATE INDEX IF NOT EXISTS idx_created_at ON memory_entries(created_at);
                CREATE INDEX IF NOT EXISTS idx_last_accessed ON memory_entries(last_accessed);
                CREATE INDEX IF NOT EXISTS idx_access_count ON memory_entries(access_count);
            """)
    
    async def store_memory(self, content: str, 
                          memory_type: MemoryType = MemoryType.SHORT_TERM,
                          importance: float = 1.0,
                          tags: List[str] = None,
                          metadata: Dict[str, Any] = None) -> str:
        """Almacena una nueva entrada de memoria"""
        
        # Crear entrada de memoria
        memory_entry = MemoryEntry(
            id=self._generate_memory_id(),
            content=content,
            memory_type=memory_type,
            importance_score=importance,
            created_at=datetime.now(),
            last_accessed=datetime.now(),
            access_count=1,
            tags=tags or [],
            metadata=metadata or {}
        )
        
        # Generar embedding
        memory_entry.embedding = self.encoder.encode([content])[0].tolist()
        
        # Almacenar en base de datos vectorial
        await self._store_in_vector_db(memory_entry)
        
        # Almacenar en base de datos relacional
        await self._store_in_sql_db(memory_entry)
        
        # Gestión específica por tipo de memoria
        if memory_type == MemoryType.SHORT_TERM:
            await self.short_term.manage_capacity()
        elif memory_type == MemoryType.LONG_TERM:
            await self.long_term.optimize_storage()
        
        logger.info(f"Memoria almacenada: {memory_entry.id} ({memory_type.value})")
        return memory_entry.id
    
    async def retrieve_memories(self, query: str,
                               memory_types: List[MemoryType] = None,
                               max_results: int = 10,
                               min_relevance: float = 0.5) -> List[MemoryEntry]:
        """Recupera memorias relevantes para una consulta"""
        
        # Usar el sistema de retrieval híbrido
        contexts = await self.retriever.retrieve_context(
            query=query,
            filters={
                "memory_types": memory_types,
                "min_relevance": min_relevance
            },
            max_results=max_results
        )
        
        # Convertir contextos a entradas de memoria
        memories = []
        for context in contexts:
            memory = await self._get_memory_by_id(context.memory_id)
            if memory:
                memories.append(memory)
        
        return memories
    
    async def create_summary(self, session_id: str) -> str:
        """Crea un resumen de la sesión de conversación"""
        
        # Obtener todas las memorias de la sesión
        session_memories = await self._get_session_memories(session_id)
        
        # Crear resumen usando el sistema inteligente
        summary = await self.summarizer.create_session_summary(
            memories=session_memories,
            session_id=session_id
        )
        
        # Almacenar resumen como memoria de largo plazo
        summary_id = await self.store_memory(
            content=summary,
            memory_type=MemoryType.LONG_TERM,
            importance=1.5,
            tags=["session_summary", session_id],
            metadata={"session_id": session_id, "type": "summary"}
        )
        
        return summary_id
    
    async def optimize_memory_system(self):
        """Ejecuta rutinas de optimización del sistema"""
        
        logger.info("Iniciando optimización del sistema de memoria")
        
        # Optimizar memoria de corto plazo
        await self.short_term.decay_old_memories()
        await self.short_term.promote_important_memories()
        
        # Optimizar memoria de largo plazo
        await self.long_term.consolidate_similar_memories()
        await self.long_term.archive_old_memories()
        
        # Optimizar índices de búsqueda
        await self._optimize_vector_indices()
        
        # Limpiar entradas obsoletas
        await self._cleanup_obsolete_entries()
        
        logger.info("Optimización completada")
    
    async def get_memory_statistics(self) -> Dict[str, Any]:
        """Obtiene estadísticas del sistema de memoria"""
        
        with sqlite3.connect(self.sql_db_path) as conn:
            cursor = conn.cursor()
            
            # Estadísticas generales
            cursor.execute("SELECT COUNT(*) FROM memory_entries WHERE is_active = 1")
            total_memories = cursor.fetchone()[0]
            
            # Por tipo de memoria
            cursor.execute("""
                SELECT memory_type, COUNT(*) 
                FROM memory_entries 
                WHERE is_active = 1 
                GROUP BY memory_type
            """)
            memory_by_type = dict(cursor.fetchall())
            
            # Memorias más accedidas
            cursor.execute("""
                SELECT content, access_count 
                FROM memory_entries 
                WHERE is_active = 1 
                ORDER BY access_count DESC 
                LIMIT 10
            """)
            top_memories = cursor.fetchall()
            
            # Estadísticas temporales
            cursor.execute("""
                SELECT 
                    DATE(created_at) as date,
                    COUNT(*) as memories_created
                FROM memory_entries 
                WHERE is_active = 1 AND created_at >= datetime('now', '-30 days')
                GROUP BY DATE(created_at)
                ORDER BY date DESC
            """)
            daily_stats = cursor.fetchall()
        
        return {
            "total_memories": total_memories,
            "memory_by_type": memory_by_type,
            "top_accessed_memories": top_memories,
            "daily_creation_stats": daily_stats,
            "system_health": await self._assess_system_health()
        }
    
    async def _assess_system_health(self) -> Dict[str, Any]:
        """Evalúa la salud del sistema de memoria"""
        
        # Métricas de rendimiento
        vector_index_size = self.memory_collection.count()
        
        # Ratio de memorias activas vs inactivas
        with sqlite3.connect(self.sql_db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM memory_entries WHERE is_active = 1")
            active_count = cursor.fetchone()[0]
            cursor.execute("SELECT COUNT(*) FROM memory_entries WHERE is_active = 0")
            inactive_count = cursor.fetchone()[0]
        
        active_ratio = active_count / (active_count + inactive_count) if (active_count + inactive_count) > 0 else 1.0
        
        # Distribución de importancia
        cursor.execute("""
            SELECT 
                CASE 
                    WHEN importance_score >= 1.5 THEN 'high'
                    WHEN importance_score >= 1.0 THEN 'medium'
                    ELSE 'low'
                END as importance_level,
                COUNT(*) as count
            FROM memory_entries 
            WHERE is_active = 1
            GROUP BY importance_level
        """)
        importance_distribution = dict(cursor.fetchall())
        
        return {
            "vector_index_size": vector_index_size,
            "active_memory_ratio": active_ratio,
            "importance_distribution": importance_distribution,
            "status": "healthy" if active_ratio > 0.8 and vector_index_size > 0 else "needs_attention"
        }

# Ejemplo de uso completo del sistema
async def main():
    # Inicializar sistema de memoria
    memory_system = ComprehensiveMemorySystem()
    
    # Simular una conversación
    session_id = "session_001"
    
    # Almacenar información del usuario
    await memory_system.store_memory(
        content="El usuario es desarrollador senior con experiencia en Python y React",
        memory_type=MemoryType.LONG_TERM,
        importance=1.8,
        tags=["user_profile", "skills"],
        metadata={"session_id": session_id}
    )
    
    # Almacenar decisiones de la conversación
    await memory_system.store_memory(
        content="Decidimos usar FastAPI para el backend en lugar de Django",
        memory_type=MemoryType.SHORT_TERM,
        importance=1.5,
        tags=["architecture", "decision"],
        metadata={"session_id": session_id, "context": "project_setup"}
    )
    
    # Almacenar código discutido
    await memory_system.store_memory(
        content="Implementamos autenticación JWT con refresh tokens usando python-jose",
        memory_type=MemoryType.PROCEDURAL,
        importance=1.3,
        tags=["implementation", "auth", "jwt"],
        metadata={"session_id": session_id, "code_type": "authentication"}
    )
    
    # Recuperar contexto relevante
    relevant_memories = await memory_system.retrieve_memories(
        query="¿Cómo configuramos la autenticación en el proyecto?",
        max_results=5
    )
    
    print("Memorias relevantes recuperadas:")
    for memory in relevant_memories:
        print(f"- {memory.content} (Importancia: {memory.importance_score})")
    
    # Crear resumen de sesión
    summary_id = await memory_system.create_summary(session_id)
    print(f"Resumen de sesión creado: {summary_id}")
    
    # Obtener estadísticas
    stats = await memory_system.get_memory_statistics()
    print(f"Estadísticas del sistema: {stats}")
    
    # Optimizar sistema
    await memory_system.optimize_memory_system()

if __name__ == "__main__":
    asyncio.run(main())`;

  const integrationTestsCode = `import pytest
import asyncio
from datetime import datetime, timedelta
from comprehensive_memory_system import ComprehensiveMemorySystem, MemoryType, MemoryEntry

class TestMemorySystemIntegration:
    """Tests de integración para el sistema completo de memoria"""
    
    @pytest.fixture
    async def memory_system(self):
        """Fixture que proporciona un sistema de memoria limpio para cada test"""
        config = {
            "databases": {
                "sqlite_path": ":memory:",  # Base de datos en memoria para tests
                "chromadb_path": "./test_chroma_db"
            },
            "max_short_term_entries": 10,
            "auto_summarize_threshold": 5
        }
        
        system = ComprehensiveMemorySystem(config)
        yield system
        
        # Cleanup después del test
        await system.cleanup()
    
    @pytest.mark.asyncio
    async def test_complete_conversation_flow(self, memory_system):
        """Test del flujo completo de una conversación"""
        
        session_id = "test_session_001"
        
        # 1. Almacenar información inicial del usuario
        user_profile_id = await memory_system.store_memory(
            content="Usuario desarrollador con 5 años de experiencia en Python",
            memory_type=MemoryType.LONG_TERM,
            importance=1.8,
            tags=["user_profile"],
            metadata={"session_id": session_id}
        )
        
        # 2. Almacenar múltiples intercambios de conversación
        conversation_memories = []
        for i in range(7):
            memory_id = await memory_system.store_memory(
                content=f"Intercambio de conversación {i+1}: Discusión sobre arquitectura de microservicios",
                memory_type=MemoryType.SHORT_TERM,
                importance=1.0 + (i * 0.1),
                tags=["conversation", "architecture"],
                metadata={"session_id": session_id, "turn": i+1}
            )
            conversation_memories.append(memory_id)
        
        # 3. Verificar que el sistema automáticamente resumió cuando llegó al threshold
        stats = await memory_system.get_memory_statistics()
        assert stats["total_memories"] > 0
        
        # 4. Recuperar contexto relevante
        relevant_memories = await memory_system.retrieve_memories(
            query="¿Cuál es el perfil del usuario y qué hemos discutido sobre arquitectura?",
            max_results=5
        )
        
        assert len(relevant_memories) > 0
        assert any("desarrollador" in memory.content for memory in relevant_memories)
        assert any("arquitectura" in memory.content for memory in relevant_memories)
        
        # 5. Crear resumen de sesión
        summary_id = await memory_system.create_summary(session_id)
        assert summary_id is not None
        
        # 6. Verificar que el resumen se almacenó correctamente
        summary_memories = await memory_system.retrieve_memories(
            query="resumen de sesión",
            memory_types=[MemoryType.LONG_TERM]
        )
        assert len(summary_memories) > 0
    
    @pytest.mark.asyncio
    async def test_memory_optimization_cycle(self, memory_system):
        """Test del ciclo completo de optimización de memoria"""
        
        # Crear memorias de diferentes tipos y edades
        old_memories = []
        for i in range(5):
            memory_id = await memory_system.store_memory(
                content=f"Memoria antigua {i}",
                memory_type=MemoryType.SHORT_TERM,
                importance=0.2,  # Baja importancia
                tags=["old"]
            )
            old_memories.append(memory_id)
            
            # Simular que son memorias antiguas
            await memory_system._update_memory_timestamp(
                memory_id,
                datetime.now() - timedelta(days=30)
            )
        
        # Crear memorias importantes recientes
        important_memories = []
        for i in range(3):
            memory_id = await memory_system.store_memory(
                content=f"Memoria importante {i}",
                memory_type=MemoryType.SHORT_TERM,
                importance=1.5,
                tags=["important"]
            )
            important_memories.append(memory_id)
        
        # Ejecutar optimización
        await memory_system.optimize_memory_system()
        
        # Verificar que las memorias importantes se mantuvieron
        for memory_id in important_memories:
            memory = await memory_system._get_memory_by_id(memory_id)
            assert memory is not None
            assert memory.importance_score >= 1.5
        
        # Verificar salud del sistema después de optimización
        health = await memory_system._assess_system_health()
        assert health["status"] in ["healthy", "needs_attention"]
    
    @pytest.mark.asyncio
    async def test_cross_session_memory_retrieval(self, memory_system):
        """Test de recuperación de memoria entre sesiones"""
        
        # Sesión 1: Almacenar información sobre un proyecto
        session1_id = "session_001"
        await memory_system.store_memory(
            content="Proyecto e-commerce con React frontend y Node.js backend",
            memory_type=MemoryType.LONG_TERM,
            importance=1.6,
            tags=["project", "ecommerce"],
            metadata={"session_id": session1_id}
        )
        
        # Sesión 2: Consultar sobre el proyecto anterior
        session2_id = "session_002"
        retrieved_memories = await memory_system.retrieve_memories(
            query="¿Qué tipo de proyecto estamos desarrollando?",
            max_results=3
        )
        
        # Verificar que se recuperó información de la sesión anterior
        assert len(retrieved_memories) > 0
        assert any("e-commerce" in memory.content.lower() for memory in retrieved_memories)
        
        # Almacenar nueva información en sesión 2
        await memory_system.store_memory(
            content="Agregamos sistema de pagos con Stripe",
            memory_type=MemoryType.SHORT_TERM,
            importance=1.3,
            tags=["project", "payments"],
            metadata={"session_id": session2_id}
        )
        
        # Verificar que ahora tenemos contexto de ambas sesiones
        full_context = await memory_system.retrieve_memories(
            query="proyecto pagos ecommerce",
            max_results=5
        )
        
        session_ids = set()
        for memory in full_context:
            if "session_id" in memory.metadata:
                session_ids.add(memory.metadata["session_id"])
        
        assert len(session_ids) >= 2  # Contexto de múltiples sesiones
    
    @pytest.mark.asyncio
    async def test_performance_under_load(self, memory_system):
        """Test de rendimiento bajo carga"""
        
        import time
        
        # Almacenar gran cantidad de memorias
        start_time = time.time()
        
        memory_ids = []
        for i in range(100):
            memory_id = await memory_system.store_memory(
                content=f"Memoria de carga {i}: Contenido de prueba con información técnica relevante",
                memory_type=MemoryType.SHORT_TERM if i % 2 == 0 else MemoryType.LONG_TERM,
                importance=0.5 + (i % 10) * 0.1,
                tags=[f"tag_{i%5}", "load_test"],
                metadata={"batch": "performance_test", "index": i}
            )
            memory_ids.append(memory_id)
        
        storage_time = time.time() - start_time
        
        # Test de recuperación masiva
        start_time = time.time()
        
        for i in range(20):
            results = await memory_system.retrieve_memories(
                query=f"información técnica {i}",
                max_results=10
            )
            assert len(results) > 0
        
        retrieval_time = time.time() - start_time
        
        # Verificar tiempos aceptables (ajustar según hardware)
        assert storage_time < 30.0  # 100 memorias en menos de 30 segundos
        assert retrieval_time < 10.0  # 20 búsquedas en menos de 10 segundos
        
        # Verificar estado del sistema
        stats = await memory_system.get_memory_statistics()
        assert stats["total_memories"] >= 100
        
        health = await memory_system._assess_system_health()
        assert health["vector_index_size"] >= 100`;

  return (
    <div className="lesson">
      <h2>🔬 Laboratorio: Sistema de Memoria</h2>
      
      <div className="lesson-intro">
        <p>
          En este laboratorio construiremos un sistema completo de memoria que integra 
          todos los conceptos aprendidos: memoria de corto y largo plazo, resúmenes 
          inteligentes, y retrieval de contexto eficiente.
        </p>
      </div>

      <div className="lesson-section">
        <h3>🏗️ Arquitectura del Sistema Completo</h3>
        
        <div className="system-architecture">
          <div className="architecture-overview">
            <h4>📋 Componentes Principales</h4>
            <div className="components-overview">
              <div className="component-group">
                <h5>💾 Capa de Almacenamiento</h5>
                <ul>
                  <li>SQLite para metadatos y relaciones</li>
                  <li>ChromaDB para búsqueda vectorial</li>
                  <li>Sistema de archivos para snapshots</li>
                </ul>
              </div>
              
              <div className="component-group">
                <h5>🧠 Gestores de Memoria</h5>
                <ul>
                  <li>ShortTermMemoryManager</li>
                  <li>LongTermMemoryManager</li>
                  <li>WorkingMemoryManager</li>
                </ul>
              </div>
              
              <div className="component-group">
                <h5>🔧 Procesadores Inteligentes</h5>
                <ul>
                  <li>IntelligentSummarizer</li>
                  <li>HybridContextRetriever</li>
                  <li>MemoryOptimizer</li>
                </ul>
              </div>
              
              <div className="component-group">
                <h5>📊 Monitoreo y Análisis</h5>
                <ul>
                  <li>Sistema de métricas</li>
                  <li>Health monitoring</li>
                  <li>Performance analytics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>💻 Implementación Completa</h3>
        <p>
          Aquí está la implementación completa del sistema de memoria que integra 
          todos los componentes que hemos construido:
        </p>
        
        <CodeBlock code={completeMemorySystemCode} language="python" />
      </div>

      <div className="lesson-section">
        <h3>🧪 Tests de Integración</h3>
        <p>
          Para asegurar que nuestro sistema funciona correctamente, implementamos 
          una suite completa de tests de integración:
        </p>
        
        <CodeBlock code={integrationTestsCode} language="python" />
      </div>

      <div className="lesson-section">
        <h3>🚀 Casos de Uso Prácticos</h3>
        
        <div className="use-cases">
          <div className="use-case-card">
            <h4>💬 Asistente de Conversación</h4>
            <p>Chatbot que recuerda preferencias, historial y contexto del usuario</p>
            <div className="use-case-features">
              <span className="feature">Personalización continua</span>
              <span className="feature">Contexto multi-sesión</span>
              <span className="feature">Aprendizaje adaptativo</span>
            </div>
          </div>
          
          <div className="use-case-card">
            <h4>🎓 Tutor Inteligente</h4>
            <p>Sistema educativo que adapta enseñanza basada en progreso del estudiante</p>
            <div className="use-case-features">
              <span className="feature">Tracking de progreso</span>
              <span className="feature">Contenido adaptativo</span>
              <span className="feature">Refuerzo personalizado</span>
            </div>
          </div>
          
          <div className="use-case-card">
            <h4>🛠️ Asistente de Desarrollo</h4>
            <p>Copiloto que entiende el proyecto, decisiones y patrones de código</p>
            <div className="use-case-features">
              <span className="feature">Contexto de proyecto</span>
              <span className="feature">Decisiones arquitecturales</span>
              <span className="feature">Patrones de código</span>
            </div>
          </div>
          
          <div className="use-case-card">
            <h4>🏥 Asistente Médico</h4>
            <p>Sistema que mantiene historial completo y relevante del paciente</p>
            <div className="use-case-features">
              <span className="feature">Historial médico</span>
              <span className="feature">Patrones de síntomas</span>
              <span className="feature">Tratamientos efectivos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>📈 Métricas y Monitoreo</h3>
        
        <div className="monitoring-dashboard">
          <h4>🎯 KPIs del Sistema</h4>
          <div className="kpi-grid">
            <div className="kpi-item">
              <h5>⚡ Latencia Media</h5>
              <div className="kpi-value">&lt; 100ms</div>
              <div className="kpi-description">Tiempo de respuesta del sistema</div>
            </div>
            
            <div className="kpi-item">
              <h5>🎯 Precisión de Retrieval</h5>
              <div className="kpi-value">&gt; 85%</div>
              <div className="kpi-description">Relevancia del contexto recuperado</div>
            </div>
            
            <div className="kpi-item">
              <h5>💾 Eficiencia de Almacenamiento</h5>
              <div className="kpi-value">70% compresión</div>
              <div className="kpi-description">Reducción de redundancia</div>
            </div>
            
            <div className="kpi-item">
              <h5>🔄 Disponibilidad</h5>
              <div className="kpi-value">99.9%</div>
              <div className="kpi-description">Uptime del sistema</div>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🔧 Configuración y Deployment</h3>
        
        <div className="deployment-guide">
          <div className="deployment-step">
            <h4>📦 Instalación de Dependencias</h4>
            <div className="code-snippet">
              <code>pip install sentence-transformers chromadb openai sqlite3 pytest asyncio</code>
            </div>
          </div>
          
          <div className="deployment-step">
            <h4>⚙️ Configuración del Ambiente</h4>
            <ul>
              <li>Configurar API keys de OpenAI</li>
              <li>Establecer paths de bases de datos</li>
              <li>Configurar parámetros de memoria</li>
              <li>Establecer límites de recursos</li>
            </ul>
          </div>
          
          <div className="deployment-step">
            <h4>🚀 Deployment en Producción</h4>
            <ul>
              <li>Configurar backup automático</li>
              <li>Implementar health checks</li>
              <li>Configurar alertas de monitoreo</li>
              <li>Establecer políticas de scaling</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🚀 Deployment en Producción</h3>
        <p>
          Desplegar un sistema de memoria en producción requiere consideraciones especiales 
          de escalabilidad, rendimiento, seguridad y mantenimiento:
        </p>

        <div className="production-deployment">
          <div className="deployment-section">
            <h4>🏗️ Arquitectura de Producción</h4>
            <div className="architecture-diagram">
              <div className="architecture-layers">
                <div className="layer">
                  <h5>🌐 Load Balancer</h5>
                  <p>Distribuye cargas entre instancias del servicio</p>
                  <div className="config-example">
                    nginx, HAProxy, AWS ALB
                  </div>
                </div>
                
                <div className="layer">
                  <h5>🚀 API Gateway</h5>
                  <p>Autenticación, rate limiting, logging</p>
                  <div className="config-example">
                    Kong, Ambassador, AWS API Gateway
                  </div>
                </div>
                
                <div className="layer">
                  <h5>💻 Memory Service Cluster</h5>
                  <p>Múltiples instancias del servicio de memoria</p>
                  <div className="config-example">
                    Kubernetes pods, Docker containers
                  </div>
                </div>
                
                <div className="layer">
                  <h5>🗄️ Storage Layer</h5>
                  <p>Bases de datos distribuidas y replicadas</p>
                  <div className="config-example">
                    PostgreSQL cluster, Redis cluster, S3
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="deployment-section">
            <h4>🔧 Configuración de Kubernetes</h4>
            <div className="k8s-config">
              <div className="config-file">
                <h5>deployment.yaml</h5>
                <div className="code-block">
                  <pre><code>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: memory-service
  labels:
    app: memory-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: memory-service
  template:
    metadata:
      labels:
        app: memory-service
    spec:
      containers:
      - name: memory-service
        image: memory-service:v1.0.0
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: memory-secrets
              key: database-url
        - name: OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: memory-secrets
              key: openai-key
        resources:
          requests:
            memory: "2Gi"
            cpu: "500m"
          limits:
            memory: "4Gi"
            cpu: "2000m"
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 60
          periodSeconds: 30`}</code></pre>
                </div>
              </div>

              <div className="config-file">
                <h5>service.yaml</h5>
                <div className="code-block">
                  <pre><code>{`apiVersion: v1
kind: Service
metadata:
  name: memory-service-svc
spec:
  selector:
    app: memory-service
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8000
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: memory-service-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/rate-limit: "100"
spec:
  rules:
  - host: memory-api.company.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: memory-service-svc
            port:
              number: 80`}</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div className="deployment-section">
            <h4>📊 Monitoreo y Observabilidad</h4>
            <div className="monitoring-stack">
              <div className="monitoring-component">
                <h5>📈 Métricas (Prometheus)</h5>
                <div className="metrics-list">
                  <ul>
                    <li>Latencia de consultas (P50, P95, P99)</li>
                    <li>Throughput (consultas/segundo)</li>
                    <li>Uso de memoria y CPU</li>
                    <li>Tasa de errores</li>
                    <li>Tamaño de la base de datos</li>
                    <li>Tiempo de respuesta de embeddings</li>
                  </ul>
                </div>
              </div>

              <div className="monitoring-component">
                <h5>📊 Dashboard (Grafana)</h5>
                <div className="dashboard-panels">
                  <div className="panel">Sistema: CPU, RAM, Disk</div>
                  <div className="panel">Aplicación: Latencia, Throughput</div>
                  <div className="panel">Base de Datos: Conexiones, Queries</div>
                  <div className="panel">AI Models: Embedding time, API calls</div>
                </div>
              </div>

              <div className="monitoring-component">
                <h5>🚨 Alertas</h5>
                <div className="alert-rules">
                  <div className="alert-rule">
                    <strong>High Latency:</strong> P95 &gt; 500ms por 5 min
                  </div>
                  <div className="alert-rule">
                    <strong>Error Rate:</strong> &gt; 5% por 2 min
                  </div>
                  <div className="alert-rule">
                    <strong>Memory Usage:</strong> &gt; 90% por 3 min
                  </div>
                  <div className="alert-rule">
                    <strong>Disk Space:</strong> &gt; 85% available
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="deployment-section">
            <h4>🔒 Seguridad en Producción</h4>
            <div className="security-measures">
              <div className="security-area">
                <h5>🔐 Autenticación y Autorización</h5>
                <ul>
                  <li>JWT tokens con expiración</li>
                  <li>Rate limiting por usuario</li>
                  <li>RBAC (Role-Based Access Control)</li>
                  <li>API key management</li>
                </ul>
              </div>

              <div className="security-area">
                <h5>🛡️ Protección de Datos</h5>
                <ul>
                  <li>Encriptación en tránsito (TLS 1.3)</li>
                  <li>Encriptación en reposo (AES-256)</li>
                  <li>Anonimización de datos sensibles</li>
                  <li>Compliance con GDPR/CCPA</li>
                </ul>
              </div>

              <div className="security-area">
                <h5>🔍 Auditoría y Logging</h5>
                <ul>
                  <li>Logs estructurados (JSON)</li>
                  <li>Audit trail de accesos</li>
                  <li>Detección de anomalías</li>
                  <li>Backup de logs centralizado</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="deployment-section">
            <h4>📈 Estrategias de Escalado</h4>
            <div className="scaling-strategies">
              <div className="scaling-type">
                <h5>↕️ Escalado Vertical</h5>
                <div className="scaling-details">
                  <p><strong>Cuándo:</strong> Workload intensivo en memoria/CPU</p>
                  <p><strong>Cómo:</strong> Aumentar recursos de pod</p>
                  <div className="scaling-config">
                    <code>resources.limits.memory: "8Gi"</code><br/>
                    <code>resources.limits.cpu: "4000m"</code>
                  </div>
                </div>
              </div>

              <div className="scaling-type">
                <h5>↔️ Escalado Horizontal</h5>
                <div className="scaling-details">
                  <p><strong>Cuándo:</strong> Alto volumen de consultas</p>
                  <p><strong>Cómo:</strong> Aumentar número de réplicas</p>
                  <div className="scaling-config">
                    <code>kubectl scale deployment memory-service --replicas=10</code>
                  </div>
                </div>
              </div>

              <div className="scaling-type">
                <h5>🤖 Auto-escalado</h5>
                <div className="scaling-details">
                  <p><strong>HPA:</strong> Basado en CPU/memoria</p>
                  <p><strong>VPA:</strong> Ajuste automático de recursos</p>
                  <div className="scaling-config">
                    <code>minReplicas: 3, maxReplicas: 20</code><br/>
                    <code>targetCPUUtilizationPercentage: 70</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="deployment-section">
            <h4>💾 Backup y Recuperación</h4>
            <div className="backup-strategy">
              <div className="backup-component">
                <h5>🗄️ Base de Datos</h5>
                <ul>
                  <li>Backup automático cada 6 horas</li>
                  <li>Retención de 30 días</li>
                  <li>Replicación multi-región</li>
                  <li>Point-in-time recovery</li>
                </ul>
              </div>

              <div className="backup-component">
                <h5>🔍 Índices Vectoriales</h5>
                <ul>
                  <li>Snapshot diario de índices FAISS</li>
                  <li>Versionado de embeddings</li>
                  <li>Backup incremental</li>
                  <li>Procedimiento de reconstrucción</li>
                </ul>
              </div>

              <div className="backup-component">
                <h5>⚙️ Configuración</h5>
                <ul>
                  <li>Git repository para configs</li>
                  <li>ConfigMaps y Secrets versionados</li>
                  <li>Infrastructure as Code</li>
                  <li>Rollback automatizado</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="deployment-section">
            <h4>🚦 CI/CD Pipeline</h4>
            <div className="pipeline-stages">
              <div className="stage">
                <h5>1️⃣ Desarrollo</h5>
                <p>Tests unitarios, linting, security scan</p>
              </div>
              <div className="stage">
                <h5>2️⃣ Staging</h5>
                <p>Tests de integración, performance tests</p>
              </div>
              <div className="stage">
                <h5>3️⃣ Producción</h5>
                <p>Blue-green deployment, health checks</p>
              </div>
            </div>
            
            <div className="pipeline-config">
              <h5>GitHub Actions Example:</h5>
              <div className="code-block">
                <pre><code>{`name: Deploy Memory Service
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Run tests
      run: |
        pip install -r requirements.txt
        pytest tests/ --cov=src/ --cov-report=xml
    
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - name: Deploy to K8s
      run: |
        kubectl apply -f k8s/
        kubectl rollout status deployment/memory-service`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🎯 Ejercicios Prácticos</h3>
        
        <div className="exercises">
          <div className="exercise-card">
            <h4>🛠️ Ejercicio 1: Implementación Básica</h4>
            <p>Implementa el sistema básico y realiza operaciones CRUD de memoria</p>
            <ul>
              <li>Crear instancia del sistema</li>
              <li>Almacenar diferentes tipos de memoria</li>
              <li>Recuperar contexto relevante</li>
              <li>Generar resúmenes</li>
            </ul>
          </div>
          
          <div className="exercise-card">
            <h4>🧪 Ejercicio 2: Tests Personalizados</h4>
            <p>Crea tests específicos para tu caso de uso</p>
            <ul>
              <li>Test de rendimiento con tu dataset</li>
              <li>Test de precisión de retrieval</li>
              <li>Test de optimización de memoria</li>
              <li>Test de recuperación ante fallos</li>
            </ul>
          </div>
          
          <div className="exercise-card">
            <h4>⚡ Ejercicio 3: Optimización</h4>
            <p>Optimiza el sistema para tu caso específico</p>
            <ul>
              <li>Ajustar parámetros de embedding</li>
              <li>Configurar estrategias de resumen</li>
              <li>Optimizar índices de búsqueda</li>
              <li>Implementar cache inteligente</li>
            </ul>
          </div>
          
          <div className="exercise-card">
            <h4>🎨 Ejercicio 4: Extensión</h4>
            <p>Extiende el sistema con funcionalidades adicionales</p>
            <ul>
              <li>Soporte para memoria visual</li>
              <li>Integración con APIs externas</li>
              <li>Dashboard de monitoreo</li>
              <li>API REST para el sistema</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="lesson-completion">
        <h3>🎉 ¡Felicitaciones!</h3>
        <p>
          Has completado exitosamente el <strong>Módulo C: Sistemas de Memoria</strong>. 
          Ahora tienes las herramientas y conocimientos para implementar sistemas de 
          memoria avanzados en tus agentes IA.
        </p>
        
        <div className="completion-summary">
          <h4>📚 Lo que has aprendido:</h4>
          <ul>
            <li>✅ Fundamentos de memoria en agentes IA</li>
            <li>✅ Implementación de memoria de corto plazo</li>
            <li>✅ Sistemas de memoria persistente de largo plazo</li>
            <li>✅ Resúmenes inteligentes y compresión de información</li>
            <li>✅ Retrieval de contexto híbrido y eficiente</li>
            <li>✅ Sistema completo integrado con tests y monitoreo</li>
          </ul>
        </div>
      </div>

      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          🎓 Módulo C Completado ✓
        </button>
      </div>
    </div>
  );
};

export default ModuleC;
