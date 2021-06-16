const wp = require('@cypress/webpack-preprocessor')
// const path = require('path')

module.exports = wp({
  webpackOptions: {
    resolve: {
      extensions: ['.ts', '.js']
    },
    // alias: {
    //   '@': path.resolve(__dirname, '../../../../')
    // },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    }
  }
})
