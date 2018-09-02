// ==========================================================
//
// youtubevidsRoutes.js
//
// =========================================================

// youtube api routes to be used on front end

const router = require("express").Router();
const {google} = require("googleapis");
const axios = require("axios");

require("dotenv").config();

// use of Express Router
const YOUTUBE_URL = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API}`;

// Matches with "/api/youtubevids"
router
  .route("/")
    .get(function(req,res) {
      console.log("in /api/youtubevids on server: ", JSON.stringify(req.query));
      axios
      .get(`${YOUTUBE_URL}`, {params: req.query})
      .then(function(youtubeInfo){
        // console.log(youtubeInfo.data);
        res.json(youtubeInfo.data);
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
      });
  
  });

module.exports = router;