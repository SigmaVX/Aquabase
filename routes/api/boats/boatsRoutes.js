
const router = require("express").Router();
const dbController = require("../../../controllers/controller");
const Reports = require("../../../models/Boats");

// For "/api/reports"
router
  .route("/")
  .get(function(req, res) {dbController.findAllReports(Reports, req, res);})
  .post(function(req, res) {dbController.create(Reports, req, res);});

// For "/api/reports/id"
router
  .route("/id")
  .get(function(req, res) {console.log("Route Hit For Reports By ID"); dbController.findById(Reports, req, res);})
  .put(function(req, res) {dbController.update(Reports, req, res);})
  .delete(function(req, res) {dbController.remove(Reports, req, res);});

 // For "/api/reports/ign" 
router
  .route("/ign")  
  .get(function(req, res) {console.log("Route Hit For Reports By IGN"); dbController.findByIGN(Reports, req, res);})

// For "/api/reports/commentsandvideo/:id"   
router
  .route("/commentsandvideo/:id")
  .put(function(req, res) {console.log("Route Hit For Reports For Comments & Video Update");dbController.update(Reports, req, res);})

// For "/api/reports/recent" 
router
  .route("/recent")
  .get(function(req, res) {console.log("Route Hit For Reports By Time"); dbController.findByTime(Reports, req, res);})
  
module.exports = router;
