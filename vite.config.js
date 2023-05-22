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
          find: "actions",
          replacement: "/src/actions"
        },
        {
          find: "common",
          replacement: "/src/common"
        },
        {
          find: "components",
          replacement: "/src/components"
        },
        {
          find: "reducers",
          replacement: "/src/reducers"
        },
        {
          find: "scss",
          replacement: "/src/scss"
        },
        {
          find: "selectors",
          replacement: "/src/selectors"
        },
        {
          find: "store",
          replacement: "/src/store"
        },
        {
          // this is required for the SCSS modules
          find: /^~(.*)$/,
          replacement: '$1',
        }, 
      ]
    }
  };
});