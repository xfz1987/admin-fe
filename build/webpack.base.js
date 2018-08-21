const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: [resolve(__dirname, '../src/app.js')]
  },
  resolve: {
    alias : {
        page        : resolve(__dirname, '../src/page'),
        component   : resolve(__dirname, '../src/component'),
        util        : resolve(__dirname, '../src/util'),
        service     : resolve(__dirname, '../src/service')
    }
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|otf|eot|ttf|svg|gif)$/,
        use:[{
          loader: 'url-loader',
          options:{
            limit: 8192,
            name: 'resource/[name].[ext]'
          }
        }]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    })
  ]
}