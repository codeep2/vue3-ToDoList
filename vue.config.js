/*
 * @Date: 2020-10-27 09:50:44
 * @Author: Codeep2
 * @LastEditTime: 2020-10-30 16:42:25
 * @LastEditors: Codeep2
 * @Description: webpack 配置文件
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve('src')
      }
    }
  },
  chainWebpack: config => {
    // 删除预设的svg配置
    config.module.rules.delete('svg')

    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(path.resolve('src/assets/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: '[name]' })

    // 修改images-loader配置，使svg不能用<img>引入
    config.module
      .rule('images')
      .exclude.add(path.resolve('src/assets/icon'))

    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  },
  devServer: {
    open: true,
    port: '4000',
    // contentBase: 'dist',
    hot: true,
    overlay: true
  }
}
