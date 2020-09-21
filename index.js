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
app.use(express.static(__dirname + "/public"));
/*
  #####ROUTES ##############
*/
//dishes Routes
dishRoutes(app);
promoRoutes(app);
leaderRoutes(app);
