console.log('helleeeeo被加载');
const hello = () => {
  console.log('hhhh');
};
// ie浏览器识别不了es6语法， 使用babel-loader
export default hello;