const router = require("express").Router();
const dbController = require("../../../controllers/userController");

// For "auth/login"
router
  .route("/")
  .get(function(req, res) {dbController.findById(req, res);})
  .post(function(req, res, next) {dbController.login(req, res, next);}) 

module.exports = router;