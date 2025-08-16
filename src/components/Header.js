import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>Portal 2: Agentes y RAG</h1>
          </Link>
          <nav className="nav">
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/modulo-a">Módulo A: LangGraph</Link></li>
              <li><a href="#modules">Todos los Módulos</a></li>
              <li><a href="#capstone">Capstone</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
