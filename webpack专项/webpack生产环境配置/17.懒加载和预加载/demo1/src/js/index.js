console.log('index文件被加载');
// import  {hello}  from './hello';
// function sum (...args) {
//   const _sum = args.reduce((p, c) => p + c, 0)
//   console.log('总和：', _sum);

// }
// eslint-disable-next-line @lwc/lwc/no-document-query
document.getElementById('btn').onclick = function() {
  /**
   * 懒加载 当文件需要时才加载
   * 预加载prefetch： 在使用之前，提前加载js文件（存在兼容性问题）
   * 正常加载是并行的加载的（同一时间加载多个 预加载prefetch： 等所有资源加载，在偷偷加载
   */
  import(/* webpackChunkName: 'test', webpackPrefetch: true*/'./hello.js').then(({ hello }) => {
    hello();
  })
}

// sum(1, 2, 3, 4);