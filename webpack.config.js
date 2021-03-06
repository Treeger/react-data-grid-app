const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: ['./src/index.js'],
	output: {
		path: __dirname,
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-1']
				}
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	devServer: {
		historyApiFallback: true,
		contentBase: './'
	},
  plugins: [
  new UglifyJSPlugin({
    sourceMap: true
  }),
	new webpack.DefinePlugin({
	'process.env.NODE_ENV': JSON.stringify('production')
})
]
};
