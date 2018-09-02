const router = require("express").Router();
const dbController = require("../../../controllers/userController");
const { check, body, checkBody, validationResult } = require('express-validator/check');


// For "/auth/signup"
router
  .route("/")

  .post([
    
    // Express Validation Checks - Not Really Needed Bc We Also Do In Controller Manually
    body('username', 'Username Must Be 3 To 30 Characters Long').trim().isLength({ min: 3, max: 30 }),
    body('email', 'This Email Is Invalid').trim().isEmail(),
    body('email', 'Email Must Be 4 to 100 Characters').trim().isLength({ min:4, max:100}),
    body('password', 'Password Must Be 6 To 100 Characters').trim().isLength({ min:6, max:100}),
    // body('pswrdConfirmation', 'Passwords Do Not Match').equals(req.body.password),


    body('pswrdConfirmation').custom((value, { req }) => {
      if (req.body.pswrdConfirmation !== req.body.password) {
        throw new Error('Passwords Do Not Match');
      } else{
        return value;
      }
    }),

    // Additional validation to ensure username is alphanumeric with underscores and dashes
    body('username', 'Username Can Only Contain Letters, Numbers, Or Underscores').matches(/^[a-zA-Z0-9-_]+$/, 'i')
    ], function(req, res) {


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