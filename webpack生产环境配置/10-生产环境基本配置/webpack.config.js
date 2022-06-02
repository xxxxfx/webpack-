const { resolve } = require('path');
const path = require('path');
const HtmlWebpackPlugin =require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const loader = require('css-loader');
process.env.NODE_ENV = 'production';
const commonCSSUse = [
  MiniCssExtractPlugin.loader,
  'css-loader',
 {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          [
            'postcss-preset-env',
            {
              // 其他选项
            },
          ],
        ]
      }
    }
  }
]

module.exports= {
  entry: './src/js/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'js/built.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCSSUse]
      }, {
        test: /\.less$/,
        use: [
          ...commonCSSUse,
          'less-loader'
        ]
      },
       {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          "presets": [
            ["@babel/preset-env", {
              // 按需加载
            "useBuiltIns": "usage",
            "corejs": "3",
            "targets": {
              "chrome": "60",
              "firefox": "60",
              "ie": "9",
              "safari": "10",
              "edge": "17"
            }
          }]
          ]
        }
      }, 
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 6 * 1024,
            name: '[hash:10].[ext]',
            // 禁用es6模块化语法
            esModule: false
          }
        },
    }, 
    {
      test: /\.(html)$/,
      use: ['html-withimg-loader']
    }, {
      exclude: /\.(js|css|less|png|jpg|jpeg|gif|html)/,
      loader: 'file-loader',
      options: {
        outputPath: 'media'
      }
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    }),
    // new ESLintPlugin({
    //   exclude: 'node_modules',
    //   fix: true
    // })
  ],
  devServer: { 
    /** webpack-dev-server全局安装不然在mac上安装不了 */
   static: {
     directory: path.join(__dirname, 'build'),
   },
   compress: true,
   port: 9000,
   open: true,
 },
  devtool: 'inline-source-map',
  mode: 'production'
}