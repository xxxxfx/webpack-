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
  },
  // 解析模块规则
  resolve: { 
    // 配置及膝模块别名: 简写路径 缺点路径没有提示
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    // 配置省略路径的后缀名
    extensions: ['.js', '.json'],
    // 告诉webpack解析模块是去哪个目录
    modules: [ resolve(__dirname, '../../node_modules'),'node_modules']
  }
}