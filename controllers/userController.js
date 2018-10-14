const Users = require("../models/Users");
const bcrypt = require("bcrypt"); 

// Minimum password length
const MinPasswordLength = 6;

// Defining database methods for the Tilt's User table
module.exports = {

  // Add Crew To Database
  addCrew: function (req, res) {
    let isValidEntry = true;
    let errorText = "";

    function validateEmail(email) {

      // This is a strict regex - a simpler one is var re = /\S+@\S+\.\S+/;
      var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
      
      // The test() method tests for a match in a string
      // Returns true if it finds a match, otherwise it returns false
      return re.test(email);
    }
    
    // Validate name fields
    if (req.body.firstName.length == 0 || 
      req.body.lastName.length == 0) {
      isValidEntry = false;
      errorText += `Name Fields Are Missing.\n`;
    }

    // Validate email - checks for false result of validateEmail()
    if (!validateEmail(req.body.email)) {
      isValidEntry = false;
      errorText += `Invalid Email.\n`;
    }

    // validate password
    if (req.body.password.length < MinPasswordLength) {
      isValidEntry = false;
      errorText += `Password Must Be At Least ${MinPasswordLength} Characters.\n`;
    }

    // validate password match
    if (req.body.password !== req.body.pswrdConfirmation) {
      isValidEntry = false;
      errorText += `Password & Confirmation Do Not Match.\n`;
    }

    // Validate duplicate email
    Users
      .findOne({email:req.body.email}, function(err, result){
        if(err){
          console.log("Error: ", err);
          isValidEntry = false;
        }
        if(result){
          console.log("Duplicate Email Found: ", result.email);
          isValidEntry = false;
          errorText += `Email Already In Use.\n`;
        }
    
      // Run if all validations pass
      if (isValidEntry) {

        let userData = {
          firstName: req.body.firstName,
          lastName: req.body.lastName, 
          phone: req.body.phone,
          email: req.body.email, 
          password: req.body.password, 
          userType: req.body.userType,
          userImage: req.body.image
        }

        //Add data to db 
        Users
        .create(userData, function (err, user) {
          if (err) {
            console.log(err);
            // req.flash("success_msg", "Flash: User Added");
            res.status(404).send(`Back End Validation Err: ${err}`);
          }

          // Returns User Information to Front-End
          res.json({
            successMsg: "User Added"
          });          
        });       
      } else {
          res.status(404).send(errorText);
      }
    });
  },

  // Not Yet Used - Returns All Users
  findAll: function (req, res) {
    Users
      .find(req.query)
      .sort({ lastName: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Not Yet Used
  findById: function (req, res) {
    // console.log(`req.session.userId: ${req.session.userId}`);
    // console.log("req.session: ", JSON.stringify(req.session));
    Users
      .findById(req.session.userId)
      .then(dbModel => {
        // if user was not found send back false
        if (!dbModel) return res.status(404).json({isLoggedIn: false});
        // console.log("dbModel in findById: " + dbModel);

        // means user is signed in already send back true
        // session: req.session
        res.json({
          isLoggedIn: true,
          session: req.session,
          userId: req.session.userId,
          username: req.session.username,
          email: req.session.email
        });
      })
      .catch(err => res.json({isLoggedIn: false, err: err}));
  },

  // Not Yet Used Or Tested - May Be Helpful
  isAdmin: function (req, res) {
    Users
      .findById(req.session.userId)
      .then(dbModel => {
        // if user was not found send back false, status 404 not found
        if (!dbModel) return res.status(404).json({isAdmin: false});

        // check if active session user is an administrator
        if (dbModel.userType === "admin")
          res.json({isAdmin: true});
        else if (dbModel.userType === "crew")
          res.json({isAdmin: false});
        else 
          // user not of recognized type, possible db breach
          res.status(422).end();
      })
      .catch(err => res.json({isAdmin: false, err: err}));
  },

  // Login With Sessions
  login: function(req, res) {

    console.log("User Controller Hit");

    if (req.body.email && req.body.password) {

      Users
        .findOne({email: req.body.email})
        .exec(function (err, user) {
          if (err) {
            console.log(err);
            res.status(404).send("Incorrect Username/Password");
          } 
          if (!user) {
            res.status(404).send("Incorrect Username/Password");
          } else {
            // Run Comparision of Stored Hash vs. Login Hash
            bcrypt.compare(req.body.password, user.password, function (err, result) {
              if (err) {
                console.log("Bycrypt Password Match Error: ", err);
                res.status(404).send(err);
              }

              if (result) {
              
                req.session.userId = user._id;
                req.session.email = user.email;
                req.session.firstName = user.firstName;
                req.session.lastName = user.lastName;
                req.session.userType = user.userType;

                res.json({
                  firstName: req.session.firstName,
                  lastName: req.session.lastName,
                  userType: req.session.userType,
                  userId: req.session.userId,
                  email: req.session.email,
                  isLoggedIn: true
                });
              }
            })
          }
        });
    } else {
      res.status(404).send("Incorrect username/password");
    }
  },

  // Not Yet Used
  update: function (req, res) {
    Users
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Not Yet Used
  remove: function (req, res) {
    Users
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  } 

};