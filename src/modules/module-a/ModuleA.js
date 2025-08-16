import React, { useState } from 'react';
import CodeBlock from '../components/CodeBlock';
import LangGraphVisualizer from '../components/LangGraphVisualizer';

const ModuleA = () => {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([]);

  const lessons = [
    {
      id: 1,
      title: "Introducción a LangGraph",
      duration: "15 min",
      type: "concept"
    },
    {
      id: 2,
      title: "Conceptos de Grafo y Nodos",
      duration: "20 min",
      type: "concept"
    },
    {
      id: 3,
      title: "Tu Primer Agente con LangGraph",
      duration: "30 min",
      type: "hands-on"
    },
    {
      id: 4,
      title: "Nodos: Plan, Exec, Critic",
      duration: "25 min",
      type: "hands-on"
    },
    {
      id: 5,
      title: "Transiciones y Control de Flujo",
      duration: "20 min",
      type: "concept"
    },
    {
      id: 6,
      title: "Laboratorio: Agente Completo",
      duration: "45 min",
      type: "lab"
    }
  ];

  const markLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const getCurrentLessonContent = () => {
    switch (currentLesson) {
      case 1:
        return <IntroductionLesson onComplete={() => markLessonComplete(1)} />;
      case 2:
        return <GraphConceptsLesson onComplete={() => markLessonComplete(2)} />;
      case 3:
        return <FirstAgentLesson onComplete={() => markLessonComplete(3)} />;
      case 4:
        return <NodesLesson onComplete={() => markLessonComplete(4)} />;
      case 5:
        return <TransitionsLesson onComplete={() => markLessonComplete(5)} />;
      case 6:
        return <LabLesson onComplete={() => markLessonComplete(6)} />;
      default:
        return <IntroductionLesson onComplete={() => markLessonComplete(1)} />;
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Portal 2</a> → <span>Módulo A: Agentes en LangGraph</span>
          </div>
          <h1>Módulo A: Agentes en LangGraph</h1>
          <p className="module-description">
            Aprende a construir agentes modulares usando LangGraph. Domina conceptos de grafo, 
            nodos plan/exec/critic y transiciones explícitas.
          </p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
            ></div>
          </div>
          <span className="progress-text">
            {completedLessons.length} de {lessons.length} lecciones completadas
          </span>
        </div>
      </div>

      <div className="module-content">
        <div className="container">
          <div className="module-layout">
            <aside className="lessons-sidebar">
              <h3>Lecciones</h3>
              <nav className="lessons-nav">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    className={`lesson-item ${currentLesson === lesson.id ? 'active' : ''} ${
                      completedLessons.includes(lesson.id) ? 'completed' : ''
                    }`}
                    onClick={() => setCurrentLesson(lesson.id)}
                  >
                    <div className="lesson-info">
                      <span className="lesson-number">{lesson.id}</span>
                      <div className="lesson-details">
                        <h4>{lesson.title}</h4>
                        <div className="lesson-meta">
                          <span className="duration">{lesson.duration}</span>
                          <span className={`type ${lesson.type}`}>{getLessonTypeLabel(lesson.type)}</span>
                        </div>
                      </div>
                    </div>
                    {completedLessons.includes(lesson.id) && (
                      <span className="checkmark">✓</span>
                    )}
                  </button>
                ))}
              </nav>
            </aside>

            <main className="lesson-content">
              {getCurrentLessonContent()}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function
const getLessonTypeLabel = (type) => {
  const labels = {
    concept: 'Concepto',
    'hands-on': 'Práctica',
    lab: 'Laboratorio'
  };
  return labels[type] || type;
};

