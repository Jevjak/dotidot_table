const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DeadCodePlugin = require('webpack-deadcode-plugin')

module.exports = {
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.jsx']
  },
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    './app/index.js'
  ],
  stats: {
    children: false
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        loader: 'standard-loader',
        exclude: /node_modules/,
        options: {
          parser: 'babel-eslint'
        }
      },
      {
        test: /.(js?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  },
  devServer: {
    compress: true,
    hot: true,
    allowedHosts: 'all',
    client: {
      overlay: false
    },
    proxy: {
      '/api': {
        target: 'https://stage.dotidot.io',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/graphql' // Rewrite '/api' to '/graphql' in the redirected request
        }
      }
    },
    static: {
      directory: path.join(__dirname, 'dist')
    }
  },
  performance: {
    hints: false
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    },
    usedExports: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
      ignoreOrder: true
    }),
    new HtmlWebpackPlugin({ template: 'app/index.html' }),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new DeadCodePlugin({
      patterns: [
        'app/**/*.(js|jsx|ts|tsx|css|scss|svg|png|jpg|jpeg)'
      ],
      exclude: [
        '**/*.(stories|spec).(js|jsx)'
      ],
      failOnHint: false,
      detectUnusedFiles: true,
      detectUnusedExport: true,
      log: 'unused'
    })
  ]
}
