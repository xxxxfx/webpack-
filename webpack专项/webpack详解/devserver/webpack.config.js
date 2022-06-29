const { resolve } = require('path');
const TeserWebpackPlugin = require('teser-webpack-plugin');

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
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: {
      // 将当前模块的记录其他模块的hash单独打包为一个文件runtime
      // 解决修改a文件导致b文件的ccontenthash变化
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer: [
      new TeserWebpackPlugin({
        // 开启多进程打包
        parallel: true,
        cache: true,
        // 启动source-map
        sourceMap: true

      })
    ]
      // 配置生产环境的压缩方案: js和css
  
  },
  devServer: {
    watchContentBase: true, // 监视contentBase目录下的所有文件，一旦文件变化就会reload
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/
    },
    // 运行代码的目录
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    port: 5000,
    host: 'localhost',
    // 自动打开浏览器
    open: true,
    // 开启HMR功能
    hot: true,
    // 不要显示服务器的日志信息
    clientLogLevel: 'none',
    quiet: true,// 除了一些基本的启动信息以外，其它内容都不要显示
    overlay: false, //出错不要全屏提示
    // 服务器代理 -- 解决开发环境环境跨域问题
    proxy: {
      // 一旦devserver（5000）服务器接收到/api/xxx的请求，就会吧请求转发到另外一个服务器
      '/api': {
        target: 'http://localhost: 3000',
        pathRwrite: {
          // 发生请求时，请求路径重写： 将/api/xxx ---》 /xxx
          '^/api': ''
        }
      }
    }
  }
}