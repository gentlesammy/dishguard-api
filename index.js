const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
const authenticate = require("./authenticate");

//routes import
const dishRoutes = require("./routes/dishRouter");
const promoRoutes = require("./routes/promoRouter");
const leaderRoutes = require("./routes/leaderRouter");
const usersRoutes = require("./routes/usersRouter");
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
app.use(cookieParser("refj2872653gdnqiuu736uqop;['27u3t"));

app.use(
  session({
    name: "session-id",
    secret: "324-736535-hjdhdfg-53twj82-63tehjdkwgt5236",
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
  })
);
app.use(passport.initialize());
app.use(passport.session(authenticate));
usersRoutes(app);
const auth = (req, res, next) => {
  if (!req.user) {
    res.setHeader("Content-Type", "application/json");
    res.status(301).json({
      status: "error",
      error: {
        message: "You are not authenticated idiot",
      },
    });
  } else {
    next();
  }
};

app.use(express.static(__dirname + "/public"));

/*
  #####ROUTES ##############
*/
app.use(auth);
dishRoutes(app);
promoRoutes(app);
leaderRoutes(app);
