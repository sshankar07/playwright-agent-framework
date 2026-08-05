import type { Page, Route, Request } from '@playwright/test';

export async function mockApiResponse(page: Page, urlPattern: RegExp, body: unknown, status = 200): Promise<void> {
  await page.route(urlPattern, async (route: Route) => {
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(body)
    });
  });
}

export async function captureRequests(page: Page, urlPattern: RegExp): Promise<Request[]> {
  const captured: Request[] = [];
  page.on('request', request => {
    if (urlPattern.test(request.url())) captured.push(request);
  });
  return captured;
}
