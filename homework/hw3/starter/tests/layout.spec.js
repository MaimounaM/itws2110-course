// The same checks I run when I mark this. Run them yourself:
//
//     npm install            (once)
//     npx playwright install chromium   (once)
//     npm test
//
// They open index.html in a real browser at three widths and measure what the
// browser actually laid out -- not which classes you typed. Any answer that
// produces the right layout passes, the same way the drills work.
const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');

const PAGE = pathToFileURL(path.join(__dirname, '..', 'index.html')).href;

const PHONE = { width: 375, height: 900 };
const TABLET = { width: 800, height: 900 };
const LAPTOP = { width: 1280, height: 900 };

// Tailwind's browser build writes the CSS after the page loads, so wait for it
// to have done something before measuring.
async function open(page, size) {
  await page.setViewportSize(size);
  await page.goto(PAGE);
  await expect
    .poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor),
          { timeout: 10000 })
    .not.toBe('rgba(0, 0, 0, 0)');
  await page.waitForTimeout(150);
}

async function cols(page, selector) {
  return page.$eval(selector, (el) => {
    const t = getComputedStyle(el).gridTemplateColumns;
    return !t || t === 'none' ? 1 : t.split(' ').length;
  });
}

/* ---------------------------------------------------------------- Task 1 */

test('Task 1: the header is a flex row with the links pushed to the end', async ({ page }) => {
  await open(page, LAPTOP);
  const header = await page.$eval('header', (el) => {
    const cs = getComputedStyle(el);
    return { display: cs.display, justify: cs.justifyContent, align: cs.alignItems };
  });
  expect(header.display, 'header needs display:flex').toBe('flex');
  expect(header.justify, 'push the title and the nav to opposite ends').toBe('space-between');
  expect(header.align, 'line the title and the links up on one middle line').toBe('center');
});

test('Task 1: the nav is its own flex container with a gap', async ({ page }) => {
  await open(page, LAPTOP);
  const nav = await page.$eval('header nav', (el) => {
    const cs = getComputedStyle(el);
    return { display: cs.display, gap: parseFloat(cs.columnGap) || 0 };
  });
  expect(nav.display, 'the nav is a flex container too').toBe('flex');
  expect(nav.gap, 'space the links with gap, not margins').toBeGreaterThan(0);
});

/* ---------------------------------------------------------------- Task 2 */

test('Task 2: one column on a phone', async ({ page }) => {
  await open(page, PHONE);
  expect(await page.$eval('#cards', (el) => getComputedStyle(el).display)).toBe('grid');
  expect(await cols(page, '#cards'), 'at 375 the cards stack into one column').toBe(1);
});

test('Task 2: two columns on a tablet', async ({ page }) => {
  await open(page, TABLET);
  expect(await cols(page, '#cards'), 'at 800 you want two columns (md:)').toBe(2);
});

test('Task 2: three columns on a laptop', async ({ page }) => {
  await open(page, LAPTOP);
  expect(await cols(page, '#cards'), 'at 1280 you want three columns (lg:)').toBe(3);
});

test('Task 2: the cards have a gap between them', async ({ page }) => {
  await open(page, LAPTOP);
  const gap = await page.$eval('#cards', (el) => parseFloat(getComputedStyle(el).columnGap) || 0);
  expect(gap, 'use gap-*, not margins on each card').toBeGreaterThan(0);
});

/* ---------------------------------------------------------------- Task 3 */

test('Task 3: article and sidebar stack on a phone', async ({ page }) => {
  await open(page, PHONE);
  const box = await page.evaluate(() => {
    const a = document.querySelector('#layout article').getBoundingClientRect();
    const s = document.querySelector('#layout aside').getBoundingClientRect();
    return { articleTop: a.top, asideTop: s.top, articleW: a.width, asideW: s.width };
  });
  expect(box.articleTop, 'on a phone the article sits above the sidebar').toBeLessThan(box.asideTop);
  expect(Math.abs(box.articleW - box.asideW),
    'stacked, they should be the same width').toBeLessThan(20);
});

