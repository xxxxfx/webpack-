const { resolve } = require('path');
const path = require('path');
const HtmlWebpackPlugin =require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
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
    filename: 'js/[name].js'
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
    })
  ],
  // 将node——modules中的代码单独打包成一个chunck最终输出
  // 自动分析多入口chunk中，有没有公共的文件，如果有会打包成单独的一个chunk（多入口）
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
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