# webpack性能优化
* 开发环境优化
* 生产环境优化

## 开发环境性能优化
* 优化打包构建速度
  * HMR
  * source-map
* 优化代码调试
## 生产环境性能优化
* 优化打包构建速度
  * oneOf
  * babel缓存
  * 多进程
  * external（不打包）
  * dll （单独打包某个库）
* 优化代码运行性能
  * 缓存（hash(webpack每次打包都会生成唯一的hash值)-chunckhash（一个chunck恭喜一个hash值）-contenthash（文件内容改变hash改变）)
  * tree-shaking
  * code split
  * 懒加载/预加载
  * pwa（离线访问技术）
 