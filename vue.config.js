/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-01-09T13:26:49-08:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Adam
 * @Last modified time: 2020-06-02T15:00:00-08:00
 */

const path = require('path')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/style-variables.scss";
          $font-path: "${process.env.VUE_APP_FONT_PATH}";
          `
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, 'src/assets/style-variable.scss')]
    }
  },
  configureWebpack: {
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          use: ['cache-loader', 'thread-loader', 'babel-loader']
        }
      ]
    }
  },
  publicPath:
    process.env.NODE_ENV === 'production' &&
    process.env.VUE_APP_HOST_ADDRESS ===
      'https://osu-sustainability-office.github.io/sustainability-kiosks/'
      ? '/sustainability-kiosks/'
      : '/'
}
