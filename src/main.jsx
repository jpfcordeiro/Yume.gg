
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('main.jsx: start');
const rootEl = document.getElementById('root');
if (!rootEl) {
  document.body.innerHTML = '<div style="color:var(--neon-pink);font-size:2rem;padding:2rem">Erro: Não encontrou o elemento root</div>';
  throw new Error('Elemento root não encontrado');
}
console.log('main.jsx: root encontrado, renderizando React...');
ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log('main.jsx: render finalizado');
