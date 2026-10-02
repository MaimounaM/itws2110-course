// Homework 5, Part 1 -- the feature checks. These are the checks the grader runs.
// Leave this file alone; run it with `npm test`.
//
// It reads the page the way a person would -- buttons by their names, text on screen --
// never your variable names or class names. What it relies on:
//   - each to-do is an <li> with its title, a checkbox, and buttons "Details" and "Delete"
//   - "Remaining: N" somewhere on the page
//   - three buttons named exactly All, Active and Done; the current one has aria-pressed="true"
//   - the Details panel says "Nothing selected." or "Selected: <title>" and "Status: active" / "Status: done"
//   - in the panel, a text field labelled "Title" and a button "Save"
import { test, expect } from '@playwright/test';

// a to-do is a list item with a checkbox in it (so a list of filter buttons isn't counted)
const rows = page => page.getByRole('listitem').filter({ has: page.getByRole('checkbox') });
const row = (page, title) => rows(page).filter({ hasText: title });
const titles = async page => (await rows(page).locator('label').allInnerTexts()).map(t => t.trim());
const button = (scope, name) => scope.getByRole('button', { name, exact: true });
const remaining = async page => {
  const m = (await page.locator('body').innerText()).match(/remaining\D{0,10}?(\d+)/i);
  return m ? Number(m[1]) : NaN;
};
const titleField = page => page.getByLabel('Title', { exact: true });

async function add(page, title) {
  await page.getByLabel('New to-do').fill(title);
  await button(page, 'Add').click();
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(rows(page).first()).toBeVisible();
});

// ---------------------------------------------------------------- the base (given)
test('the base still works: three to-dos, add, check off, delete', async ({ page }) => {
  expect(await titles(page)).toEqual(['Buy rice', 'Soak beans', 'Wash apples']);
  await add(page, 'Cook lentils');
  await expect(rows(page)).toHaveCount(4);
  await row(page, 'Buy rice').getByRole('checkbox').check();
  await expect(row(page, 'Buy rice').getByRole('checkbox')).toBeChecked();
  await button(row(page, 'Soak beans'), 'Delete').click();
  expect(await titles(page)).toEqual(['Buy rice', 'Wash apples', 'Cook lentils']);
});

// ---------------------------------------------------------------- 1. Remaining
test('Remaining counts the to-dos that are not done', async ({ page }) => {
  await expect.poll(() => remaining(page)).toBe(2);
});

test('Remaining moves when a to-do is checked, added or deleted', async ({ page }) => {
  await row(page, 'Buy rice').getByRole('checkbox').check();
  await expect.poll(() => remaining(page)).toBe(1);
  await add(page, 'Cook lentils');
  await expect.poll(() => remaining(page)).toBe(2);
  await button(row(page, 'Wash apples'), 'Delete').click();
  await expect.poll(() => remaining(page)).toBe(1);
  await row(page, 'Soak beans').getByRole('checkbox').uncheck();
  await expect.poll(() => remaining(page)).toBe(2);
});

// ---------------------------------------------------------------- 2. the filter
test('All, Active and Done each show the right to-dos', async ({ page }) => {
  await button(page, 'Active').click();
  await expect.poll(() => titles(page)).toEqual(['Buy rice', 'Wash apples']);
  await button(page, 'Done').click();
  await expect.poll(() => titles(page)).toEqual(['Soak beans']);
  await button(page, 'All').click();
  await expect.poll(() => titles(page)).toEqual(['Buy rice', 'Soak beans', 'Wash apples']);
});

test('the current filter button is marked with aria-pressed', async ({ page }) => {
  await expect(button(page, 'All')).toHaveAttribute('aria-pressed', 'true');
  await button(page, 'Active').click();
  await expect(button(page, 'Active')).toHaveAttribute('aria-pressed', 'true');
  await expect(button(page, 'All')).not.toHaveAttribute('aria-pressed', 'true');
  await expect(button(page, 'Done')).not.toHaveAttribute('aria-pressed', 'true');
});

