import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';
import SafetyConfigVisualizer from '../../components/SafetyConfigVisualizer';

const ModuleB = () => {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([]);

  const lessons = [
    {
      id: 1,
      title: "¿Por qué Tools Seguras?",
      duration: "15 min",
      type: "concept"
    },
    {
      id: 2,
      title: "Contratos de Herramientas",
      duration: "25 min",
      type: "concept"
    },
    {
      id: 3,
      title: "Validación de Inputs",
      duration: "30 min",
      type: "hands-on"
    },
    {
      id: 4,
      title: "Allowlist y Restricciones",
      duration: "20 min",
      type: "hands-on"
    },
    {
      id: 5,
      title: "safety.yaml Configuración",
      duration: "25 min",
      type: "concept"
    },
    {
      id: 6,
      title: "Laboratorio: Tool Manager Seguro",
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
        return <WhySecureToolsLesson onComplete={() => markLessonComplete(1)} />;
      case 2:
        return <ToolContractsLesson onComplete={() => markLessonComplete(2)} />;
      case 3:
        return <InputValidationLesson onComplete={() => markLessonComplete(3)} />;
      case 4:
        return <AllowlistLesson onComplete={() => markLessonComplete(4)} />;
      case 5:
        return <SafetyYamlLesson onComplete={() => markLessonComplete(5)} />;
      case 6:
        return <SecureToolManagerLab onComplete={() => markLessonComplete(6)} />;
      default:
        return <WhySecureToolsLesson onComplete={() => markLessonComplete(1)} />;
    }
  };

  const getLessonTypeLabel = (type) => {
    const labels = {
      concept: 'Concepto',
      'hands-on': 'Práctica',
      lab: 'Laboratorio'
    };
    return labels[type] || type;
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Portal 2</Link> → <span>Módulo B: Tools Seguras</span>
          </div>
          <h1>Módulo B: Tools Seguras</h1>
          <p className="module-description">
            Aprende a implementar tool calling seguro con contratos explícitos, validación de entradas 
            y configuraciones de seguridad. Protege tu agente de ejecuciones maliciosas.
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

              <div className="module-nav">
                <Link to="/modulo-a" className="btn btn-outline">
                  ← Módulo A
                </Link>
                <span className="module-nav-spacer"></span>
                <button className="btn btn-outline" disabled>
                  Módulo C →
                </button>
              </div>
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

// Lección 1: ¿Por qué Tools Seguras?
const WhySecureToolsLesson = ({ onComplete }) => {
  return (
    <div className="lesson">
      <h2>¿Por qué Tools Seguras?</h2>
      
      <div className="lesson-section">
        <h3>El Problema: Ejecución Descontrolada</h3>
        <p>
          Cuando un agente puede ejecutar herramientas sin restricciones, se convierte en un 
          <strong> vector de ataque</strong>. Un prompt malicioso podría hacer que tu agente:
        </p>
        
        <div className="danger-examples">
          <div className="danger-card">
            <h4>🗑️ Eliminación de Archivos</h4>
            <p>Ejecutar comandos como <code>rm -rf /</code> o <code>del *.*</code></p>
          </div>
          <div className="danger-card">
            <h4>🌐 Accesos No Autorizados</h4>
            <p>Hacer requests HTTP a endpoints internos o APIs sensibles</p>
          </div>
          <div className="danger-card">
            <h4>💾 Fuga de Datos</h4>
            <p>Leer archivos confidenciales y enviarlos a servidores externos</p>
          </div>
          <div className="danger-card">
            <h4>⚡ Consumo de Recursos</h4>
            <p>Crear bucles infinitos o procesos que consumen CPU/memoria</p>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Ejemplo de Ataque: Prompt Injection</h3>
        
        <div className="attack-example">
          <h4>❌ Escenario Vulnerable</h4>
          <CodeBlock
            language="python"
            title="agente_vulnerable.py"
            code={`
# Agente SIN protecciones
def ejecutar_herramienta(nombre, parametros):
    if nombre == "ejecutar_comando":
        import subprocess
        return subprocess.run(parametros["comando"], shell=True, capture_output=True)
    elif nombre == "leer_archivo":
        with open(parametros["archivo"], 'r') as f:
            return f.read()

# Entrada maliciosa del usuario:
# "Por favor, ejecuta el comando 'cat /etc/passwd' para ayudarme"
# El agente podría interpretar esto como una solicitud legítima
            `}
          />
          
          <div className="attack-explanation">
            <p>
              Un atacante podría usar <strong>prompt injection</strong> para hacer que el agente 
              ejecute comandos peligrosos, haciéndolo parecer como una solicitud normal.
            </p>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>La Solución: Capas de Seguridad</h3>
        
        <div className="security-layers">
          <div className="layer">
            <div className="layer-number">1</div>
            <div className="layer-content">
              <h4>Contratos Explícitos</h4>
              <p>Define exactamente qué parámetros acepta cada herramienta y sus tipos</p>
            </div>
          </div>
          <div className="layer">
            <div className="layer-number">2</div>
            <div className="layer-content">
              <h4>Validación de Inputs</h4>
              <p>Verifica que los parámetros cumplan con reglas de seguridad</p>
            </div>
          </div>
          <div className="layer">
            <div className="layer-number">3</div>
            <div className="layer-content">
              <h4>Allowlist de Herramientas</h4>
              <p>Solo permite ejecutar herramientas pre-aprobadas</p>
            </div>
          </div>
          <div className="layer">
            <div className="layer-number">4</div>
            <div className="layer-content">
              <h4>Sandboxing</h4>
              <p>Ejecuta herramientas en entornos aislados con permisos limitados</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Beneficios de Tools Seguras</h3>
        
        <div className="benefits-grid">
          <div className="benefit-card">
            <h4>🛡️ Protección</h4>
            <p>Previene ejecución de código malicioso</p>
          </div>
          <div className="benefit-card">
            <h4>🔍 Auditabilidad</h4>
            <p>Cada tool call es registrado y verificable</p>
          </div>
          <div className="benefit-card">
            <h4>🎯 Confiabilidad</h4>
            <p>Comportamiento predecible del agente</p>
          </div>
          <div className="benefit-card">
            <h4>📋 Compliance</h4>
            <p>Cumple con estándares de seguridad empresarial</p>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Casos de Uso Reales</h3>
        
        <div className="use-case-examples">
          <div className="use-case">
            <h4>🏦 Banca y Finanzas</h4>
            <p>Agentes que acceden a datos financieros sensibles necesitan validación estricta</p>
          </div>
          <div className="use-case">
            <h4>🏥 Salud</h4>
            <p>Protección de información médica confidencial (HIPAA compliance)</p>
          </div>
          <div className="use-case">
            <h4>🏢 Empresarial</h4>
            <p>Agentes internos que no pueden acceder a sistemas críticos sin autorización</p>
          </div>
        </div>
      </div>

      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          Entendido - Continuar
        </button>
      </div>
    </div>
  );
};

// Lección 2: Contratos de Herramientas
const ToolContractsLesson = ({ onComplete }) => {
  const contractExample = `
from typing import Dict, Any, List
from pydantic import BaseModel, Field
from enum import Enum

class FilePermission(str, Enum):
    READ = "read"
    WRITE = "write"
    APPEND = "append"

class FileToolContract(BaseModel):
    """Contrato para herramientas que manejan archivos"""
    
    file_path: str = Field(
        ..., 
        description="Ruta del archivo a procesar",
        regex=r"^[a-zA-Z0-9/_.-]+$",  # Solo caracteres seguros
        max_length=255
    )
    
    permission: FilePermission = Field(
        ...,
        description="Tipo de acceso requerido al archivo"
    )
    
    max_size_mb: int = Field(
        default=10,
        description="Tamaño máximo permitido en MB",
        ge=1,  # Mayor o igual a 1
        le=100  # Menor o igual a 100
    )
    
    allowed_extensions: List[str] = Field(
        default=[".txt", ".json", ".csv"],
        description="Extensiones de archivo permitidas"
    )

class SearchToolContract(BaseModel):
    """Contrato para herramientas de búsqueda web"""
    
    query: str = Field(
        ...,
        description="Término de búsqueda",
        min_length=3,
        max_length=200,
        regex=r"^[a-zA-Z0-9\s\-_.,?!]+$"  # Sin caracteres especiales peligrosos
    )
    
    max_results: int = Field(
        default=5,
        description="Número máximo de resultados",
        ge=1,
        le=20
    )
    
    safe_search: bool = Field(
        default=True,
        description="Activar filtro de contenido seguro"
    )
    
    domains_allowed: List[str] = Field(
        default=["wikipedia.org", "stackoverflow.com"],
        description="Dominios permitidos para buscar"
    )

class ToolRegistry:
    """Registro centralizado de herramientas con sus contratos"""
    
    def __init__(self):
        self.tools = {}
    
    def register_tool(self, name: str, contract: BaseModel, handler):
        """Registra una herramienta con su contrato"""
        self.tools[name] = {
            "contract": contract,
            "handler": handler,
            "calls_count": 0,
            "last_used": None
        }
    
    def validate_and_execute(self, tool_name: str, params: Dict[str, Any]):
        """Valida parámetros contra el contrato y ejecuta la herramienta"""
        
        if tool_name not in self.tools:
            raise ValueError(f"Herramienta '{tool_name}' no registrada")
        
        tool_info = self.tools[tool_name]
        contract = tool_info["contract"]
        
        try:
            # Validar parámetros contra el contrato
            validated_params = contract(**params)
            
            # Ejecutar la herramienta
            result = tool_info["handler"](validated_params)
            
            # Actualizar estadísticas
            tool_info["calls_count"] += 1
            tool_info["last_used"] = datetime.now()
            
            return result
            
        except ValidationError as e:
            raise ValueError(f"Parámetros inválidos: {e}")

# Ejemplo de uso
registry = ToolRegistry()

def file_reader_handler(params: FileToolContract):
    """Handler seguro para leer archivos"""
    
    # Validaciones adicionales
    if not params.file_path.endswith(tuple(params.allowed_extensions)):
        raise ValueError("Extensión de archivo no permitida")
    
    if not os.path.exists(params.file_path):
        raise FileNotFoundError("Archivo no encontrado")
    
    # Verificar tamaño
    size_mb = os.path.getsize(params.file_path) / (1024 * 1024)
    if size_mb > params.max_size_mb:
        raise ValueError(f"Archivo muy grande: {size_mb}MB > {params.max_size_mb}MB")
    
    # Leer archivo de forma segura
    with open(params.file_path, 'r', encoding='utf-8') as f:
        return f.read()

# Registrar la herramienta
registry.register_tool("file_reader", FileToolContract, file_reader_handler)

# Uso seguro
try:
    result = registry.validate_and_execute("file_reader", {
        "file_path": "data/example.txt",
        "permission": "read",
        "max_size_mb": 5,
        "allowed_extensions": [".txt", ".md"]
    })
    print("Archivo leído exitosamente")
except ValueError as e:
    print(f"Error de validación: {e}")
`;

  return (
    <div className="lesson">
      <h2>Contratos de Herramientas</h2>
      
      <div className="lesson-section">
        <h3>¿Qué es un Contrato de Herramienta?</h3>
        <p>
          Un <strong>contrato</strong> es una especificación explícita que define:
        </p>
        
        <ul>
          <li>📋 <strong>Parámetros requeridos</strong> y opcionales</li>
          <li>🏷️ <strong>Tipos de datos</strong> esperados</li>
          <li>✅ <strong>Validaciones</strong> que deben cumplirse</li>
          <li>📖 <strong>Documentación</strong> de cada parámetro</li>
          <li>🚫 <strong>Restricciones</strong> de seguridad</li>
        </ul>
        
        <div className="concept-highlight">
          <p>
            💡 <strong>Principio clave:</strong> "Si no está en el contrato, no se ejecuta"
          </p>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Implementación con Pydantic</h3>
        <p>
          Usaremos <strong>Pydantic</strong> para definir contratos type-safe que validen 
          automáticamente los inputs:
        </p>
        
        <CodeBlock
          language="python"
          title="tool_contracts.py"
          code={contractExample}
        />
      </div>

      <div className="lesson-section">
        <h3>Componentes de un Contrato Robusto</h3>
        
        <div className="contract-components">
          <div className="component">
            <h4>🎯 Validación de Tipos</h4>
            <p>Usar anotaciones de tipo estrictas (str, int, List, Enum)</p>
          </div>
          <div className="component">
            <h4>📏 Límites de Tamaño</h4>
            <p>min_length, max_length, ge (&gt;=), le (&lt;=)</p>
          </div>
          <div className="component">
            <h4>🔍 Regex Patterns</h4>
            <p>Validar formato de strings (emails, URLs, nombres de archivo)</p>
          </div>
          <div className="component">
            <h4>📝 Documentación</h4>
            <p>description field para auto-documentar la API</p>
          </div>
          <div className="component">
            <h4>🛡️ Allowlists</h4>
            <p>Enum para valores permitidos, listas de dominios seguros</p>
          </div>
          <div className="component">
            <h4>⚙️ Valores por Defecto</h4>
            <p>Configuraciones seguras como default</p>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Patrón de Registro Centralizado</h3>
        
        <div className="pattern-explanation">
          <h4>Ventajas del ToolRegistry:</h4>
          <ul>
            <li>🎯 <strong>Single source of truth</strong> para todas las herramientas</li>
            <li>📊 <strong>Métricas automáticas</strong> de uso y performance</li>
            <li>🔄 <strong>Validación consistente</strong> en todos los tool calls</li>
            <li>🚦 <strong>Rate limiting</strong> y control de recursos</li>
            <li>🔍 <strong>Logging centralizado</strong> para auditabilidad</li>
          </ul>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🚀 Ejercicio Práctico</h3>
        <div className="hands-on-box">
          <p>
            <strong>Tarea:</strong> Crea un contrato para una herramienta de envío de emails 
            que incluya validación de direcciones, límites de tamaño y lista de dominios permitidos.
          </p>
          <div className="checklist">
            <label>
              <input type="checkbox" /> He creado la clase EmailToolContract
            </label>
            <label>
              <input type="checkbox" /> He agregado validación de email con regex
            </label>
            <label>
              <input type="checkbox" /> He implementado límites de caracteres para el mensaje
            </label>
            <label>
              <input type="checkbox" /> He creado una allowlist de dominios seguros
            </label>
          </div>
        </div>
      </div>

      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          Completado - Siguiente Lección
        </button>
      </div>
    </div>
  );
};

// Lección 3: Validación de Inputs
const InputValidationLesson = ({ onComplete }) => {
  const validationExample = `import re
import os
from pathlib import Path
from typing import Any, Dict, List
from urllib.parse import urlparse

class SecurityValidator:
    """Validador centralizado para inputs de herramientas"""
    
    # Patrones peligrosos comunes
    DANGEROUS_PATTERNS = [
        r'rm\\s+-rf',           # Eliminación recursiva Unix
        r'del\\s+.*\\*',         # Eliminación Windows
        r'DROP\\s+TABLE',       # SQL injection
        r'<script.*?>',        # XSS
        r'eval\\s*\\(',          # Ejecución de código
        r'exec\\s*\\(',          # Ejecución de código
        r'import\\s+os',        # Importación de módulos peligrosos
        r'subprocess',         # Ejecución de procesos
        r'__import__',         # Importación dinámica
        r'\\.\\./','            # Path traversal
        r'%2e%2e%2f',          # Path traversal encoded
    ]
    
    @classmethod
    def validate_string_input(cls, value: str, field_name: str):
        """Valida strings contra patrones peligrosos"""
        
        errors = []
        warnings = []
        
        # Verificar longitud
        if len(value) > 10000:
            errors.append(f"{field_name}: String muy largo")
        
        # Buscar patrones peligrosos
        for pattern in cls.DANGEROUS_PATTERNS:
            if re.search(pattern, value, re.IGNORECASE):
                errors.append(f"{field_name}: Patrón peligroso detectado")
        
        return {
            'valid': len(errors) == 0,
            'errors': errors,
            'warnings': warnings
        }

# Ejemplo de uso del validador
validator = SecurityValidator()
result = validator.validate_string_input("rm -rf /", "user_command")
if not result['valid']:
    print("Input peligroso bloqueado!")
`;

  return (
    <div className="lesson">
      <h2>Validación de Inputs</h2>
      
      <div className="lesson-section">
        <h3>Capas de Validación</h3>
        <p>
          Una validación robusta requiere múltiples capas de verificación:
        </p>
        
        <div className="validation-layers">
          <div className="validation-layer">
            <h4>1️⃣ Validación Sintáctica</h4>
            <p>Tipos de datos, formatos, longitudes</p>
          </div>
          <div className="validation-layer">
            <h4>2️⃣ Validación Semántica</h4>
            <p>Rangos válidos, valores lógicos, relaciones entre parámetros</p>
          </div>
          <div className="validation-layer">
            <h4>3️⃣ Validación de Seguridad</h4>
            <p>Patrones maliciosos, path traversal, code injection</p>
          </div>
          <div className="validation-layer">
            <h4>4️⃣ Validación Contextual</h4>
            <p>Permisos del usuario, restricciones del entorno</p>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Implementación Completa</h3>
        <CodeBlock
          language="python"
          title="security_validator.py"
          code={validationExample}
        />
      </div>

      <div className="lesson-section">
        <h3>Patrones de Ataque Comunes</h3>
        
        <div className="attack-patterns">
          <div className="pattern-card">
            <h4>🔓 Path Traversal</h4>
            <p><code>../../../etc/passwd</code></p>
            <p>Acceder a archivos fuera del directorio permitido</p>
          </div>
          <div className="pattern-card">
            <h4>💉 Command Injection</h4>
            <p><code>file.txt; rm -rf /</code></p>
            <p>Ejecutar comandos adicionales concatenados</p>
          </div>
          <div className="pattern-card">
            <h4>🔧 Code Injection</h4>
            <p><code>eval("malicious_code()")</code></p>
            <p>Ejecutar código Python arbitrario</p>
          </div>
          <div className="pattern-card">
            <h4>🌐 SSRF</h4>
            <p><code>http://localhost:8080/admin</code></p>
            <p>Acceder a servicios internos via requests</p>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Técnicas de Sanitización</h3>
        
        <div className="sanitization-techniques">
          <div className="technique">
            <h4>🧹 Whitelist de Caracteres</h4>
            <p>Solo permitir caracteres alfanuméricos + algunos especiales</p>
          </div>
          <div className="technique">
            <h4>🚫 Blacklist de Patrones</h4>
            <p>Detectar y bloquear patrones conocidos maliciosos</p>
          </div>
          <div className="technique">
            <h4>🔄 Normalización</h4>
            <p>Convertir a formato canónico (rutas, URLs, encoding)</p>
          </div>
          <div className="technique">
            <h4>⚠️ Escape de Caracteres</h4>
            <p>Escapar caracteres especiales según el contexto</p>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🚀 Ejercicio: Implementar Validación</h3>
        <div className="hands-on-box">
          <p>
            <strong>Tarea:</strong> Extiende el SecurityValidator con un método para validar 
            queries SQL que prevenga SQL injection.
          </p>
          <div className="checklist">
            <label>
              <input type="checkbox" /> He identificado patrones peligrosos de SQL
            </label>
            <label>
              <input type="checkbox" /> He implementado whitelist de keywords permitidas
            </label>
            <label>
              <input type="checkbox" /> He probado con queries maliciosas
            </label>
            <label>
              <input type="checkbox" /> He agregado sanitización de comillas
            </label>
          </div>
        </div>
      </div>

      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          Validación Implementada ✓
        </button>
      </div>
    </div>
  );
};

// Placeholder para las otras lecciones
const AllowlistLesson = ({ onComplete }) => {
  const allowlistExample = `# safety.yaml - Configuración de Seguridad
version: "1.0"
metadata:
  name: "Configuración de Tools Seguras"
  description: "Allowlist y restricciones para herramientas del agente"
  created: "2025-01-01"
  
security:
  # Herramientas permitidas explícitamente
  allowed_tools:
    - name: "file_reader"
      permissions: ["read"]
      max_file_size_mb: 10
      allowed_extensions: [".txt", ".md", ".json", ".csv"]
      allowed_paths: ["./data/", "./uploads/"]
      
    - name: "web_search"
      permissions: ["read"]
      rate_limit: "10/minute"
      allowed_domains: 
        - "wikipedia.org"
        - "stackoverflow.com"
        - "github.com"
      blocked_queries: ["password", "api_key", "secret"]
      
    - name: "calculator"
      permissions: ["execute"]
      max_execution_time: "5s"
      
    - name: "email_sender"
      permissions: ["send"]
      rate_limit: "5/hour"
      allowed_recipients: ["@company.com"]
      max_attachment_size_mb: 5
  
  # Herramientas explícitamente prohibidas
  blocked_tools:
    - "system_command"
    - "file_writer"
    - "database_admin"
    - "network_scanner"
  
  # Límites globales
  global_limits:
    max_tools_per_session: 50
    max_execution_time_total: "300s"
    max_memory_usage_mb: 100
    
  # Patrones de input peligrosos
  dangerous_patterns:
    - "rm -rf"
    - "DROP TABLE"
    - "eval("
    - "exec("
    - "../"
    - "<script"
    
  # Configuración de logging
  logging:
    log_all_calls: true
    log_level: "INFO"
    sensitive_params: ["password", "token", "key"]
    
  # Modo de operación
  enforcement_mode: "strict"  # strict, permissive, monitor
`;

  const allowlistManagerCode = `from typing import Dict, List, Any, Optional
import yaml
import re
from datetime import datetime, timedelta
from collections import defaultdict
import hashlib

class AllowlistManager:
    """Gestor centralizado de allowlists y restricciones de seguridad"""
    
    def __init__(self, config_path: str = "safety.yaml"):
        self.config = self._load_config(config_path)
        self.call_history = defaultdict(list)
        self.rate_limits = defaultdict(dict)
        
    def _load_config(self, config_path: str) -> Dict[str, Any]:
        """Cargar configuración desde archivo YAML"""
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        except FileNotFoundError:
            # Configuración por defecto si no existe el archivo
            return {
                "security": {
                    "allowed_tools": [],
                    "blocked_tools": [],
                    "global_limits": {
                        "max_tools_per_session": 10,
                        "max_execution_time_total": "60s"
                    },
                    "enforcement_mode": "strict"
                }
            }
    
    def is_tool_allowed(self, tool_name: str) -> Dict[str, Any]:
        """Verificar si una herramienta está permitida"""
        
        security = self.config.get("security", {})
        
        # Verificar si está explícitamente bloqueada
        blocked_tools = security.get("blocked_tools", [])
        if tool_name in blocked_tools:
            return {
                "allowed": False,
                "reason": f"Herramienta '{tool_name}' está explícitamente bloqueada"
            }
        
        # Verificar si está en la allowlist
        allowed_tools = security.get("allowed_tools", [])
        tool_config = None
        
        for tool in allowed_tools:
            if isinstance(tool, dict) and tool.get("name") == tool_name:
                tool_config = tool
                break
            elif isinstance(tool, str) and tool == tool_name:
                tool_config = {"name": tool_name}
                break
        
        enforcement_mode = security.get("enforcement_mode", "strict")
        
        if tool_config is None:
            if enforcement_mode == "strict":
                return {
                    "allowed": False,
                    "reason": f"Herramienta '{tool_name}' no está en la allowlist"
                }
            elif enforcement_mode == "permissive":
                return {
                    "allowed": True,
                    "reason": "Modo permisivo - herramienta permitida por defecto",
                    "config": {}
                }
        
        return {
            "allowed": True,
            "reason": "Herramienta en allowlist",
            "config": tool_config
        }
    
    def check_rate_limit(self, tool_name: str, user_id: str = "default") -> Dict[str, Any]:
        """Verificar límites de tasa de uso"""
        
        # Obtener configuración de la herramienta
        tool_check = self.is_tool_allowed(tool_name)
        if not tool_check["allowed"]:
            return tool_check
        
        tool_config = tool_check.get("config", {})
        rate_limit = tool_config.get("rate_limit")
        
        if not rate_limit:
            return {"allowed": True, "reason": "Sin límite de tasa"}
        
        # Parsear rate limit (ej: "10/minute", "5/hour")
        try:
            limit_parts = rate_limit.split("/")
            max_calls = int(limit_parts[0])
            period = limit_parts[1]
            
            # Convertir período a segundos
            period_seconds = {
                "second": 1,
                "minute": 60,
                "hour": 3600,
                "day": 86400
            }.get(period, 60)
            
        except (ValueError, IndexError):
            return {"allowed": False, "reason": "Configuración de rate limit inválida"}
        
        # Verificar historial de llamadas
        now = datetime.now()
        user_key = f"{user_id}:{tool_name}"
        
        # Limpiar llamadas antiguas
        cutoff_time = now - timedelta(seconds=period_seconds)
        self.call_history[user_key] = [
            call_time for call_time in self.call_history[user_key]
            if call_time > cutoff_time
        ]
        
        # Verificar si se excede el límite
        current_calls = len(self.call_history[user_key])
        if current_calls >= max_calls:
            return {
                "allowed": False,
                "reason": f"Rate limit excedido: {current_calls}/{max_calls} en {period}",
                "retry_after": period_seconds
            }
        
        # Registrar la llamada actual
        self.call_history[user_key].append(now)
        
        return {
            "allowed": True,
            "reason": f"Rate limit OK: {current_calls + 1}/{max_calls} en {period}"
        }
    
    def validate_tool_params(self, tool_name: str, params: Dict[str, Any]) -> Dict[str, Any]:
        """Validar parámetros de herramienta contra configuración de seguridad"""
        
        # Verificar si la herramienta está permitida
        tool_check = self.is_tool_allowed(tool_name)
        if not tool_check["allowed"]:
            return tool_check
        
        tool_config = tool_check.get("config", {})
        errors = []
        warnings = []
        
        # Validar patrones peligrosos
        dangerous_patterns = self.config.get("security", {}).get("dangerous_patterns", [])
        
        for param_name, param_value in params.items():
            if isinstance(param_value, str):
                for pattern in dangerous_patterns:
                    if re.search(pattern, param_value, re.IGNORECASE):
                        errors.append(f"Patrón peligroso '{pattern}' detectado en {param_name}")
        
        # Validaciones específicas por tipo de herramienta
        if tool_name == "file_reader":
            errors.extend(self._validate_file_params(params, tool_config))
        elif tool_name == "web_search":
            errors.extend(self._validate_search_params(params, tool_config))
        elif tool_name == "email_sender":
            errors.extend(self._validate_email_params(params, tool_config))
        
        return {
            "valid": len(errors) == 0,
            "errors": errors,
            "warnings": warnings
        }
    
    def _validate_file_params(self, params: Dict[str, Any], config: Dict[str, Any]) -> List[str]:
        """Validar parámetros específicos para file_reader"""
        errors = []
        
        file_path = params.get("file_path", "")
        
        # Verificar extensiones permitidas
        allowed_extensions = config.get("allowed_extensions", [])
        if allowed_extensions:
            file_ext = "." + file_path.split(".")[-1] if "." in file_path else ""
            if file_ext not in allowed_extensions:
                errors.append(f"Extensión {file_ext} no permitida")
        
        # Verificar rutas permitidas
        allowed_paths = config.get("allowed_paths", [])
        if allowed_paths:
            if not any(file_path.startswith(path) for path in allowed_paths):
                errors.append(f"Ruta no permitida: {file_path}")
        
        return errors
    
    def _validate_search_params(self, params: Dict[str, Any], config: Dict[str, Any]) -> List[str]:
        """Validar parámetros específicos para web_search"""
        errors = []
        
        query = params.get("query", "")
        
        # Verificar queries bloqueadas
        blocked_queries = config.get("blocked_queries", [])
        for blocked in blocked_queries:
            if blocked.lower() in query.lower():
                errors.append(f"Query contiene término bloqueado: {blocked}")
        
        return errors
    
    def _validate_email_params(self, params: Dict[str, Any], config: Dict[str, Any]) -> List[str]:
        """Validar parámetros específicos para email_sender"""
        errors = []
        
        recipient = params.get("recipient", "")
        
        # Verificar dominios permitidos para recipients
        allowed_recipients = config.get("allowed_recipients", [])
        if allowed_recipients:
            if not any(recipient.endswith(domain) for domain in allowed_recipients):
                errors.append(f"Destinatario no autorizado: {recipient}")
        
        return errors
    
    def log_tool_call(self, tool_name: str, params: Dict[str, Any], 
                      result: Any, user_id: str = "default") -> str:
        """Registrar llamada a herramienta para auditoría"""
        
        logging_config = self.config.get("security", {}).get("logging", {})
        
        if not logging_config.get("log_all_calls", False):
            return "Logging deshabilitado"
        
        # Sanitizar parámetros sensibles
        sensitive_params = logging_config.get("sensitive_params", [])
        sanitized_params = {}
        
        for key, value in params.items():
            if any(sensitive in key.lower() for sensitive in sensitive_params):
                sanitized_params[key] = "[REDACTED]"
            else:
                sanitized_params[key] = value
        
        # Crear log entry
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "user_id": user_id,
            "tool_name": tool_name,
            "params": sanitized_params,
            "success": result is not None,
            "result_hash": hashlib.sha256(str(result).encode()).hexdigest()[:16] if result else None
        }
        
        # En producción, esto se enviaría a un sistema de logging real
        print(f"🔍 AUDIT LOG: {log_entry}")
        
        return log_entry.get("timestamp", "")

# Ejemplo de uso
allowlist = AllowlistManager("safety.yaml")

# Verificar si una herramienta está permitida
check = allowlist.is_tool_allowed("file_reader")
print(f"Tool allowed: {check['allowed']} - {check['reason']}")

# Verificar rate limit
rate_check = allowlist.check_rate_limit("web_search", "user123")
print(f"Rate limit: {rate_check['allowed']} - {rate_check['reason']}")

# Validar parámetros
params_check = allowlist.validate_tool_params("file_reader", {
    "file_path": "../etc/passwd",  # Esto debería fallar
    "mode": "read"
})
print(f"Params valid: {params_check['valid']}")
if not params_check['valid']:
    print(f"Errors: {params_check['errors']}")
`;

  return (
    <div className="lesson">
      <h2>Allowlist y Restricciones</h2>
      
      <div className="lesson-section">
        <h3>Principio de "Allowlist First"</h3>
        <p>
          En seguridad, es mucho más efectivo <strong>permitir explícitamente</strong> lo que 
          necesitas que intentar bloquear todo lo malo:
        </p>
        
        <div className="security-comparison">
          <div className="approach-card unsafe">
            <h4>❌ Blacklist (Inseguro)</h4>
            <p>"Bloquear todo lo que parece peligroso"</p>
            <ul>
              <li>Imposible anticipar todos los ataques</li>
              <li>Nuevas vulnerabilidades pasan desapercibidas</li>
              <li>Falsos negativos comunes</li>
            </ul>
          </div>
          <div className="approach-card safe">
            <h4>✅ Allowlist (Seguro)</h4>
            <p>"Solo permitir lo que necesito"</p>
            <ul>
              <li>Control total sobre funcionalidad</li>
              <li>Superficie de ataque mínima</li>
              <li>Fácil de auditar y mantener</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>safety.yaml: Configuración Declarativa</h3>
        <p>
          Un archivo <code>safety.yaml</code> centraliza todas las reglas de seguridad 
          de forma legible y versionable:
        </p>
        
        <CodeBlock
          language="yaml"
          title="safety.yaml"
          code={allowlistExample}
        />
      </div>

      <div className="lesson-section">
        <h3>Implementación del AllowlistManager</h3>
        <CodeBlock
          language="python"
          title="allowlist_manager.py"
          code={allowlistManagerCode}
        />
      </div>

      <div className="lesson-section">
        <h3>Tipos de Restricciones</h3>
        
        <div className="restriction-types">
          <div className="restriction-card">
            <h4>🎯 Restricciones Funcionales</h4>
            <ul>
              <li>Qué herramientas puede usar</li>
              <li>Qué parámetros acepta cada una</li>
              <li>Qué permisos tiene cada herramienta</li>
            </ul>
          </div>
          <div className="restriction-card">
            <h4>⏱️ Restricciones Temporales</h4>
            <ul>
              <li>Rate limiting (llamadas por minuto/hora)</li>
              <li>Tiempo máximo de ejecución</li>
              <li>Horarios permitidos de uso</li>
            </ul>
          </div>
          <div className="restriction-card">
            <h4>📊 Restricciones de Recursos</h4>
            <ul>
              <li>Tamaño máximo de archivos</li>
              <li>Memoria máxima utilizable</li>
              <li>Ancho de banda de red</li>
            </ul>
          </div>
          <div className="restriction-card">
            <h4>🌐 Restricciones Contextuales</h4>
            <ul>
              <li>Dominios web permitidos</li>
              <li>Rutas de archivos permitidas</li>
              <li>IPs y puertos autorizados</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Modos de Enforcement</h3>
        
        <div className="enforcement-modes">
          <div className="mode-card strict">
            <h4>🔒 Strict Mode</h4>
            <p>Solo permite herramientas explícitamente autorizadas</p>
            <div className="mode-pros-cons">
              <div className="pros">
                <strong>Pros:</strong> Máxima seguridad
              </div>
              <div className="cons">
                <strong>Cons:</strong> Requiere configuración exhaustiva
              </div>
            </div>
          </div>
          <div className="mode-card permissive">
            <h4>🔓 Permissive Mode</h4>
            <p>Permite todo excepto lo explícitamente bloqueado</p>
            <div className="mode-pros-cons">
              <div className="pros">
                <strong>Pros:</strong> Fácil de configurar
              </div>
              <div className="cons">
                <strong>Cons:</strong> Menos seguro
              </div>
            </div>
          </div>
          <div className="mode-card monitor">
            <h4>👁️ Monitor Mode</h4>
            <p>Permite todo pero registra violaciones para análisis</p>
            <div className="mode-pros-cons">
              <div className="pros">
                <strong>Pros:</strong> Ideal para desarrollo y testing
              </div>
              <div className="cons">
                <strong>Cons:</strong> No bloquea ataques reales
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🚀 Ejercicio: Configurar Allowlist</h3>
        <div className="hands-on-box">
          <p>
            <strong>Tarea:</strong> Crea un archivo safety.yaml para un agente de análisis 
            de documentos que debe ser capaz de:
          </p>
          <ul>
            <li>Leer archivos PDF y TXT de la carpeta ./documents/</li>
            <li>Hacer búsquedas web en Wikipedia y Stack Overflow</li>
            <li>Enviar emails a usuarios internos (@company.com)</li>
            <li>Usar una calculadora para análisis estadísticos</li>
          </ul>
          <div className="checklist">
            <label>
              <input type="checkbox" /> He definido las herramientas permitidas
            </label>
            <label>
              <input type="checkbox" /> He configurado restricciones de archivos
            </label>
            <label>
              <input type="checkbox" /> He establecido dominios web seguros
            </label>
            <label>
              <input type="checkbox" /> He configurado rate limits apropiados
            </label>
          </div>
        </div>
      </div>

      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          Allowlist Configurado ✓
        </button>
      </div>
    </div>
  );
};

const SafetyYamlLesson = ({ onComplete }) => {
  const safetyYamlExample = `# safety.yaml - Configuración Completa de Seguridad
version: "2.0"
metadata:
  name: "Portal 2 Security Config"
  description: "Configuración de seguridad para agentes de producción"
  author: "Security Team"
  created: "2025-01-01"
  last_updated: "2025-01-15"

# Configuración principal de seguridad
security:
  # Modo de enforcement: strict, permissive, monitor
  enforcement_mode: "strict"
  
  # Configuración global
  global_settings:
    max_tools_per_session: 100
    max_execution_time_total: "600s"
    max_memory_usage_mb: 512
    session_timeout: "1800s"  # 30 minutos
    
  # Herramientas permitidas con configuración detallada
  allowed_tools:
    # Herramientas de archivos
    - name: "file_reader"
      category: "file"
      permissions: ["read"]
      rate_limit: "20/minute"
      max_execution_time: "10s"
      config:
        max_file_size_mb: 50
        allowed_extensions: 
          - ".txt"
          - ".md" 
          - ".json"
          - ".csv"
          - ".yaml"
          - ".yml"
        allowed_paths:
          - "./data/"
          - "./uploads/"
          - "./temp/"
        blocked_paths:
          - "/etc/"
          - "/var/"
          - "C:\\Windows\\"
          - "C:\\System32\\"
        virus_scan: true
        
    - name: "file_writer"
      category: "file"
      permissions: ["write", "create"]
      rate_limit: "10/minute"
      max_execution_time: "15s"
      config:
        max_file_size_mb: 20
        allowed_extensions: [".txt", ".json", ".csv"]
        allowed_paths: ["./output/", "./reports/"]
        backup_before_write: true
        
    # Herramientas web
    - name: "web_search"
      category: "web"
      permissions: ["read"]
      rate_limit: "30/hour"
      max_execution_time: "30s"
      config:
        allowed_domains:
          - "wikipedia.org"
          - "*.wikipedia.org"
          - "stackoverflow.com"
          - "*.stackoverflow.com"
          - "github.com"
          - "docs.python.org"
          - "openai.com"
        blocked_domains:
          - "*.onion"
          - "localhost"
          - "127.0.0.1"
          - "192.168.*"
          - "10.*"
        blocked_queries:
          - "password"
          - "api_key"
          - "secret"
          - "token"
          - "hack"
          - "exploit"
        max_results: 10
        safe_search: true
        
    - name: "http_request"
      category: "web"
      permissions: ["read"]
      rate_limit: "50/hour"
      max_execution_time: "60s"
      config:
        allowed_methods: ["GET", "POST"]
        allowed_status_codes: [200, 201, 202]
        max_response_size_mb: 10
        timeout_seconds: 30
        follow_redirects: false
        verify_ssl: true
        
    # Herramientas de comunicación
    - name: "email_sender"
      category: "communication"
      permissions: ["send"]
      rate_limit: "10/day"
      max_execution_time: "20s"
      config:
        allowed_recipients:
          - "@company.com"
          - "@partner.org"
        blocked_recipients:
          - "*@spam.com"
          - "*@malware.net"
        max_attachment_size_mb: 25
        allowed_attachment_types: [".pdf", ".docx", ".txt"]
        require_approval: true
        cc_security_team: true
        
    # Herramientas de análisis
    - name: "calculator"
      category: "analysis"
      permissions: ["execute"]
      rate_limit: "100/minute"
      max_execution_time: "5s"
      config:
        max_operations: 1000
        allowed_functions: 
          - "math"
          - "statistics"
          - "numpy"
        blocked_functions:
          - "exec"
          - "eval"
          - "compile"
          
    - name: "data_analyzer"
      category: "analysis"
      permissions: ["read", "analyze"]
      rate_limit: "20/hour"
      max_execution_time: "300s"
      config:
        max_dataset_size_mb: 100
        allowed_formats: [".csv", ".json", ".parquet"]
        privacy_mode: true
        anonymize_output: true
        
  # Herramientas explícitamente prohibidas
  blocked_tools:
    - "system_command"
    - "shell_executor"
    - "file_deleter"
    - "database_admin"
    - "network_scanner"
    - "port_scanner"
    - "password_cracker"
    - "crypto_miner"
    
  # Patrones de input peligrosos (regex)
  dangerous_patterns:
    # Comandos del sistema
    - pattern: "rm\\s+(-rf|--recursive)"
      severity: "critical"
      description: "Comando de eliminación recursiva"
      
    - pattern: "(sudo|su)\\s+"
      severity: "high"
      description: "Escalación de privilegios"
      
    # Inyección de código
    - pattern: "eval\\s*\\("
      severity: "critical"
      description: "Ejecución de código dinámico"
      
    - pattern: "exec\\s*\\("
      severity: "critical"
      description: "Ejecución de código"
      
    - pattern: "__import__\\s*\\("
      severity: "high"
      description: "Importación dinámica"
      
    # SQL Injection
    - pattern: "(DROP|DELETE)\\s+(TABLE|FROM)"
      severity: "critical"
      description: "Posible SQL injection"
      
    - pattern: "UNION\\s+SELECT"
      severity: "high"
      description: "Posible SQL injection"
      
    # XSS y HTML injection
    - pattern: "<script[^>]*>"
      severity: "high"
      description: "Posible XSS"
      
    - pattern: "javascript:"
      severity: "medium"
      description: "Protocolo JavaScript"
      
    # Path traversal
    - pattern: "\\.\\./+"
      severity: "high"
      description: "Path traversal"
      
    - pattern: "%2e%2e%2f"
      severity: "high"
      description: "Path traversal codificado"
      
    # Información sensible
    - pattern: "(password|passwd|pwd)\\s*[=:]"
      severity: "medium"
      description: "Posible exposición de contraseña"
      
    - pattern: "api[_-]?key\\s*[=:]"
      severity: "high"
      description: "Posible exposición de API key"

# Configuración de logging y auditoría
logging:
  # Nivel de logging: DEBUG, INFO, WARNING, ERROR, CRITICAL
  level: "INFO"
  
  # Qué eventos registrar
  events:
    tool_calls: true
    security_violations: true
    rate_limit_hits: true
    authentication: true
    configuration_changes: true
    
  # Parámetros sensibles que deben ser redactados en logs
  sensitive_params:
    - "password"
    - "token" 
    - "api_key"
    - "secret"
    - "private_key"
    - "auth"
    - "authorization"
    
  # Configuración de retención
  retention:
    days: 90
    max_size_mb: 1000
    rotate_daily: true
    
  # Destinos de logs
  destinations:
    - type: "file"
      path: "./logs/security.log"
      format: "json"
      
    - type: "syslog"
      server: "log.company.com"
      port: 514
      facility: "local0"
      
    - type: "webhook"
      url: "https://siem.company.com/api/logs"
      headers:
        Authorization: "Bearer {SIEM_TOKEN}"

# Configuración de alertas
alerting:
  # Canales de notificación
  channels:
    - type: "email"
      recipients: ["security@company.com"]
      severity_threshold: "high"
      
    - type: "slack"
      webhook_url: "https://hooks.slack.com/services/..."
      channel: "#security-alerts"
      severity_threshold: "critical"
      
    - type: "pagerduty"
      service_key: "your-pagerduty-key"
      severity_threshold: "critical"
      
  # Reglas de alertas
  rules:
    - name: "Multiple security violations"
      condition: "security_violations > 5 in 5m"
      severity: "high"
      message: "Multiple security violations detected"
      
    - name: "Blocked tool usage attempt"
      condition: "blocked_tool_usage > 0"
      severity: "medium"
      message: "Attempt to use blocked tool"
      
    - name: "Rate limit exceeded"
      condition: "rate_limit_exceeded > 10 in 1h"
      severity: "medium"
      message: "High rate limit violations"

# Configuración de entorno
environment:
  # Configuración específica por entorno
  production:
    enforcement_mode: "strict"
    detailed_logging: true
    real_time_alerts: true
    
  staging:
    enforcement_mode: "strict"
    detailed_logging: true
    real_time_alerts: false
    
  development:
    enforcement_mode: "monitor"
    detailed_logging: true
    real_time_alerts: false
    
  testing:
    enforcement_mode: "permissive"
    detailed_logging: false
    real_time_alerts: false

# Configuración de integración
integrations:
  # SIEM (Security Information and Event Management)
  siem:
    enabled: true
    endpoint: "https://siem.company.com/api/events"
    format: "cef"  # Common Event Format
    
  # Threat Intelligence
  threat_intel:
    enabled: true
    providers:
      - name: "VirusTotal"
        api_key: "{VT_API_KEY}"
        check_files: true
        check_urls: true
        
      - name: "AlienVault OTX"
        api_key: "{OTX_API_KEY}"
        check_ips: true
        check_domains: true
        
  # Vulnerability Scanner
  vuln_scanner:
    enabled: true
    scan_uploads: true
    quarantine_on_detection: true
    
  # External approval system
  approval_system:
    enabled: true
    endpoint: "https://approval.company.com/api/requests"
    required_for:
      - "email_sender"
      - "file_writer"
    timeout_seconds: 300
`;

  const yamlLoaderCode = `import yaml
import os
from typing import Dict, Any, List, Optional
from pathlib import Path
import logging
from datetime import datetime

class SafetyConfigLoader:
    """Cargador y validador de configuración safety.yaml"""
    
    def __init__(self, config_path: str = "safety.yaml"):
        self.config_path = Path(config_path)
        self.config = None
        self.validation_errors = []
        
    def load_config(self) -> Dict[str, Any]:
        """Cargar y validar configuración desde archivo YAML"""
        
        try:
            # Cargar archivo YAML
            with open(self.config_path, 'r', encoding='utf-8') as f:
                self.config = yaml.safe_load(f)
                
            # Validar estructura
            self._validate_config()
            
            # Aplicar configuración de entorno
            self._apply_environment_config()
            
            # Configurar logging
            self._setup_logging()
            
            logging.info(f"Configuration loaded successfully from {self.config_path}")
            return self.config
            
        except FileNotFoundError:
            raise FileNotFoundError(f"Configuration file not found: {self.config_path}")
        except yaml.YAMLError as e:
            raise ValueError(f"Invalid YAML syntax: {e}")
        except Exception as e:
            raise RuntimeError(f"Error loading configuration: {e}")
    
    def _validate_config(self):
        """Validar estructura y contenido de la configuración"""
        
        if not isinstance(self.config, dict):
            self.validation_errors.append("Root configuration must be a dictionary")
            
        # Validar secciones requeridas
        required_sections = ["security"]
        for section in required_sections:
            if section not in self.config:
                self.validation_errors.append(f"Missing required section: {section}")
        
        # Validar configuración de seguridad
        if "security" in self.config:
            self._validate_security_config()
            
        # Validar configuración de logging
        if "logging" in self.config:
            self._validate_logging_config()
            
        if self.validation_errors:
            raise ValueError(f"Configuration validation failed: {self.validation_errors}")
    
    def _validate_security_config(self):
        """Validar configuración de seguridad"""
        security = self.config["security"]
        
        # Validar enforcement_mode
        valid_modes = ["strict", "permissive", "monitor"]
        enforcement_mode = security.get("enforcement_mode", "strict")
        if enforcement_mode not in valid_modes:
            self.validation_errors.append(
                f"Invalid enforcement_mode: {enforcement_mode}. Must be one of {valid_modes}"
            )
        
        # Validar herramientas permitidas
        allowed_tools = security.get("allowed_tools", [])
        for i, tool in enumerate(allowed_tools):
            if not isinstance(tool, dict):
                self.validation_errors.append(f"Tool {i} must be a dictionary")
                continue
                
            if "name" not in tool:
                self.validation_errors.append(f"Tool {i} missing required 'name' field")
                
            # Validar rate_limit format
            if "rate_limit" in tool:
                rate_limit = tool["rate_limit"]
                if not self._validate_rate_limit_format(rate_limit):
                    self.validation_errors.append(f"Invalid rate_limit format for {tool.get('name', i)}: {rate_limit}")
        
        # Validar patrones peligrosos
        dangerous_patterns = security.get("dangerous_patterns", [])
        for i, pattern in enumerate(dangerous_patterns):
            if isinstance(pattern, dict):
                if "pattern" not in pattern:
                    self.validation_errors.append(f"Dangerous pattern {i} missing 'pattern' field")
            elif not isinstance(pattern, str):
                self.validation_errors.append(f"Dangerous pattern {i} must be string or dict")
    
    def _validate_rate_limit_format(self, rate_limit: str) -> bool:
        """Validar formato de rate limit (ej: '10/minute', '5/hour')"""
        try:
            parts = rate_limit.split("/")
            if len(parts) != 2:
                return False
                
            # Validar número
            int(parts[0])
            
            # Validar unidad de tiempo
            valid_units = ["second", "minute", "hour", "day"]
            return parts[1] in valid_units
            
        except (ValueError, IndexError):
            return False
    
    def _validate_logging_config(self):
        """Validar configuración de logging"""
        logging_config = self.config["logging"]
        
        # Validar nivel de logging
        valid_levels = ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
        level = logging_config.get("level", "INFO")
        if level not in valid_levels:
            self.validation_errors.append(f"Invalid logging level: {level}")
    
    def _apply_environment_config(self):
        """Aplicar configuración específica del entorno"""
        environment = os.getenv("ENVIRONMENT", "development")
        
        if "environment" in self.config and environment in self.config["environment"]:
            env_config = self.config["environment"][environment]
            
            # Sobrescribir configuración de seguridad con valores del entorno
            if "enforcement_mode" in env_config:
                self.config["security"]["enforcement_mode"] = env_config["enforcement_mode"]
                
            # Sobrescribir configuración de logging
            if "detailed_logging" in env_config:
                self.config.setdefault("logging", {})["detailed_logging"] = env_config["detailed_logging"]
    
    def _setup_logging(self):
        """Configurar sistema de logging basado en la configuración"""
        logging_config = self.config.get("logging", {})
        
        # Configurar nivel
        level = getattr(logging, logging_config.get("level", "INFO"))
        logging.getLogger().setLevel(level)
        
        # Configurar formato
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        
        # Configurar handlers basado en destinos
        destinations = logging_config.get("destinations", [])
        for dest in destinations:
            if dest["type"] == "file":
                handler = logging.FileHandler(dest["path"])
                handler.setFormatter(formatter)
                logging.getLogger().addHandler(handler)
    
    def get_tool_config(self, tool_name: str) -> Optional[Dict[str, Any]]:
        """Obtener configuración específica de una herramienta"""
        if not self.config:
            return None
            
        allowed_tools = self.config.get("security", {}).get("allowed_tools", [])
        
        for tool in allowed_tools:
            if tool.get("name") == tool_name:
                return tool
                
        return None
    
    def is_pattern_dangerous(self, text: str) -> List[Dict[str, Any]]:
        """Verificar si un texto contiene patrones peligrosos"""
        import re
        
        if not self.config:
            return []
            
        dangerous_patterns = self.config.get("security", {}).get("dangerous_patterns", [])
        matches = []
        
        for pattern_config in dangerous_patterns:
            if isinstance(pattern_config, str):
                pattern = pattern_config
                severity = "medium"
                description = "Dangerous pattern detected"
            else:
                pattern = pattern_config.get("pattern", "")
                severity = pattern_config.get("severity", "medium")
                description = pattern_config.get("description", "Dangerous pattern detected")
            
            if re.search(pattern, text, re.IGNORECASE):
                matches.append({
                    "pattern": pattern,
                    "severity": severity,
                    "description": description,
                    "matched_text": text
                })
        
        return matches
    
    def reload_config(self) -> Dict[str, Any]:
        """Recargar configuración desde archivo"""
        self.validation_errors = []
        return self.load_config()

# Ejemplo de uso
def main():
    # Cargar configuración
    config_loader = SafetyConfigLoader("safety.yaml")
    
    try:
        config = config_loader.load_config()
        print("✅ Configuration loaded successfully")
        
        # Verificar configuración de una herramienta específica
        file_reader_config = config_loader.get_tool_config("file_reader")
        if file_reader_config:
            print(f"📁 File reader rate limit: {file_reader_config.get('rate_limit')}")
        
        # Verificar texto peligroso
        test_text = "rm -rf /"
        dangerous_matches = config_loader.is_pattern_dangerous(test_text)
        if dangerous_matches:
            print(f"⚠️ Dangerous patterns found: {len(dangerous_matches)}")
            for match in dangerous_matches:
                print(f"  - {match['description']} (severity: {match['severity']})")
        
    except Exception as e:
        print(f"❌ Error loading configuration: {e}")

if __name__ == "__main__":
    main()
`;

  return (
    <div className="lesson">
      <h2>safety.yaml Configuración</h2>
      
      <div className="lesson-section">
        <h3>¿Por qué YAML para Configuración de Seguridad?</h3>
        <p>
          YAML es ideal para configuraciones de seguridad porque es:
        </p>
        
        <div className="yaml-benefits">
          <div className="benefit-item">
            <h4>📖 Legible</h4>
            <p>Fácil de leer y entender por humanos</p>
          </div>
          <div className="benefit-item">
            <h4>🔄 Versionable</h4>
            <p>Se puede versionar en Git como código</p>
          </div>
          <div className="benefit-item">
            <h4>📝 Comentable</h4>
            <p>Permite documentar decisiones de seguridad</p>
          </div>
          <div className="benefit-item">
            <h4>🔧 Estructurado</h4>
            <p>Organización jerárquica clara</p>
          </div>
          <div className="benefit-item">
            <h4>🚀 Deployable</h4>
            <p>Fácil de desplegar en diferentes entornos</p>
          </div>
          <div className="benefit-item">
            <h4>🎯 Validable</h4>
            <p>Se puede validar automáticamente</p>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Configuración Completa de Producción</h3>
        <p>
          Un archivo <code>safety.yaml</code> de producción debe cubrir todos los aspectos 
          de seguridad, logging y alertas:
        </p>
        
        <CodeBlock
          language="yaml"
          title="safety.yaml (Producción)"
          code={safetyYamlExample}
        />
      </div>

      <div className="lesson-section">
        <h3>Cargador y Validador de Configuración</h3>
        <p>
          Es crucial validar la configuración al cargarla para detectar errores 
          de sintaxis o configuraciones inseguras:
        </p>
        
        <CodeBlock
          language="python"
          title="safety_config_loader.py"
          code={yamlLoaderCode}
        />
      </div>

      <div className="lesson-section">
        <h3>Secciones Clave del safety.yaml</h3>
        
        <div className="yaml-sections">
          <div className="section-card">
            <h4>🛡️ Security</h4>
            <p>Configuración principal de herramientas, restricciones y patrones peligrosos</p>
            <ul>
              <li>Enforcement mode</li>
              <li>Allowed/blocked tools</li>
              <li>Rate limits</li>
              <li>Dangerous patterns</li>
            </ul>
          </div>
          <div className="section-card">
            <h4>📊 Logging</h4>
            <p>Configuración de auditoría y registro de eventos</p>
            <ul>
              <li>Niveles de logging</li>
              <li>Eventos a registrar</li>
              <li>Parámetros sensibles</li>
              <li>Destinos de logs</li>
            </ul>
          </div>
          <div className="section-card">
            <h4>🚨 Alerting</h4>
            <p>Sistema de notificaciones para eventos de seguridad</p>
            <ul>
              <li>Canales de notificación</li>
              <li>Umbrales de severidad</li>
              <li>Reglas de alertas</li>
              <li>Escalación automática</li>
            </ul>
          </div>
          <div className="section-card">
            <h4>🌍 Environment</h4>
            <p>Configuraciones específicas por entorno</p>
            <ul>
              <li>Production (strict)</li>
              <li>Staging (strict)</li>
              <li>Development (monitor)</li>
              <li>Testing (permissive)</li>
            </ul>
          </div>
          <div className="section-card">
            <h4>🔗 Integrations</h4>
            <p>Integración con sistemas externos</p>
            <ul>
              <li>SIEM systems</li>
              <li>Threat intelligence</li>
              <li>Vulnerability scanners</li>
              <li>Approval systems</li>
            </ul>
          </div>
          <div className="section-card">
            <h4>📋 Metadata</h4>
            <p>Información descriptiva del archivo</p>
            <ul>
              <li>Versión de configuración</li>
              <li>Autor y fechas</li>
              <li>Descripción y propósito</li>
              <li>Historial de cambios</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Mejores Prácticas para safety.yaml</h3>
        
        <div className="best-practices">
          <div className="practice-card">
            <h4>✅ DO: Usar Allowlists</h4>
            <p>Definir explícitamente qué está permitido</p>
          </div>
          <div className="practice-card">
            <h4>✅ DO: Documentar Decisiones</h4>
            <p>Usar comentarios para explicar por qué</p>
          </div>
          <div className="practice-card">
            <h4>✅ DO: Versionar Cambios</h4>
            <p>Mantener historial en control de versiones</p>
          </div>
          <div className="practice-card">
            <h4>✅ DO: Validar Automáticamente</h4>
            <p>CI/CD debe validar la configuración</p>
          </div>
          <div className="practice-card">
            <h4>❌ DON'T: Hardcodear Secretos</h4>
            <p>Usar variables de entorno para claves</p>
          </div>
          <div className="practice-card">
            <h4>❌ DON'T: Configuración Única</h4>
            <p>Tener configs diferentes por entorno</p>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🚀 Ejercicio: Crear safety.yaml Personalizado</h3>
        <div className="hands-on-box">
          <p>
            <strong>Tarea:</strong> Diseña un safety.yaml para un agente de customer support 
            que debe poder:
          </p>
          <ul>
            <li>Buscar en una base de conocimientos interna</li>
            <li>Enviar emails de respuesta a clientes</li>
            <li>Crear tickets en sistema de soporte</li>
            <li>Acceder a información de pedidos (solo lectura)</li>
          </ul>
          <p><strong>Restricciones:</strong></p>
          <ul>
            <li>Solo durante horario laboral</li>
            <li>Máximo 100 consultas por hora</li>
            <li>No puede acceder a datos financieros</li>
            <li>Todos los emails deben ser aprobados</li>
          </ul>
          <div className="checklist">
            <label>
              <input type="checkbox" /> He definido herramientas específicas del dominio
            </label>
            <label>
              <input type="checkbox" /> He configurado restricciones temporales
            </label>
            <label>
              <input type="checkbox" /> He establecido rate limits apropiados
            </label>
            <label>
              <input type="checkbox" /> He configurado sistema de aprobación
            </label>
            <label>
              <input type="checkbox" /> He agregado logging y alertas
            </label>
          </div>
        </div>
      </div>

      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          Configuración Completa ✓
        </button>
      </div>
    </div>
  );
};

const SecureToolManagerLab = ({ onComplete }) => {
  const secureToolManagerCode = `import asyncio
import yaml
import logging
import re
import json
import time
from typing import Dict, Any, List, Optional, Union, Callable
from datetime import datetime, timedelta
from dataclasses import dataclass, field
from enum import Enum
from pathlib import Path
import hashlib
import hmac

class EnforcementMode(Enum):
    """Modos de enforcement disponibles"""
    STRICT = "strict"      # Bloquea automáticamente violaciones
    PERMISSIVE = "permissive"  # Permite pero registra violaciones
    MONITOR = "monitor"    # Solo observa y registra

class SecurityViolationType(Enum):
    """Tipos de violaciones de seguridad"""
    BLOCKED_TOOL = "blocked_tool"
    RATE_LIMIT_EXCEEDED = "rate_limit_exceeded"
    DANGEROUS_PATTERN = "dangerous_pattern"
    UNAUTHORIZED_ACCESS = "unauthorized_access"
    INVALID_PERMISSION = "invalid_permission"
    SIZE_LIMIT_EXCEEDED = "size_limit_exceeded"
    TIMEOUT_EXCEEDED = "timeout_exceeded"

@dataclass
class SecurityViolation:
    """Registro de violación de seguridad"""
    violation_type: SecurityViolationType
    tool_name: str
    user_id: str
    timestamp: datetime
    details: Dict[str, Any]
    severity: str = "medium"
    resolved: bool = False

@dataclass
class ToolExecution:
    """Registro de ejecución de herramienta"""
    tool_name: str
    user_id: str
    timestamp: datetime
    parameters: Dict[str, Any]
    execution_time: float
    success: bool
    result: Optional[Any] = None
    security_checks: List[str] = field(default_factory=list)

class RateLimiter:
    """Limitador de velocidad para herramientas"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.usage_history = {}
        
    def is_rate_limited(self, tool_name: str, user_id: str) -> bool:
        """Verificar si el usuario ha excedido el rate limit"""
        rate_limit = self.config.get(tool_name, {}).get("rate_limit")
        if not rate_limit:
            return False
            
        # Parsear rate limit (ej: "10/minute")
        count, period = rate_limit.split("/")
        count = int(count)
        
        # Obtener ventana de tiempo
        if period == "second":
            window = timedelta(seconds=1)
        elif period == "minute":
            window = timedelta(minutes=1)
        elif period == "hour":
            window = timedelta(hours=1)
        elif period == "day":
            window = timedelta(days=1)
        else:
            window = timedelta(minutes=1)  # default
            
        # Limpiar historial antiguo
        self._cleanup_old_entries(tool_name, user_id, window)
        
        # Verificar límite actual
        key = f"{tool_name}:{user_id}"
        current_usage = len(self.usage_history.get(key, []))
        
        return current_usage >= count
    
    def record_usage(self, tool_name: str, user_id: str):
        """Registrar uso de herramienta"""
        key = f"{tool_name}:{user_id}"
        if key not in self.usage_history:
            self.usage_history[key] = []
        self.usage_history[key].append(datetime.now())
    
    def _cleanup_old_entries(self, tool_name: str, user_id: str, window: timedelta):
        """Limpiar entradas antiguas del historial"""
        key = f"{tool_name}:{user_id}"
        if key in self.usage_history:
            cutoff = datetime.now() - window
            self.usage_history[key] = [
                timestamp for timestamp in self.usage_history[key]
                if timestamp > cutoff
            ]

class SecurityPatternMatcher:
    """Detector de patrones peligrosos en inputs"""
    
    def __init__(self, patterns: List[Dict[str, Any]]):
        self.patterns = patterns
        self.compiled_patterns = []
        
        # Compilar patrones regex
        for pattern_config in patterns:
            if isinstance(pattern_config, str):
                pattern = pattern_config
                severity = "medium"
                description = "Dangerous pattern detected"
            else:
                pattern = pattern_config.get("pattern", "")
                severity = pattern_config.get("severity", "medium")
                description = pattern_config.get("description", "Dangerous pattern detected")
            
            try:
                compiled = re.compile(pattern, re.IGNORECASE)
                self.compiled_patterns.append({
                    "regex": compiled,
                    "severity": severity,
                    "description": description,
                    "original_pattern": pattern
                })
            except re.error as e:
                logging.warning(f"Invalid regex pattern '{pattern}': {e}")
    
    def check_input(self, text: str) -> List[Dict[str, Any]]:
        """Verificar texto contra patrones peligrosos"""
        matches = []
        
        for pattern_info in self.compiled_patterns:
            if pattern_info["regex"].search(text):
                matches.append({
                    "pattern": pattern_info["original_pattern"],
                    "severity": pattern_info["severity"],
                    "description": pattern_info["description"],
                    "matched_text": text[:100] + "..." if len(text) > 100 else text
                })
        
        return matches

class SecureToolManager:
    """
    Gestor de herramientas con seguridad integrada.
    
    Funcionalidades principales:
    1. Control de acceso basado en configuración
    2. Rate limiting por usuario y herramienta
    3. Detección de patrones peligrosos
    4. Logging y auditoría completa
    5. Alertas en tiempo real
    6. Modo de enforcement configurable
    """
    
    def __init__(self, config_path: str = "safety.yaml"):
        self.config_path = Path(config_path)
        self.config = {}
        self.enforcement_mode = EnforcementMode.STRICT
        self.rate_limiter = None
        self.pattern_matcher = None
        self.registered_tools = {}
        self.execution_history = []
        self.security_violations = []
        
        # Configurar logging
        self._setup_logging()
        
        # Cargar configuración
        self._load_config()
        
        # Inicializar componentes de seguridad
        self._init_security_components()
        
        logging.info("SecureToolManager initialized successfully")
    
    def _setup_logging(self):
        """Configurar sistema de logging"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('secure_tool_manager.log'),
                logging.StreamHandler()
            ]
        )
    
    def _load_config(self):
        """Cargar configuración desde safety.yaml"""
        try:
            with open(self.config_path, 'r', encoding='utf-8') as f:
                self.config = yaml.safe_load(f)
            
            # Aplicar configuración de entorno
            environment = os.getenv("ENVIRONMENT", "development")
            if "environment" in self.config and environment in self.config["environment"]:
                env_config = self.config["environment"][environment]
                if "enforcement_mode" in env_config:
                    mode_str = env_config["enforcement_mode"]
                    self.enforcement_mode = EnforcementMode(mode_str)
            
            logging.info(f"Configuration loaded from {self.config_path}")
            
        except Exception as e:
            logging.error(f"Failed to load configuration: {e}")
            raise
    
    def _init_security_components(self):
        """Inicializar componentes de seguridad"""
        security_config = self.config.get("security", {})
        
        # Inicializar rate limiter
        tool_configs = {}
        for tool in security_config.get("allowed_tools", []):
            tool_configs[tool["name"]] = tool
        self.rate_limiter = RateLimiter(tool_configs)
        
        # Inicializar pattern matcher
        dangerous_patterns = security_config.get("dangerous_patterns", [])
        self.pattern_matcher = SecurityPatternMatcher(dangerous_patterns)
    
    def register_tool(self, name: str, func: Callable, **metadata):
        """
        Registrar una herramienta en el manager.
        
        Args:
            name: Nombre único de la herramienta
            func: Función que implementa la herramienta
            **metadata: Metadatos adicionales (categoría, descripción, etc.)
        """
        self.registered_tools[name] = {
            "function": func,
            "metadata": metadata,
            "registered_at": datetime.now()
        }
        
        logging.info(f"Tool registered: {name}")
    
    async def execute_tool(
        self, 
        tool_name: str, 
        user_id: str, 
        parameters: Dict[str, Any],
        context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Ejecutar herramienta con validaciones de seguridad.
        
        Args:
            tool_name: Nombre de la herramienta
            user_id: ID del usuario que ejecuta
            parameters: Parámetros para la herramienta
            context: Contexto adicional de ejecución
            
        Returns:
            Resultado de la ejecución con metadatos de seguridad
        """
        start_time = time.time()
        execution_id = self._generate_execution_id(tool_name, user_id)
        
        try:
            # 1. Verificar si la herramienta está registrada
            if tool_name not in self.registered_tools:
                raise ValueError(f"Tool not registered: {tool_name}")
            
            # 2. Verificar permisos básicos
            security_checks = []
            await self._check_basic_permissions(tool_name, user_id, security_checks)
            
            # 3. Verificar rate limits
            await self._check_rate_limits(tool_name, user_id, security_checks)
            
            # 4. Validar parámetros de entrada
            await self._validate_input_parameters(tool_name, parameters, security_checks)
            
            # 5. Verificar patrones peligrosos
            await self._check_dangerous_patterns(tool_name, parameters, security_checks)
            
            # 6. Ejecutar herramienta con timeout
            result = await self._execute_with_timeout(tool_name, parameters, context)
            
            # 7. Validar resultado
            await self._validate_output(tool_name, result, security_checks)
            
            # 8. Registrar ejecución exitosa
            execution_time = time.time() - start_time
            await self._record_successful_execution(
                tool_name, user_id, parameters, result, execution_time, security_checks
            )
            
            return {
                "success": True,
                "result": result,
                "execution_id": execution_id,
                "execution_time": execution_time,
                "security_checks": security_checks
            }
            
        except Exception as e:
            # Registrar ejecución fallida
            execution_time = time.time() - start_time
            await self._record_failed_execution(
                tool_name, user_id, parameters, str(e), execution_time
            )
            
            # Decidir si propagar la excepción basado en enforcement mode
            if self.enforcement_mode == EnforcementMode.STRICT:
                raise
            elif self.enforcement_mode == EnforcementMode.PERMISSIVE:
                logging.warning(f"Tool execution failed but allowed due to permissive mode: {e}")
                return {
                    "success": False,
                    "error": str(e),
                    "execution_id": execution_id,
                    "execution_time": execution_time,
                    "enforcement_mode": "permissive"
                }
            else:  # MONITOR mode
                logging.info(f"Tool execution monitored: {e}")
                # En modo monitor, podrías retornar un resultado mock o permitir la ejecución
                return {
                    "success": True,
                    "result": "MONITOR_MODE_RESULT",
                    "execution_id": execution_id,
                    "execution_time": execution_time,
                    "enforcement_mode": "monitor"
                }
    
    def get_security_report(self, user_id: Optional[str] = None) -> Dict[str, Any]:
        """Generar reporte de seguridad"""
        # Filtrar por usuario si se especifica
        violations = self.security_violations
        executions = self.execution_history
        
        if user_id:
            violations = [v for v in violations if v.user_id == user_id]
            executions = [e for e in executions if e.user_id == user_id]
        
        return {
            "total_executions": len(executions),
            "successful_executions": len([e for e in executions if e.success]),
            "failed_executions": len([e for e in executions if not e.success]),
            "total_violations": len(violations),
            "violation_types": {
                vtype.value: len([v for v in violations if v.violation_type == vtype])
                for vtype in SecurityViolationType
            },
            "most_used_tools": self._get_most_used_tools(executions),
            "enforcement_mode": self.enforcement_mode.value,
            "report_generated_at": datetime.now().isoformat()
        }
`;

  const integrationCode = `# Ejemplo de integración con frameworks populares

# === FastAPI Integration ===
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, Any

app = FastAPI(title="Secure Tool API")

# Inicializar SecureToolManager
secure_manager = SecureToolManager("safety.yaml")

class ToolExecutionRequest(BaseModel):
    tool_name: str
    user_id: str
    parameters: Dict[str, Any]
    context: Optional[Dict[str, Any]] = None

@app.post("/execute-tool")
async def execute_tool_endpoint(request: ToolExecutionRequest):
    """Endpoint para ejecutar herramientas de forma segura"""
    try:
        result = await secure_manager.execute_tool(
            tool_name=request.tool_name,
            user_id=request.user_id,
            parameters=request.parameters,
            context=request.context
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/security-report/{user_id}")
async def get_user_security_report(user_id: str):
    """Obtener reporte de seguridad para un usuario"""
    return secure_manager.get_security_report(user_id)

# === LangChain Integration ===
from langchain.tools import BaseTool
from langchain.agents import AgentType, initialize_agent
from langchain.llms import OpenAI

class SecureLangChainTool(BaseTool):
    """Wrapper para herramientas LangChain con seguridad"""
    
    name: str
    description: str
    secure_manager: SecureToolManager
    user_id: str
    
    def _run(self, query: str) -> str:
        """Ejecutar herramienta de forma síncrona"""
        import asyncio
        return asyncio.run(self._arun(query))
    
    async def _arun(self, query: str) -> str:
        """Ejecutar herramienta de forma asíncrona"""
        try:
            result = await self.secure_manager.execute_tool(
                tool_name=self.name,
                user_id=self.user_id,
                parameters={"query": query}
            )
            return str(result.get("result", ""))
        except Exception as e:
            return f"Error: {e}"
`;

  return (
    <div className="lesson">
      <h2>🛠️ Laboratorio: Secure Tool Manager</h2>
      
      <div className="lesson-section">
        <h3>Objetivo del Laboratorio</h3>
        <p>
          Construir un sistema completo de gestión de herramientas con seguridad integrada 
          que combine todos los conceptos aprendidos en las lecciones anteriores.
        </p>
        
        <div className="lab-objectives">
          <div className="objective-card">
            <h4>🎯 Objetivo 1: Arquitectura Segura</h4>
            <p>Implementar un manager que valide cada ejecución</p>
          </div>
          <div className="objective-card">
            <h4>🎯 Objetivo 2: Configuración Declarativa</h4>
            <p>Usar safety.yaml para toda la configuración</p>
          </div>
          <div className="objective-card">
            <h4>🎯 Objetivo 3: Monitoreo Completo</h4>
            <p>Logging, métricas y alertas en tiempo real</p>
          </div>
          <div className="objective-card">
            <h4>🎯 Objetivo 4: Flexibilidad</h4>
            <p>Múltiples modos de enforcement</p>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>SecureToolManager - Implementación Completa</h3>
        <p>
          Esta implementación incluye todas las funcionalidades de seguridad que hemos 
          estudiado en un sistema cohesivo y production-ready:
        </p>
        
        <CodeBlock
          language="python"
          title="secure_tool_manager.py"
          code={secureToolManagerCode}
        />
      </div>

      <div className="lesson-section">
        <h3>Características Principales</h3>
        
        <div className="features-grid">
          <div className="feature-card">
            <h4>🛡️ Control de Acceso</h4>
            <ul>
              <li>Allowlist/blocklist de herramientas</li>
              <li>Validación de permisos</li>
              <li>Autenticación por usuario</li>
            </ul>
          </div>
          <div className="feature-card">
            <h4>⏱️ Rate Limiting</h4>
            <ul>
              <li>Límites por herramienta</li>
              <li>Límites por usuario</li>
              <li>Ventanas de tiempo flexibles</li>
            </ul>
          </div>
          <div className="feature-card">
            <h4>🔍 Detección de Patrones</h4>
            <ul>
              <li>Regex patterns peligrosos</li>
              <li>Análisis de parámetros</li>
              <li>Validación de salidas</li>
            </ul>
          </div>
          <div className="feature-card">
            <h4>📊 Auditoría Completa</h4>
            <ul>
              <li>Log de todas las ejecuciones</li>
              <li>Historial de violaciones</li>
              <li>Reportes de seguridad</li>
            </ul>
          </div>
          <div className="feature-card">
            <h4>🚨 Alertas Tiempo Real</h4>
            <ul>
              <li>Notificaciones automáticas</li>
              <li>Integración con SIEM</li>
              <li>Escalación por severidad</li>
            </ul>
          </div>
          <div className="feature-card">
            <h4>⚙️ Modos de Enforcement</h4>
            <ul>
              <li>Strict: Bloquea violaciones</li>
              <li>Permissive: Permite y registra</li>
              <li>Monitor: Solo observa</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>Integración con Frameworks</h3>
        <p>
          El SecureToolManager se puede integrar fácilmente con frameworks populares:
        </p>
        
        <CodeBlock
          language="python"
          title="framework_integrations.py"
          code={integrationCode}
        />
      </div>

      <div className="lesson-section">
        <h3>🔬 Ejercicios del Laboratorio</h3>
        
        <div className="lab-exercises">
          <div className="exercise-card">
            <h4>Ejercicio 1: Configuración Básica</h4>
            <p>Crea un safety.yaml para un chatbot de customer service con:</p>
            <ul>
              <li>3 herramientas permitidas (search, email, ticket)</li>
              <li>Rate limits apropiados para cada una</li>
              <li>Patrones peligrosos específicos del dominio</li>
            </ul>
            <div className="checklist">
              <label><input type="checkbox" /> safety.yaml creado</label>
              <label><input type="checkbox" /> Herramientas configuradas</label>
              <label><input type="checkbox" /> Rate limits definidos</label>
              <label><input type="checkbox" /> Patrones de seguridad añadidos</label>
            </div>
          </div>

          <div className="exercise-card">
            <h4>Ejercicio 2: Implementación de Herramientas</h4>
            <p>Implementa 3 herramientas que funcionen con el SecureToolManager:</p>
            <ul>
              <li>knowledge_search: Buscar en base de conocimientos</li>
              <li>send_email: Enviar respuesta al cliente</li>
              <li>create_ticket: Crear ticket de soporte</li>
            </ul>
            <div className="checklist">
              <label><input type="checkbox" /> knowledge_search implementada</label>
              <label><input type="checkbox" /> send_email implementada</label>
              <label><input type="checkbox" /> create_ticket implementada</label>
              <label><input type="checkbox" /> Todas registradas en el manager</label>
            </div>
          </div>

          <div className="exercise-card">
            <h4>Ejercicio 3: Testing de Seguridad</h4>
            <p>Crea tests que verifiquen:</p>
            <ul>
              <li>Herramientas bloqueadas no se ejecutan</li>
              <li>Rate limits se respetan</li>
              <li>Patrones peligrosos se detectan</li>
              <li>Diferentes modos de enforcement funcionan</li>
            </ul>
            <div className="checklist">
              <label><input type="checkbox" /> Tests de herramientas bloqueadas</label>
              <label><input type="checkbox" /> Tests de rate limiting</label>
              <label><input type="checkbox" /> Tests de pattern matching</label>
              <label><input type="checkbox" /> Tests de enforcement modes</label>
            </div>
          </div>

          <div className="exercise-card">
            <h4>Ejercicio 4: Monitoreo y Alertas</h4>
            <p>Configura sistema de monitoreo con:</p>
            <ul>
              <li>Métricas de Prometheus</li>
              <li>Dashboard de Grafana</li>
              <li>Alertas por Slack/email</li>
              <li>Reportes automatizados</li>
            </ul>
            <div className="checklist">
              <label><input type="checkbox" /> Métricas de Prometheus configuradas</label>
              <label><input type="checkbox" /> Dashboard de Grafana creado</label>
              <label><input type="checkbox" /> Sistema de alertas configurado</label>
              <label><input type="checkbox" /> Reportes automatizados funcionando</label>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>📋 Checklist de Producción</h3>
        <p>Antes de desplegar en producción, verifica:</p>
        
        <div className="production-checklist">
          <div className="checklist-section">
            <h4>⚙️ Configuración</h4>
            <div className="checklist">
              <label><input type="checkbox" /> safety.yaml validado sin errores</label>
              <label><input type="checkbox" /> Configuraciones por entorno (dev/staging/prod)</label>
              <label><input type="checkbox" /> Variables de entorno para secretos</label>
              <label><input type="checkbox" /> Backup de configuraciones anteriores</label>
            </div>
          </div>

          <div className="checklist-section">
            <h4>🔒 Seguridad</h4>
            <div className="checklist">
              <label><input type="checkbox" /> Todas las herramientas en allowlist</label>
              <label><input type="checkbox" /> Patrones peligrosos actualizados</label>
              <label><input type="checkbox" /> Rate limits calibrados para producción</label>
              <label><input type="checkbox" /> Enforcement mode en "strict"</label>
            </div>
          </div>

          <div className="checklist-section">
            <h4>📊 Monitoreo</h4>
            <div className="checklist">
              <label><input type="checkbox" /> Logging configurado y funcionando</label>
              <label><input type="checkbox" /> Métricas siendo recolectadas</label>
              <label><input type="checkbox" /> Alertas configuradas y probadas</label>
              <label><input type="checkbox" /> Dashboards desplegados</label>
            </div>
          </div>

          <div className="checklist-section">
            <h4>🧪 Testing</h4>
            <div className="checklist">
              <label><input type="checkbox" /> Tests unitarios pasando (&gt;95% coverage)</label>
              <label><input type="checkbox" /> Tests de integración completados</label>
              <label><input type="checkbox" /> Tests de carga realizados</label>
              <label><input type="checkbox" /> Penetration testing completado</label>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <h3>🏆 Proyecto Final</h3>
        <div className="final-project-box">
          <h4>Desafío: Sistema de Seguridad Completo</h4>
          <p>
            <strong>Misión:</strong> Crear un sistema de herramientas seguras para un agente 
            de trading que debe:
          </p>
          <ul>
            <li>🔍 Analizar datos de mercado (APIs financieras)</li>
            <li>📊 Generar reportes (Excel, PDF)</li>
            <li>📧 Enviar alertas a traders (email, Slack)</li>
            <li>💾 Guardar análisis históricos (base de datos)</li>
            <li>🚫 NUNCA ejecutar trades reales automáticamente</li>
          </ul>
          
          <p><strong>Restricciones Especiales:</strong></p>
          <ul>
            <li>Solo operar en horario de mercado (9 AM - 4 PM EST)</li>
            <li>Rate limits muy estrictos para APIs de trading</li>
            <li>Patrones que detecten intentos de trading automático</li>
            <li>Validación de que reportes no contengan información privilegiada</li>
            <li>Logging completo para auditorías regulatorias</li>
          </ul>
          
          <p><strong>Entregables:</strong></p>
          <ol>
            <li>safety.yaml completo y comentado</li>
            <li>SecureToolManager configurado</li>
            <li>4-5 herramientas implementadas</li>
            <li>Suite de tests comprehensiva</li>
            <li>Dashboard de monitoreo</li>
            <li>Documentación de despliegue</li>
          </ol>
        </div>
      </div>

      <div className="lesson-actions">
        <button className="btn btn-primary" onClick={onComplete}>
          Laboratorio Completado 🎓
        </button>
      </div>
    </div>
  );
};

export default ModuleB;
