/**
 * loader ： 1.下载 2.使用（配置loader）
 * plugins: 1.下载 2.引入 3. 使用
 */
//  const { resolve } = require('path');
const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 module.exports = {
   entry: './src/index.js',
   mode: 'development',
   plugins: [
     new HtmlWebpackPlugin({
       template: './src/index.html'
     })
   ],
   output: {
     filename: '[name].[contenthash].js',
     path: path.resolve(__dirname, 'dist'),
    clean: true,
   },
  //  cache: {
  //    type: 'filesystem',
  //    buildDependencies: {
  //     // 更改配置文件时，重新缓存
  //     config: [__filename]
  //   },
    optimization: {
      // 值为"single"会创建一个在所有生成chunk之间共享的运行时文件
      runtimeChunk: 'single',
      moduleIds: 'deterministic',
    },
}