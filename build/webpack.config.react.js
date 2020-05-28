const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');

module.exports = {
    mode: 'development',
    entry: {
        react: ['react', 'react-router-dom'],
    },
    output: {
        filename: '_dll_[name].js', // 产生的文件名
        path: path.resolve(__dirname, '../_dll_vendors'),
        library: '_dll_[name]',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            // name === library
            name: '_dll_[name]',
            path: path.resolve(__dirname, '../_dll_vendors', 'manifest.json'),
        }),
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
