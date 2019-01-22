const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        admin: ['@babel/polyfill', './client/admin.js'],
        scripts: ['@babel/polyfill', './client/scripts.js']
    },
    output: {
        path: __dirname + '/server/public',
        filename: '[name].js',
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
    plugins: [new ExtractTextPlugin('[name].css')],
}