// Individual Lesson Components
const IntroductionLesson = ({ onComplete }) => {
  return (
    <div className="lesson">
      <h2>Introducción a LangGraph</h2>
      
      <div className="lesson-section">
        <h3>¿Qué es LangGraph?</h3>
        <p>
          <strong>LangGraph</strong> es un framework para construir agentes conversacionales como 
          grafos explícitos de nodos y transiciones. A diferencia de agentes simples que siguen 
          un flujo lineal, LangGraph te permite:
        </p>
        
        <ul>
          <li>🔄 <strong>Control de flujo explícito</strong>: Define exactamente cómo y cuándo se ejecutan las acciones</li>
          <li>🧩 <strong>Modularidad</strong>: Cada nodo tiene una responsabilidad específica</li>
          <li>🔍 <strong>Debuggabilidad</strong>: Puedes ver exactamente qué está haciendo el agente en cada paso</li>
          <li>🔀 <strong>Ramificación condicional</strong>: El agente puede tomar diferentes caminos según el contexto</li>
        </ul>
      </div>

      <div className="lesson-section">
        <h3>¿Por qué usar LangGraph vs Agentes Simples?</h3>
        
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Aspecto</th>
                <th>Agente Simple</th>
                <th>LangGraph</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Control de flujo</td>
                <td>Lineal/reactivo</td>
                <td>Explícito y planificado</td>
              </tr>
              <tr>
                <td>Debuggabilidad</td>
                <td>Caja negra</td>
                <td>Cada paso es visible</td>
              </tr>
              <tr>
                <td>Complejidad</td>
                <td>Baja</td>
                <td>Media-Alta</td>
              </tr>
              <tr>
                <td>Escalabilidad</td>
                <td>Limitada</td>
                <td>Alta</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Casos de Uso Ideales</h3>
        <div className="use-cases-grid">
          <div className="use-case-card">
            <h4>🤖 Agentes de Investigación</h4>
            <p>Que necesitan planificar → buscar → analizar → sintetizar</p>
          </div>
          <div className="use-case-card">
            <h4>💼 Asistentes de Productividad</h4>
            <p>Con múltiples herramientas y flujos de trabajo complejos</p>
          </div>
          <div className="use-case-card">
            <h4>🔧 Agentes de Debugging</h4>
            <p>Que analizan código, identifican problemas y proponen soluciones</p>
          </div>
        </div>
      </div>

      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          Marcar como Completado
        </button>
      </div>
    </div>
  );
};

const GraphConceptsLesson = ({ onComplete }) => {
  return (
    <div className="lesson">
      <h2>Conceptos de Grafo y Nodos</h2>
      
      <div className="lesson-section">
        <h3>Anatomía de un Grafo LangGraph</h3>
        <p>
          Un agente LangGraph está compuesto por tres elementos principales:
        </p>
        
        <div className="concept-cards">
          <div className="concept-card">
            <h4>🔵 Nodos (Nodes)</h4>
            <p>Unidades de trabajo que ejecutan una función específica. Pueden ser LLMs, herramientas, o funciones Python.</p>
          </div>
          <div className="concept-card">
            <h4>➡️ Aristas (Edges)</h4>
            <p>Conexiones entre nodos que definen el flujo de ejecución. Pueden ser condicionales o fijas.</p>
          </div>
          <div className="concept-card">
            <h4>📊 Estado (State)</h4>
            <p>Información compartida entre nodos. Se propaga y modifica a medida que fluye por el grafo.</p>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Visualización Básica</h3>
        <LangGraphVisualizer 
          nodes={[
            { id: 'start', label: 'Inicio', type: 'start' },
            { id: 'plan', label: 'Planificador', type: 'node' },
            { id: 'exec', label: 'Ejecutor', type: 'node' },
            { id: 'critic', label: 'Crítico', type: 'node' },
            { id: 'end', label: 'Fin', type: 'end' }
          ]}
          edges={[
            { from: 'start', to: 'plan' },
            { from: 'plan', to: 'exec' },
            { from: 'exec', to: 'critic' },
            { from: 'critic', to: 'end', condition: 'success' },
            { from: 'critic', to: 'plan', condition: 'retry' }
          ]}
        />
      </div>

      <div className="lesson-section">
        <h3>Tipos de Nodos Comunes</h3>
        <div className="node-types">
          <div className="node-type">
            <h4>🧠 Planificador</h4>
            <p>Analiza la entrada y decide qué hacer. Genera un plan de acción.</p>
          </div>
          <div className="node-type">
            <h4>⚡ Ejecutor</h4>
            <p>Ejecuta las acciones planificadas. Puede llamar herramientas o APIs.</p>
          </div>
          <div className="node-type">
            <h4>🔍 Crítico</h4>
            <p>Evalúa los resultados y decide si son satisfactorios o necesitan mejora.</p>
          </div>
          <div className="node-type">
            <h4>🔄 Router</h4>
            <p>Toma decisiones condicionales sobre el siguiente paso a seguir.</p>
          </div>
        </div>
      </div>

      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          Marcar como Completado
        </button>
      </div>
    </div>
  );
};

