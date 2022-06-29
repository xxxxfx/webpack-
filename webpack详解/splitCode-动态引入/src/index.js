// import _ from 'lodash';
// console.log('入口', _)
// function getComponent() {
//   return import('lodash')
//     .then(({ default: _ }) => {
//       const element = document.createElement('div');

//       // eslint-disable-next-line @lwc/lwc/no-inner-html
//       element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//       return element;
//     })
//     // eslint-disable-next-line no-unused-vars
//     .catch((error) => 'An error occurred while loading the component');
// }

// 结合async函数一起使用
async function getComponent() {
  const { default: _ } = await import('lodash');
  const element = document.createElement('div');
  // eslint-disable-next-line @lwc/lwc/no-inner-html
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}
getComponent().then((component) => {
  document.body.appendChild(component);
});