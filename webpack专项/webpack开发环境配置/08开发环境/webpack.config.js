/**
 * 开发环境
 */
const { resolve } = require('path');
const HttpWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports= {
  entry: './src/index.js',
  output: {
    filename: 'js/bundle.js',
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // {
      //   test: /\.less$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'less-loader'
      //   ]
      // },
      {
        test: /\.css$/,
        use: [
          // 将 CSS 提取到单独的文件中
          MiniCssExtractPlugin.loader,
          'css-loader',
          // css兼容性
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env'
                  ]
                ]
              }
            }
          }
        ],
        
      },
      {
        test: /\.(gif|jpe*g|png)/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024
        }
      },
      {
        //处理其他资源
        exclude: /\.(html|css|less|gif|jpe*g|png)/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]'
        }

      }
    ]
  },
  plugins: [
    new HttpWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/build.css'
    })
  ],
  // devServer: {
  //   contentBase:resolve(__dirname, 'build'),
  //   compress: true,
  //   port: 3000,
  //   open: true
  // },
  mode: 'development'
}