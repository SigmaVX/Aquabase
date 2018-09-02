const router = require("express").Router();
const dbController = require("../../../controllers/controller");
const Videos = require("../../../models/Videos");

// For "/api/videos"
router
  .route("/")
  .get(function(req, res) {dbController.findAll(Videos, req, res);})
  .post(function(req, res) {dbController.create(Videos, req, res);});

// For "/api/videos/:id"
router
  .route("/:id")
  .get(function(req, res) {dbController.findById(Videos, req, res);})
  .put(function(req, res) {dbController.update(Videos, req, res);})
  .delete(function(req, res) {dbController.remove(Videos, req, res);});

module.exports = router;