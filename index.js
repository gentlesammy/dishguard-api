const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//routes import
const dishRoutes = require("./routes/dishRouter");
const promoRoutes = require("./routes/promoRouter");
const leaderRoutes = require("./routes/leaderRouter");
const app = express();

const dbString = "mongodb://localhost:27017/dishes";
mongoose.connect(
  dbString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("connected");
  }
);
const port = 9000;
app.listen(9000, () => {
  console.log("connected");
});
app.use(bodyParser.json());
app.use(morgan("dev"));
const auth = (req, res, next) => {
  console.log(req.headers);
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.setHeader("Content-Type", "application/json");
    res.status(401).json({
      status: "error",
      data: { message: "Unauthorized action" },
    });
  }
  var auth = new Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");
  let username = auth[0];
  let password = auth[1];
  if (username == "admin" && password == "password") {
    next();
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).json({
      status: "error",
      data: { message: "Invalid credentials" },
    });
  }
};
app.use(auth);
app.use(express.static(__dirname + "/public"));
/*
  #####ROUTES ##############
*/
//dishes Routes
dishRoutes(app);
promoRoutes(app);
leaderRoutes(app);
