const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'static', 'js', 'index.js')
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  resolve: {
    alias: {
    }
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: [
            path.resolve(__dirname, 'node_modules'),
        ],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        }],
      },
      {
        test: /\.html/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      }
    ],
  }
};
