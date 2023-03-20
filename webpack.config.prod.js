import { merge } from "webpack-merge";
import baseConfig from "./webpack.config.js";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default merge(baseConfig, {
  optimization: {
    minimize: true,
  },
  mode: "production",
  stats: {
    children: false,
    errorDetails: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
});
