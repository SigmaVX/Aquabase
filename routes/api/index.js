const router = require("express").Router();
const boatsRoutes = require("./boats/boatsRoutes");
const clientsRoutes = require("./clients/clientsRoutes");
const tripsRoutes = require("./trips/tripsRoutes");
const usersRoutes = require("./users/usersRoutes");

router.use("/boats", boatsRoutes);
router.use("/clients", clientsRoutes);
router.use("/trips", tripsRoutes);
router.use("/users", usersRoutes);

module.exports = router;