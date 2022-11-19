/*eslint-env node*/

const path = require('path');

const CleanPlugin = require('clean-webpack-plugin');

const { CleanWebpackPlugin } = CleanPlugin;

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: '/assets/scripts/',
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname),
    },
  },
  plugins: [new CleanWebpackPlugin()],
};
