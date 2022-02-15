const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/start.js');

const configFactory = defaults.__get__('configFactory');

function overrideConfig(config) {
    config.plugins.forEach((plugin) => {
        const options = plugin.options;

        if (!options) {
            return;
        }

        if (options.filename && options.filename.endsWith('.css')) {
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

    return config;
}

const fn = (env) => {
    return overrideConfig(configFactory(env));
};

defaults.__set__('configFactory', fn);
