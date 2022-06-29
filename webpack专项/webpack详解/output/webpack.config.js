const { resolve } = require('path');

module.exports= {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build'),
    publicPath: '/', // 所有资源引入公共路径前缀 --》 ‘imgs/a.jpg' --》 ‘/img/a.jpg’
    chunkFilename: 'js/[name]_chunk.js', //非入口chunk的名称
    library: '[name]', //整个库向外暴露的变量名
    librayrarget: 'window', //变量名添加到哪个browser
    // librayrarget: 'global' //变量名添加到哪个node上
  }
}