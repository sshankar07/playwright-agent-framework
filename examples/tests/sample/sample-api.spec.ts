import { test, expect } from '../../../src/core/baseTest';
import { mockApiResponse } from '../../../src/core/apiIntercept';

test('intercept helper returns reviewed HTTP 200 response', async ({ page }) => {
  const body = {"users":[]};
  await mockApiResponse(page, /\/api\/users$/, body, 200);
  const response = await page.goto('https://qa-acceptance.invalid/api/users');
  expect(response).not.toBeNull();
  expect(response!.status()).toBe(200);
  expect(response!.headers()['content-type']).toContain('application/json');
  expect(await response!.json()).toEqual(body);
});

test('intercept helper returns reviewed HTTP 503 response', async ({ page }) => {
  const body = {"error":"Service unavailable"};
  await mockApiResponse(page, /\/api\/users$/, body, 503);
  const response = await page.goto('https://qa-acceptance.invalid/api/users');
  expect(response).not.toBeNull();
  expect(response!.status()).toBe(503);
  expect(response!.headers()['content-type']).toContain('application/json');
  expect(await response!.json()).toEqual(body);
});
