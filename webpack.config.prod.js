const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWbpackPlugin = require('terser-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const PUBLIC_PATH = path.join(ROOT_PATH, '/public');
module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	output: {
		filename: 'static/script/[name].[hash].bundle.js',
		path: PUBLIC_PATH,
		publicPath: '/',	// Serve static assets from path public
	},
	plugins: [
		new CleanWebpackPlugin(),
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
			  uglifyOptions: {
				warnings: false,
				compress: {
				  unused: true,
				  dead_code: true
				}
			  },
			  sourceMap: true
			}),
			new OptimizeCssAssetsWebpackPlugin(),
			new TerserWbpackPlugin(),
		],
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
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
		//runtimeChunk: true,
	},
});