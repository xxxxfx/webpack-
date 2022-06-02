console.log('hello文件被加载');
export const hello = () => {
  console.log('hhhh');
};
export const mul = (a, b) => {
  console.log(a * b)
}
// ie浏览器识别不了es6语法， 使用babel-loader