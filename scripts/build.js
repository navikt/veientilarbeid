const rewire = require('rewire');

const defaults = rewire('react-scripts/scripts/build.js');

const config = defaults.__get__('config');

config.plugins.forEach((plugin) => {
    const options = plugin.options;

    if (!options) {
        return;
    }

    if (options.filename && options.filename.endsWith('.css')) {
        /*  Vi overskriver følgende funksjon:
            options.moduleFilename = () => options.filename || DEFAULT_FILENAME
            Tidligere overskrev vi options.filname fra
            options.filename = "static/css/[name].[contenthash8].css" til
            options.filename = "static/css/[name].css",
            men ved oppgradering av craco og reactscripts fra hhv. 3.5.0 til 5.5.0 og 2.1.8 til 3.2.0
            fungerte ikke dette lenger. Breaking changes eller bug i react-scripts eller craco?
         */
        options.moduleFilename = () => 'static/css/[name].css';
        options.filename = 'static/css/[name].css';
        options.chunkFilename = 'static/css/[name].chunk.css';
    }
});
config.optimization = {
    ...config.optimization,
    splitChunks: {
        cacheGroups: {
            default: false,
            vendors: false,
        },
    },
    runtimeChunk: false,
};
config.output.filename = 'static/js/[name].js';
