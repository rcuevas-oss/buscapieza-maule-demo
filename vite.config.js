import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: el repo en GitHub Pages se sirve en /<repo-name>/
export default defineConfig({
  base: '/buscapieza-maule-demo/',
  plugins: [react()],
  server: {
    port: 5180,
    open: true
  }
})
