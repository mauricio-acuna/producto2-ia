import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Portal 2: Agentes y RAG hands-on</h1>
            <p className="hero-subtitle">
              El siguiente paso después de los fundamentos. Aprende a diseñar y desplegar 
              <strong> agentes completos</strong> con LangGraph, RAG híbrido y memoria.
            </p>
            <div className="hero-features">
              <span className="feature-tag">🤖 LangGraph</span>
              <span className="feature-tag">🔍 RAG Híbrido</span>
              <span className="feature-tag">🧠 Memoria</span>
              <span className="feature-tag">🛡️ Tools Seguras</span>
            </div>
            <div className="hero-actions">
              <Link to="/modulo-a" className="btn btn-primary">
                Comenzar Módulo A
              </Link>
              <a href="#overview" className="btn btn-secondary">
                Ver Currículo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="target-audience">
        <div className="container">
          <h2>¿Para quién es este portal?</h2>
          <div className="audience-grid">
            <div className="audience-card">
              <h3>👩‍💻 Desarrolladores Mid-Level</h3>
              <p>Que completaron Portal 1 o saben crear agentes básicos y RAG simple</p>
            </div>
            <div className="audience-card">
              <h3>🏗️ Buscas Arquitectura</h3>
              <p>Quieres estructurar agentes complejos con prácticas de producción</p>
            </div>
            <div className="audience-card">
              <h3>📈 Portfolio Profesional</h3>
              <p>Necesitas proyectos atractivos para roles de AI Engineer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section id="overview" className="curriculum-overview">
        <div className="container">
          <h2>Currículo del Portal</h2>
          <div className="modules-grid">
            <div className="module-card">
              <div className="module-header">
                <h3>Módulo A</h3>
                <span className="module-tag">LangGraph</span>
              </div>
              <h4>Agentes en LangGraph</h4>
              <p>Conceptos de grafo, nodos plan/exec/critic, transiciones explícitas</p>
              <Link to="/modulo-a" className="module-link">Comenzar →</Link>
            </div>
            
            <div className="module-card">
              <div className="module-header">
                <h3>Módulo B</h3>
                <span className="module-tag">Seguridad</span>
              </div>
              <h4>Tools Seguras</h4>
              <p>Contratos, validación de inputs, safety.yaml básico</p>
              <Link to="/modulo-b" className="module-link">Comenzar →</Link>
            </div>
            
            <div className="module-card coming-soon">
              <div className="module-header">
                <h3>Módulo C</h3>
                <span className="module-tag">Memoria</span>
              </div>
              <h4>Memoria de Agentes</h4>
              <p>Short-term (resúmenes), long-term (chunks indexados)</p>
              <span className="coming-soon-tag">Próximamente</span>
            </div>
            
            <div className="module-card coming-soon">
              <div className="module-header">
                <h3>Módulo D</h3>
                <span className="module-tag">RAG</span>
              </div>
              <h4>RAG Híbrido</h4>
              <p>BM25, vectores, MMR, re-ranking adaptativo</p>
              <span className="coming-soon-tag">Próximamente</span>
            </div>
            
            <div className="module-card coming-soon">
              <div className="module-header">
                <h3>Módulo E</h3>
                <span className="module-tag">Evaluación</span>
              </div>
              <h4>EvalOps Local</h4>
              <p>Quick evals automáticas, gates de precisión/coste</p>
              <span className="coming-soon-tag">Próximamente</span>
            </div>
            
            <div className="module-card capstone">
              <div className="module-header">
                <h3>Capstone</h3>
                <span className="module-tag">Proyecto Final</span>
              </div>
              <h4>Agente Completo</h4>
              <p>LangGraph + RAG híbrido que responde sobre repositorios de código</p>
              <span className="coming-soon-tag">Próximamente</span>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="success-metrics">
        <div className="container">
          <h2>Objetivos de Aprendizaje</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-number">3+</div>
              <p>Nodos en tu agente LangGraph (planificador, ejecutor, crítico)</p>
            </div>
            <div className="metric-card">
              <div className="metric-number">70%</div>
              <p>Precisión@k promedio esperada en el capstone</p>
            </div>
            <div className="metric-card">
              <div className="metric-number">100%</div>
              <p>Tool calling seguro con allowlist y validación</p>
            </div>
            <div className="metric-card">
              <div className="metric-number">∞</div>
              <p>Memoria persistente entre consultas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Conviértete en Constructor de Agentes Reales</h2>
            <p>
              Quien complete este portal tendrá un <strong>portfolio atractivo</strong> para 
              roles de AI Engineer o Applied AI Developer en el mercado laboral.
            </p>
            <Link to="/modulo-a" className="btn btn-primary btn-large">
              Comenzar Ahora con LangGraph
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
