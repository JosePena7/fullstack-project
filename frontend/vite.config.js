import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': 'http://127.0.0.1:5000',
      '/users': 'http://127.0.0.1:5000',
      '/me': 'http://127.0.0.1:5000',
      '/protected': 'http://127.0.0.1:5000',
      '/api': 'http://127.0.0.1:5000',
    },
  },
})
