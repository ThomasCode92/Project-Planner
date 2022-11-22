/*eslint-env node*/

const path = require('path');

const CleanPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = CleanPlugin;

module.exports = {
  mode: 'development',
  entry: './src/scripts/app.js',
  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { useBuiltIns: 'usage', corejs: '3.22' }],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'Project Board',
      filename: 'index.html',
      template: './src/index.html',
    }),
  ],
};
