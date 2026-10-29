import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Сайт на GitHub Pages живёт по адресу /hexlet-vibecoding/
  base: '/hexlet-vibecoding/',
  plugins: [react(), tailwindcss()],
  // Две страницы: калькулятор (главная) и визитка (/card/)
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        card: path.resolve(__dirname, 'card/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
