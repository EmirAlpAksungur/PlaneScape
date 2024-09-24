const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        hot: true,
        open: true,
        historyApiFallback: true
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.iata': JSON.stringify('http://localhost:5000'),
            'process.env.schiphol': JSON.stringify('http://localhost:5001'),
            'process.env.booking': JSON.stringify('http://localhost:5002'),
        }),
    ],
}