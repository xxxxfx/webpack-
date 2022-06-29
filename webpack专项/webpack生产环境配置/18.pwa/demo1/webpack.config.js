const { resolve } = require('path');
const path = require('path');
const HtmlWebpackPlugin =require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
process.env.NODE_ENV = 'production';

module.exports= {
  // 单入口   单页面
  entry: './src/js/index.js',
  // 多入口   多页面
  // entry: {
  //   main: './src/js/index.js',
  //   test: './src/js/hello.js'
  // },
  output: {
    // [name]取文件名
    path: resolve(__dirname, 'build'),
    filename: 'js/[name].[contenthash:10].js'
  },
  module: {
    rules: [
       {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env', 
              {
              // 按需加载
            useBuiltIns: 'usage',
            corejs: '3',
            targets: {
              chrome: '60',
              firefox: '60',
              ie: '9',
              safari: '10',
              edge: '17'
            }
          }]
          ],
          cacheDirectory: true // 开启babel缓存，第二次构建=时，会读取之前的缓存
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Caching',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    new ESLintPlugin({
      exclude: 'node_modules',
      fix: true
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      /**
       * 帮助serviceWorker快速启动
       * 删除旧的serviceworker
       * 
       * 生成一个serviceworker配置文件 在入口文件中配置
       * serviceworker需要在服务器中运行
       */
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  devServer: { 
    /** webpack-dev-server全局安装不然在mac上安装不了 */
   static: {
     directory: path.join(__dirname, 'build'),
   },
   compress: true,
   port: 9001,
   open: true,
   hot: true
 },
  // devtool: 'source-map',
  mode: 'production'
}