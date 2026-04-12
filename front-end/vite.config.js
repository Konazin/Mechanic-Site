import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy para o backend durante o desenvolvimento
    // Evita problemas de CORS em dev
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // URL do backend do seu amigo
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
