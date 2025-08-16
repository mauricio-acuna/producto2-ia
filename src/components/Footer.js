import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Portal 2: Agentes y RAG</h3>
            <p>Desarrollo de agentes avanzados con LangGraph, RAG híbrido y memoria</p>
          </div>
          <div className="footer-section">
            <h4>Módulos</h4>
            <ul>
              <li><a href="/modulo-a">Agentes en LangGraph</a></li>
              <li><a href="/modulo-b">Tools Seguras</a></li>
              <li><a href="/modulo-c">Memoria</a></li>
              <li><a href="/modulo-d">RAG Híbrido</a></li>
              <li><a href="/modulo-e">Evaluación</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Recursos</h4>
            <ul>
              <li><a href="/templates">Plantillas</a></li>
              <li><a href="/examples">Ejemplos</a></li>
              <li><a href="/datasets">Datasets</a></li>
              <li><a href="/docs">Documentación</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Portal IA. Desarrollado para formar AI Engineers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
