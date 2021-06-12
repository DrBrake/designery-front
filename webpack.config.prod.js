const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config");

module.exports = merge(baseConfig, {
  optimization: {
    minimize: true,
  },
  mode: "production",
  stats: {
    children: false,
    errorDetails: true,
  },
});
