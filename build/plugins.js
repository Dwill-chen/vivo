const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');

// 添加插件
// const ExtractTextPlugin = require("extract-text-webpack-plugin");   // 分离出来css
const  OptimizeCssAssetsPlugin  = require("optimize-css-assets-webpack-plugin"); // 压缩css
const htmlWebpackPlugin = require("html-webpack-plugin");   // 生成html
const cleanWebpackPlugin = require('clean-webpack-plugin'); // 生成文件之前清除文件
exports.config = [
    // 创建插件实例
        // 1. 添加横幅
        new webpack.BannerPlugin("版权所有，翻版必究！"),
        // // 2. 分离CSS文件
        // new ExtractTextPlugin("static/css/[name]-[hash:5].css"),
        // 3. 压缩css
        new OptimizeCssAssetsPlugin(),
        // 4. 模块热替换
        new webpack.HotModuleReplacementPlugin(),
        // 5. 清空文件
        new cleanWebpackPlugin(['./dist/']),
        // 6. 全局引入三方库
        new webpack.ProvidePlugin({
            $:"jquery"
        }),
        new copyWebpackPlugin([{
            from:__dirname+'/../src/json',//打包的静态资源目录地址
            to:'../dist/static/json' //打包到dist下面的public
        },{
            from:__dirname+'/../src/plugins',//打包的静态资源目录地址
            to:'../dist/static/plugins' //打包到dist下面的public
        }]),    
        // 主页html
        new htmlWebpackPlugin({
            template: "./src/index.html",
            // 设置JS文件插入的位置，可选：“true/body”，“head”
            inject: true,
            // 指定输出文件所依赖的入口文件（*.js）的[name]，
            // 这里的值是由“entry”（入口）属性内定义的
            chunks: ["main"],
            // 输出的子目录及完整文件名
            filename: "index.html"
        }),
        // products-nex页html
        new htmlWebpackPlugin({
            template: "./src/pages/products-nex.html",
            inject: true,
            chunks: ["products-nex"],
            filename: "static/pages/products-nex.html"
        }),
        // products-X页html
        new htmlWebpackPlugin({
            template: "./src/pages/products-x.html",
            inject: true,
            chunks: ["products-x"],
            filename: "static/pages/products-x.html"
        }),
        // products-y页html
        new htmlWebpackPlugin({
            template: "./src/pages/products-y.html",
            inject: true,
            chunks: ["products-y"],
            filename: "static/pages/products-y.html"
        }),
        // products-z页html
        new htmlWebpackPlugin({
            template: "./src/pages/products-z.html",
            inject: true,
            chunks: ["products-z"],
            filename: "static/pages/products-z.html"
        }),
        // mall页html
        new htmlWebpackPlugin({
            template: "./src/pages/mall.html",
            inject: true,
            chunks: ["mall"],
            filename: "static/pages/mall.html"
        }),
        // brand页html
        new htmlWebpackPlugin({
            template: "./src/pages/brand.html",
            inject: true,
            chunks: ["brand"],
            filename: "static/pages/brand.html"
        }),
        // store页html
        new htmlWebpackPlugin({
            template: "./src/pages/store.html",
            inject: true,
            chunks: ["store"],
            filename: "static/pages/store.html"
        }),
        // funtouchos页html
        new htmlWebpackPlugin({
            template: "./src/pages/funtouchos.html",
            inject: true,
            chunks: ["funtouchos"],
            filename: "static/pages/funtouchos.html"
        }),
        // service页html
        new htmlWebpackPlugin({
            template: "./src/pages/service.html",
            inject: true,
            chunks: ["service"],
            filename: "static/pages/service.html"
        }),
        // 商城mall的详情页
        new htmlWebpackPlugin({
            template: "./src/pages/details.html",
            inject: true,
            chunks: ["details"],
            filename: "static/pages/details.html"
        }),
        // 登陆注册页
        new htmlWebpackPlugin({
            template: "./src/pages/login-register.html",
            inject: true,
            chunks: ["login-register"],
            filename: "static/pages/login-register.html"
        }),
        //购物车页面
        new htmlWebpackPlugin({
            template: "./src/pages/shoppingcart.html",
            inject: true,
            chunks: ["shoppingcart"],
            filename: "static/pages/shoppingcart.html"
        }),
        new htmlWebpackPlugin({
            template: "./src/pages/z1.html",
            inject: true,
            chunks: ["z1"],
            filename: "static/pages/z1.html"
        }),
]