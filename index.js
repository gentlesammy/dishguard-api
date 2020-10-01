const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
const authenticate = require("./authenticate");
const config = require("./config/config");
const path = require("path");

//routes import
const dishRoutes = require("./routes/dishRouter");
const promoRoutes = require("./routes/promoRouter");
const leaderRoutes = require("./routes/leaderRouter");
const usersRoutes = require("./routes/usersRouter");
const app = express();

const dbString = config.mongoDbUrl;
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
app.use(cookieParser("refj2872653gdnqiuu736uqop;['27u3t"));

app.use(passport.initialize());
app.use(express.static(path.join(__dirname + "/public")));

/*
  #####ROUTES ##############
*/
usersRoutes(app);
dishRoutes(app);
promoRoutes(app);
leaderRoutes(app);
