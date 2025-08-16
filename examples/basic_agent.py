"""
Agente LangGraph Básico - Plantilla Inicial
=========================================

Esta plantilla proporciona un agente simple con 3 nodos:
- Planificador: Analiza la entrada y decide acciones
- Ejecutor: Ejecuta las acciones planificadas
- Crítico: Evalúa resultados y decide si continuar

Uso:
    python basic_agent.py
"""

from langgraph.graph import Graph
from langchain.llms import OpenAI
from langchain.schema import BaseMessage, HumanMessage, AIMessage
from typing import List, Dict, Any
import os

# ============================================================================
# CONFIGURACIÓN
# ============================================================================

# Configurar tu API key de OpenAI
os.environ["OPENAI_API_KEY"] = "tu-api-key-aqui"

class AgentConfig:
    """Configuración del agente"""
    LLM_TEMPERATURE = 0.1
    MAX_ITERATIONS = 5
    MODEL_NAME = "gpt-3.5-turbo-instruct"

# ============================================================================
# ESTADO DEL AGENTE
# ============================================================================

class AgentState:
    """Estado compartido entre todos los nodos del grafo"""
    
    def __init__(self):
        self.messages: List[BaseMessage] = []
        self.current_plan: str = ""
        self.execution_result: str = ""
        self.evaluation: str = ""
        self.next_action: str = "plan"
        self.iteration_count: int = 0
        self.is_complete: bool = False
        self.tools_used: List[str] = []

    def add_message(self, message: BaseMessage):
        """Agregar un mensaje al historial"""
        self.messages.append(message)
    
    def get_last_user_message(self) -> str:
        """Obtener el último mensaje del usuario"""
        for msg in reversed(self.messages):
            if isinstance(msg, HumanMessage):
                return msg.content
        return ""

# ============================================================================
# NODOS DEL GRAFO
# ============================================================================

def planner_node(state: AgentState) -> AgentState:
    """
    Nodo Planificador: Analiza la entrada y crea un plan de acción
    """
    llm = OpenAI(temperature=AgentConfig.LLM_TEMPERATURE, model=AgentConfig.MODEL_NAME)
    
    user_message = state.get_last_user_message()
    
    planning_prompt = f"""
    Analiza esta solicitud del usuario y crea un plan de acción específico:
    
    Solicitud: "{user_message}"
    
    Contexto de la conversación:
    {[msg.content for msg in state.messages[-3:]]}
    
    Crea un plan paso a paso que indique:
    1. Qué tipo de respuesta necesita el usuario
    2. Qué información necesitas recopilar
    3. Qué acciones específicas tomar
    
    Responde solo con el plan, sin ejecutar nada aún.
    """
    
    plan = llm.predict(planning_prompt)
    state.current_plan = plan.strip()
    state.next_action = "execute"
    
    print(f"🧠 PLANIFICADOR: {state.current_plan}")
    return state

def executor_node(state: AgentState) -> AgentState:
    """
    Nodo Ejecutor: Ejecuta el plan creado por el planificador
    """
    llm = OpenAI(temperature=0.7, model=AgentConfig.MODEL_NAME)
    
    execution_prompt = f"""
    Ejecuta este plan de acción:
    
    Plan: {state.current_plan}
    
    Mensaje original del usuario: {state.get_last_user_message()}
    
    Herramientas disponibles:
    - busqueda_web: Para buscar información en internet
    - calculadora: Para realizar cálculos
    - analisis_texto: Para analizar y procesar texto
    
    Ejecuta el plan y proporciona una respuesta útil y completa.
    Si necesitas usar herramientas, indica cuáles usarías.
    """
    
    result = llm.predict(execution_prompt)
    state.execution_result = result.strip()
    state.next_action = "critique"
    
    # Simular uso de herramientas (en una implementación real, aquí llamarías APIs)
    if "busqueda" in state.current_plan.lower():
        state.tools_used.append("busqueda_web")
    if "calcul" in state.current_plan.lower():
        state.tools_used.append("calculadora")
    
    print(f"⚡ EJECUTOR: {state.execution_result[:100]}...")
    return state

