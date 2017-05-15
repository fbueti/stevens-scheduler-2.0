const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js',
  }),
  new ProgressBarPlugin(),
];

// Configure Production / Development differences
// Todo: Split into separate file
// Slow but project is small
let devtool = 'source-map';
let filenameFormat;
// Todo: load images better ha ha
let imageLoaders = [
  'file-loader?name=img/[name].[ext]',
  {
    loader: 'image-webpack-loader',
    query: {
      progressive: true,
      pngquant: {
        quality: '65-90',
        speed: 4,
        optimizationLevel: 3,
      },
      gifsicle: {
        quality: '65-90',
        speed: 4,
        optimizationLevel: 3,
        interlaced: false,
      }
    }
  }
];

if (process.env.NODE_ENV === 'production') {
  // All Production config
  devtool = false;
  plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
        },
        sourceMap: false,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      })
  );
  // Todo: better static resource serving
  // filenameFormat = '[name].[hash].bundle.js';
  filenameFormat = '[name].bundle.js';


} else {
  // Development
  plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
      })
  );
  filenameFormat = '[name].bundle.js';
}

module.exports = {
  devtool,
  plugins,
  entry: {
    error: path.join(__dirname, 'static', 'js', 'apps', 'error.js'),
    home: path.join(__dirname, 'static', 'js', 'apps', 'home.js'),
    shared: path.join(__dirname, 'static', 'js', 'apps', 'shared.js'),
    splash: path.join(__dirname, 'static', 'js', 'apps', 'splash.js'),
    edit: path.join(__dirname, 'static/js/apps/edit.js'),
    polyfills: ['babel-polyfill'],
    // 'vendor-styles': ['spinkit'], Todo: Split vendor styles
    'vendor-styles': ['font-awesome-webpack'],
    images: path.join(__dirname, 'static/js/images.js'),
    vendor: ['vue', 'vue-resource', 'vue-async-computed', 'vue-moment', 'vue-js-modal', 'lodash.throttle', 'lodash.debounce'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filenameFormat,
    sourceMapFilename: '[file].map',
    publicPath: '/',
  },
  resolve: {
    alias: {},
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        use: ['style-loader', 'css-loader', {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0'],
            plugins: ['transform-vue-jsx'],
            sourceMap: true,
          },
        }],
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        loaders: imageLoaders,
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ],
  },
};
