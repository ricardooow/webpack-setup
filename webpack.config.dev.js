var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
var getClientEnvironment = require('./env');
var paths = require('./paths');

var path = require('path');
var publicPath = '/';
var publicUrl = '';
var env = getClientEnvironment(publicUrl);

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        require.resolve('react-dev-utils/webpackHotDevClient'),
        require.resolve('./polyfills'),
        paths.appIndexJs
    ],
    output: {
        path: paths.appBuild,
        pathinfo: true,
        filename: 'static/js/bundle.js',
        publicPath: publicPath
    },
    resolve: {
        modules: ['node_modules'].concat(paths.nodePaths),
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            'react-native': 'react-native-web'
        }
    },
    resolveLoader: {
        modules: [
            paths.ownNodeModules,
            paths.appNodeModules
        ]
    },
    module: {
        rules: [
            { parser: { requireEnsure: false } },

            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                use: [{

                    options: {
                        configFile: path.join(__dirname, '../.eslintrc'),
                        useEslintrc: false
                    },
                    loader: 'eslint-loader'
                }],
                include: paths.appSrc
            },
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.css$/,
                    /\.json$/,
                    /\.svg$/
                ],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(js|jsx)$/,
                include: paths.appSrc,
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: [require.resolve('babel-preset-react-app')],
                    cacheDirectory: true
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: function () {
                                return [
                                    autoprefixer({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9',
                                        ]
                                    })
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'file-loader',
                options: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: [
        new InterpolateHtmlPlugin(env.raw),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
        }),
        new webpack.DefinePlugin(env.stringified),
        new webpack.HotModuleReplacementPlugin(),
        new CaseSensitivePathsPlugin(),
        new WatchMissingNodeModulesPlugin(paths.appNodeModules)
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    performance: {
        hints: false
    }
};