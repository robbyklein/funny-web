const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill', './client/index.js'],
    output: {
        path: __dirname + '/server/public',
        filename: 'scripts.js',
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?-url', 'postcss-loader', 'sass-loader'],
                }),
            },
        ],
    },
    plugins: [new ExtractTextPlugin('style.css')],
}
