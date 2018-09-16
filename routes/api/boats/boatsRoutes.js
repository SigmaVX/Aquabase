const router = require("express").Router();
const dbController = require("../../../controllers/controller");
const Boats = require("../../../models/Boats");

// For "/api/boats"
router
  .route("/")
  .get(function(req, res) {dbController.findAll(Boats, req, res);})
  .post(function(req, res) {dbController.create(Boats, req, res);});

// For "/api/boats/:id"
router
  .route("/:id")
  .get(function(req, res) {dbController.findById(Boats, req, res);})
  .put(function(req, res) {dbController.update(Boats, req, res);})
  .delete(function(req, res) {dbController.remove(Boats, req, res);});

module.exports = router;
