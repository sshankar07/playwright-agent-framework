import { expect } from './baseTest';
import type { Locator, Page } from '@playwright/test';

export async function expectTextEquals(locator: Locator, expected: string): Promise<void> {
  await expect(locator).toBeVisible();
  await expect(locator).toHaveText(expected);
}

export async function expectUrlMatches(page: Page, pattern: RegExp): Promise<void> {
  await expect(page).toHaveURL(pattern);
}
