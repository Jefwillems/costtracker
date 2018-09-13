const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './index.js',
  target: 'node',
  output: {
    path: path.resolve('dist'),
    filename: 'costtracker.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, }),
  ],
};
