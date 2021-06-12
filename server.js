const path = require("path");
const express = require("express");
const http = require("http");
const expressStaticGzip = require("express-static-gzip");

const app = express();
const staticPath = path.join(__dirname, "/dist");

app.use(expressStaticGzip(staticPath));
app.get("*", (req, res) => {
  res.sendFile(`${staticPath}/index.html`);
});

http.createServer(app).listen(3000, "0.0.0.0", (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Listening on port 3000, open up localhost in your browser");
});
