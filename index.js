const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
//routes import
const dishRoutes = require("./routes/dishRouter");
const app = express();

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
