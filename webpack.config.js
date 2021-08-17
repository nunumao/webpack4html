const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

let files = fs.readdirSync(path.resolve(__dirname, 'src', 'page'), { withFileTypes: true })
let plugins = [];
files.forEach(file => {
    if (file.isFile()) {
        let t = file.name.split('.')
        plugins.push(new HtmlWebpackPlugin({
            filename: t[0] + '.html',
            template: './src/page/' + t[0] + '.ejs'
        }))
    }
});

module.exports = {
    mode: 'production',
    entry: {
        script: './src/index.js'
    },
    output: {
        filename: 'js/[name].min.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                generator: {
                    filename: 'image/[name][ext]'
                }
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/i,
                type: 'asset',
                generator: {
                    filename: 'font/[name][ext]'
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.min.css'
        }),
        ...plugins
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true
    }
}