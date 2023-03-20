import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer } from "http";

const { dirname } = path;
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const staticPath = path.join(__dirname, "/dist");

app.use(express.static(staticPath));
app.get("*", (req, res) => {
  res.sendFile(`${staticPath}/index.html`);
});

createServer(app).listen(3000, null, (err: Error) => {
  if (err) {
    console.log(err);
  }
  console.info("Listening on port 3000, open up localhost in your browser");
});
