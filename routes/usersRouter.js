const User = require("../model/userModel");
const passport = require("passport");
const authenticate = require("../authenticate");
module.exports = (app) => {
  //get all users
  app.get(
    "/users",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    async (req, res) => {
      try {
        const allUsers = await User.find({}).sort({ createdAt: -1 });
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
          status: "success",
          data: allUsers,
        });
      } catch (error) {}
    }
  );

  //sign up user
  app.post("/user/signup", async (req, res, next) => {
    try {
      const user = await User.register(
        new User({ username: req.body.username }),
        req.body.password
      );
      if (req.body.firstName) user.firstName = req.body.firstName;
      if (req.body.lastName) user.lastName = req.body.lastName;
      const saveUser = await user.save();
      if (saveUser)
        passport.authenticate("local")(req, res, () => {
          res.setHeader("Content-Type", "application/json");
          res.status(200).json({
            status: "success",
            data: { message: "user Created successfully", data: saveUser },
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
    const token = authenticate.getToken({ _id: req.user._id });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({
      status: "success",
      data: { message: "You are successfully logged in", token: token },
    });
  });

  //logout ujser
  app.get("/logout", (req, res) => {
    if (req.session) {
      req.session.destroy();
      res.clearCookie("session-id");
      res.redirect("/");
    } else {
      var err = new Error("You are not logged in!");
      err.status = 403;
      next(err);
    }
  });

  /* end */
};
