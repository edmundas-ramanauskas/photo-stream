var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  bail: true,
  entry: [
    './src/index.jsx'
  ],
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]!postcss-loader'
        })
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
  output: {
    path: path.join(__dirname, '../build'),
    crossOriginLoading: 'anonymous',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
      title: 'Photo Stream',
			template: './src/index.html',
      inject: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      analytics: true
		}),
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false,
      sourceMap: false
    }),
    new ExtractTextPlugin('styles.css')
	],
  resolve: {
		extensions: ['.js', '.jsx'],
    modules: ['node_modules', 'src']
	},
  target: 'web'
};

module.exports = config;
