import { test, expect } from '@playwright/test';

async function openDrill(page, number, solution = true) {
  await page.goto(`/?drill=${number}${solution ? '&mode=solution' : ''}`);
  return page.locator('#exercise');
}
async function check(page, passed) {
  await page.getByRole('button', { name: 'Check result', exact: true }).click();
  await expect(page.getByRole('status')).toContainText(passed ? 'PASS' : 'TRY AGAIN');
}

async function driveDrill(exercise, number) {
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
  test(`worked solution ${number} reaches its visible goal`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const exercise = await openDrill(page, number);
    await driveDrill(exercise, number);
    await check(page, true);
    expect(errors).toEqual([]);
  });
}

for (let number = 1; number <= 11; number++) {
  test(`starter ${number} does not accidentally satisfy the goal`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const exercise = await openDrill(page, number, false);
    await driveDrill(exercise, number);
    await check(page, false);
    expect(errors).toEqual([]);
  });
}

test('independent and shared counters continue behaving beyond the target values', async ({ page }) => {
  let exercise = await openDrill(page, 8);
  await exercise.getByRole('button').first().click({ clickCount: 3 });
  await expect(exercise.getByRole('button').first()).toHaveText('Count: 3');
  await expect(exercise.getByRole('button').last()).toHaveText('Count: 0');
  exercise = await openDrill(page, 9);
  await exercise.getByRole('button').last().click({ clickCount: 3 });
  await expect(exercise.getByRole('button').first()).toHaveText('Count: 3');
  await expect(exercise.getByRole('button').last()).toHaveText('Count: 3');
  await page.getByRole('button', { name: 'Reset preview' }).click();
  await expect(exercise.getByRole('button').first()).toHaveText('Count: 0');
  await expect(exercise.getByRole('button').last()).toHaveText('Count: 0');
});

test('controlled input supports empty text and another product', async ({ page }) => {
  const exercise = await openDrill(page, 10);
  await exercise.getByLabel('Product name').fill('');
  await expect(exercise.locator('p')).toHaveText('Shopping for:');
  await exercise.getByLabel('Product name').fill('Oats');
  await expect(exercise.locator('p')).toHaveText('Shopping for: Oats');
});

test('shadcn card supports keyboard interaction and reset', async ({ page }) => {
  const exercise = await openDrill(page, 11);
  await exercise.getByLabel('Product name').fill('Oats');
  await exercise.getByLabel('Product name').press('Tab');
  await expect(exercise.getByRole('button', { name: 'Add one' })).toBeFocused();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');
  await expect(exercise.locator('[data-slot="card-title"]')).toHaveText('Oats');
  await expect(exercise.locator('p')).toHaveText('Quantity: 2');
  await page.getByRole('button', { name: 'Reset preview' }).click();
  await expect(exercise.getByLabel('Product name')).toHaveValue('Apples');
  await expect(exercise.locator('p')).toHaveText('Quantity: 0');
});

for (const width of [375, 800, 1280]) {
  test(`responsive examples at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    let exercise = await openDrill(page, 5);
    await check(page, true);
    exercise = await openDrill(page, 11);
    const input = await exercise.getByLabel('Product name').boundingBox();
    const card = await exercise.locator('[data-slot="card"]').boundingBox();
    if (width < 768) expect(card.y).toBeGreaterThan(input.y + input.height);
    else expect(card.x).toBeGreaterThan(input.x + input.width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
