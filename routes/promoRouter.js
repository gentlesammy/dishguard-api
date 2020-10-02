const Promotion = require("../model/promotionsModel");
const authenticate = require("../authenticate");
module.exports = (app) => {
  //get all promotions
  app.get("/promotions", async (req, res) => {
    try {
      const promos = await Promotion.find({});
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        status: "success",
        data: promos,
      });
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(403).json({
        status: "error",
        error: error,
      });
    }
  });

  //post promotions to database
  app.post(
    "/promotions",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    async (req, res) => {
      try {
        const addNewPromo = await Promotion.create(req.body);
        if (addNewPromo) {
          res.setHeader("Content-Type", "application/json");
          res.status(201).json({
            status: "success",
            data: addNewPromo,
          });
        }
      } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(403).json({
          status: "error",
          error: error,
        });
        // console.log(error);
      }
    }
  );

  //delete, delete all promotions
  app.delete(
    "/promotions",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    async (req, res) => {
      try {
        const deleteall = await Promotion.deleteMany();
        if (deleteall) {
          res.setHeader("Content-Type", "application/json");
          res.status(200).json({
            status: "success",
            data: { message: "all promotions deleted" },
          });
        }
      } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(403).json({
          status: "error",
          error: error,
        });
      }
    }
  );

  //put, update all promotions
  app.put(
    "/promotions",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.status(403).json({
        status: "error",
        error: { message: "Put request not allowed for this route" },
      });
    }
  );

  /*
    /promotions/:promoId
  */

  //get  promotion with id, promoId
  app.get("/promotions/:promoId", async (req, res) => {
    try {
      const promoId = req.params.promoId;
      const promo = await Promotion.findById(promoId);
      if (promo != null) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
          status: "success",
          data: promo,
        });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(404).json({
          status: "error",
          error: {
            message: "We cannot locate the promotion you requested for",
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

  //post a promotion with id  to database
  app.post(
    "/promotions/:promoId",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.status(403).json({
        status: "error",
        error: {
          message: "Post not allowed for this route",
        },
      });
    }
  );

  //delete, delete the promotion with id promoId
  app.delete(
    "/promotions/:promoId",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    async (req, res) => {
      try {
        const promoId = req.params.promoId;
        const promo = await Promotion.findById(promoId);
        if (promo != null) {
          await Promotion.findByIdAndDelete(promoId);
          res.setHeader("Content-Type", "application/json");
          res.status(200).json({
            status: "success",
            data: { message: "promo deleted" },
          });
        } else {
          res.setHeader("Content-Type", "application/json");
          res.status(404).json({
            status: "error",
            error: {
              message: "We cannot locate the promotion you want to delete",
            },
          });
        }
      } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(403).json({
          status: "error",
          error: {
            message: "something is wrong",
            error: error,
          },
        });
      }
    }
  );

  //put, update promotion with id promoId
  app.put(
    "/promotions/:promoId",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    async (req, res) => {
      try {
        const promoId = req.params.promoId;
        const promo = await Promotion.findById(promoId);
        if (promo != null) {
          const updatedPromo = await Promotion.findByIdAndUpdate(
            promoId,
            req.body
          );
          if (updatedPromo) {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json({
              status: "success",
              data: updatedPromo,
            });
          }
        } else {
          res.setHeader("Content-Type", "application/json");
          res.status(404).json({
            status: "error",
            error: {
              message: "We cannot locate the promotion you want to Update",
            },
          });
        }
      } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(403).json({
          status: "error",
          error: {
            message: "something is wrong",
            error: error,
          },
        });
        console.log(error);
      }
    }
  );
};
