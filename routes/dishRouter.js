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

  //get all dish with id, dishid
  app.get("/dishes/:dishid", (req, res) => {
    const id = req.params.dishid;
    res.end("I will send you all details of dish with id of " + id);
  });

  //post a dish id  to database
  app.post("/dishes/:dishid", (req, res) => {
    res.end("post method not allowed for this route");
  });

  //delete, delete all dishes
  app.delete("/dishes/:dishid", (req, res) => {
    const id = req.params.dishid;
    res.end("I will delete  dish with id " + id);
  });

  //put, update all dishes
  app.put("/dishes/:dishid", (req, res) => {
    const dishid = req.params.dishid;
    console.log(dishid);
    res.end("I will update dish with id  ", dishid);
  });
};
