// service worker + cache技术，使得网站在离线状态下也能够使用
/**
 * pwa: 渐进式网络开发引用程序（离线可访问）
 * workbox--》workbox-webpack-plugin
 * 
 */
console.log('index文件被加载');
/**
 * eslint不认识window、navigateor全局变量
 * 解决： 需要修改package.json中eslintConfig配置
 * "env": {
 * "browser: true
 * }
 * 
 * npm i serve -g
 * serve -s build 将build目录下所有资源作为静态资源暴露出去
 */
// 注册serviceworker
// 处理兼容性问题
if('serviceWorker' in navigator) {
  // 全局资源加载好之后注册serviceworker
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
    .then(() => {
      console.log('注册成功')
    })
    .catch(() => {
      console.log('注册失败')
    })
  })
}
