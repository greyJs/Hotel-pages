const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports ={
    entry: './src/index.js', 
    output:{
        filename:'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({}),
            new UglifyJsPlugin({})
        ]
    },
    devServer: {
     contentBase: path.resolve(__dirname, 'dist'),
     port: 5000
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
   module: {
       rules: [
        {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
           
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']  
          },
          {
            test: /\.sass$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] 
          },
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }// Из за этой строки не работает babel
          
       ]
   } 
}