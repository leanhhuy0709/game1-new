const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['./src/engine/debug/Debug.ts'],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$|\.jsx?$/,
                include: path.join(__dirname, '../src'),
                loader: 'ts-loader',
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    filename: '[name].bundle.js',
                },
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({ gameName: 'TRex Jump', template: 'index.html' }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'assets', to: 'assets' },
                { from: 'pwa', to: '' },
                { from: 'favicon.ico', to: '' },
            ],
        }),
    ],
}
