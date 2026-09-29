import { test, expect } from '@playwright/test';

async function openDrill(page, number, solution = true) {
  await page.goto(`/?drill=${number}${solution ? '&mode=solution' : ''}`);
  return page.locator('#exercise');
}
async function check(page, passed) {
  await page.getByRole('button', { name: 'Check result', exact: true }).click();
  await expect(page.getByRole('status')).toContainText(passed ? 'PASS' : 'TRY AGAIN');
}
async function drive(exercise, number) {
  if (number === 1) await exercise.getByRole('button', { name: 'Move Rice to front' }).click();
  if (number === 2) await exercise.getByRole('button').first().click({ clickCount: 2 });
  if (number === 3) {
    await exercise.getByRole('button', { name: 'Add item' }).click();
    await exercise.getByRole('button', { name: 'Remove last' }).click();
  }
  if (number === 9) {
    await exercise.getByRole('button', { name: 'Send order' }).click();
    await exercise.getByRole('button', { name: 'Mark delivered' }).click();
  }
  if (number === 10) await exercise.getByLabel('Name of product r').fill('Brown rice');
  if (number === 11) {
    await exercise.getByRole('button', { name: 'Show' }).first().click();
    await exercise.getByRole('button', { name: 'Show' }).first().click();
  }
  if (number === 12) await exercise.getByRole('button', { name: 'Rice' }).click();
  if (number === 13) await exercise.getByRole('button', { name: 'Start the sale' }).click();
  if (number === 14) {
    await exercise.getByRole('button', { name: 'Add one Apples' }).click({ clickCount: 2 });
    await exercise.getByRole('button', { name: 'Add one Rice' }).click();
  }
}

for (const number of [1, 2, 3, 4, 9, 10, 11, 12, 13, 14]) {
  test(`worked solution ${number} reaches its visible goal`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await drive(await openDrill(page, number), number);
    await check(page, true);
    expect(errors).toEqual([]);
  });

  test(`starter ${number} does not accidentally satisfy the goal`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await drive(await openDrill(page, number, false), number);
    await check(page, false);
    expect(errors).toEqual([]);
  });
}

test('drills 5-8 show the component under test and point at the terminal', async ({ page }) => {
  for (let number = 5; number <= 8; number++) {
    await page.goto(`/?drill=${number}`);
    await expect(page.locator('#exercise')).not.toBeEmpty();
    await expect(page.getByText('npm run test:unit:watch')).toBeVisible();
  }
});
