const router = require("express").Router();
const cheatersRoutes = require("./cheaters/cheatersRoutes");
const cheatsRoutes = require("./cheats/cheatsRoutes");
const countsRoutes = require("./counts/countsRoutes");
const forumRoutes = require("./forum/forumRoutes");
const gamesRoutes = require("./games/gamesRoutes");
const reportsRoutes = require("./reports/reportsRoutes");
const systemsRoutes = require("./systems/systemsRoutes");
const usersRoutes = require("./users/usersRoutes");
const chatsRoutes = require("./chats/chatsRoutes");
const videosRoutes = require("./videos/videosRoutes");
const youtubevidsRoutes = require("./youtubevids/youtubevidsRoutes");

router.use("/cheaters", cheatersRoutes);
router.use("/cheats", cheatsRoutes);
router.use("/counts", countsRoutes);
router.use("/forum", forumRoutes);
router.use("/games", gamesRoutes);
router.use("/reports", reportsRoutes);
router.use("/systems", systemsRoutes);
router.use("/users", usersRoutes);
router.use("/chats", chatsRoutes);
router.use("/videos", videosRoutes);
router.use("/youtubevids", youtubevidsRoutes);

module.exports = router;