def critic_node(state: AgentState) -> AgentState:
    """
    Nodo Crítico: Evalúa si la respuesta es satisfactoria
    """
    llm = OpenAI(temperature=AgentConfig.LLM_TEMPERATURE, model=AgentConfig.MODEL_NAME)
    
    critique_prompt = f"""
    Evalúa esta ejecución y decide si es satisfactoria:
    
    Solicitud original: {state.get_last_user_message()}
    Plan: {state.current_plan}
    Resultado: {state.execution_result}
    
    Criterios de evaluación:
    1. ¿Responde completamente a la solicitud del usuario?
    2. ¿La información es precisa y útil?
    3. ¿El tono es apropiado?
    4. ¿Falta algo importante?
    
    Responde con una de estas opciones:
    - SATISFACTORIO: Si la respuesta es buena y completa
    - REVISAR: Si necesita mejoras (explica qué falta)
    - REPLANTEAR: Si el plan inicial fue incorrecto
    
    Formato: [DECISIÓN]: [Explicación breve]
    """
    
    evaluation = llm.predict(critique_prompt)
    state.evaluation = evaluation.strip()
    
    # Determinar siguiente acción basada en la evaluación
    if "SATISFACTORIO" in evaluation.upper():
        state.next_action = "complete"
        state.is_complete = True
    elif "REPLANTEAR" in evaluation.upper():
        state.next_action = "plan"
    else:  # REVISAR
        state.next_action = "execute"
    
    state.iteration_count += 1
    
    print(f"🔍 CRÍTICO: {state.evaluation}")
    return state

# ============================================================================
# FUNCIONES DE CONTROL
# ============================================================================

def should_continue(state: AgentState) -> str:
    """Determina el siguiente nodo a ejecutar"""
    
    # Límite de iteraciones para evitar bucles infinitos
    if state.iteration_count >= AgentConfig.MAX_ITERATIONS:
        return "end"
    
    # Si está marcado como completo, terminar
    if state.is_complete:
        return "end"
    
    # Dirigir al siguiente nodo según el estado
    next_actions = {
        "plan": "planner",
        "execute": "executor", 
        "critique": "critic",
        "complete": "end"
    }
    
    return next_actions.get(state.next_action, "end")

# ============================================================================
# CONSTRUCCIÓN DEL GRAFO
# ============================================================================

def create_agent_graph():
    """Crea y configura el grafo del agente"""
    
    # Crear el grafo
    graph = Graph()
    
    # Agregar nodos
    graph.add_node("planner", planner_node)
    graph.add_node("executor", executor_node)
    graph.add_node("critic", critic_node)
    
    # Configurar el flujo
    graph.add_conditional_edge(
        "planner",
        should_continue,
        {
            "executor": "executor",
            "end": "__end__"
        }
    )
    
    graph.add_conditional_edge(
        "executor", 
        should_continue,
        {
            "critic": "critic",
            "end": "__end__"
        }
    )
    
    graph.add_conditional_edge(
        "critic",
        should_continue,
        {
            "planner": "planner",
            "executor": "executor", 
            "end": "__end__"
        }
    )
    
    # Configurar punto de entrada
    graph.set_entry_point("planner")
    
    return graph.compile()

# ============================================================================
# INTERFAZ PRINCIPAL
# ============================================================================

def create_agent():
    """Crear una instancia del agente"""
    return create_agent_graph()

def run_agent_conversation():
    """Ejecutar una conversación interactiva con el agente"""
    
    print("🤖 Agente LangGraph iniciado!")
    print("Escribe 'salir' para terminar.\n")
    
    agent = create_agent()
    
    while True:
        # Obtener entrada del usuario
        user_input = input("Usuario: ").strip()
        
        if user_input.lower() in ['salir', 'exit', 'quit']:
            print("¡Hasta luego!")
            break
            
        if not user_input:
            continue
        
        # Crear estado inicial
        state = AgentState()
        state.add_message(HumanMessage(content=user_input))
        
        print(f"\n--- Procesando: '{user_input}' ---")
        
        try:
            # Ejecutar el agente
            result = agent.run(state)
            
            # Mostrar respuesta final
            print(f"\n🤖 Agente: {result.execution_result}")
            print(f"📊 Herramientas usadas: {', '.join(result.tools_used) if result.tools_used else 'Ninguna'}")
            print(f"🔄 Iteraciones: {result.iteration_count}")
            print("-" * 50)
            
        except Exception as e:
            print(f"❌ Error: {e}")
            print("Intenta con otra consulta.")

# ============================================================================
# PUNTO DE ENTRADA
# ============================================================================

if __name__ == "__main__":
    # Verificar configuración
    if not os.getenv("OPENAI_API_KEY") or os.getenv("OPENAI_API_KEY") == "tu-api-key-aqui":
        print("❌ Error: Configura tu OPENAI_API_KEY en la línea 23")
        print("Obtén tu API key en: https://platform.openai.com/api-keys")
        exit(1)
    
    # Ejemplo de uso rápido
    print("=== EJEMPLO DE USO ===")
    agent = create_agent()
    state = AgentState()
    state.add_message(HumanMessage(content="Explica qué es machine learning en términos simples"))
    
    result = agent.run(state)
    print(f"Respuesta: {result.execution_result}")
    
    print("\n" + "="*50 + "\n")
    
    # Conversación interactiva
    run_agent_conversation()
