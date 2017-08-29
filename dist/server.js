#!/usr/bin/env node
'use strict';

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _webpack3 = require('./webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

process.env.NODE_ENV = 'production';

var app = (0, _express2.default)();

var createConfiguration = function createConfiguration(config, entryFile, customWebpackConfig) {

    if (!_fs2.default.existsSync(entryFile)) {
        throw new Error('React Cards entry file "' + entryFile + '" missing.\n');
    }

    // add the applications entry file to the webpack configuration
    config.entry.push(_path2.default.resolve(entryFile));

    if (!customWebpackConfig || !_path2.default.resolve(customWebpackConfig)) {
        console.info('No custom webpack configuration found.');
        return config;
    }

    // unset config loaders as project specific webpack config has been found.
    config.module.loaders = [];

    var customConfig = require(_path2.default.resolve(customWebpackConfig));

    if (typeof customConfig === 'function') {
        return customConfig(config);
    }

    console.info('Loading custom webpack configuration.');

    var _customConfig$module = customConfig.module,
        module = _customConfig$module === undefined ? {} : _customConfig$module,
        _customConfig$plugins = customConfig.plugins,
        plugins = _customConfig$plugins === undefined ? [] : _customConfig$plugins;


    return (0, _assign2.default)(customConfig, config, {
        plugins: [].concat(_toConsumableArray(config.plugins), _toConsumableArray(plugins)),
        module: (0, _assign2.default)(config.module, module, {
            loaders: [].concat(_toConsumableArray(config.module.loaders), _toConsumableArray(module.loaders || []))
        })
    });
};

// cli arguments
_commander2.default.version(_package2.default.version).usage('[options]').option('-p, --port <number>', 'Port to run React Cards', parseInt).option('-e, --entry <file>', 'Entry point for React Cards').option('-c, --conf <file>', 'Custom Webpack config file').parse(process.argv);

// settings
var _program$port = _commander2.default.port,
    port = _program$port === undefined ? 8080 : _program$port,
    _program$entry = _commander2.default.entry,
    entry = _program$entry === undefined ? './reactcards.js' : _program$entry,
    conf = _commander2.default.conf;


if (!port) {
    console.info('No port defined. React Cards will run at port ' + port + '.\n');
}

var config = createConfiguration(_webpack4.default, entry, conf);
var compiler = (0, _webpack2.default)(config);

var options = {
    hot: true,
    noInfo: true,
    port: port,
    publicPath: config.output.publicPath
};

app.use((0, _webpackDevMiddleware2.default)(compiler, options));
app.use((0, _webpackHotMiddleware2.default)(compiler));

app.get('/', function (req, res) {
    res.send('<!DOCTYPE html>\n<html lang="en">\n    <head>\n        <meta charset="utf-8">\n        <meta http-equiv="X-UA-Compatible" content="IE=edge">\n        <title>React Cards</title>\n        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    </head>\n    <body>\n        <div id="mountNode">\n        </div>\n        <script src="public/app.js"></script>\n    </body>\n</html>');
});

app.listen(port);

console.log('listening on port ' + port);

process.on('SIGINT', function () {
    process.exit();
});