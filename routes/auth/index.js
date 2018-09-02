const router = require("express").Router();

const signupRoute = require("./signup/signupRoute");
const loginRoute = require("./login/loginRoute");
const logoutRoute = require("./logout/logoutRoute");
const isadminRoute = require("./isadmin/isadminRoute");
const forgotRoute = require("./forgot/forgotRoute");
const resetRoute = require("./reset/resetRoute");

router.use("/signup", signupRoute);
router.use("/login", loginRoute);
router.use("/logout", logoutRoute);
router.use("/isadmin", isadminRoute);
router.use("/forgot", forgotRoute);
router.use("/reset", resetRoute);

module.exports = router;