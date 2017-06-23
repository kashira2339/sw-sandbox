/**
 * yarn add node-sass url-loader css-loader sass-loader style-loader babel-loader babel-core babel-preset-env webpack webpack-dev-server --dev
 */

const distDir = 'assets'
const srcDir = 'src'

const path = require('path')
const webpack = require('webpack');

module.exports = {
  entry: {
    'app.js':    path.resolve(__dirname, `${srcDir}/entry.js`),
    'sw.js':     path.resolve(__dirname, `${srcDir}/sw.js`),
    'style.css': path.resolve(__dirname, `${srcDir}/entry.scss`)
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, distDir),
    publicPath: `/${distDir}/`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'cheap-eval-source-map',
  devServer: {
    hot: true,
    contentBase: __dirname
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ 'babel-loader' ]
      },
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
};
