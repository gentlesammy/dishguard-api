const Leader = require("../model/leadersModel");
const authenticate = require("../authenticate");
module.exports = (app) => {
  //get all leaders
  app.get("/leaders", async (req, res) => {
    try {
      const leaders = await Leader.find({});
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        status: "success",
        data: leaders,
      });
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(403).json({
        status: "error",
        error: error,
      });
    }
  });

  //post a leader detail to database
  app.post("/leaders", authenticate.verifyUser, async (req, res) => {
    try {
      const addNewLeader = await Leader.create(req.body);
      if (addNewLeader) {
        res.setHeader("Content-Type", "application/json");
        res.status(201).json({
          status: "success",
          data: addNewLeader,
        });
      }
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(403).json({
        status: "error",
        error: error,
      });
      console.log(error);
    }
  });

  //delete, delete all leaders
  app.delete("/leaders", authenticate.verifyUser, async (req, res) => {
    try {
      const deleteall = await Leader.deleteMany();
      if (deleteall) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
          status: "success",
          data: { message: "all Leaders deleted" },
        });
      }
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(403).json({
        status: "error",
        error: error,
      });
    }
  });

  //put, update all leaders
  app.put("/leaders", authenticate.verifyUser, async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(403).json({
      status: "error",
      error: { message: "Put request not allowed for this route" },
    });
  });

  /*
    /leaders/:leaderId
  */

  //get  leader with id, leaderId
  app.get("/leaders/:leaderId", async (req, res) => {
    try {
      const leaderId = req.params.leaderId;
      const leader = await Leader.findById(leaderId);
      if (leader != null) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
          status: "success",
          data: leader,
        });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(404).json({
          status: "error",
          error: {
            message: "We cannot locate the leader you requested for",
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

  //post a leader id  to database
  app.post("/leaders/:leaderId", authenticate.verifyUser, async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(403).json({
      status: "error",
      error: {
        message: "Post not allowed for this route",
      },
    });
  });

  //delete, delete  leader with id leaderId
  app.delete(
    "/leaders/:leaderId",
    authenticate.verifyUser,
    async (req, res) => {
      try {
        const leaderId = req.params.leaderId;
        const leader = await Leader.findById(leaderId);
        if (leader != null) {
          await Leader.findByIdAndDelete(leaderId);
          res.setHeader("Content-Type", "application/json");
          res.status(200).json({
            status: "success",
            data: { message: "leader deleted" },
          });
        } else {
          res.setHeader("Content-Type", "application/json");
          res.status(404).json({
            status: "error",
            error: {
              message: "We cannot locate the Leader you want to delete",
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

  //put, update  leader with id leaderId
  app.put("/leaders/:leaderId", authenticate.verifyUser, async (req, res) => {
    try {
      const leaderId = req.params.leaderId;
      const leader = await Leader.findById(leaderId);
      if (leader != null) {
        const updatedLeader = await Leader.findByIdAndUpdate(
          leaderId,
          req.body
        );
        if (updatedLeader) {
          const leadern = await Leader.findById(leaderId);
          res.setHeader("Content-Type", "application/json");
          res.status(200).json({
            status: "success",
            data: leadern,
          });
        }
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(404).json({
          status: "error",
          error: {
            message: "We cannot locate the Leader you want to Update",
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
  });
};
