const path = require('path');

/*
 *  Kopiert fra: https://github.com/DocSpring/craco-less
 *  med noen modifiseringer
 * */

const mapValues = (object, callback) => {
    const O = {};
    for (let key in object) {
        O[key] = callback(object[key]);
    }
    return O;
};

const deepClone = (value) => {
    switch (value.constructor) {
        case Array:
            return value.map(deepClone);
        case Object:
            return mapValues(value, deepClone);
        default:
            return value;
    }
};

const styleRuleByName = (name, module) => {
    return (rule) => {
        if (rule.test) {
            const test = rule.test.toString();

            const includeName = test.includes(name);
            const includeModule = test.includes('module');

            return module ? includeName && includeModule : includeName && !includeModule;
        }

        return false;
    };
};

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

const setupLessConfig = (webpackConfig) => {
    const pathSep = path.sep;

    const createLessRule = ({ baseRule, overrideRule }) => {
        baseRule = deepClone(baseRule);
        let lessRule = {
            ...baseRule,
            ...overrideRule,
            use: [],
        };

        const loaders = baseRule.use;
        loaders.forEach((ruleOrLoader) => {
            let rule;
            if (typeof ruleOrLoader === 'string') {
                rule = {
                    loader: ruleOrLoader,
                    options: {},
                };
            } else {
                rule = ruleOrLoader;
            }

            if (
                (webpackConfig.mode === 'development' || webpackConfig.mode === 'test') &&
                rule.loader.includes(`${pathSep}style-loader${pathSep}`)
            ) {
                lessRule.use.push({
                    loader: rule.loader,
                    options: {
                        ...rule.options,
                    },
                });
            } else if (rule.loader.includes(`${pathSep}css-loader${pathSep}`)) {
                lessRule.use.push({
                    loader: rule.loader,
                    options: {
                        ...rule.options,
                    },
                });
            } else if (rule.loader.includes(`${pathSep}postcss-loader${pathSep}`)) {
                lessRule.use.push({
                    loader: rule.loader,
                    options: {
                        ...rule.options,
                        postcssOptions: {
                            ...rule.options.postcssOptions,
                        },
                    },
                });
            } else if (rule.loader.includes(`${pathSep}resolve-url-loader${pathSep}`)) {
                lessRule.use.push({
                    loader: rule.loader,
                    options: {
                        ...rule.options,
                    },
                });
            } else if (
                webpackConfig.mode === 'production' &&
                rule.loader.includes(`${pathSep}mini-css-extract-plugin${pathSep}`)
            ) {
                lessRule.use.push({
                    loader: rule.loader,
                    options: {
                        ...rule.options,
                    },
                });
            } else if (rule.loader.includes(`${pathSep}sass-loader${pathSep}`)) {
                lessRule.use.push({
                    loader: require.resolve('less-loader'),
                    options: {
                        ...rule.options,
                    },
                });
            } else {
                throw new Error(`Found an unhandled loader in the webpack config: ${rule.loader}`);
            }
        });

        return lessRule;
    };

    const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
    if (!oneOfRule) {
        throw new Error(
            "Can't find a 'oneOf' rule under module.rules in the " + `${webpackConfig.mode} webpack config!`
        );
    }

    const sassRule = oneOfRule.oneOf.find(styleRuleByName('scss|sass', false));
    if (!sassRule) {
        throw new Error(
            "Can't find the webpack rule to match scss/sass files in the " + `${webpackConfig.mode} webpack config!`
        );
    }
    let lessRule = createLessRule({
        baseRule: sassRule,
        overrideRule: {
            test: lessRegex,
            exclude: lessModuleRegex,
        },
    });

    const sassModuleRule = oneOfRule.oneOf.find(styleRuleByName('scss|sass', true));
    if (!sassModuleRule) {
        throw new Error(
            "Can't find the webpack rule to match scss/sass module files in the " +
                `${webpackConfig.mode} webpack config!`
        );
    }
    let lessModuleRule = createLessRule({
        baseRule: sassModuleRule,
        overrideRule: {
            test: lessModuleRegex,
        },
    });

    // https://github.com/facebook/create-react-app/blob/9673858a3715287c40aef9e800c431c7d45c05a2/packages/react-scripts/config/webpack.config.js#L590-L596
    // insert less loader before resource loader
    // https://webpack.js.org/guides/asset-modules/
    const resourceLoaderIndex = oneOfRule.oneOf.findIndex(({ type }) => type === 'asset/resource');

    oneOfRule.oneOf.splice(resourceLoaderIndex, 0, lessRule, lessModuleRule);

    return webpackConfig;
};

module.exports = {
    setupLessConfig,
};
