const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    source: './src/app.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '../css/main.[name].css'
    })

  ],

  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'dist/js'),
    chunkFilename: "[id].bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
    ]
  },

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        extractComments: false,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      })
    ],
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
  }
}