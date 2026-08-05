import { expect } from './baseTest';
import type { Locator } from '@playwright/test';

export async function expectTextEquals(locator: Locator, expected: string): Promise<void> {
  await expect(locator).toBeVisible();
  await expect(locator).toHaveText(expected);
}

export async function expectUrlMatches(page: { url(): string }, pattern: RegExp): Promise<void> {
  expect(page.url()).toMatch(pattern);
}
