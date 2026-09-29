import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './presentation/App';
import { database } from './container';

const root = createRoot(document.getElementById('root')!);

database
  .initialize()
  .then(() => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch((error: unknown) => {
    console.error('Error al inicializar SQLite', error);
    root.render(<p>No se pudo abrir la base de datos.</p>);
  });
