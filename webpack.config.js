const path =require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require ('clean-webpack-plugin');
const HtmlWebpackPlugin = require ('html-webpack-plugin');

module.exports = ({ mode } = { mode : 'production' }) => {
    console.log(mode);
    return {
        mode,
        entry:'./src/index.js',
        output:{
            publicPath:'/',
            path:path.resolve(__dirname,'dist'),
            filename:'bundle.js'
        },
        module:{
            rules:[
                {
                    test:/\.(png|jpe?g|gif|svg)$/i,
                    type:"asset/resource"
                }, {
                    test:/\.jsx?$/,
                    exclude:/node_modules/,
                    use:{
                        loader:'babel-loader'
                    }
                },
                {
                    test:/\.s?css$/i,
                    use:[
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
        resolve:{
            extensions:['.js','.jsx']
        },
    
        plugins:[
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                template:'./index.html'
            }),
        ],
        devtool:"source-map",
        devServer:{
            contentBase:'./dist',
            hot:true
        }
    }
}
