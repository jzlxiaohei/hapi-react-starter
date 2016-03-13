var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var AssetsPlugin         = require('assets-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin({
    pretty:true,
    path:path.join(__dirname,'../')
})

module.exports = {
    devtool: 'source-map',
    entry: {
        main:['./src/index']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/dist/'
    },
    externals:{
        'jquery':"jquery",
        "react-dom":"ReactDOM",
        'react':"React",
        'rx-lite':"Rx",
        'antd':"antd"
    },
    plugins: [
        new ExtractTextPlugin("[name].css?v=[chunkhash]"),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        assetsPluginInstance
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader!postcss-loader')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
            },
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader'}
        ]
    },
    postcss: function () {
        return [autoprefixer, precss];
    }
};