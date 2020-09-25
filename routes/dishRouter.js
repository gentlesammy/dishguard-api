module.exports = (app) => {
  //get all dishes
  app.get("/dishes", (req, res) => {
    res.end("I will send you all dishes");
  });

  //post a dish detail to database
  app.post("/dishes", (req, res) => {
    if (req.body.dishName && req.body.dishIngredients) {
      res.end(
        "I will save dishes details to database" +
          req.body.dishName +
          req.body.dishIngredients
      );
    } else {
      res.end("I need details of dishes to save in db");
    }
  });

  //delete, delete all dishes
  app.delete("/dishes", (req, res) => {
    res.end("I will delete  all dishes");
  });

  //put, update all dishes
  app.put("/dishes", (req, res) => {
    res.end("I will update  all dishes");
  });

  /*
  /dishes/:dishid
*/

  //get  dish with id, dishId
  app.get("/dishes/:dishId", (req, res) => {
    const id = req.params.dishId;
    res.end("I will send you all details of dish with id of " + id);
  });

  //post a dish id  to database
  app.post("/dishes/:dishId", (req, res) => {
    res.end("post method not allowed for this route");
  });

  //delete, delete  dish with id dishId
  app.delete("/dishes/:dishId", (req, res) => {
    const id = req.params.dishId;
    res.end("I will delete  dish with id " + id);
  });

  //put, update  dish with id dishId
  app.put("/dishes/:dishId", (req, res) => {
    const dishId = req.params.dishId;
    res.end("I will update dish with id  " + dishId);
  });
};
