const Dish = require("../model/dishesModel");

module.exports = (app) => {
  //get all dishes
  app.get("/dishes", async (req, res) => {
    try {
      const dishes = await Dish.find({});
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        status: "success",
        data: dishes,
      });
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({
        status: "error",
        message:
          "There is an unresolved error from our end. Please be patient while we resolve it",
      });
    }
  });

  //post a dish detail to database
  app.post("/dishes", async (req, res) => {
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
  app.delete("/dishes", async (req, res) => {
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
  app.put("/dishes", (req, res) => {
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
      const dish = await Dish.findById(id);
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
  app.post("/dishes/:dishId", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(403).json({
      status: "error",
      data: { message: "post method not allowed for this route" },
    });
  });

  //delete, delete  dish with id dishId
  app.delete("/dishes/:dishId", async (req, res) => {
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
  app.put("/dishes/:dishId", async (req, res) => {
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
    #########################################################################//#endregion
      DISH COMMENTS  HADLING SECTION 
    ####################################################################################
  */
  //get all comments for a specific dish
  app.get("/dishes/:dishId/comments", async (req, res) => {
    try {
      const dishId = req.params.dishId;
      const dish = await Dish.findById(dishId);
      if (dish != null) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
          status: "success",
          data: dish.comments,
        });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(404).json({
          status: "error",
          data: { message: `Unable to Locate dish with id  ${dishId}` },
        });
      }
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({
        status: "error",
        message:
          "There is an unresolved error from our end. Please be patient while we resolve it",
      });
    }
  });

  //post a comment for a specific dish
  app.post("/dishes/:dishId/comments", async (req, res) => {
    try {
      const dishId = req.params.dishId;
      const dish = await Dish.findById(dishId);
      if (dish != null) {
        dish.comments.push(req.body);
        const addCommentToDish = await dish.save();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
          status: "success",
          data: dish,
        });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(404).json({
          status: "error",
          data: { message: `Unable to Locate dish with id  ${dishId}` },
        });
      }
      // if (createDish) {
      //   res.setHeader("Content-Type", "application/json");
      //   res.status(200).json({
      //     status: "success",
      //     data: createDish,
      //   });
      // }
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(401).json({
        status: "error",
        data: [error.message],
      });
    }
  });

  //delete, delete all comments for a specific dish
  app.delete("/dishes/:dishId/comments", async (req, res) => {
    try {
      const dishId = req.params.dishId;
      const dish = await Dish.findById(dishId);
      if (dish != null) {
        // const { comments } = dish;
        for (let index = dish.comments.length - 1; index >= 0; index--) {
          dish.comments.id(dish.comments[index].id).remove();
        }
        const addCommentToDish = await dish.save();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
          status: "success",
          data: dish,
        });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(404).json({
          status: "error",
          data: { message: `Unable to Locate dish with id  ${dishId}` },
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  //put, update all dishes
  app.put("/dishes/:dishId/comments", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(403).json({
      status: "error",
      data: { message: "Put operation not allowed on this route" },
    });
  });
  /*
  /dishes/:dishid
*/
  //get  specific comment for specific dish
  app.get("/dishes/:dishId/comments/:commentId", async (req, res) => {
    try {
      const dishId = req.params.dishId;
      const dish = await Dish.findById(dishId);

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
  app.post("/dishes/:dishId", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(403).json({
      status: "error",
      data: { message: "post method not allowed for this route" },
    });
  });

  //delete, delete  dish with id dishId
  app.delete("/dishes/:dishId", async (req, res) => {
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
  app.put("/dishes/:dishId", async (req, res) => {
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
};
