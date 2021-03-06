const webpack = require('webpack')
const { resolve } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV
const __DEV__  = NODE_ENV !== 'production'
const SRC_DIR  = resolve('./src')
const REL_DIR  = resolve('./release')

const extractSass = new ExtractTextPlugin({
	filename: 'static/main.css',
	allChunks: true,
});

module.exports = {
    target: 'web',
    devtool: 'source-map',
    entry: {
        'static/client': [ 'babel-polyfill', 'client/index.js' ],
    },
    resolve: {
        modules: [ SRC_DIR, 'node_modules' ],
        extensions: [ '.js', '.jsx', '.json' ]
    },
    output: {
        path: REL_DIR,
        publicPath: '/',
        filename: '[name].js',
        pathinfo: true
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: SRC_DIR,
                loader: 'babel'
            },
            {
				test: /\.(css|scss)$/,
				use: extractSass.extract({
					use: [{
						loader: 'css-loader'
					}, {
						loader: 'sass-loader'
					}],
					fallback: 'style-loader'
				}),
			},
        ]
    },
    plugins: [
        extractSass,
        new webpack.DefinePlugin({
            __DEV__    : JSON.stringify(__DEV__),
            __CLIENT__ : JSON.stringify(true),
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        }),
    ].concat(
        __DEV__ ? [] : [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
                comments: false,
                compress: {
                    warnings: false,
                    dead_code: true,
                    unused: true,
                    join_vars: true,
                    drop_console: true
                }
            })
        ]
    )
}
