import type { Page } from '@playwright/test';
import { fillByPlaceholder, clickByRole } from '../core/pageActionHelpers';

export async function performLogin(page: Page, username: string, password: string): Promise<void> {
  await fillByPlaceholder(page, 'Username', username);
  await fillByPlaceholder(page, 'Password', password);
  await clickByRole(page, 'button', 'Login');
}
