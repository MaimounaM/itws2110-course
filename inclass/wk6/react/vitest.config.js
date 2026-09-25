// Drills 5–8 run here. Reuses vite.config.js so the @ alias and the React plugin
// behave exactly as they do in the browser; only the test settings are added.
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.js';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // There is no browser here. jsdom is a DOM implemented in Node, which is why
    // these run in a fraction of a second while the Playwright suite takes seconds.
    environment: 'jsdom',
    setupFiles: ['./src/setup-tests.js'],
    include: ['src/pantry.test.jsx'],
    restoreMocks: true,
  },
}));
