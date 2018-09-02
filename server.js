// Dependencies
// =============================================================
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const MongoStore = require("connect-mongo")(session);
const expressValidator = require('express-validator');
const routes = require("./routes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const	fs = require("fs");
const path = require("path");
var async = require('async');
var crypto = require('crypto');
require("dotenv").config();


// Setup Express App - 
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// 
// Add Database
// =============================================================
const MONGODB_LOCATION = process.env.MONGODB_URI || "mongodb://localhost/tilt";
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tilt");


// Middleware
// ==============================================================

// Use Morgan to log requests
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {"flags": "a"});

//  Set Morgan to output to access.log file and to console
app.use(logger("common", {"stream": accessLogStream}));
app.use(logger("dev"));

// Use bodyParser middleware to parse strings
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use express-validator to check data before entering DB
// Add options inside an array as a parameter if wanted
app.use(expressValidator()); 

// To Read Cookies
app.use(cookieParser());

// Use Sessions for tracking logins
// Set Cookie To True If Using HTTPS - For Dev You Can Comment Out.
// SaveUnitialized Saves A Cookie On User's Device
app.use(session({
  secret: "dance with the devil in the pale of the moonlight",
  resave: false,
  saveUninitialized: false,
  cookie: {secure:false},
  store: new MongoStore({
    url: MONGODB_LOCATION
  })
}));

// Use Passport For Authentication
app.use(passport.initialize());
app.use(passport.session());

// Serve Static Assets On Live (e.g.  Heroku)
// =============================================================
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// API Routes
// =============================================================
app.use(routes);

// Send All Requests To React App
// =============================================================
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Setup socket.io
// ============================================================= 
// var server = require("http").createServer(app);
// var io = require("socket.io")(server);

// Open socket listener for chat feature
// ==============================================================
// start up socket io
// require("./socket")(io);

// server.listen(PORT); changed to app.listen from server.listen
// to remove socket.io functionality
// server.listen(PORT, function() {
//   console.log(`🌎 ==> Server now on port ${PORT}!`);
// });

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
