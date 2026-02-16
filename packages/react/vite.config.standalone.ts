import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Standalone version with React bundled in
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': JSON.stringify({}),
  },
  build: {
    emptyOutDir: false, // Don't clear dist folder
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PineUI',
      formats: ['umd'],
      fileName: () => 'pineui.standalone.js',
    },
    rollupOptions: {
      // Don't externalize React - bundle it in!
      external: [],
      output: {
        globals: {},
      },
    },
    minify: 'esbuild', // Use esbuild minification (built-in)
  },
});
