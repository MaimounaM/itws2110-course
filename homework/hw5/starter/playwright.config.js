import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // short waits, so a feature you haven't built yet fails in seconds, not minutes
  timeout: 15_000,
  expect: { timeout: 3_000 },
  use: { baseURL: 'http://127.0.0.1:5179', browserName: 'chromium', actionTimeout: 3_000 },
  webServer: {
    command: 'npm run dev -- --port 5179 --strictPort',
    url: 'http://127.0.0.1:5179',
    reuseExistingServer: !process.env.CI,
  },
});
