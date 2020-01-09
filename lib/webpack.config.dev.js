const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const common = require('./webpack.common.js');
const ROOT_DIR = path.resolve(__dirname, '../');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
module.exports = merge(common, {
    mode: 'development', //
    devtool: 'eval',
    entry: [
        require.resolve('react-dev-utils/webpackHotDevClient'),
    ],
    output: {
        path: DIST_DIR,
        publicPath: '/dist/',
        filename: 'fric.js',
    },
    module: {
        rules: []
    },
    plugins: [
        new ProgressBarPlugin({
            format: 'Build [:bar] :percent (:elapsed seconds)',
            clear: false,
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
});