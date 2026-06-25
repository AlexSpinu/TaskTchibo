const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60000,

  projects: [
    {
      name: 'API',
      testDir: './tests/api',
      use: {
        baseURL: 'https://api.example.com',
      },
    },
    {
      name: 'UI - Chromium',
      testDir: './tests/tests',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
      },
    },
  ],
});
