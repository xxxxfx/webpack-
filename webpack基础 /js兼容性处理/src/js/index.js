import hello from './hello';
import test from './testpromise';

hello();
test().then((res) => {
  console.log(res);
})
