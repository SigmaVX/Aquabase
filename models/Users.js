const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 

let Schema = mongoose.Schema;

let usersSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
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
    required: true,
    trim: true
  },
  userType: {
    type: String,
    required: true,
    default: "crew",
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

// ==================================================
// Authentication Methods For Sign UP
// ==================================================
// Sign Up - Hashes a password before saving it to users database
// Pre is a mongoos method to run the function before saving
// Source: https://medium.com/of-all-things-tech-progress/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
usersSchema.pre("save", function(next) {
  let user = this;
  let SALT_FACTOR = 10;

  // TW Added - skip hash if not modifying password
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
