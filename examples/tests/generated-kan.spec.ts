import { test, expect } from '../../src/core/baseTest';
import { fillByPlaceholder, clickByRole } from '../../src/core/pageActionHelpers';

// Admin username is a public, well-known demo credential for the OrangeHRM demo site.
const ADMIN_USERNAME = 'Admin';
// Password is a registered secret and must be read from the environment.
const ADMIN_PASSWORD = process.env.ADMIN_PWD;

test.describe('OrangeHRM admin login', () => {
  test('Verify OrangeHRM admin login reaches the dashboard', async ({ page }) => {
    if (!ADMIN_PASSWORD) {
      // TODO: ADMIN_PWD is not set in this environment; the login step cannot complete without it.
      throw new Error('Missing required environment variable ADMIN_PWD for admin login test');
    }

    // Step 1: Log in to the OrangeHRM demo site as the Admin user
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await fillByPlaceholder(page, 'Username', ADMIN_USERNAME);
    await fillByPlaceholder(page, 'Password', ADMIN_PASSWORD);
    await clickByRole(page, 'button', 'Login');

    // Expected: The Dashboard heading is visible after login
    const dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    await expect(dashboardHeading).toBeVisible();
  });
});
