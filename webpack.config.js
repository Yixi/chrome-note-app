var webpack = require('webpack');
var path = require('path');



var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry:{
        main:["./app.js"]
    },

    output:{
        filename:"[name].js",
        sourceMapFilename:"[file].map",
        chunkFilename: '[id].chunk.js',
        path: './chrome/asset',
        publicPath: '/dist/asset/'
    },


    module:{
        loaders:[
            { test: /\.js$/, loader: 'babel' },
            { test: /\.css$/,loader:ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")}
        ]
    },

    plugins: [
        new ExtractTextPlugin("[name].css")
    ]


};