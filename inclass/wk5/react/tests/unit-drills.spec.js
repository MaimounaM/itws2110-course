// Instructor check for drills 12–15. No browser: it shells out to Vitest twice and
// checks the two properties the drills depend on — the worked answers pass, and the
// starters do NOT accidentally pass. A starter that is already green teaches nothing,
// which is the same guarantee the "starter N does not satisfy the goal" tests give
// for drills 1–11.
import { test, expect } from '@playwright/test';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, URL } from 'node:url';

const cwd = fileURLToPath(new URL('..', import.meta.url));

function runVitest(script) {
  // shell: true so this also works from a Windows terminal.
  const result = spawnSync('npm', ['run', script], { cwd, shell: true, encoding: 'utf8' });
  return { code: result.status, output: `${result.stdout}${result.stderr}` };
}

test('worked answers for drills 12-15 pass', () => {
  const { code, output } = runVitest('test:unit:answers');
  expect(output).toContain('4 passed');
  expect(code, `vitest answers run failed:\n${output}`).toBe(0);
});

test('drill 12-15 starters begin red, and fail on the answer rather than on the setup', () => {
  const { code, output } = runVitest('test:unit');
  expect(code, 'the starters are already passing — they should start red').not.toBe(0);
  expect(output).toContain('4 failed');

  // Each failure must be an assertion about the component, not a crash: a starter
  // that throws ReferenceError or cannot find an element is a broken drill, not a
  // red one, and the student gets a stack trace instead of a diff.
  for (const bad of ['ReferenceError', 'TypeError', 'SyntaxError', 'Unable to find']) {
    expect(output, `starters should fail on assertions, but output contains ${bad}`)
      .not.toContain(bad);
  }
  // ...and every one of the four must be the one that is red, so a drill cannot be
  // quietly dropped from the starter file.
  for (const title of [
    '12. the heading says Pantry',
    '13. a product shows its name and its freshness',
    '14. clicking twice shows Added 2',
    '15. typing a new name updates the paragraph',
  ]) {
    expect(output, `"${title}" is missing or not failing in the starter file`)
      .toContain(title);
  }
});
