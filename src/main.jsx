import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App'; // ← Nueva ruta tras refactor
import './index.css'; // ← Estilos globales
// import './App.css'; // ← Opcional: si aún lo usas

ReactDOM.createRoot(document.getElementById('root')).render(
  // 🔥 COMENTADO TEMPORALMENTE para evitar la destrucción del contexto WebGL
  //<React.StrictMode>
  <App />,
  //</React.StrictMode>,
);
