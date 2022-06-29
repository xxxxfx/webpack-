const EsLintWebpackPlugin = require("eslint-webpack-plugin");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
// 单独提取css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// css 压缩
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerSerWebpackPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin"); // 不会解析html文件，需要把public中的文件直接放到dist目录下 使用serve dist启动服务
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { DefinePlugin } = require('webpack');
const getStyleLoader = (pre) => {
  return [
    // 抽离css文件
   isProduction? MiniCssExtractPlugin.loader : 'vue-style-loader',
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
    path:  isProduction ? path.resolve(__dirname, "../dist") : undefined,
    filename: isProduction ? "static/js/[name].[contenthash:10].js" : "static/js/[name].js",
    chunkFilename: isProduction ? "static/js/[name].[contenthash:10].chunk.js" : "static/js/[name].chunk.js",
    // 其它资源
    assetModuleFilename: "static/media/[hash:10][ext][query]",
    clean: true
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
        test: /\.js?$/,
        include: path.resolve(__dirname, '../src'),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
        }
      },
        // 处理vue
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
    isProduction && new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:10].css',
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css"
    }),
    isProduction && new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "../public"), 
        to: path.resolve(__dirname, "../dist"),
        globOptions: {
          ignore: ["**/index.html"],
        },
       },
      ],
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    })

  ].filter(Boolean),
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  optimization: {
    splitChunks: {
      chunks: "all",
    }, 
    runtimeChunk: {
        name: (entrypoint) => `runtime~${entrypoint.name}.js`
    },
    // css 和就是js压缩
    minimize: isProduction,
    minimizer: [
      new CssMinimizerWebpackPlugin(), 
      new TerSerWebpackPlugin(),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  plugins:[        
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                      xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          }
        },
      })
    ]
  },
  resolve: {
    // 自动补全文件名， weboack只能补全js文件名
    extensions: [".vue", ".js",".json"],
    // 路径别名
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  },
  // 命令中加serve才会启动
  devServer: {
    host: 'localhost',
    port: 3001,
    open: true,
    hot: true,
    historyApiFallback: true //解决前端路由返回404的问题
  }
}