const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      /**
       * js兼容性处理： babel-loader,
       * @babel/core  @babel/preset-env, 指示babel做怎么样的兼容性处理
       * 1.基本的js兼容性处理  @babel/preset-env
       * 2. 全部的js兼容性处理   @babel/polyfill
       * 问题： 只要解决部分兼容性处理，但是将所有兼容性代码全部引入，体积太大
       * 3.按需兼容：按需加载——》 core-js
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          "presets": [
            ["@babel/preset-env", {
            "useBuiltIns": "usage",
            "corejs": "3",
            "targets": {
              "chrome": "60",
              "firefox": "60",
              "ie": "9",
              "safari": "10",
              "edge": "17"
            }
          }]
          ]
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
};
