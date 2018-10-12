const router = require("express").Router();
const dbController = require("../../../controllers/userController");
const { check, body, checkBody, validationResult } = require('express-validator/check');


// For "/auth/signup"
router
  .route("/")

  .post([
    
    // Express Validation Checks - Not Really Needed Bc We Also Do In Controller Manually
    body('firstName', 'First Name Is Required').trim().isLength({ min: 1}),
    body('lastName', 'Last Name Is Required').trim().isLength({ min: 1}),
    body('email', 'This Email Is Invalid').trim().isEmail(),
    body('email', 'Email Must Be 4 to 100 Characters').trim().isLength({ min:4, max:100}),
    body('password', 'Password Must Be 6 To 100 Characters').trim().isLength({ min:6, max:100}),
    body('pswrdConfirmation').custom((value, { req }) => {
      if (req.body.pswrdConfirmation !== req.body.password) {
        throw new Error('Passwords Do Not Match');
      } else{
        return value;
      }
    })
    ], function(req, res) {

    // console.log("Sign Up Req: ", req.body);
    // Formats the errors returned by express validator so its compatable with the front end
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
      return `${msg}`;
    };

    const errors = validationResult(req).formatWith(errorFormatter) ;
    
    if(!errors.isEmpty()){
      console.log("Errors: ", errors.array());
      return res.status(422).send(`Back End Validation Failed: ${errors.array()[0]}`);
    } else {   
      dbController.create(req, res);
    }
  }
)

// For "/auth/signup/:id"
router
  .route("/:id")
  .put(function(req, res) {dbController.update(req, res);});

module.exports = router;