import React from 'react';

const LangGraphVisualizer = ({ nodes, edges }) => {
  const getNodeColor = (type) => {
    const colors = {
      start: '#10b981',
      end: '#ef4444',
      node: '#3b82f6',
      conditional: '#f59e0b'
    };
    return colors[type] || '#6b7280';
  };

  const getNodePosition = (index, total) => {
    const spacing = 120;
    const startX = 50;
    return {
      x: startX + (index * spacing),
      y: 50
    };
  };

  return (
    <div className="langgraph-visualizer">
      <svg width="600" height="150" viewBox="0 0 600 150">
        {/* Render edges first */}
        {edges.map((edge, index) => {
          const fromIndex = nodes.findIndex(n => n.id === edge.from);
          const toIndex = nodes.findIndex(n => n.id === edge.to);
          const fromPos = getNodePosition(fromIndex, nodes.length);
          const toPos = getNodePosition(toIndex, nodes.length);
          
          return (
            <g key={index}>
              <line
                x1={fromPos.x + 40}
                y1={fromPos.y + 20}
                x2={toPos.x}
                y2={toPos.y + 20}
                stroke="#6b7280"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              {edge.condition && (
                <text
                  x={(fromPos.x + toPos.x) / 2 + 20}
                  y={(fromPos.y + toPos.y) / 2 + 15}
                  fontSize="12"
                  fill="#6b7280"
                  textAnchor="middle"
                >
                  {edge.condition}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#6b7280"
            />
          </marker>
        </defs>
        
        {/* Render nodes */}
        {nodes.map((node, index) => {
          const pos = getNodePosition(index, nodes.length);
          const color = getNodeColor(node.type);
          
          return (
            <g key={node.id}>
              <rect
                x={pos.x}
                y={pos.y}
                width="80"
                height="40"
                rx="8"
                fill={color}
                opacity="0.1"
                stroke={color}
                strokeWidth="2"
              />
              <text
                x={pos.x + 40}
                y={pos.y + 25}
                fontSize="12"
                fill={color}
                textAnchor="middle"
                fontWeight="600"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
      
      <div className="graph-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
          <span>Inicio</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
          <span>Nodo de Proceso</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
          <span>Fin</span>
        </div>
      </div>
    </div>
  );
};

export default LangGraphVisualizer;
