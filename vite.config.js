import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          // this is required for the SCSS modules
          find: /^~(.*)$/,
          replacement: '$1',
        }
      ]
    }
  };
});