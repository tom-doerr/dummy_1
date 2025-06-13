const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('add and remove a task', async ({ page }) => {
  await page.fill('#title', 'e2e task');
  await page.click('#task-form button[type="submit"]');
  await expect(page.locator('li.task-item')).toHaveCount(1);
  await expect(page.locator('li.task-item')).toContainText('e2e task');
  await page.click('button.delete');
  await expect(page.locator('li.task-item')).toHaveCount(0);
});

test('time tracking persists after reload', async ({ page }) => {
  await page.fill('#title', 'timer');
  await page.click('#task-form button[type="submit"]');
  await page.click('button.time-add');
  await expect(page.locator('li.task-item .time')).toHaveText(' 5m');
  await page.reload();
  await expect(page.locator('li.task-item .time')).toHaveText(' 5m');
});

