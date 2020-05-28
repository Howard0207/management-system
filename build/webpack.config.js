const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../App.jsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
  },

  devServer: {
    contentBase: '../dist',
    port: '8080',
    host: 'localhost',
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(le|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: 'url-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      scriptLoading: 'defer',
      hash: true,
      inject: 'body',
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../_dll_vendors', 'manifest.json'),
    }),
    new AddAssetHtmlPlugin({ filepath: require.resolve(path.resolve(__dirname, '../_dll_vendors/_dll_react.js')) }),
  ],
  resolve: {
    alias: {
      _components: path.resolve(__dirname, '../components'),
      _consts: path.resolve(__dirname, '../consts'),
      _less: path.resolve(__dirname, '../less'),
      _utils: path.resolve(__dirname, '../utils'),
    },
    extensions: ['.jsx', '.js', '.less', '.css'],
  },
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
};
