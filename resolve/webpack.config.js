const path = require('path');

module.exports = {
  resolve: {
    alias: {
      // 使用resolve创建别名
      Utilties: path.resolve(__dirname, './src/utils/'),
      Templates: path.resolve(__dirname, './src/templates/'),
    },
  },
};
