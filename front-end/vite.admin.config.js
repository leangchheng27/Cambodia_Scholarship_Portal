import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    rollupOptions: {
      input: 'admin.html',
    },
    outDir: 'dist-admin',
  },
  server: {
    port: 5174,
    open: '/admin.html',
  },
})
