const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./webpack.base.js')

const devConfig = {
  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/(node_modules)/',
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use:[
          {
            loader: 'url-loader',
            options:{
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, '../src/index.html')
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: resolve(__dirname, '../dist'),
    port: 8899,
    watchContentBase: true,
    historyApiFallback: true,
    open: true,
    hot: true,
    inline: true,
    overlay: {
      errors: true
    },
    proxy : {
      '/manage' : {
          target: 'http://admintest.happymmall.com',
          changeOrigin : true
      },
      '/user/logout.do' : {
          target: 'http://admintest.happymmall.com',
          changeOrigin : true
      }
    }
  }
}

module.exports = merge(config, devConfig)