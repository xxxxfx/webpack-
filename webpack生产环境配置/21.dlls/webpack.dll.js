// const { resolve } = require('core-js/fn/promise');

/**
 * 使用dll技术，对某些库（第三方库：jquery、react、vue。。）进行单独打包 避免重复打包
 *  当你运行webpack时，默认查找的是webpack.config.js配置文件
 * 需求：
 * 需要运行webpack.dll.js
 * webpack --config webpack.dll.js
 */
const { resolve } = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    // 最终打包生成的【name】 ---》 jquery
    // ['jquery'] ---》 打包的库是jquery
    jquery: ['jquery']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]', // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名称
      path: resolve(__dirname, 'dll/mainfest.json') // 输出到文件路径
    }
    )
  ],
  mode: 'production'
}