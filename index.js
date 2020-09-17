const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 9000;

app.listen(9000, () => {
  console.log("connected");
});

app.get("/", (req, res) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader("content-type", "text/html");
  res.end("<htm><body><h1>HELLO WORLD</h1></body></htm>");
});
