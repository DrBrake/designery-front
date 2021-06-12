const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const history = require("connect-history-api-fallback");

const app = express();
const config = require("./webpack.config.dev.js");
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
