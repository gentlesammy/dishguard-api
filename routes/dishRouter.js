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
};
