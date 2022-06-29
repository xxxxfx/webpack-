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
hello();