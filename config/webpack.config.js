const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

//plugins 
const htmlWebPlugin = new HtmlWebpackPlugin({
    template: path.resolve('./public/index.html'),
});
//const extractTextPlugin = new ExtractTextWebpackPlugin("[name].css");

// module
module.exports = {
    devtool: 'inline-source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './build',
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'eslint-loader']
        },
        {
            test: /\.s[ac]ss$/,
            use: ['style-loader', 'css-loader', 'sass-loader',],
        },]
    },
    plugins: [
        htmlWebPlugin,
    ],
};