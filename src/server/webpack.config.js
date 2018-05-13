'use strict';

var path = require('path');
var webpack = require('webpack');
module.exports = {
  //devtool: 'source-map',
  context: path.resolve(__dirname),
  entry: [
    'webpack-hot-middleware/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/public',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react', 'stage-2'],
          plugins: [
            'react-hot-loader/babel',
            'babel-plugin-syntax-trailing-function-commas',
            'babel-plugin-transform-class-properties',
            'babel-plugin-transform-object-rest-spread',
            'babel-plugin-transform-react-constant-elements',
          ],
        },
        exclude: [
          path.resolve('./node_modules'),
          path.resolve(__dirname, 'node_modules'),
        ],
        include: [path.resolve('./'), path.resolve(__dirname, '../src')],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
    ],
  },

  node: {
    fs: 'empty',
  },

  // we need this because of enzyme
  // see https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md
  externals: {
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
};
