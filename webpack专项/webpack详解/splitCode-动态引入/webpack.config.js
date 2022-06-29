const { resolve } = require('path');
module.exports= {
  // 多个入口
  entry: {
    index: './src/index.js',
    // another: './src/another-module.js'
  },
  // entry: {
  //   index: {
  //     import: './src/index.js',
  //     dependOn: 'shared'
  //   },
  //   another:{
  //     import: './src/another-module.js',
  //     dependOn: 'shared'
  //   },
  //   shared: 'lodash',
  // },
  // dependOn在多个chunk之间共享模块
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname,'dist'),
    // 打包前将path目录清空
    clean: true
  },
  // 插件可以将公共的依赖模块已有的入口 chunk 中，或者提取到一个新生成的 chunk
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
  mode: 'development'
}