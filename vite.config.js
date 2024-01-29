import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { rollupImportMapPlugin } from 'rollup-plugin-import-map';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import terser from '@rollup/plugin-terser';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';
import EnvironmentPlugin from 'vite-plugin-environment';

const getEnvironmentOpts = () => ({
    NODE_ENV: process.env.NODE_ENV || 'development',
    REACT_APP_VERSION_HASH: process.env.REACT_APP_VERSIOM_HASH || '',
    REACT_APP_BUILD_TIMESTAMP: process.env.REACT_APP_BUILD_TIMESTAMP || '',
    REACT_APP_MICRO: process.env.REACT_APP_MICRO || '',
});

const getPlugins = (cssConfig = {}) => {
    return [
        svgr(),
        react(),
        terser(),
        cssInjectedByJsPlugin(cssConfig),
        {
            ...rollupImportMapPlugin([
                {
                    imports: {
                        react: 'https://www.nav.no/tms-min-side-assets/react/18/esm/index.js',
                        'react-dom': 'https://www.nav.no/tms-min-side-assets/react-dom/18/esm/index.js',
                    },
                },
            ]),
            enforce: 'pre',
            apply: 'build',
        },
        EnvironmentPlugin(getEnvironmentOpts()),
    ];
};

const getConfig = () => ({
    plugins: getPlugins(),
    server: {
        port: 3002,
    },
});

const getCdnConfig = () => ({
    plugins: getPlugins({
        jsAssetsFilterFunction(outputChunk) {
            return /[bundle|standard]\./.test(outputChunk.fileName);
        },
    }),
    build: {
        manifest: true,
        copyPublicDir: false,
        rollupOptions: {
            input: {
                bundle: resolve(__dirname, 'src/main.tsx'),
                standard: resolve(__dirname, 'src/main-standard.tsx'),
            },
            preserveEntrySignatures: 'exports-only',
            output: {
                entryFileNames: 'js/aia.[name].[hash].js',
                format: 'esm',
            },
        },
    },
});

const getDemoConfig = () => ({
    plugins: [svgr(), react(), terser(), cssInjectedByJsPlugin(), EnvironmentPlugin(getEnvironmentOpts())],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/dev.tsx'),
            name: 'veientilarbeid',
            formats: ['es'],
            fileName: () => 'demo.bundle.js',
        },
        outDir: 'build',
    },
});

export default defineConfig(({ mode }) => {
    if (mode === 'demo') {
        return getDemoConfig();
    }

    if (mode === 'cdn') {
        return getCdnConfig();
    }

    return getConfig();
});
