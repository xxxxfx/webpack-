//webpack.config.js
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// require('server')
//设置node环境变量，默认是生产环境production
process.env.NODE_ENV = "development";
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "js/bundle.js",
    path: resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [

          MiniCssExtractPlugin.loader,
          //将css转化为js
          "css-loader",

          //使用postcss-loader
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: () => [
                  //帮助css找到package.json中的browserslist里面的配置，通过加载指定的css样式
                  require("postcss-preset-env")(),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      //对打包后css重命名，并将之放入一个文件
      filename: "css/built.css",
    }),
  ],
  // devServer: {
  //   contentBase:resolve(__dirname, 'dist'),
  //   compress: true,
  //   port: 3000,
  //   open: true
  // },
  mode: "development",
};

