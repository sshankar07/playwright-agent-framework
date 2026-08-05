import { test } from '../../../src/core/baseTest';
import { mockApiResponse } from '../../../src/core/apiIntercept';

test('sample API test using intercept helpers', async ({ page }, testInfo) => {
  testInfo.skip(true, 'Example only');
  await mockApiResponse(page, /\/api\/users/, { users: [] });
});
