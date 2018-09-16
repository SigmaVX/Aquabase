const router = require("express").Router();
const dbController = require("../../../controllers/controller");
const Trips = require("../../../models/Trips");

// For "/api/trips"
router
  .route("/")
  .get(function(req, res) {dbController.findAll(Trips, req, res);})
  .post(function(req, res) {dbController.create(Trips, req, res);});

// For "/api/trips/:id"
router
  .route("/:id")
  .get(function(req, res) {dbController.findById(Trips, req, res);})
  .put(function(req, res) {dbController.update(Trips, req, res);})
  .delete(function(req, res) {dbController.remove(Trips, req, res);});

module.exports = router;