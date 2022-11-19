/*eslint-env node*/

const path = require('path');

const CleanPlugin = require('clean-webpack-plugin');

const { CleanWebpackPlugin } = CleanPlugin;

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: '/assets/scripts/',
  },
  devtool: 'source-map',
  plugins: [new CleanWebpackPlugin()],
};
