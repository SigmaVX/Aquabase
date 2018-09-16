const router = require("express").Router();
const dbController = require("../../../controllers/controller");
const Clients = require("../../../models/Clients");

// For "/api/clients"
router
  .route("/")
  .get(function(req, res) {dbController.findAll(Clients, req, res);})
  .post(function(req, res) {dbController.create(Clients, req, res);});

// For "/api/clients/:id"
router
  .route("/:id")
  .get(function(req, res) {dbController.findById(Clients, req, res);})
  .put(function(req, res) {dbController.update(Clients, req, res);})
  .delete(function(req, res) {dbController.remove(Clients, req, res);});

module.exports = router;