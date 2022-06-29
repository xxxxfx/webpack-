// 说明，css兼容性处理post-css  ——》在package.json中设置browserlist，对应设置生产环境和开发环境development环境,如果使用开发环境配置
// 需要 process.env.NODE_ENV = 'production'
// css使用style-loader转换成js，所以使用插件替代style-loader,提取出单独文件
// 需要对css进行压缩

// js 文件 需要进行语法检查

// js 兼容性处理 babel-loader 
// 按需加载 useBuiltIns corejs

// 图片处理

// html处理
// 其它文件处理 file-loader
import '../css/index.less';
import hello  from './hello';
function sum (...args) {
  const _sum = args.reduce((p, c) => p + c, 0)
  console.log('总和：', _sum);
}
hello();
sum(1, 2, 3, 4);
if (module.hot) {
  module.hot.accept('./hello.js', function() {
    // 当hello.js发生变化 其它模块就不会重新打包
    console.log('Accepting the updated printMe module!');
    hello();
  })
}