// Photograph every page under public/ at three widths. No test, no assertion:
// just "what does this look like on a phone?" without owning a phone.
//
//   docker compose run --rm shots
//
// Add ?page=3-tailwind to photograph one version only:
//   docker compose run --rm shots node shots/screenshot.js 3-tailwind
const { chromium } = require('@playwright/test');
const fs = require('fs');

const WIDTHS = { phone: 375, tablet: 768, desktop: 1280 };
const only = process.argv[2];
const pages = fs.readdirSync('/app/public', { withFileTypes: true })
  .filter((d) => d.isDirectory() && (!only || d.name === only))
  .map((d) => d.name)
  .sort();

(async () => {
  const browser = await chromium.launch();
  for (const page of pages) {
    for (const [label, width] of Object.entries(WIDTHS)) {
      const tab = await browser.newPage({ viewport: { width, height: 800 } });
      await tab.goto(`http://localhost/${page}/`);
      await tab.waitForLoadState('networkidle');   // CDN stylesheets, if any
      const file = `/app/shots/${page}-${label}.png`;
      await tab.screenshot({ path: file, fullPage: true });
      console.log(`${page.padEnd(14)} ${label.padEnd(8)} ${width}px  -> shots/${page}-${label}.png`);
      await tab.close();
    }
  }
  await browser.close();
})();
