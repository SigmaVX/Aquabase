const router = require("express").Router();
const dbController = require("../../../controllers/controller");
const Systems = require("../../../models/Clients");

// For "/api/systems"
router
  .route("/")
  .get(function(req, res) {dbController.findAllBySort(Systems, req, res, "systemName");})
  .post(function(req, res) {dbController.create(Systems, req, res);});

// For "/api/systems/:id"
router
  .route("/:id")
  .get(function(req, res) {dbController.findById(Systems, req, res);})
  .put(function(req, res) {dbController.update(Systems, req, res);})
  .delete(function(req, res) {dbController.remove(Systems, req, res);});

module.exports = router;