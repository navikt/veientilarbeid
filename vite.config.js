import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { rollupImportMapPlugin } from 'rollup-plugin-import-map';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { terser } from 'rollup-plugin-terser';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';

const config = {
    plugins: [
        svgr(),
        react(),
        terser(),
        cssInjectedByJsPlugin(),
        {
            ...rollupImportMapPlugin([
                {
                    imports: {
                        react: 'https://min-side-assets.intern.nav.no/react/17/esm/index.js',
                        'react-dom': 'https://min-side-assets.intern.nav.no/react-dom/17/esm/index.js',
                    },
                },
            ]),
            enforce: 'pre',
            apply: 'build',
        },
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.tsx'),
            name: 'veientilarbeid',
            formats: ['es'],
            fileName: () => `bundle.js`,
        },
    },
    server: {
        port: 3002,
    },
};

const demoConfig = {
    plugins: [svgr(), react(), terser(), cssInjectedByJsPlugin()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/dev.tsx'),
            name: 'veientilarbeid',
            formats: ['es'],
            fileName: () => 'demo.bundle.js',
        },
    },
};

export default defineConfig(({ command, mode }) => {
    if (command === 'build') {
        if (mode === 'demo') {
            return demoConfig;
        }

        return config;
    }

    return {
        ...config,
        define: {
            'process.env': process.env,
        },
    };
});
