import { test, expect } from '../../src/core/baseTest';
import { performLogin } from '../../src/skills/authSkill';
import { goTo } from '../../src/skills/navigationSkill';
import { clickByRole } from '../../src/core/pageActionHelpers';
import { expectTextEquals } from '../../src/core/assertionHelpers';

test.describe('OrangeHRM Timesheet Quick Launch Validation', () => {
  test('Admin logs in, launches Timesheet via Quick Launch, and confirms no timesheet for searched employee', async ({ page, baseURL }) => {
    // Step 1: Navigate to login page and log in as admin user
    await goTo(page, baseURL ?? '', '/web/index.php/auth/login');

    await performLogin(page, 'Admin', process.env.ADMIN_PWD as string);

    // Assert successful login by confirming navigation to the Dashboard
    await expect(page).toHaveURL(/\/dashboard\/index/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    // Step 2: Click the Timesheet icon under Quick Launch section
    await clickByRole(page, 'button', 'Timesheets');

    // Assert the Timesheets page is displayed with pending action data
    await expect(page.getByRole('heading', { name: 'Select Employee' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Timesheets Pending Action' })).toBeVisible();

    // Step 3: Enter employee name, select first available suggestion, and click View
    await page.getByRole('textbox', { name: 'Type for hints...' }).fill('Test');
    await page.getByRole('option', { name: 'Test' }).first().click();
    await page.locator('form').getByRole('button', { name: 'View' }).click();

    // Assert the 'No Timesheets Found' empty-state message is displayed
    await expectTextEquals(page.getByText('No Timesheets Found'), 'No Timesheets Found');
  });
});
