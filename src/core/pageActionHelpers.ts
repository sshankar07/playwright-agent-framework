import type { Page } from '@playwright/test';

type AriaRole = Parameters<Page['getByRole']>[0];

export async function clickByRole(page: Page, role: AriaRole, name: string): Promise<void> {
  await page.getByRole(role, { name }).click();
}

export async function fillByPlaceholder(page: Page, placeholder: string, value: string): Promise<void> {
  await page.getByPlaceholder(placeholder).fill(value);
}