test('the filtered list follows changes, and Remaining ignores the filter', async ({ page }) => {
  await button(page, 'Active').click();
  // click, not check(): once it's done, the row leaves the Active list
  await row(page, 'Buy rice').getByRole('checkbox').click();
  await expect.poll(() => titles(page)).toEqual(['Wash apples']);
  await button(page, 'Done').click();
  await expect.poll(() => titles(page)).toEqual(['Buy rice', 'Soak beans']);
  await add(page, 'Cook lentils');
  await expect.poll(() => titles(page)).toEqual(['Buy rice', 'Soak beans']);
  await expect.poll(() => remaining(page)).toBe(2);
  await button(page, 'All').click();
  await expect.poll(() => titles(page)).toEqual(['Buy rice', 'Soak beans', 'Wash apples', 'Cook lentils']);
});

// ---------------------------------------------------------------- 3. Details
test('Details shows the selected to-do and its status', async ({ page }) => {
  await expect(page.getByText(/nothing selected/i)).toBeVisible();
  await button(row(page, 'Buy rice'), 'Details').click();
  await expect(page.getByText(/Selected:\s*Buy rice/)).toBeVisible();
  await expect(page.getByText(/Status:\s*active/i)).toBeVisible();
  await expect(page.getByText(/nothing selected/i)).toHaveCount(0);
  await button(row(page, 'Soak beans'), 'Details').click();
  await expect(page.getByText(/Selected:\s*Soak beans/)).toBeVisible();
  await expect(page.getByText(/Status:\s*done/i)).toBeVisible();
});

test('the Details panel follows the to-do when it is checked off', async ({ page }) => {
  await button(row(page, 'Buy rice'), 'Details').click();
  await expect(page.getByText(/Status:\s*active/i)).toBeVisible();
  await row(page, 'Buy rice').getByRole('checkbox').check();
  await expect(page.getByText(/Status:\s*done/i)).toBeVisible();
  await row(page, 'Buy rice').getByRole('checkbox').uncheck();
  await expect(page.getByText(/Status:\s*active/i)).toBeVisible();
});

test('deleting the selected to-do empties the panel', async ({ page }) => {
  await button(row(page, 'Buy rice'), 'Details').click();
  await expect(page.getByText(/Selected:\s*Buy rice/)).toBeVisible();
  await button(row(page, 'Buy rice'), 'Delete').click();
  await expect(page.getByText(/nothing selected/i)).toBeVisible();
  expect(await titles(page)).toEqual(['Soak beans', 'Wash apples']);
});

// ---------------------------------------------------------------- 4. the title editor
test('Save renames the to-do in the list and in the panel', async ({ page }) => {
  await button(row(page, 'Buy rice'), 'Details').click();
  await expect(titleField(page)).toHaveValue('Buy rice');
  await titleField(page).fill('Buy brown rice');
  await button(page, 'Save').click();
  await expect.poll(() => titles(page)).toEqual(['Buy brown rice', 'Soak beans', 'Wash apples']);
  await expect(page.getByText(/Selected:\s*Buy brown rice/)).toBeVisible();
});

test('typing in Title is a draft: the list does not change until Save', async ({ page }) => {
  await button(row(page, 'Buy rice'), 'Details').click();
  await expect(titleField(page)).toHaveValue('Buy rice');
  await titleField(page).fill('Buy brown rice');
  await expect(titleField(page)).toHaveValue('Buy brown rice');
  expect(await titles(page)).toEqual(['Buy rice', 'Soak beans', 'Wash apples']);
  await expect(page.getByText(/Selected:\s*Buy rice$/)).toBeVisible();
});

test('switching to another to-do resets the draft', async ({ page }) => {
  await button(row(page, 'Buy rice'), 'Details').click();
  await titleField(page).fill('half-typed');
  await button(row(page, 'Wash apples'), 'Details').click();
  await expect(titleField(page)).toHaveValue('Wash apples');
  await button(row(page, 'Buy rice'), 'Details').click();
  await expect(titleField(page)).toHaveValue('Buy rice');
  expect(await titles(page)).toEqual(['Buy rice', 'Soak beans', 'Wash apples']);
});
