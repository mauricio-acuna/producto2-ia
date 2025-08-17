import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  MemoryArchitecture, 
  CodeImplementation, 
  LiveDemo, 
  PerformanceMetrics 
} from './components';
import './styles.css';

/**
 * Lesson03Implementation - Technical implementation of memory systems in AI agents
 * 
 * This lesson provides hands-on implementation details, code examples, and
 * interactive demonstrations of memory systems for AI agents.
 * 
 * @component
 * @example
 * return <Lesson03Implementation />
 */
const Lesson03Implementation = () => {
  const [activeSection, setActiveSection] = useState('architecture');

  const sections = [
    { id: 'architecture', title: 'Arquitectura de Memoria', icon: '🏗️' },
    { id: 'implementation', title: 'Implementación Técnica', icon: '⚙️' },
    { id: 'demo', title: 'Demo Interactivo', icon: '🚀' },
    { id: 'performance', title: 'Métricas de Rendimiento', icon: '📊' }
  ];

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <main 
      className="lesson-implementation"
      role="main"
      aria-labelledby="lesson-title"
      tabIndex={-1}
    >
      <header className="lesson-header">
        <h1 id="lesson-title">
          Lección 3: Implementación Técnica de Memoria
        </h1>
        <p className="lesson-intro">
          Aprende a implementar sistemas de memoria robustos y eficientes para agentes de IA. 
          Esta lección incluye arquitecturas detalladas, código de producción y demostraciones 
          interactivas de sistemas de memoria en funcionamiento.
        </p>
      </header>

      <nav 
        className="lesson-navigation"
        role="tablist"
        aria-label="Secciones de la lección"
      >
        {sections.map((section) => (
          <button
            key={section.id}
            role="tab"
            aria-selected={activeSection === section.id}
            aria-controls={`section-${section.id}`}
            className={`nav-button ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => handleSectionChange(section.id)}
          >
            <span className="nav-icon" aria-hidden="true">{section.icon}</span>
            <span className="nav-text">{section.title}</span>
          </button>
        ))}
      </nav>

      <div className="lesson-content">
        <section
          id="section-architecture"
          role="tabpanel"
          aria-labelledby="architecture-title"
          className={`content-section ${activeSection === 'architecture' ? 'active' : ''}`}
          hidden={activeSection !== 'architecture'}
        >
          <h2 id="architecture-title">🏗️ Arquitectura de Sistemas de Memoria</h2>
          <p>
            Un sistema de memoria eficiente requiere una arquitectura bien diseñada que 
            balancee rendimiento, escalabilidad y funcionalidad. Exploremos los componentes 
            fundamentales y sus interacciones.
          </p>
          <MemoryArchitecture />
        </section>

        <section
          id="section-implementation"
          role="tabpanel"
          aria-labelledby="implementation-title"
          className={`content-section ${activeSection === 'implementation' ? 'active' : ''}`}
          hidden={activeSection !== 'implementation'}
        >
          <h2 id="implementation-title">⚙️ Implementación Técnica Detallada</h2>
          <p>
            Examina implementaciones de código real para sistemas de memoria, incluyendo 
            estructuras de datos optimizadas, algoritmos de búsqueda y patrones de diseño 
            para sistemas escalables.
          </p>
          <CodeImplementation />
        </section>

        <section
          id="section-demo"
          role="tabpanel"
          aria-labelledby="demo-title"
          className={`content-section ${activeSection === 'demo' ? 'active' : ''}`}
          hidden={activeSection !== 'demo'}
        >
          <h2 id="demo-title">🚀 Demostración Interactiva</h2>
          <p>
            Experimenta con un sistema de memoria completamente funcional. Agrega mensajes, 
            realiza consultas y observa cómo el sistema gestiona la información en tiempo real.
          </p>
          <LiveDemo />
        </section>

        <section
          id="section-performance"
          role="tabpanel"
          aria-labelledby="performance-title"
          className={`content-section ${activeSection === 'performance' ? 'active' : ''}`}
          hidden={activeSection !== 'performance'}
        >
          <h2 id="performance-title">📊 Métricas y Optimización</h2>
          <p>
            Analiza métricas de rendimiento, técnicas de optimización y mejores prácticas 
            para sistemas de memoria en producción. Incluye benchmarks y comparaciones 
            de diferentes enfoques.
          </p>
          <PerformanceMetrics />
        </section>
      </div>

      <section 
        className="lesson-section key-concepts"
        aria-labelledby="key-concepts-title"
      >
        <h2 id="key-concepts-title">🎯 Conceptos Clave de Implementación</h2>
        
        <div className="concepts-grid">
          <div className="concept-card">
            <h3>🔧 Estructuras de Datos</h3>
            <ul>
              <li>Deques para buffers circulares</li>
              <li>Hash maps para acceso rápido</li>
              <li>Árboles para búsqueda jerárquica</li>
              <li>Índices invertidos para búsqueda de texto</li>
            </ul>
          </div>
          
          <div className="concept-card">
            <h3>⚡ Algoritmos de Optimización</h3>
            <ul>
              <li>LRU (Least Recently Used) para cache</li>
              <li>Bloom filters para búsqueda eficiente</li>
              <li>Embeddings para similitud semántica</li>
              <li>Compression para almacenamiento eficiente</li>
            </ul>
          </div>
          
          <div className="concept-card">
            <h3>🏗️ Patrones de Diseño</h3>
            <ul>
              <li>Observer para actualizaciones automáticas</li>
              <li>Factory para diferentes tipos de memoria</li>
              <li>Strategy para algoritmos intercambiables</li>
              <li>Decorator para funcionalidades adicionales</li>
            </ul>
          </div>
          
          <div className="concept-card">
            <h3>📊 Métricas de Calidad</h3>
            <ul>
              <li>Tiempo de respuesta (&lt; 10ms)</li>
              <li>Throughput (&gt; 1000 ops/sec)</li>
              <li>Precisión de recuperación (&gt; 90%)</li>
              <li>Uso de memoria (&lt; 100MB base)</li>
            </ul>
          </div>
        </div>
      </section>

      <section 
        className="lesson-section implementation-checklist"
        aria-labelledby="checklist-title"
      >
        <h2 id="checklist-title">✅ Checklist de Implementación</h2>
        
        <div className="checklist-categories">
          <div className="checklist-category">
            <h3>🏁 Fase Inicial</h3>
            <ul className="checklist">
              <li>
                <input type="checkbox" id="req-analysis" />
                <label htmlFor="req-analysis">Análisis de requerimientos específicos</label>
              </li>
              <li>
                <input type="checkbox" id="arch-design" />
                <label htmlFor="arch-design">Diseño de arquitectura del sistema</label>
              </li>
              <li>
                <input type="checkbox" id="data-model" />
                <label htmlFor="data-model">Modelado de estructuras de datos</label>
              </li>
              <li>
                <input type="checkbox" id="proto-impl" />
                <label htmlFor="proto-impl">Implementación de prototipo básico</label>
              </li>
            </ul>
          </div>
          
          <div className="checklist-category">
            <h3>🔧 Desarrollo</h3>
            <ul className="checklist">
              <li>
                <input type="checkbox" id="core-impl" />
                <label htmlFor="core-impl">Implementación de funcionalidad core</label>
              </li>
              <li>
                <input type="checkbox" id="search-algo" />
                <label htmlFor="search-algo">Algoritmos de búsqueda y recuperación</label>
              </li>
              <li>
                <input type="checkbox" id="cleanup-logic" />
                <label htmlFor="cleanup-logic">Lógica de limpieza y gestión de memoria</label>
              </li>
              <li>
                <input type="checkbox" id="error-handling" />
                <label htmlFor="error-handling">Manejo de errores y casos límite</label>
              </li>
            </ul>
          </div>
          
          <div className="checklist-category">
            <h3>🧪 Testing</h3>
            <ul className="checklist">
              <li>
                <input type="checkbox" id="unit-tests" />
                <label htmlFor="unit-tests">Tests unitarios completos</label>
              </li>
              <li>
                <input type="checkbox" id="integration-tests" />
                <label htmlFor="integration-tests">Tests de integración</label>
              </li>
              <li>
                <input type="checkbox" id="performance-tests" />
                <label htmlFor="performance-tests">Tests de rendimiento</label>
              </li>
              <li>
                <input type="checkbox" id="load-tests" />
                <label htmlFor="load-tests">Tests de carga y estrés</label>
              </li>
            </ul>
          </div>
          
          <div className="checklist-category">
            <h3>🚀 Producción</h3>
            <ul className="checklist">
              <li>
                <input type="checkbox" id="monitoring" />
                <label htmlFor="monitoring">Sistema de monitoreo</label>
              </li>
              <li>
                <input type="checkbox" id="logging" />
                <label htmlFor="logging">Logging estructurado</label>
              </li>
              <li>
                <input type="checkbox" id="metrics" />
                <label htmlFor="metrics">Métricas de rendimiento</label>
              </li>
              <li>
                <input type="checkbox" id="documentation" />
                <label htmlFor="documentation">Documentación completa</label>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="lesson-footer">
        <div className="lesson-summary">
          <h3>📝 Resumen de Implementación</h3>
          <p>
            La implementación exitosa de sistemas de memoria requiere atención cuidadosa 
            a la arquitectura, selección apropiada de estructuras de datos, y optimización 
            continua basada en métricas reales. Los sistemas de producción deben balancear 
            funcionalidad, rendimiento y mantenibilidad.
          </p>
        </div>
        
        <div className="lesson-navigation">
          <button 
            className="btn btn-secondary"
            aria-label="Volver a la lección anterior"
          >
            ← Lección 2
          </button>
          <button 
            className="btn btn-primary"
            aria-label="Continuar a la siguiente lección"
          >
            Lección 4 →
          </button>
        </div>
      </footer>
    </main>
  );
};

// PropTypes for development validation
Lesson03Implementation.propTypes = {};

// Default export
export default Lesson03Implementation;
