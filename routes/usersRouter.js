const User = require("../model/userModel");
const passport = require("passport");

module.exports = (app) => {
  //get all users listing
  app.get("/users", async (req, res) => {
    res.send("list of all users");
  });

  //sign up user
  app.post("/user/signup", async (req, res, next) => {
    try {
      const user = await User.register(
        new User({ username: req.body.username }),
        req.body.password
      );
      passport.authenticate("local")(req, res, () => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
          status: "success",
          data: { message: "user Created successfully" },
        });
      });
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      console.log(error);
      res.status(500).json({
        status: "error",
        error: {
          message: "something is wrong",
          error: error,
        },
      });
    }
  });

  //login user
  app.post("/user/login", passport.authenticate("local"), (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({
      status: "success",
      data: { message: "You are successfully logged in" },
    });
  });
  /* end */
};
