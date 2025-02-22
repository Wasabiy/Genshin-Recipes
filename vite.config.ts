import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/project1',
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
