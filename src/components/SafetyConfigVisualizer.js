import React from 'react';

const SafetyConfigVisualizer = ({ config }) => {
  return (
    <div className="safety-config-visualizer">
      <div className="config-header">
        <h4>🛡️ Configuración de Seguridad</h4>
      </div>
      
      <div className="config-content">
        <div className="config-section">
          <h5>Herramientas Permitidas</h5>
          <div className="allowed-tools">
            {config?.allowedTools?.map((tool, index) => (
              <span key={index} className="tool-tag allowed">{tool}</span>
            )) || <span className="no-config">No configurado</span>}
          </div>
        </div>
        
        <div className="config-section">
          <h5>Herramientas Bloqueadas</h5>
          <div className="blocked-tools">
            {config?.blockedTools?.map((tool, index) => (
              <span key={index} className="tool-tag blocked">{tool}</span>
            )) || <span className="no-config">No configurado</span>}
          </div>
        </div>
        
        <div className="config-section">
          <h5>Límites de Seguridad</h5>
          <div className="security-limits">
            <div className="limit-item">
              <span className="limit-name">Max File Size:</span>
              <span className="limit-value">{config?.maxFileSize || '10MB'}</span>
            </div>
            <div className="limit-item">
              <span className="limit-name">Max Execution Time:</span>
              <span className="limit-value">{config?.maxExecutionTime || '30s'}</span>
            </div>
            <div className="limit-item">
              <span className="limit-name">Rate Limit:</span>
              <span className="limit-value">{config?.rateLimit || '100/min'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyConfigVisualizer;
