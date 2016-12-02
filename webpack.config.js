var webpack = require("webpack");
var PACKAGE = require('./package.json');

var banner = PACKAGE.name + ' - ' + PACKAGE.version;

module.exports = {

  entry: "./dist/index.js",
  devtool: "source-map",
  output: {
    path: "./dist",
    filename: "bundle.min.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.BannerPlugin(banner)
  ]
};
