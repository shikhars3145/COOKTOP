const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: ['babel-polyfill','./src/js/index.js'],
    output: {
        path: path.resolve(__dirname,'dist'), //output folder
        filename: 'js/bundle.js'

    },
    devServer: {                    //for webpack dev server
        contentBase : './dist'  //same as output path
    },
   // mode: 'development' //used through script option --mode 
   //development is fast //production is more optimised
   plugins : [
       new HtmlWebpackPlugin({
           filename: "index.html", //name given to file in destination
           template: "./src/index.html" // source file to be copied
       })
   ],
   module : {
       rules : [
           {
               test: /\.js$/, //regex for files ending in .js
               exclude: /node_modules/ , //regex for everything in node-modules folder
               use: {
                   loader: 'babel-loader' //babel loder is applied to every js file that is not in node_modules folder
               }
           }
       ]
   }
};