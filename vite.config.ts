import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // jeep-sqlite (Stencil) carga sus componentes de forma perezosa; no debe pre-empaquetarse.
    exclude: ['jeep-sqlite']
  }
})
