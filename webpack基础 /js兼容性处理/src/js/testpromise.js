function test() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('哈哈哈哈哈');
      resolve('success')
    }, 2000)
  })
}
export default test;