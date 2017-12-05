const path = require('path')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.sass'],
		alias: {
			'@': __dirname + '/src'
		}
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['env']
				}
			},
			{
				test: /\.sass$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader'
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: [
									autoprefixer({
										browsers:[
											'> 1%',
											'last 4 version',
											'not ie <= 8'
										]
									})
								]
							}
						},
						{
							loader: 'sass-loader'
						}
					]
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('style.css')
	]
}
