const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
// const webpack = require('webpack');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      /**
       * 语法检查： eslint-loader eslint
       * 注意： 只检查源代码，第三方库布检查
       * 设置检查规则：
       * package.json中eslintConfig中设置_
       * "eslintConfig": {
       * "extends": "airbnd-base"
       * }
       * airbnb eslint-config-airbnb-base-> eslint eslint-plugin-import
       */
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: {
      //     fixed: true
      //   }
      // }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new ESLintPlugin({
      exclude: 'node_modules',
      fix: true,
      extensions: 'js',
    }),
  ],
  mode: 'development',
};
