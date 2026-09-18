// The tests open index.html straight off disk — no server, no build step.
module.exports = {
  testDir: './tests',
  reporter: [['list']],
  workers: 1,
  timeout: 20000,
  use: { browserName: 'chromium' },
};
