import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'node:path'

// Charge .env puis .env.local (overrides locaux > .env)
const root = process.cwd()
dotenv.config({ path: path.resolve(root, '.env'), quiet: true })
dotenv.config({ path: path.resolve(root, '.env.local'), override: true, quiet: true })

const PORT = Number(process.env.PORT ?? 5173)
const BASE_URL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`
const SLOW_MO = Number(process.env.PWSLOWMO ?? 0)

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'html',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: { slowMo: SLOW_MO },
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
