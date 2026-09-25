// The same settings pointed at the worked answers. Separate file rather than a flag
// so neither run can accidentally pick up the other's file.
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.js';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setup-tests.js'],
    include: ['src/answers/pantry.test.jsx'],
    restoreMocks: true,
  },
}));
