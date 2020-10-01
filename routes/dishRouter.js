const Dish = require("../model/dishesModel");
const authenticate = require("../authenticate");
const { findById } = require("../model/dishesModel");

module.exports = (app) => {
  //get all dishes
  app.get("/dishes", async (req, res) => {
    try {
      const dishes = await Dish.find({}).populate("comments.author");
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        status: "success",
        data: dishes,
      });
    } catch (error) {
      console.log(error);
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({
        status: "error",
        message:
          "There is an unresolved error from our end. Please be patient while we resolve it",
      });
    }
  });

  //post a dish detail to database
  app.post("/dishes", authenticate.verifyUser, async (req, res) => {
    try {
      const createDish = await Dish.create(req.body);
      if (createDish) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
          status: "success",
          data: createDish,
        });
      }
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(401).json({
        status: "error",
        data: [error.message],
      });
    }
  });

  //delete, delete all dishes
  app.delete("/dishes", authenticate.verifyUser, async (req, res) => {
    try {
      const dishesRemoved = await Dish.remove({});
      if (dishesRemoved) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
          status: "success",
          data: { message: "All dishes removed" },
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  //put, update all dishes
  app.put("/dishes", authenticate.verifyUser, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(403).json({
      status: "error",
      data: { message: "Put operation not allowed on this route" },
    });
  });

  /*
  /dishes/:dishid
*/

  //get  dish with id, dishId
  app.get("/dishes/:dishId", async (req, res) => {
    try {
      const id = req.params.dishId;
      const dish = await Dish.findById(id).populate("comments.author");
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        status: "success",
        data: dish,
      });
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(501).json({
        status: "error",
        data: { message: "an unknown error occur" },
      });
    }
  });

  //post a dish id  to database
  app.post("/dishes/:dishId", authenticate.verifyUser, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(403).json({
      status: "error",
      data: { message: "post method not allowed for this route" },
    });
  });

  //delete, delete  dish with id dishId
  app.delete("/dishes/:dishId", authenticate.verifyUser, async (req, res) => {
    try {
      const id = req.params.dishId;
      const deleteddish = await Dish.findByIdAndDelete(id);
      if (deleteddish) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
          status: "success",
          data: { message: "dish deleted successfully" },
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  //put, update  dish with id dishId
  app.put("/dishes/:dishId", authenticate.verifyUser, async (req, res) => {
    try {
      const dishId = req.params.dishId;
      const updatedDish = await Dish.findByIdAndUpdate(
        dishId,
        { $set: req.body },
        { new: true }
      );
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        status: "success",
        data: updatedDish,
      });
    } catch (error) {
      console.log(error);
    }
  });
  /*
//dish comments  routes 
*/
  app.get(
    "/dishes/:dishId/comments",
    authenticate.verifyUser,
    async (req, res) => {
      try {
        const dishId = req.params.dishId;
        const targetDish = await Dish.findById(dishId).populate(
          "comments.author"
        );
        if (targetDish != null) {
          res.setHeader("Content-Type", "application/json");
          res.status(200).json({
            status: "success",
            data: { data: targetDish.comments },
          });
        } else {
          res.setHeader("Content-Type", "application/json");
          res.status(400).json({
            status: "error",
            data: {
              message:
                "we cannot locate the dish whose comment you are looking for",
            },
          });
        }
      } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(403).json({
          status: "error",
          error: {
            message: "There is an error",
            error: error,
          },
        });
      }
    }
  );
  //comment on aa specific dish
  app.post(
    "/dishes/:dishId/comments",
    authenticate.verifyUser,
    async (req, res) => {
      try {
        const dish = await Dish.findById(req.params.dishId);
        // console.log("dish found", dish);
        if (dish != null) {
          // console.log("user found o", req.user._id);
          req.body.author = req.user._id;
          dish.comments.push(req.body);
          const savedDish = await dish.save();
          if (savedDish) {
            const upDatedDish = await Dish.findById(dish._id).populate(
              "comments.author"
            );
            res.setHeader("Content-Type", "application/json");
            res.status(200).json({
              status: "success",
              data: {
                message: "comment posted succesfully",
                data: upDatedDish,
              },
            });
          } else {
            res.setHeader("Content-Type", "application/json");
            res.status(501).json({
              status: "error",
              data: { message: "comment cannot be posted" },
            });
          }
        } else {
          res.setHeader("Content-Type", "application/json");
          res.status(400).json({
            status: "error",
            data: {
              message:
                "we cannot locate the dish whose comment you are looking for",
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  );
  /*
//dish comments:commentId  routes 
*/

  //get a specific comment of a specific dish
  app.get("/dishes/:dishId/comments/:commentId", async (req, res) => {
    try {
      const dishId = req.params.dishId;
      const commentId = req.params.commentId;
      const targetDish = await Dish.findById(dishId).populate(
        "comments.author"
      );
      if (targetDish != null && targetDish.comments.id(commentId) != null) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
          status: "success",
          data: { data: targetDish.comments.id(commentId) },
        });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(400).json({
          status: "error",
          data: {
            message:
              "we cannot locate the dish whose comment you are looking for",
          },
        });
      }
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(403).json({
        status: "error",
        error: {
          message: "There is an error",
          error: error,
        },
      });
    }
  });

  //modify specific comments of  a specific dish
  app.put(
    "/dishes/:dishId/comments/:commentId",
    authenticate.verifyUser,
    async (req, res) => {
      try {
        const dishId = req.params.dishId;
        const commentId = req.params.commentId;
        req.body.author = req.user._id;
        console.log(req.body);
        const updatedDishComment = await Dish.findOneAndUpdate(
          { _id: dishId, "comments._id": commentId },
          {
            $set: {
              "comments.$": req.body,
            },
          }
        );
        if (updatedDishComment) {
          const updatedDish_Comment = await Dish.findById(dishId).populate(
            "comments.author"
          );
          if (updatedDish_Comment) {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json({
              status: "success",
              data: { message: "comment updated", data: updatedDish_Comment },
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  );
  // delete a specific comment  of a specific dish
  app.delete(
    "/dishes/:dishId/comments/:commentId",
    authenticate.verifyUser,
    async (req, res) => {
      try {
        const dishId = req.params.dishId;
        const commentId = req.params.commentId;
        const new_dish = await Dish.findOneAndUpdate(
          { _id: dishId },
          { $pull: { comments: { _id: commentId } } },
          { new: true }
        );
        if (new_dish != null) {
          const getUpdateddish = await Dish.findById(dishId).populate(
            "comments.author"
          );
          if (getUpdateddish != null) {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json({
              status: "success",
              data: { message: "comment deleted", data: getUpdateddish },
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

  // end of method
};
