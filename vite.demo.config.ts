import { defineConfig } from 'vite';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import { terser } from 'rollup-plugin-terser';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
    plugins: [svgr(), react(), terser(), cssInjectedByJsPlugin()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/dev.tsx'),
            name: 'veientilarbeid',
            formats: ['es'],
            fileName: () => 'demo.bundle.js',
        },
    },
});
