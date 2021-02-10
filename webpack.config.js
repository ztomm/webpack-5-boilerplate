const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production';

module.exports = {
	devtool: isProd ? false : 'source-map',
	entry: ['babel-polyfill', './src/js/_base.js'],
	output: {
		path: path.resolve(process.cwd(), 'dist'),
		filename: isProd ? '[name].[contenthash].js' : '[name].js',
		publicPath: '/dist/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				]
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader, // Take scss file and split into a separate css file
					},
					{
						loader: 'css-loader', // Interprets scss @import and url() like import/require()
					},
					{
						loader: 'postcss-loader', // PostCSS turns your SCSS file into a JS object & converts that object back to a SCSS file
					},
					{
						loader: 'sass-loader', // look for scss file through sass-loader, compile scss into css code
					},
				]
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				type: 'asset/resource',
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				// this include is fake but necessary for pugs block reference
				include: path.join(process.cwd(), 'src'),
			},
		]
	},
	optimization: {
		minimizer: isProd
			? [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
			: []
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new HtmlWebpackPugPlugin(),
		new HtmlWebpackPlugin({
			template: './views/_base.pug',
			filename: 'layout.pug',
		}),
		new MiniCssExtractPlugin({
			filename: isProd ? '[name].[contenthash].css' : '[name].css',
			chunkFilename: isProd ? '[id].[contenthash].css' : '[id].css'
		}),
		new CleanWebpackPlugin(),
	]
};