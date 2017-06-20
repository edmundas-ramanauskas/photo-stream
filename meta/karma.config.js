var path = require('path');

module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    files: [
      'src/**/tests/*.js'
    ],

    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap'],
      'src/**/*.jsx': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js(x?)$/,
            loader: 'babel-loader',
            include: path.join(__dirname, '../src')
          },
          {
            test: /\.css$/,
            loaders: [
              'style-loader',
              'css-loader?modules&localIdentName=[local]',
              'postcss-loader'
            ]
          },
          {
            test: /\.(png|svg|gif)$/,
            loaders: [
              'url-loader',
              'image-webpack-loader'
            ]
          }
        ]
      },
      externals: {
        'react/addons': 'react',
        'react/lib/ExecutionEnvironment': 'react',
        'react/lib/ReactContext': 'react'
      }
    },

    webpackServer: {
      noInfo: true
    },

    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-sinon',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher'
    ],

    reporters: ['progress'],
    port: 9876,
    browsers: ['Chrome']
  })
}
