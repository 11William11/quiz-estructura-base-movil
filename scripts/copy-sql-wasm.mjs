// Copia el motor SQLite (WebAssembly) a public/assets para que jeep-sqlite
// pueda ejecutar SQLite cuando la app corre en el navegador.
import { copyFileSync, mkdirSync } from 'node:fs';

mkdirSync('public/assets', { recursive: true });
copyFileSync('node_modules/sql.js/dist/sql-wasm.wasm', 'public/assets/sql-wasm.wasm');
console.log('sql-wasm.wasm copiado a public/assets');
