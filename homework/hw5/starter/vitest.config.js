// Your own tests (Part 2) run here: npm run test:unit. Reuses vite.config.js so the
// @ alias and the React plugin behave as they do in the browser.
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.js';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setup-tests.js'],
    include: ['src/**/*.test.jsx'],
    restoreMocks: true,
  },
}));
