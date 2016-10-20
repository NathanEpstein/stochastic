var webpack = require("webpack");

module.exports = {

  entry: "./dist/index.js",
  devtool: "source-map",
  output: {
    path: "./dist",
    filename: "bundle.min.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
};
