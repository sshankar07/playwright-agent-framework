import { test, expect } from '../../../src/core/baseTest';
import { SamplePage } from '../../pages/SamplePage';

test('sample UI test using base fixtures', async ({ page, envContext, logger }, testInfo) => {
  logger.info('Starting sample UI test', { testId: testInfo.title });
  const samplePage = new SamplePage(page);
  // Illustrative only: shows how the page object and env fixtures compose.
  expect(envContext.config.baseURL).toBeDefined();
  expect(samplePage.heading).toBeDefined();
});
