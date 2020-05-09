// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: 'webpack.config.js',
            },
            alias: {
                map: [
                    ['@', path.resolve(__dirname, 'src')],
                ],
            },
        },
    },
    env: {
        browser: true,
    },
    extends: [
        'plugin:vue/essential',
        'airbnb-base',
    ],
    plugins: [
        'vue',
    ],
    rules: {
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        'linebreak-style': 0,
        'no-new': 1,
        'import/prefer-default-export': 1,
        'global-require': 1,
        'no-param-reassign': 1,
        indent: 'off',
        'vue/no-unused-components': 0,
        'vue/require-component-is': 0,
        'max-len': [
            2,
            {
                ignoreComments: true,
                ignoreUrls: true,
                code: 150,
            },
        ],
    },
};
