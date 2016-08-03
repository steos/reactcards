#!/usr/bin/env node

process.env.NODE_ENV = 'production';

import webpack from 'webpack'
import express from 'express'
import path from 'path'
import fs from 'fs'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import program from 'commander'
import assign from 'lodash/assign'
import packageConfiguration from '../package.json'
import webpackConfiguration from './webpack.config'

const app = express()
const CONFIG_FILE_NAME = 'config.js'
const WEBPACK_FILE_NAME = 'webpack.config.js'

const createConfiguration = (config, entryFile, configDir) => {

    if (!fs.existsSync(entryFile)) {
        throw new Error(`${CONFIG_FILE_NAME} file "${entryFile}" missing.\n`)
    }

    // add the applications entry file to the webpack configuration
    config.entry.push(path.resolve(entryFile))

    const customWebpack = path.resolve(configDir, WEBPACK_FILE_NAME)
    if (!fs.existsSync(customWebpack)) {
        console.info('No custom webpack configuration found.');
        return config
    }

    // unset config loaders as project specific webpack config has been found.
    config.module.loaders = [];

    const customConfig = require(customWebpack)

    if (typeof customConfig === 'function') {
        return customConfig(config)
    }

    console.info('Loading custom webpack configuration.')

    const { module = {}, plugins = [] } = customConfig

    return assign(customConfig, config, {
        plugins: [...config.plugins, ...plugins],
        module: assign(config.module, module, {
            loaders: [...config.module.loaders, ...module.loaders || []],
        }),
    })
}

// cli arguments
program
    .version(packageConfiguration.version)
    .usage('[options]')
    .option('-p, --port <number>', 'Port to run React Cards', parseInt)
    .option('-e, --entry <file>', 'Entry point for React Cards')
    .option('-c, --configDir <path>', 'Configuration directory for React Cards')
    .parse(process.argv)

// settings
const { port = 8080, entry = './reactcards.js', configDir = '.' } = program

if (!port) {
    console.info(`No port defined. React Cards will run at port ${port}.\n`)
}

const config = createConfiguration(webpackConfiguration, entry, configDir)
const compiler = webpack(config)

const options = {
    hot: true,
    noInfo: true,
    port,
    publicPath: config.output.publicPath,
}

app.use(webpackDevMiddleware(compiler, options))
app.use(webpackHotMiddleware(compiler))

app.get('/', function (req, res) {
    res.send(
`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>React Cards</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div id="mountNode">
        </div>
        <script src="public/app.js"></script>
    </body>
</html>`)
})

app.listen(port);

console.log(`listening on port ${port}`);

process.on('SIGINT', function () {
    process.exit();
});
