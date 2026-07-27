import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/nutrition-label-combination-cafeteria/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
} as import('vite').UserConfig & { test?: { environment: string; globals: boolean } })
