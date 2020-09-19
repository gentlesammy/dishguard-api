module.exports = (app) => {
  //get all promotions
  app.get("/promotions", (req, res) => {
    res.end("I will send you all promotions");
  });

  //post promotions to database
  app.post("/promotions", (req, res) => {
    if (req.body.promoName && req.body.promoDesc) {
      res.end(
        "I will save promotions details to database " +
          " promo name: " +
          req.body.promoName +
          " promo description: " +
          req.body.promoDesc
      );
    } else {
      res.end(
        "I need details of promotions to save in db. send  promoName and promoDesc"
      );
    }
  });

  //delete, delete all promotions
  app.delete("/promotions", (req, res) => {
    res.end("I will delete  all promotions");
  });

  //put, update all promotions
  app.put("/promotions", (req, res) => {
    res.end("I will update  all promotions");
  });

  /*
    /promotions/:promoId
  */

  //get  promotion with id, promoId
  app.get("/promotions/:promoId", (req, res) => {
    const id = req.params.promoId;
    res.end("I will send you all details of promotion with id of " + id);
  });

  //post a promotion with id  to database
  app.post("/promotions/:promoId", (req, res) => {
    res.end("post method not allowed for this route");
  });

  //delete, delete the promotion with id promoId
  app.delete("/promotions/:promoId", (req, res) => {
    const id = req.params.promoId;
    res.end("I will delete  promotion with id " + id);
  });

  //put, update promotion with id promoId
  app.put("/promotions/:promoId", (req, res) => {
    const promoId = req.params.promoId;
    res.end("I will update promotion with id  ", promoId);
  });
};
