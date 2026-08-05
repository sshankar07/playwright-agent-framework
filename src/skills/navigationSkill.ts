import type { Page } from '@playwright/test';
import { waitForNetworkIdle } from '../core/waitHelpers';

export async function goTo(page: Page, baseURL: string, path: string): Promise<void> {
  await page.goto(new URL(path, baseURL).toString());
  await waitForNetworkIdle(page);
}
