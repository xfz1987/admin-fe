const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HappyPack = require('happypack')
const config = require('./webpack.base.js')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: 4 })
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const publicPath = '//127.0.0.1:8000/'

const prodConfig = {
  output: {
    path: resolve(__dirname, '../dist'), 
    publicPath: publicPath,
    filename: 'js/[name].[chunkhash:5].js'
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/(node_modules)/',
        use: ['happypack/loader?id=happybabel']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['happypack/loader?id=happycss'],
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use:[
          {
            loader: 'url-loader',
            options:{
              limit: 8192,
              name: 'resource/[name].[hash:5].[ext]',
              publicPath: publicPath
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HappyPack({
      id:"happybabel",
      loaders:['babel-loader?cacheDirectory'],
      threadPool:happyThreadPool,
      cache:true,
      verbose:true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module){
          return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.NamedChunksPlugin(),
    new HappyPack({
      id: 'happycss',
      loaders: [
        {loader: 'css-loader',options:{minimize: true}},
        {loader: 'sass-loader'}
      ],
      threadPool: happyThreadPool,
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[hash:5].css',
      allChunks: true
    }),
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS 的参数
      uglifyJS: {
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false,
        },
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        }
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, '../src/index.html'),
      title: '后台管理系统',
      favicon: resolve(__dirname, '../favicon.ico'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      }
    }),
    new BundleAnalyzerPlugin({ analyzerPort: 3011 })
  ]
}

module.exports = merge(config, prodConfig)