const EsLintWebpackPlugin = require("eslint-webpack-plugin");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';
// const devMode = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerSerWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin'); // 压缩本地静态文件
const CopyPlugin = require("copy-webpack-plugin"); // 不会解析html文件，需要把public中的文件直接放到dist目录下 使用serve dist启动服务
// const ReactRefreshWebpackPlugin = require('react-refresh-webpack-plugin');
const getStyleLoader = (pre) => {
  return [
    // 抽离css文件
    isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
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
    path: isDevelopment ? undefined : path.resolve(__dirname, "../dist"),
    filename: isDevelopment ? "static/js/[name].js" : "static/js/[name].[contenthasn:10]js",
    chunkFilename: "static/js/[name].chunk.js",
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
        test: /\.jsx?$/,
        include: path.resolve(__dirname, '../src'),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          plugins: [ isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
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
      // filename: 'entry1.html', 
      template: path.resolve(__dirname, "../public/index.html")
    }),
    isDevelopment && new ReactRefreshPlugin(),
    !isDevelopment && new MiniCssExtractPlugin({
      filename: 'static/css/[name].[content:10].css',
      chunkFilename: "static/css/[name].[content:10].chunk.css"
    }),
    !isDevelopment && new CopyPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, "../public"), 
          to: path.resolve(__dirname, "../dist"),
          globOptions: {
            ignore: [
              "**/index.html"
            ],
          },
       },
      ],
    }),
    // new ReactRefreshWebpackPlugin(),

  ].filter(Boolean),
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'cheap-module-source-map':  'source-map',
  optimization: {
    splitChunks: {
      chunks: "all",
    }, 
    runtimeChunk: {
        name: (entrypoint) => `runtime~${entrypoint.name}.js`
    },
    // css 和就是js压缩
    minimize: !isDevelopment,
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
    extensions: [".jsx", ".js",".json"]
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