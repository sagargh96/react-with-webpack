const merge = require('webpack-merge');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.config.common');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.join(ROOT_PATH, '/app');
const PUBLIC_PATH = path.join(APP_PATH, '/public');
module.exports = merge(common, {
	mode: 'development',
	/**
	 *  Each module is executed with eval() and a SourceMap is added as a DataUrl to the eval().
	 *  Initially it is slow, but it provides fast rebuild speed and yields real files.
	 *  Line numbers are correctly mapped since it gets mapped to the original code.
	 *  It yields the best quality SourceMaps for development
	 */
	devtool: 'source-map', // 'eval-source-map',
	output: {
		filename: 'static/script/[name].bundle.js',
		path: PUBLIC_PATH,		
        chunkFilename:'static/script/[name].bundle.js',
		publicPath: '/'	//Serve static assets from path public
	},
	devServer: {
		//contentBase: PUBLIC_PATH,	// Serve content for webpack dev server
		historyApiFallback: true
	},
	plugins: [
		new BundleAnalyzerPlugin(),
	],
});