test('Task 3: article and sidebar sit side by side on a laptop, article wider', async ({ page }) => {
  await open(page, LAPTOP);
  const box = await page.evaluate(() => {
    const a = document.querySelector('#layout article').getBoundingClientRect();
    const s = document.querySelector('#layout aside').getBoundingClientRect();
    return { articleTop: a.top, asideTop: s.top, articleW: a.width, asideW: s.width };
  });
  expect(Math.abs(box.articleTop - box.asideTop),
    'side by side means they start on the same line').toBeLessThan(20);
  expect(box.articleW, 'the article should be clearly wider than the sidebar')
    .toBeGreaterThan(box.asideW * 1.5);
});

/* ---------------------------------------------------------------- Task 4 */

// Classes nobody showed you -- the sizing half of flexbox. Task 4 asks you to
// pick one, and this checks two things: that it is there, and that removing it
// actually changes the page. A class that changes nothing is decoration.
const TASK4 = /^(flex-1|flex-auto|flex-initial|flex-none|grow(-\d+)?|shrink(-\d+)?|basis-\S+|flex-wrap|flex-wrap-reverse|flex-nowrap|order-\S+|self-(start|end|center|baseline|stretch|auto))$/;

test('Task 4: a class you taught yourself is present, and it is doing something', async ({ page }) => {
  await open(page, LAPTOP);

  const found = await page.evaluate((src) => {
    const re = new RegExp(src);
    for (const el of document.querySelectorAll('[class]')) {
      for (const c of el.classList) {
        // strip any responsive prefix: md:flex-1 counts
        const bare = c.includes(':') ? c.slice(c.lastIndexOf(':') + 1) : c;
        if (re.test(bare)) return { cls: c, tag: el.tagName.toLowerCase() };
      }
    }
    return null;
  }, TASK4.source);

  expect(found,
    'Task 4: use one of flex-1 / grow / shrink / basis-* / flex-wrap / order-* / self-* somewhere in the page'
  ).not.toBeNull();

  // Measure everything, remove that one class, measure again.
  const moved = await page.evaluate((cls) => {
    const boxes = () => [...document.querySelectorAll('body *')]
      .map((el) => { const r = el.getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; });
    const before = boxes();
    const targets = [...document.querySelectorAll('.' + CSS.escape(cls))];
    targets.forEach((el) => el.classList.remove(cls));
    void document.body.offsetHeight;
    const after = boxes();
    return before.some((b, i) => b.some((v, j) => Math.abs(v - after[i][j]) > 1));
  }, found.cls);

  expect(moved,
    `Task 4: "${found.cls}" is on the page but removing it changes nothing. ` +
    'Put it somewhere it actually does work -- the task is that the page gets worse without it.'
  ).toBe(true);
});

/* ------------------------------------------------------------ the rules */

test('the rules: no stylesheet, no inline styles, no arbitrary values', () => {
  // Read the file you wrote, not the rendered page: Tailwind's browser build
  // injects a <style> block of its own, and that one is not yours to answer for.
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

  const yourStyleBlocks = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)]
    .map((m) => m[1])
    .filter((css) => /[.#a-z][^{}]*\{/i.test(css));
  expect(yourStyleBlocks, 'no <style> block with a selector in it').toHaveLength(0);

  expect(/<[^>]+\sstyle\s*=\s*["']/.test(html), 'no inline style="" attributes').toBe(false);

  const arbitrary = [...html.matchAll(/class="([^"]*)"/g)]
    .flatMap((m) => m[1].split(/\s+/))
    .filter((c) => /\[[^\]]+\]/.test(c));
  expect(arbitrary, `no arbitrary values -- found ${arbitrary.join(', ')}`).toHaveLength(0);
});
