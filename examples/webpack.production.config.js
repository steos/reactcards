var path = require('path')
module.exports = {
  context: path.join(__dirname, ''),
  entry: [
    './main'
  ],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist')
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel?{presets:["es2015", "react", "stage-2"], plugins:["react-hot-loader/babel"]}']
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.(gif|jpg|jpeg|png)(\?]?.*)?$/,
      loader: 'url-loader?limit=1024'
    }, {
      test: /\.json$/,
      loader: 'json',
      exclude: /node_modules/
    }]
  },

  node: {
    fs: 'empty'
  },

  // we need this because of enzyme
  // see https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};
