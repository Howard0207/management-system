const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');
const webpackBase = require('./webpack.config.base');

const webpackProd = {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserJSPlugin({
                cache: true,
                parallel: true,
                extractComments: false,
                exclude: /\/node_modules/,
            }),
            new OptimizeCSSAssetsPlugin(),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '_',
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendor: {
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    minSize: 0,
                    minChunks: 1,
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'initial',
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        new CompressionPlugin({
            compressionOptions: {
                numiterations: 20,
            },
            algorithm(input, compressionOptions, callback) {
                return zopfli.gzip(input, compressionOptions, callback);
            },
        }),
    ],
};

module.exports = merge(webpackProd, webpackBase);
