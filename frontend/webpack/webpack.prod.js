const webpack = require('webpack')

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.iata': JSON.stringify('http://localhost:5000'),
            'process.env.schiphol': JSON.stringify('http://localhost:5001'),
            'process.env.booking': JSON.stringify('http://localhost:5002'),
        }),
    ],
}