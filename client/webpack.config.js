"use strict";
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const version = (new Date()).getTime();

module.exports = {
	entry: {
       'vendor.main': [
           'react',
           'react-dom',
           'react-router-dom',
           'flux',
           'jquery'
       ],
       'main': './app/index.jsx'
    },
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: "",
        filename: '[name].[hash].bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /(\.m?js$|\.m?jsx$)/,
                exclude: /(node_modules|public)/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.css$/,
                use: [
                  {
                    loader: 'style-loader'
                  },
                  {
                    loader: 'css-loader'
                  }
                ],
              }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                      comments: false,
                    },
                  }
            })
        ]
    },
    plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
    }),
		new HtmlWebpackPlugin({
		    title: 'Bond Ordering',
            template: './app/index.html',
            filename: './index.html',
            version: version,
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
          patterns: [
            {
                from: './app/assets/',
                to: './assets/',
                noErrorOnMissing: true
            }
          ]
      }, {
          ignore: [
              '*.txt'
          ]
      }),
    ]
};