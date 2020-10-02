const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("./model/userModel");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const config = require("./config/config");

exports.local = passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => {
  return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

var opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new jwtStrategy(opts, async (jwt_payload, done) => {
    console.log("JWT payload: ", jwt_payload);
    try {
      const user = await User.findOne({ _id: jwt_payload._id });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(err, false);
    }
  })
);

exports.verifyAdmin = (req, res, next) => {
  const isAdmin = req.user.admin;
  if (isAdmin) {
    // user is admin, pass to next
    next();
  } else {
    //throw error, user is not an admin
    res.setHeader("Content-Type", "application/json");
    res.status(403).json({
      status: "error",
      error: {
        message: "You are not authorized to access this route",
      },
    });
  }
};

exports.verifyUser = passport.authenticate("jwt", { session: false });