const FirstAgentLesson = ({ onComplete }) => {
  const simpleAgentCode = `
from langgraph.graph import Graph
from langchain.llms import OpenAI
from langchain.schema import BaseMessage, HumanMessage, AIMessage

# Definir el estado que se compartirá entre nodos
class AgentState:
    def __init__(self):
        self.messages = []
        self.next_step = "plan"

# Función para el nodo planificador
def planner_node(state: AgentState) -> AgentState:
    llm = OpenAI(temperature=0.1)
    
    # El planificador analiza los mensajes y decide qué hacer
    prompt = f"""
    Analiza esta conversación y decide qué acción tomar:
    {state.messages}
    
    Opciones:
    - research: Si necesitas buscar información
    - respond: Si puedes responder directamente
    - clarify: Si necesitas más información del usuario
    
    Responde solo con la acción: research/respond/clarify
    """
    
    action = llm.predict(prompt).strip().lower()
    state.next_step = action
    return state

# Función para el nodo ejecutor
def executor_node(state: AgentState) -> AgentState:
    llm = OpenAI(temperature=0.7)
    
    if state.next_step == "respond":
        # Generar respuesta directa
        response = llm.predict(f"Responde a: {state.messages[-1]}")
        state.messages.append(AIMessage(content=response))
    elif state.next_step == "research":
        # Simular investigación
        response = "He investigado el tema y encontré información relevante..."
        state.messages.append(AIMessage(content=response))
    elif state.next_step == "clarify":
        response = "Necesito más información. ¿Podrías ser más específico?"
        state.messages.append(AIMessage(content=response))
    
    return state

# Función para determinar el siguiente nodo
def router(state: AgentState) -> str:
    if state.next_step in ["respond", "research", "clarify"]:
        return "executor"
    return "end"

# Crear el grafo
def create_simple_agent():
    graph = Graph()
    
    # Agregar nodos
    graph.add_node("planner", planner_node)
    graph.add_node("executor", executor_node)
    
    # Definir el flujo
    graph.add_edge("planner", "executor")
    graph.add_conditional_edge("executor", router)
    
    # Configurar puntos de entrada y salida
    graph.set_entry_point("planner")
    graph.set_finish_point("end")
    
    return graph.compile()

# Usar el agente
agent = create_simple_agent()
initial_state = AgentState()
initial_state.messages = [HumanMessage(content="¿Qué es la inteligencia artificial?")]

result = agent.run(initial_state)
print(result.messages[-1].content)
`;

  return (
    <div className="lesson">
      <h2>Tu Primer Agente con LangGraph</h2>
      
      <div className="lesson-section">
        <h3>Construyendo un Agente Simple</h3>
        <p>
          Vamos a crear tu primer agente LangGraph. Este agente tendrá dos nodos:
          un <strong>planificador</strong> que decide qué hacer, y un <strong>ejecutor</strong> que 
          lleva a cabo la acción.
        </p>
      </div>

      <div className="lesson-section">
        <h3>Código Completo</h3>
        <CodeBlock 
          language="python" 
          code={simpleAgentCode}
          title="simple_agent.py"
        />
      </div>

      <div className="lesson-section">
        <h3>Explicación Paso a Paso</h3>
        
        <div className="step-by-step">
          <div className="step">
            <h4>1. Definir el Estado</h4>
            <p>
              El <code>AgentState</code> mantiene los mensajes de la conversación 
              y el siguiente paso a ejecutar.
            </p>
          </div>
          
          <div className="step">
            <h4>2. Crear Nodos</h4>
            <p>
              Cada nodo es una función que recibe el estado, lo modifica, y lo retorna.
              El planificador decide la acción, el ejecutor la lleva a cabo.
            </p>
          </div>
          
          <div className="step">
            <h4>3. Conectar el Grafo</h4>
            <p>
              Definimos cómo fluye la ejecución entre nodos usando 
              <code>add_edge</code> y <code>add_conditional_edge</code>.
            </p>
          </div>
          
          <div className="step">
            <h4>4. Compilar y Ejecutar</h4>
            <p>
              El grafo se compila en un agente ejecutable que puede procesar 
              mensajes y generar respuestas.
            </p>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🚀 Prueba el Código</h3>
        <div className="hands-on-box">
          <p>
            <strong>Ejercicio:</strong> Copia este código y ejecutalo en tu entorno. 
            Experimenta cambiando el mensaje inicial y observa cómo el agente 
            decide diferentes acciones.
          </p>
          <div className="checklist">
            <label>
              <input type="checkbox" /> He copiado y ejecutado el código
            </label>
            <label>
              <input type="checkbox" /> He probado con diferentes mensajes
            </label>
            <label>
              <input type="checkbox" /> Entiendo cómo fluye el estado entre nodos
            </label>
          </div>
        </div>
      </div>

      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          Marcar como Completado
        </button>
      </div>
    </div>
  );
};

const NodesLesson = ({ onComplete }) => {
  return (
    <div className="lesson">
      <h2>Nodos: Plan, Exec, Critic</h2>
      <p>Contenido de la lección sobre nodos especializados...</p>
      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          Marcar como Completado
        </button>
      </div>
    </div>
  );
};

const TransitionsLesson = ({ onComplete }) => {
  return (
    <div className="lesson">
      <h2>Transiciones y Control de Flujo</h2>
      <p>Contenido de la lección sobre transiciones...</p>
      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          Marcar como Completado
        </button>
      </div>
    </div>
  );
};

const LabLesson = ({ onComplete }) => {
  return (
    <div className="lesson">
      <h2>Laboratorio: Agente Completo</h2>
      <p>Laboratorio práctico para construir un agente completo...</p>
      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          Marcar como Completado
        </button>
      </div>
    </div>
  );
};

export default ModuleA;
