import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import history from "connect-history-api-fallback";

import config from "./webpack.config.dev.js";

const app = express();
const compiler = webpack(config);

app.use(history());
app.use(webpackHotMiddleware(compiler));
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.listen(3000, () => {
  console.log("Listening on port 3000, open up localhost in your browser");
});
