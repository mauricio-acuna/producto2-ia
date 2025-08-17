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
const LongTermMemoryLesson = ({ onComplete }) => (
  <div className="lesson">
    <h2>💾 Memoria de Largo Plazo</h2>
    <p>Almacenamiento persistente entre sesiones...</p>
    <div className="lesson-actions">
      <button className="btn btn-primary" onClick={onComplete}>
        Completado
      </button>
    </div>
  </div>
);

// Lección 4: Resúmenes Inteligentes
const IntelligentSummariesLesson = ({ onComplete }) => (
  <div className="lesson">
    <h2>📝 Resúmenes Inteligentes</h2>
    <p>Creación automática de resúmenes de conversaciones...</p>
    <div className="lesson-actions">
      <button className="btn btn-primary" onClick={onComplete}>
        Completado
      </button>
    </div>
  </div>
);

// Lección 5: Retrieval de Contexto
const ContextRetrievalLesson = ({ onComplete }) => (
  <div className="lesson">
    <h2>🔍 Retrieval de Contexto</h2>
    <p>Recuperación eficiente de información relevante...</p>
    <div className="lesson-actions">
      <button className="btn btn-primary" onClick={onComplete}>
        Completado
      </button>
    </div>
  </div>
);

// Lección 6: Laboratorio
const MemorySystemLabLesson = ({ onComplete }) => (
  <div className="lesson">
    <h2>🔬 Laboratorio: Sistema de Memoria</h2>
    <p>Implementación completa de un sistema de memoria...</p>
    <div className="lesson-actions">
      <button className="btn btn-primary" onClick={onComplete}>
        Completado
      </button>
    </div>
  </div>
);

export default ModuleC;
