/*import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import  HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';*/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//import ServiceWorkerWebpackPlugin from 'serviceworker-webpack-plugin';

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.join(ROOT_PATH, '/app');
const PUBLIC_PATH = path.join(APP_PATH, '/public');
const APP_SRC_PATH = path.join(ROOT_PATH, '/app/src');
const APP_ENTRY_FILE_PATH = path.join(APP_SRC_PATH, '/index.js');
var sassLoaders = [
    'css-loader?sourceMap',
    'autoprefixer-loader?browsers=last 2 version',
    'sass-loader?sourceMap&outputStyle=expanded&' +
    'includePaths[]=' +
    (path.resolve('./node_modules')) +
    '&includePaths[]=' +
    (path.resolve('./node_modules/grommet/node_modules'))
];

var cssLoaders = [
  'css-loader?sourceMap',
  'autoprefixer-loader?browsers=last 2 version'
];

const plugins = [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, './server/index.html'),
        filename: 'index.html',
        inject: 'body',
    }),
	new MiniCssExtractPlugin({
		filename: 'static/css/[name].[hash].css',
		chunkFilename: 'static/css/[name].[hash].css'
	}),
];

module.exports = {
    entry: {
        vendor: [
            'axios',
            'react', 
            'react-dom', 
            'react-router',
            'classnames',
            'isolated-scroll',
            'react-lines-ellipsis',
            'react-modal',
            'react-places-autocomplete',
            'react-slick',
            'redux',
            'redux-form',
            'redux-logger',
            'redux-promise-middleware',
            'react-redux',
            'redux-responsive',
            'react-router-redux',
            'redux-thunk'
        ],
        main: [ APP_ENTRY_FILE_PATH ]
    },
    plugins,
    module: {
		rules: [
			// Apply babel loader for js files to convert ES6 syntax to plain javascript
			{
				test: /\.(js|jsx)$/,
				include: APP_SRC_PATH,
				exclude: /node_modules/,
				loaders: ['babel-loader'],
			},
			{
				test: /\.module\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'sass-loader'],
            },
            {
                test: /\.scss$/,
				exclude: /\.module\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								includePaths: ['./node_modules', './node_modules/grommet/node_modules']
							}
						}
					}
				],
            },
            {
				test: /\.css$/,
				use: cssLoaders
            },
            {
              test: /\.json$/,
              loaders: ["json"]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
					{
					  loader: 'file-loader',
					  options: {
						name: 'static/images/[name].[ext]',
					  },
					},
				]
            },            
            {
                test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
                loader: "url-loader?mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
                use: [
					{
					  loader: 'file-loader',
					  options: {
						name: 'static/fonts/[name].[ext]',
					  },
					},
				]
			},
			{
				test: /\.html$/,
				use: ['html-loader'],
			},
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'all',
					name: 'vendor',
					test: 'vendor',
					enforce: true,
					// priority
					priority: 20
				},
				 // common chunk
				 common: {
					name: 'common',
					minChunks: 2,
					chunks: 'all',
					priority: 10,
					reuseExistingChunk: true,
					enforce: true
				}
			},
		},
	},
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
         alias: {
            components: path.resolve(ROOT_PATH, 'app/src/components'),
            containers: path.resolve(ROOT_PATH, 'app/src/containers'),
            pages: path.resolve(ROOT_PATH, 'app/src/pages'),
            styles: path.resolve(ROOT_PATH, 'app/styles'),
            images: path.resolve(ROOT_PATH, 'app/images'),
            utils: path.resolve(ROOT_PATH, 'app/src/utils'),
            api: path.resolve(ROOT_PATH, 'app/src/api'),
            react: path.resolve(__dirname, 'node_modules', 'react'),
            'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom')
        },
    },

    stats: {
        chunks: true,
    },


}