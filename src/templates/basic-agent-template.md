# Plantilla Básica: Agente LangGraph

Esta plantilla proporciona la estructura mínima para crear un agente LangGraph con tres nodos: planificador, ejecutor y crítico.

## Estructura del Proyecto

```
my_agent/
├── agent.py           # Definición del agente principal
├── nodes/             # Nodos del grafo
│   ├── __init__.py
│   ├── planner.py     # Nodo planificador
│   ├── executor.py    # Nodo ejecutor
│   └── critic.py      # Nodo crítico
├── state.py           # Definición del estado compartido
├── tools/             # Herramientas disponibles
│   └── __init__.py
└── config.py          # Configuración del agente
```

## Instalación

```bash
pip install langgraph langchain openai
```

## Uso Básico

```python
from agent import create_agent

# Crear el agente
agent = create_agent()

# Enviar un mensaje
response = agent.run("¿Puedes ayudarme con análisis de datos?")
print(response)
```

## Configuración

Edita `config.py` para personalizar:
- Modelo de LLM a usar
- Herramientas disponibles
- Criterios de evaluación
- Límites de iteraciones

## Personalización

### Agregar Nuevos Nodos

1. Crea un archivo en `nodes/`
2. Define una función que reciba y retorne el estado
3. Registra el nodo en `agent.py`

### Agregar Herramientas

1. Crea funciones en `tools/`
2. Registra las herramientas en `config.py`
3. El ejecutor las usará automáticamente

## Ejemplos de Uso

Ver la carpeta `examples/` para casos de uso específicos:
- Agente de investigación
- Asistente de código
- Analizador de documentos
