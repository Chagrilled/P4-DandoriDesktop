const rules = require('./webpack.rules');
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

rules.push({
    test: /\.css$/,
    include: [path.resolve(__dirname, "./src")],
    use: ['style-loader', 'css-loader', 'postcss-loader'],
});

const copyPlugins = new CopyPlugin(
    {
        patterns: [
            { from: "src/images", to: "images" }
        ]
    }
);

module.exports = {
    module: {
        rules,
    },
    resolve: {
        extensions: [".jsx", ".js", ".mjs", ".json"],
    },
    plugins: [
        copyPlugins
    ]
};
