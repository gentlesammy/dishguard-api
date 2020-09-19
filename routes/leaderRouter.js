module.exports = (app) => {
  //get all leaders
  app.get("/leaders", (req, res) => {
    res.end("I will send you list of all leaders");
  });

  //post a leader detail to database
  app.post("/leaders", (req, res) => {
    if (req.body.leaderName && req.body.leaderAbout) {
      res.end(
        "I will save leader details to database " +
          " " +
          req.body.leaderName +
          "  " +
          req.body.leaderAbout
      );
    } else {
      res.end(
        "I need details of leader to save in db, send  leaderName and leaderAbout"
      );
    }
  });

  //delete, delete all leaders
  app.delete("/leaders", (req, res) => {
    res.end("I will delete  all leaders");
  });

  //put, update all leaders
  app.put("/leaders", (req, res) => {
    res.end("I will update  all leaders");
  });

  /*
    /leaders/:leaderId
  */

  //get  leader with id, leaderId
  app.get("/leaders/:leaderId", (req, res) => {
    const id = req.params.leaderId;
    res.end("I will send you all details of leader with id of " + id);
  });

  //post a leader id  to database
  app.post("/leaders/:leaderId", (req, res) => {
    res.end("post method not allowed for this route");
  });

  //delete, delete  leader with id leaderId
  app.delete("/leaders/:leaderId", (req, res) => {
    const id = req.params.leaderId;
    res.end("I will delete  leader with id " + id);
  });

  //put, update  leader with id leaderId
  app.put("/leaders/:leaderId", (req, res) => {
    const leaderId = req.params.leaderId;
    res.end("I will update dish with id  " + leaderId);
  });
};
