const router = require("express").Router();
const async = require("async");
const crypto = require("crypto");
const Users = require("../../../models/Users");

// For "auth/forgot"
router
  .route("/")
  .post(
    function(req, res) {
      async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function(token, done) {
          Users.findOne({ email: req.body.email }, function(err, user) {
            if (err) throw err;
            if (!user) {
              res.send('This Email Is Not Associated With Your Aquabase Account');
            } else {
    
              user.resetPasswordToken = token;
              user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      
              user.save(function(err) {
                done(err, token, user);
              });
            }
          });
        },
        function(token, user, done) {

          var api_key = process.env.MAILGUN_API;
          var DOMAIN = process.env.MAILGUN_DOMAIN;
          var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

          var data = {
            from: 'cloudmashllc@gmail.com',
            to: user.email,
            subject: 'Tilt - Password Reset',
            html: `<p>Howdy! Someone wants toreset the password for the Tilt.gg account associated with this email address. Click on the following link, or paste it into your browser to complete the process: </p>
            </br>
            </br>
            
            <a target="_blank" href="http://${req.headers.host}/auth/reset/${token}">http://${req.headers.host}/auth/reset/${token}</a>
            <br>
            <br>
            
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
            
          };

          mailgun.messages().send(data, function (error, body) {
            if (error) {
                  console.log("Mailgun Error: ", error);
                  res.status(500).send("Your Reset Email Was Not Sent (Backend Server Error)");
                }
               console.log("Body: ",  body);
               res.send(`An Email Was Sent To ${user.email} With Reset Instrucitons`)
          });
        }
      ], 
    );
  });

module.exports = router;

// <a target="_blank" href="http://${req.headers.host}/auth/reset/${token}">http://${req.headers.host}/auth/reset/${token}</a>