const path = require('path');
module.exports = {
  entry: './src/index.js',
  mode: 'develop',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-test.js',
    libraryTarget: 'umd'
  }
};