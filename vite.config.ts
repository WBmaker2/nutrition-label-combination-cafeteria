import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/nutrition-label-combination-cafeteria/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules/**', 'dist/**', '.worktrees/**'],
  },
} as import('vite').UserConfig & {
  test?: {
    environment: string
    globals: boolean
    setupFiles: string
    include: string[]
    exclude: string[]
  }
})
