/**
 * HMR hot module replacement/ 热模块替换
 * 作用： 一个模块变化，只会重新打包这一个模块（不是打包所有 ）
 * 样式文件： 可以使用hmr功能， style-loader内部实现
 * js默认没有hmr功能（修改js代码，添加支持hmr功能的代码）
 * html文件不能够热更新: 解决 修改entry入口文件引入修改html还是会重新刷新（不需要hmr）
 */
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
  entry: ['./src/js/index.js', './src/index.html'],
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
        type:"asset",
        //解析
        parser: {
          //转base64的条件
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          }
        },
        generator:{ 
          //与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
          filename:'img/[name].[hash:6][ext]',
          //打包后对资源的引入，文件命名已经有/img了
          publicPath:'./'
        },
    }, 
    {
      // 让html-loader对html文件先进行字符串处理然后交给asset资源模块或者url-loader进行图片资源处理
      test: /\.(html)$/,
      use: ['html-loader']
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
    new ESLintPlugin({
      exclude: 'node_modules',
      fix: true
    })
  ],
  devServer: { 
    /** webpack-dev-server全局安装不然在mac上安装不了 */
   static: {
     directory: path.join(__dirname, 'build'),
   },
   compress: true,
   port: 9000,
   open: true,
   hot: true
 },
  devtool: 'inline-source-map',
  mode: 'production'
}