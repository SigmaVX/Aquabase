const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 
const { check, validationResult } = require('express-validator/check');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

let Schema = mongoose.Schema;

let usersSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    // trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone:{
    type: String,
    required: false,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  userType: {
    type: String,
    default: "Crew",
  },
  userImage: {
    type: String,
    default: "add default img",
  },
  addedOnDate: { 
    type: Date,
    default: Date.now()
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type:Date
  }
});

// Authentication Methods For Users
// ==================================================


// Login - Authenticate user login input against database
usersSchema.statics.authenticate = function (username, password, cb) {
  Users
    .findOne({ username: username })
    .exec(function (err, user) {
      if (err) return cb(err);

      if (!user) {
        // "User not found in database."
        let err = new Error('User Not Found');
        return cb(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          console.log(err);
          cb(err,null);
        }
        // 1st CB parameter is the error and 2nd is the user info
        return (result) ? cb(null, user) : cb(err, null);
      })
    });
}


// Passport Stategy - Not Used
usersSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    // First Param of CB is Error so Null Means No Error
    cb(null, isMatch);
  });
};

passport.use(new LocalStrategy(function(username, password, done) {
  Users.findOne({ username: username }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect Username and/or Password' });
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect Username and/or Password' });
      }
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  Users.findById(id, function(err, user) {
    done(err, user);
  });
});


// Sign Up - Hash a password before saving it to users database
// Source: https://medium.com/of-all-things-tech-progress/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
usersSchema.pre("save", function(next) {

  let user = this;
  let SALT_FACTOR = 10;

  // TW Added
  if (!user.isModified('password')) return next();

  // Bcrypt syntax - (plain password, salt round, function after hash)
  bcrypt.hash(user.password, SALT_FACTOR, function (err, hash) {
    if (err) return next(err);
    // Sets User Plain Text Password To The Hash
    user.password = hash;
    next();
  })
});

let Users = mongoose.model("Users", usersSchema);

module.exports = Users;

// Inbound Data Should Be Sent As Follows:
// firstName:Tony
// lastName:Wible
// email:123@gmail.com
// password:123
// userType:admin
// userImage: imgpath.jpg
// addedOnDate:10-10-2010
// resetPasswordToken:123
// resetPasswordExpires:10-10-2010
