import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './examples/tests',
  fullyParallel: true,
  retries: 1,
  reporter: [['html', { outputFolder: 'reports' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://example.test',
    trace: 'on-first-retry'
  }
});
