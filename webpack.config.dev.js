import webpack from "webpack";
import { merge } from "webpack-merge";
import baseConfig from "./webpack.config.js";

import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

const { HotModuleReplacementPlugin } = webpack;

export default merge(baseConfig, {
  mode: "development",
  devtool: "eval-source-map",
  entry: ["webpack-hot-middleware/client", "./src/index.tsx"],
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({
                before: [ReactRefreshTypeScript()],
              }),
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()],
});
