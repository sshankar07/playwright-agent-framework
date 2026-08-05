import type { Page, Locator } from '@playwright/test';

export class SamplePage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading');
  }
}
