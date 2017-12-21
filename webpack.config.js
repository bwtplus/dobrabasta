const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [
    './static/js/main.js',
    './static/scss/style.scss'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static/dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'static/scss'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader', 
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }, 
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'static/js'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {
                  browsers: ['last 2 versions']
                },
                modules: false
              }
              ]
            ],
            plugins: ['transform-runtime']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new ExtractTextPlugin("bundle.css"),
    new UglifyJsPlugin({
      sourceMap: true
    })
  ]
};