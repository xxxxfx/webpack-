/**
 * loader ： 1.下载 2.使用（配置loader）
 * plugins: 1.下载 2.引入 3. 使用
 * add-asset-html-webpack plugin
 */
const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // loader配置
    ]
  },
  plugins: [
    // plugin 配置
    // html-webpack-plugin
    // 功能： 默认创建一个空的HTML文件， 引入打包输出所有资源（JS/css）
    // 需求： 需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制‘./sr/index.html'文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html'
    }),
    new webpack.DllReferencePlugin({ // 告诉webpack哪些库不参与打包，同时使用时的名称也要改变
      manifest: resolve(__dirname, 'dll/mainfest.json')
    }),
    // 将某个文件打包输出，并在html中自动引入改资源
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js'),
      publicPath: './'
    })
  ],
  mode: 'production'
  // externals: {
  //   // 拒绝jQuery被打包进来然后使用cdn链接引入， 

  //   jquery: 'jQuery'
  // }
}