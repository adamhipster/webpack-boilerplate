const bs = require( 'browser-sync-webpack-plugin' )
const webpack = require( 'webpack' )
const autoprefixer = require( 'autoprefixer' )

const plugins = process.env.NODE_ENV == 'production' ?
	[ new webpack.optimize.UglifyJsPlugin( { compress: { warnings: false }, sourceMap: true } ),
	  new webpack.DefinePlugin( { 'process.env': { NODE_ENV: JSON.stringify( 'production' ) } } ) ]
	:
	[ new bs( { host: 'localhost', post: 3000, server: { baseDir: __dirname + '/docs' } } ) ]


module.exports = {
  entry: __dirname + '/src/main.js',
  output: {
    filename: 'app.js',
    path: __dirname + '/docs/assets/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: [ 'es2015' ] }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: f => { return [ autoprefixer( { browsers: ['last 2 versions'] } ) ] }
            }
          },
          "sass-loader" ]
      }
    ]
  },
  devtool: process.env.NODE_ENV == 'production' ?  'cheap-module-source-map' : 'eval',
  plugins: plugins
}