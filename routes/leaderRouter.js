//import leader model
const Leader = require("../model/leadersModel");
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
      res.status(500).json({
        status: "error",
        message:
          "There is an unresolved error from our end. Please be patient while we resolve it",
      });
    }
  });

  //post a leader detail to database
  app.post("/leaders", async (req, res) => {
    try {
      // const { name, image, designation, abbr, featured } = req.body;
      const addLeader = await Leader.create(req.body);
      if (addLeader) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
          status: "success",
          data: addLeader,
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

  //delete, delete all leaders
  app.delete("/leaders", async (req, res) => {
    try {
      const leadersRemoved = await Leader.remove({});
      if (leadersRemoved) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
          status: "success",
          data: { message: "All Leaders removed" },
        });
      }
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(403).json({
        status: "error",
        data: [error.message],
      });
    }
  });

  //put, update all leaders
  app.put("/leaders", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(403).json({
      status: "error",
      data: [{ message: "PUT action not allowed on this route" }],
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
          status: "success",
          data: {
            message: "We do not have record of the leader you requested for",
          },
        });
      }
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(403).json({
        status: "error",
        data: [error.message],
      });
    }
  });

  //post a leader id  to database
  app.post("/leaders/:leaderId", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(403).json({
      status: "error",
      data: {
        message: "POST action not supported for this route",
      },
    });
  });

  //delete, delete  leader with id leaderId
  app.delete("/leaders/:leaderId", async (req, res) => {
    try {
      const leaderId = req.params.leaderId;
      const deletedLeader = await Leader.findByIdAndDelete(leaderId);
      if (deletedLeader) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
          status: "success",
          data: { message: "Leader deleted successfully" },
        });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(403).json({
          status: "error",
          data: [error.message],
        });
      }
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(403).json({
        status: "error",
        data: [{ message: "what are you trying to delete?" }],
      });
    }
  });

  //put, update  leader with id leaderId
  app.put("/leaders/:leaderId", async (req, res) => {
    try {
      const leaderId = req.params.leaderId;
      const updatedLeader = await Leader.findByIdAndUpdate(
        leaderId,
        { $set: req.body },
        { new: true }
      );
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        status: "success",
        data: updatedLeader,
      });
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(403).json({
        status: "error",
        data: [error.message],
      });
    }
  });
};
