import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['../frontend/src/tests/setup'],
    environment: 'jsdom',
    deps: {
      inline: ['vitest-canvas-mock'],
    },
    // For this config, check https://github.com/vitest-dev/vitest/issues/740
    threads: false,
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
  },
})