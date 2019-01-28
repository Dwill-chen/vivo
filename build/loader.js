// const ExtractTextPlugin = require("extract-text-webpack-plugin"); 
exports.config = [
    // 1. ES6 -> ES5
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
    },
    // 处理less
    {
        test: /\.less$/,
        exclude: /node_modules/,
        use:[
            'style-loader',
            'css-loader', 
            {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: [
                        require('autoprefixer')({
                            browsers: ["last 2 versions"]
                        }),
                    ]
                }
            },
            'less-loader'
        ]

    },
    // 处理图片
    {
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: /node_modules/,
        use: {
            loader: "url-loader",
            options: {
                limit: "1024",
                name: "[name].[ext]",
                outputPath: "static/images/",
            }
        }
    },
    // 处理html中图片路径
    {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
            loader: "html-loader"
        }
    }
];