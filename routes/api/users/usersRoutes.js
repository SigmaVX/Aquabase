const router = require("express").Router();
const dbController = require("../../../controllers/controller");
const Users = require("../../../models/Users");

// For "/api/users"
router
  .route("/")
  .get(function(req, res) {dbController.findAll(Users, req, res);})
  .post(function(req, res) {dbController.create(Users, req, res);});

// For "/api/users/:id"
router
  .route("/:id")
  .get(function(req, res) {dbController.findById(Users, req, res);})
  .put(function(req, res) {dbController.update(Users, req, res);})
  .delete(function(req, res) {dbController.remove(Users, req, res);});

module.exports = router;