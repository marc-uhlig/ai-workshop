import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://127.0.0.1:3450', trace: 'on-first-retry' },
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3450',
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], launchOptions: { args: ['--disable-gpu'] } } }],
})
