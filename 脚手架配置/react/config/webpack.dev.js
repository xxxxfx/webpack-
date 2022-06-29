const EsLintWebpackPlugin = require("eslint-webpack-plugin");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const isDevelopment = process.env.NODE_ENV !== 'production';
// const devMode = process.env.NODE_ENV !== 'production';
// const ReactRefreshWebpackPlugin = require('react-refresh-webpack-plugin');
const getStyleLoader = (pre) => {
  return [
    "style-loader",
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
  entry: "./src/main.js",
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
        test: /\.jsx?$/,
        include: path.resolve(__dirname, '../src'),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          plugins: [
           require.resolve('react-refresh/babel')
          ],
          // plugins: [
          //   "react-refresh/babel"
          // ], // HMR功能
        }
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
    new ReactRefreshPlugin(),
    // new ReactRefreshWebpackPlugin(),

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
    extensions: [".jsx", ".js",".json"]
  },
  devServer: {
    host: 'localhost',
    port: 3001,
    open: true,
    hot: true,
    historyApiFallback: true //解决前端路由返回404的问题
  }
}