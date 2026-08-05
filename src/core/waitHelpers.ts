import type { Page } from '@playwright/test';

export async function waitForNetworkIdle(page: Page, timeout = 2000): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
}
