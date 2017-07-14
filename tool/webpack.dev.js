// 服务器
var express = require('express')
// webpack
var webpack = require('webpack')
var path = require('path')
var opn = require('opn')
var config = require('./config')

var webpackConfig = require('./webpackConfig')
var compiler = webpack(webpackConfig)

var app = express()

/*
 webpack-dev-middleware path,opn,html-webpack-plugin-after-emit,connect-history-api-fallback
 var connection = require('mysql').createPool({
 host: '127.0.0.1',
 user: 'root',
 password: '',
 database: 'msg',
 port: '3306'
 });
 */

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    // 导出的文件地址
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    // 当该编译被创建后
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // html-webpack-plugin执行完毕后
        hotMiddleware.publish({
            action: 'reload' // 重启热加载
        })
        cb() // 执行回调
    })
})

app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)
app.use(hotMiddleware)

app.use(config.assetsRoot, express.static('./static'))

devMiddleware.waitUntilValid(function () {
    console.log('> Listening at ' + uri + '\n')
})

var port = config.port
var uri = 'http://localhost:' + port

module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    opn(uri) // 打开浏览器
})
