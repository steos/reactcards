var path = require('path')
var webpack = require('webpack')
module.exports = {
    //devtool: 'source-map',
    context: path.resolve(__dirname),
    entry: [
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './main',
    ],
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "../dist"),
        public: path.resolve(__dirname, "../public"),
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                },
                exclude: [path.resolve('./node_modules'), path.resolve(__dirname, 'node_modules')]
            },
            //{
            //    test: /\.css$/,
            //    loader: "style-loader!css-loader"
            //},
            //{
            //    test: /\.less$/,
            //    loader: "style-loader!css-loader!less-loader"
            //}
        ],
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
