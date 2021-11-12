module.exports = (app) => {
  const table = require("../controllers/liveTableController");

  var router = require("express").Router();

  //Get all data
  router.get("/", table.findAll);
  //get with fiters
  router.get("/filtered", table.getFilteredData);
  //add new row
  router.post("/", table.create);
  // Update a row
  router.put("/:id", table.update);
  // Delete a row with id
  router.delete("/:id", table.delete);

  app.use("/api/table", router);
};
