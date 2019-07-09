const path = require("path");
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, "src");
const BUILD_PATH = path.resolve(ROOT_PATH, "dist");
const PUBLIC_PATH = "";
const PORT = process.env.PORT || 3000; //PROT=8900 npm run start 自定义端口号
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ISDEV = !(process.env.NODE_ENV === "production");
const ClearWebpackPlugin = require("clean-webpack-plugin");
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

function envOutPut(devName, proName) {
    return ISDEV ? devName : proName;
}

module.exports = {
    entry: {
        app: [APP_PATH + "/main.tsx"]
    },
    output: {
        path: BUILD_PATH,
        filename: envOutPut("[name].js", "js/[chunkHash:5].[name].js"),
        chunkFilename: envOutPut("[name].js", "js/[chunkHash:5].[id].js"),
        publicPath: PUBLIC_PATH
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", "json", "less", "css", "png"],
        alias: {}
    },
    module: {
        rules: [
            {
                test: /\.(css|less)?$/,
                include: [APP_PATH],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: ISDEV,
                            //reloadAll: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: ISDEV,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: ISDEV,
                            ident: "postcss",
                            plugins: loader => [
                                require("autoprefixer")({
                                    browsers: ["iOS >= 8", "Android >= 4"]
                                })
                            ]
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: ISDEV,
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                include: [APP_PATH],
                use: ["babel-loader", "ts-loader"]
            },
            {
                test: /\.js$/,
                include: [APP_PATH],
                use: ["babel-loader"]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                include: [APP_PATH],
                use: ["url-loader?limit=1000"]
            },
            {
                test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/,
                include: [APP_PATH],
                use: [
                    `url-loader?limit=1000&name=${envOutPut(
                        "[name].[ext]",
                        "img/[hash:5].[name].[ext]"
                    )}`
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "test.title",
            template: APP_PATH + "/tpl.html",
            // chunks: ["app", "lib~app", "manifest", "vendors~app"],
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: envOutPut("[name].css", "css/[chunkHash:5].[name].css"),
            chunkFilename: envOutPut("[name].css", "css/[chunkHash:5].[id].css")
        }),
        new webpack.ProgressPlugin(),
    ].concat(
        envOutPut(
            [],
            [
                new OptimizeCssAssetsPlugin({
                    assetNameRegExp: /\.(css|less)$/g,
                    //            cssProcessor: require('cssnano'),
                    //            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
                    canPrint: true
                }),
                new ClearWebpackPlugin()
            ]
        )
    ),
    devServer: {
        port: PORT,
        host: "0.0.0.0",
        hot: true,
        inline: true,
        open: true,
        disableHostCheck: true,
        proxy: {},
        before:function(app){
            app.get("/app",(req,res)=>{
                res.json({name:1})
               // res.end("hello world111")
            })
        }
    },
    optimization: {
        minimizer: [
            new UglifyjsWebpackPlugin({
                cache: true,
                parallel: true,
                // chunkFilter: (chunk) => {
                //     // Exclude uglification for the `vendor` chunk
                //     if (chunk.name && chunk.name.indexOf("npm")!==-1) {
                //         console.log(chunk.name)
                //       return false;
                //     }

                //     return true;
                //   }
                uglifyOptions: {
                    // 最紧凑的输出
                    beautify: false,
                    // 删除所有的注释
                    comments: false,
                    compress: {
                        // 在UglifyJs删除没有用到的代码时不输出警告
                        //warnings: false,
                        // 删除所有的 `console` 语句，可以兼容ie浏览器
                        drop_console: true,
                        // 内嵌定义了但是只用到一次的变量``
                        collapse_vars: true,
                        // 提取出出现多次但是没有定义成变量去引用的静态值
                        reduce_vars: true
                    },
                    dead_code: true
                }
            })
        ],
        runtimeChunk: {
            name: "single"
        },
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    name: module => {
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace("@", "")}`;
                    }
                }
            }
        }
    },
    devtool: envOutPut("#cheap-module-eval-source-map", false),
    stats: {
        colors: true
    },
    performance: {
        hints: false
    },
    cache: ISDEV
};
