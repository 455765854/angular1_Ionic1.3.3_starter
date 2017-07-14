// webpack.config.js
var webpack = require('webpack')
var config = require('./config')
var rm = require('rimraf') // 可能是删除文件夹的所有内容
var webpackConfig = require('./webpackConfig')
var ora = require('ora') // 读取动画

var spinner = ora('开始打包...')
spinner.start()
rm(config.assetsRoot, err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    console.log('打包完成')
  })
})
