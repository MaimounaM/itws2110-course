// Homework 4, Part 1 -- drills 1-11. Each test opens a drill, does what its goal says
// (the clicks, the typing), and presses Check result, exactly as you would. These are
// the checks the grader runs. Leave this file alone; run it with `npm test`.
import { test, expect } from '@playwright/test';

async function drive(exercise, number) {
  const buttons = exercise.getByRole('button');
  if (number === 7 || number === 11) await buttons.first().click({ clickCount: 2 });
  if (number === 8) {
    await buttons.nth(0).click({ clickCount: 2 });
    await buttons.nth(1).click();
  }
  if (number === 9) {
    await buttons.nth(0).click();
    await buttons.nth(1).click();
  }
  if (number === 10 || number === 11) await exercise.getByLabel('Product name').fill('Rice');
}

for (let number = 1; number <= 11; number++) {
  test(`drill ${number} passes`, async ({ page }) => {
    await page.goto(`/?drill=${number}`);
    const exercise = page.locator('#exercise');
    await expect(exercise).toBeVisible();
    await drive(exercise, number);
    await page.getByRole('button', { name: 'Check result', exact: true }).click();
    await expect(page.getByRole('status')).toContainText('PASS', { timeout: 3000 });
  });
}
