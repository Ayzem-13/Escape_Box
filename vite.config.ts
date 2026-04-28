/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron/simple'

const isTest = !!process.env.VITEST
const isMobile = process.env.BUILD_TARGET === 'mobile'

export default defineConfig(({ command }) => ({
  base: './',
  plugins: [
    react(),
    // Electron plugin actif UNIQUEMENT au `vite build` desktop.
    // En dev (`vite` / `npm run dev`) ou en build mobile (Capacitor), on reste web.
    ...(command === 'build' && !isTest && !isMobile
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
