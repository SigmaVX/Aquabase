const router = require("express").Router();
const dbController = require("../../../controllers/userController");

// For "auth/isadmin"
router
  .route("/")
  .get(function(req, res) {dbController.isAdmin(req, res);});

module.exports = router;