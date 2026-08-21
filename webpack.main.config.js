module.exports = {
    entry: './src/main.js',
    target: 'electron-main',
    module: {
        rules: require('./webpack.rules'),
    },
    devtool: 'inline-source-map'
};
