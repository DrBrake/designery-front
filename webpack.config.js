import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";

import { fileURLToPath } from "url";

const { dirname } = path;
const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new CompressionPlugin({
      test: /\.(js?|jsx|ts|tsx|svg|gif|png|jpe?g|otf|eot|woff|woff2|ttf|ico)$/,
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.png",
    }),
  ],
};
