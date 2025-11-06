import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy de desarrollo: redirige todas las llamadas a /api hacia tu backend en Vercel
      '/api': {
        target: 'https://back-integrador-mu.vercel.app',
        changeOrigin: true,
        secure: false, // ⚠️ poner false evita errores con certificados locales
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});