/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Webpack = require('webpack');
const argv = require('yargs-parser')(process.argv.slice(2));

const pro = argv.mode == 'production'
    ? true
    : false; //  区别是生产环境和开发环境

let plu = [];
if (pro) {
    //  线上环境
    plu.push(new HtmlWebpackPlugin({
        template: './src/index.html', hash: true, // 会在打包好的bundle.js后面加上hash串
        chunks: ['vendor', 'index', 'utils'] //  引入需要的chunk
    }),
        // 拆分后会把css文件放到dist目录下的css/style.css
        new MiniCssExtractPlugin({ filename: 'css/[name]-[chunkhash].css', chunkFilename: '[id].css' }), new CleanWebpackPlugin('dist'))
} else {
    //  开发环境
    plu.push(new HtmlWebpackPlugin({
        template: './src/index.html',
        chunks: ['vendor', 'index', 'utils'] //  引入需要的chunk
    }),
        // 拆分后会把css文件放到dist目录下的css/style.css
        new MiniCssExtractPlugin({ filename: 'css/[name].css', chunkFilename: "[id].css" }), new Webpack.HotModuleReplacementPlugin(), // 热更新，热更新不是刷新
    )
}

module.exports = {
    mode: 'development', // 模式配置
    devtool: pro
        ? ''
        : 'inline-source-map', //  只有本地开发才需要调试
    entry: { // 入口文件
        index: './src/index.js'
    },
    output: { // 出口文件
        filename: '[name]-[hash:5].js',
        path: path.resolve('dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            }, {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            }, {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: 'images/' // 图片打包后存放的目录
                        }
                    }
                ]
            }, {
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'
            }, {
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader'
            }, {
                test: /\.js|jsx$/,
                use: 'babel-loader',
                include: /src/, // 只转化src目录下的js
                exclude: /node_modules/ // 排除掉node_modules，优化打包速度
            }, {
                enforce: "pre", //  代表在解析loader之前就先解析eslint-loader
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                include: /src/,
                loader: "eslint-loader"
            }
        ]
    },
    resolve: { // 别名
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers')
        },
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.css',
            '.scss',
            '.less'
        ] // 省略后缀
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: { // 抽离第三方插件
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor', // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                utils: {
                    // 抽离自己写的公共代码，utils里面是一个公共类库
                    chunks: 'initial',
                    name: 'utils', //  任意命名
                    minSize: 0 // 只要超出0字节就生成一个新包
                }
            }
        }
    },
    plugins: plu,
    devServer: { // 开发服务器配置
        port: 3000, // 端口
        open: true, // 自动打开浏览器
        hot: true, // 开启热更新
        overlay: true, // 浏览器页面上显示错误
        historyApiFallback: true
    }
}