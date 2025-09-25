import React from 'react';

export default function Loader({ text = 'Carregando fofura...' }) {
  return (
    <div className="cute-loader">
      <div className="cute-paw">
        <span role="img" aria-label="Pata">🐾</span>
      </div>
      <div className="cute-loader-text">{text}</div>
    </div>
  );
}
