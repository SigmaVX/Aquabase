const router = require("express").Router();
// const dbController = require("../../controllers/userController");

// For "auth/logout"
router
  .route("/")
  .get(function (req, res) {
    req.logout();
    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) throw err;
        return res.status(200).json({
          isLoggedIn: false,
          isAdmin: false, 
          userId: "",
          username: "",
          email: ""
        });
        // return res.redirect("/");
      });
    }
  });

module.exports = router;