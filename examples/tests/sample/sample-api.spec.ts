import { test, expect } from '../../../src/core/baseTest';
import { mockApiResponse } from '../../../src/core/apiIntercept';

test('sample API test using intercept helpers', async ({ page }) => {
  await mockApiResponse(page, /\/api\/users/, { users: [{ id: 1, name: 'Ada Lovelace' }] });
  await page.goto('about:blank');
  const body = await page.evaluate(() => fetch('https://example.test/api/users').then(response => response.json()));
  expect(body).toEqual({ users: [{ id: 1, name: 'Ada Lovelace' }] });
});
