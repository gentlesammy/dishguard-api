const express = require("express");
const cors = require("cors");
const app = express();

const whiteList = [
  "https://localhost:9000",
  "https://localhost:5000",
  "http://localhost:9000",
  "http://127.0.0.1:5500",
];

var corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      var msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
  },
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptions);
