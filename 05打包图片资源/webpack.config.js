const { resolve } = require('path');
const { output } = require('../04打包html资源/webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        // 多个loader使用use数组， 一个loader 使用loader
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }, {
        // 问题： 处理不了html中的img图片
        test: /\.(jpg|png|gif)$/,
        // 使用一个loader
        // 下载url-loader file-loader
        loader: 'url-loader',
        options: {
          // 图片大小小于8kb，就会被base64(8-16kb的小图片)处理，
          // 优点： 减少请求数量
          // 缺点： 图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          esModule: false,
          // [hash:10]取图片的hash前10位
          //【.ext]取图片原来的扩展名
          name: '[hash:10].[ext]'
        }
      },
      {
        test: /\.html$/,
        //处理html文件的img图片（负责引入img，cinger能被url-loader进行处理）
        // 问题： 因为url-loader默认使用es6模块化解析，而html-loader引入图片是commomjs
        // 解析时会出现问题 【object module】
        // 解决： 关闭url-loader的es6模块化， 使用commonjs解析
        loader: 'html-loader'

      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}