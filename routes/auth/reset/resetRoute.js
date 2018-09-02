const router = require("express").Router();
const Users = require("../../../models/Users");
const dbController = require("../../../controllers/userController");
const bcrypt = require("bcrypt"); 

// For "auth/reset"
router
  .route("/")
  .get(
    function(req, res){
      // console.log("Sessions Test: ", req.session.userId);
      res.json({
        userId: req.session.userId,
        username: req.session.username,
        email: req.session.email
      });
    }
  )
  .post(
    function(req, res) {
      // Hash Password Before Save
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        if (err) return next(err);
        req.body.password = hash;
        req.params.id = req.body.userId;
        console.log("Hashed Info: ", req.body.password, " for ", req.params);
        dbController.update(req, res);
      });
    });
  
// For "auth/reset/token"
router
  .route("/:token")
  .get(
    function(req, res) {

      Users.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        console.log("User Info: ", user);

        if (user) {
          console.log("User: ", user);
          req.session.userId = user._id;
          req.session.username = user.username;
          req.session.email = user.email;
          req.session.save();

          // console.log("User ID Test: ", req.session.userId);
          // Use for URL When In Development and Relative Path In Production
          // res.redirect("http://localhost:3000/auth/reset");
          res.redirect("/auth/reset");

        } else {
          // res.redirect("http://localhost:3000/forgot")
          res.redirect("/forgot")     
        }
      }
    )
  });
    

module.exports = router;

