var path = require('path')
module.exports = {
    devtool: 'source-map',
    context: path.join(__dirname, "src"),
    entry: [
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './main'
    ],
    output: {
        filename: "app.js",
        path: path.join(__dirname, "public")
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel?{presets:["es2015", "react", "stage-2"], plugins:["react-hot-loader/babel"]}']
            }
        ]
    },

    node: {
      fs: "empty"
    }
};
