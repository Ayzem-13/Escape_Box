/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron/simple'

const isTest = !!process.env.VITEST

export default defineConfig(({ command }) => ({
  base: './',
  plugins: [
    react(),
    // Electron plugin actif UNIQUEMENT au `vite build`.
    // En dev (`vite` / `npm run dev`), on reste dans le navigateur.
    ...(command === 'build' && !isTest
      ? [
          electron({
            main: { entry: 'electron/main.ts' },
            preload: { input: 'electron/preload.ts' },
          }),
        ]
      : []),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    exclude: ['node_modules', 'dist', 'e2e', '.git'],
  },
}))
