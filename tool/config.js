var path = require('path')

// webpack信息文件

module.exports = {
  assetsPublicPath: '/',
  index: path.resolve(__dirname, '../www/index.html'), // __dirname==/build/  resolve后为/dist/index.html
  assetsRoot: path.resolve(__dirname, '../www'),
  port: 8000
}
