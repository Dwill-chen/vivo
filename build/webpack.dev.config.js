// 引入
const path = require('path');
const Entry = require('./entry');
const Loader = require('./loader');
const Plugins = require('./plugins');
const Server = require('./devServer');
// 导出配置
module.exports = {
    context: path.resolve(__dirname, "../"),
    // 打包模式
    mode: 'development',
    // 入口
    entry: Entry.config,
    // 出口
    output: {
        
        // 路径
        path: path.resolve(__dirname, "../dist/"),
        // // 输出文件名
        filename: 'static/js/[name]-bundle.js',
        publicPath: "http://localhost:5500/"
    },
    // 加载器
    module: {rules: Loader.config},
    plugins:Plugins.config,
    devServer:Server.config,
    // 取别名
    /* resolve: {
        // 创建别名
        alias: {
            'index-less': path.resolve(__dirname, "../src/less/index.less"),
        }
    } */
}