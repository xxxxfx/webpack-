const EsLintWebpackPlugin = require("eslint-webpack-plugin");
const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')


const getStyleLoader = (pre) => {
  return [
    "vue-style-loader",
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        }
      }
    },
    pre
  ].filter(Boolean);
}
module.exports={
  entry: "../src/main.js",
  output: {
    path: undefined,
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js",
    // 其它资源
    assetModuleFilename: "static/media/[hash:10][ext][query]"
  },
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: getStyleLoader()
      },
      {
        test: /\.less$/,
        use:getStyleLoader("less-loader")
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoader("sass-loader")
      },
      {
        test: /\.styl$/,
        use: getStyleLoader("stylus-loader")
      }, 
      {
        test: /\.(jpe?g|png|gif|webp|svg)/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 少于10kb转换为base64
          }
        }
      },
      {
        // 处理其他资源
        test: /\.(woff2?|ttf)/,
        type: "asset/resource"
      },
      // 处理js
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
        }
      },
        // ... 其它规则
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
    ]
  },
  plugins: [
    new EsLintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html")
    }),
    new VueLoaderPlugin(),
    // cross-env 定义的环境变了是给打包工具使用
    // DefinePlugin定义的环境变量是给源代码使用，从而解诀vue3页面警告的问题
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    })

  ],
  mode: 'development',
  devtool: 'cheap-module-source-map',
  optimization: {
    splitChunks: {
      chunks: "all",
    }, 
    runtimeChunk: {
        name: (entrypoint) => `runtime~${entrypoint.name}.js`
      }
  },
  resolve: {
    // 自动补全文件名， weboack只能补全js文件名
    extensions: [".vue", ".js",".json"]
  },
  devServer: {
    host: 'localhost',
    port: 3001,
    open: true,
    hot: true,
    historyApiFallback: true //解决前端路由返回404的问题
  }
}