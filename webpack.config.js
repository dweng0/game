const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve(appDirectory, "src/app.ts"), //path to the main .ts file
    output: {
        filename: "js/bundleName.js", //name for the javascript file that is created/compiled in memory
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    mode: "development",
    devServer: {
        host: "0.0.0.0",
        port: 3001,
        disableHostCheck:true,
        contentBase: path.resolve(appDirectory, "public"),
        publicPath: "/",
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(appDirectory, "public/index.html"),
        }),
        new CleanWebpackPlugin(),
    ],
};