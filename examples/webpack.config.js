var path = require('path')
module.exports = {
  //devtool: 'source-map',
  context: path.join(__dirname, ""),
  entry: [
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './main',
  ],
  output: {
    filename: "app.js",
    path: path.join(__dirname, "public"),
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel?{presets:["es2015", "react", "stage-2"], plugins:["react-hot-loader/babel"]}'],
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, {
      test: /\.less$/,
      loader: "style-loader!css-loader!less-loader"
    }],
  },

  node: {
    fs: "empty",
  },

  // we need this because of enzyme
  // see https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
};
