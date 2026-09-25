// Homework 4, Part 2 -- the pantry checks. These are the checks the grader runs.
// Leave this file alone; run it with `npm test`.
//
// It reads the page the way a person would -- buttons by their names, text on
// screen -- never your variable names or class names. What it relies on:
//   - each product shows its name and "Quantity: N", with buttons "Add one" and "Remove"
//   - a text field (labelled, ideally) and an "Add product" button, or a form you can submit with Enter
//   - somewhere on the page, the word "Total" followed by the number
import { test, expect } from '@playwright/test';

const addOnes = page => page.getByRole('button', { name: /^\s*add one\s*$/i });

// The nearest element around a button whose text mentions its quantity: that is the card.
const LOWER = 'translate(normalize-space(.), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz")';
const cardOf = button => button.locator(
  `xpath=ancestor::*[contains(${LOWER}, "quantity") or contains(${LOWER}, "qty")][1]`);
const removeIn = button => cardOf(button).getByRole('button', { name: /remove|delete/i });

async function quantityOf(button) {
  const m = (await cardOf(button).innerText()).match(/(?:quantity|qty)\D*?(\d+)/i);
  return m ? Number(m[1]) : NaN;
}
async function nameOf(button) {
  return (await cardOf(button).innerText()).split('\n').map(s => s.trim()).find(Boolean) ?? '';
}
const each = async (page, fn) => Promise.all((await addOnes(page).all()).map(fn));
const quantities = page => each(page, quantityOf);
const names = page => each(page, nameOf);
async function total(page) {
  const m = (await page.locator('body').innerText()).match(/total\D{0,40}?(\d+)/i);
  return m ? Number(m[1]) : NaN;
}
const sum = xs => xs.reduce((a, b) => a + b, 0);
const totalMatches = page => async () => (await total(page)) === sum(await quantities(page));

async function addProduct(page, name) {
  let field = page.getByLabel(/product/i);
  if (await field.count() !== 1) field = page.getByRole('textbox').first();
  await field.fill(name);
  const button = page.getByRole('button', { name: /^\s*add(?!\s+one\b)/i });
  if (await button.count()) await button.first().click();
  else await field.press('Enter');
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(addOnes(page).first()).toBeVisible();
});

test('renders at least three products, each with a quantity and an Add one button', async ({ page }) => {
  expect(await addOnes(page).count()).toBeGreaterThanOrEqual(3);
  for (const q of await quantities(page)) expect(q).not.toBeNaN();
});

test('Add one changes only its own product', async ({ page }) => {
  const before = await quantities(page);
  await addOnes(page).nth(0).click();
  await addOnes(page).nth(0).click();
  await addOnes(page).nth(1).click();
  await expect.poll(() => quantities(page))
    .toEqual(before.map((q, i) => q + (i === 0 ? 2 : i === 1 ? 1 : 0)));
});

test('the total is the sum of every quantity, and moves with them', async ({ page }) => {
  await expect.poll(totalMatches(page)).toBe(true);
  const start = await total(page);
  await addOnes(page).nth(0).click();
  await addOnes(page).nth(2).click();
  await expect.poll(() => total(page)).toBe(start + 2);
  await expect.poll(totalMatches(page)).toBe(true);
});

test('a new product can be added from the form', async ({ page }) => {
  const count = await addOnes(page).count();
  await addProduct(page, 'Oats');
  await expect(addOnes(page)).toHaveCount(count + 1);
  await expect(page.locator('body')).toContainText('Oats');
  const added = addOnes(page).nth(count);
  const q = await quantityOf(added);
  await added.click();
  await expect.poll(() => quantityOf(addOnes(page).nth(count))).toBe(q + 1);
});

test('two added products are independent of each other', async ({ page }) => {
  const count = await addOnes(page).count();
  await addProduct(page, 'Oats');
  await expect(addOnes(page)).toHaveCount(count + 1);
  await addProduct(page, 'Lentils');
  await expect(addOnes(page)).toHaveCount(count + 2);
  const before = await quantities(page);
  await addOnes(page).nth(count + 1).click();
  await expect.poll(() => quantities(page))
    .toEqual(before.map((q, i) => q + (i === count + 1 ? 1 : 0)));
});

test('Remove takes out exactly that product', async ({ page }) => {
  const before = await names(page);
  await removeIn(addOnes(page).nth(1)).click();
  await expect(addOnes(page)).toHaveCount(before.length - 1);
  expect(await names(page)).toEqual(before.filter((_, i) => i !== 1));
});

test('the total stays right after removing a product that had a quantity', async ({ page }) => {
  for (let i = 0; i < 3; i++) await addOnes(page).nth(0).click();
  await expect.poll(() => quantityOf(addOnes(page).nth(0))).toBeGreaterThanOrEqual(3);
  const count = await addOnes(page).count();
  await removeIn(addOnes(page).nth(0)).click();
  await expect(addOnes(page)).toHaveCount(count - 1);
  await expect.poll(totalMatches(page)).toBe(true);
});
