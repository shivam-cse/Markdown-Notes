const express = require('express');
const { route } = require('express/lib/application');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');
const User = require('../models/Users');
const fetchUser = require('../middleware/fetchUser')
const router = express.Router();
const jwt_secret = "shivamsahucse2019iiitg.ac.inb.tech";

//Rout1 : create a user using api/auth/createUser
router.post('/createUser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('password', 'Password must be atleast 5 characters ').isLength({ min: 5 }),
  body('email', 'Enter a valid email id').isEmail()
], async (req, res) => {
  //it is for tell us whether user has been created successfully or not
  let success = false;

  //check the validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.message)
    return res.status(400).json({ success, errors: errors.array() });
  }

  //check whether this user already exist or not
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    //user is already exist
    return res.status(400).json({ success, error: "this email id already exits!" })
  }

  try {
    //generate salt to make strong encryption
    const salt = await bcrypt.genSalt(10)

    //encrypt the user password
    secPass = await bcrypt.hash(req.body.password, salt);

    //create the user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })

    const data = {
      user: {
        id: user._id
      }
    }
    //setting suuccess as true 
    success = true;

    //
    const authToken = jwt.sign(data, jwt_secret);
    res.json({ success, authToken })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Some error occured" })
  }

})

//Route 2 : user authentication by  using : POST api/auth/login - Login not required
router.post('/login', [
  body('password', "password can't blank").exists(),
  body('email', "enter valid email").isEmail()
], async (req, res) => {

  //it is for tell us whether user has been loggined successfully or not
  let success = false;

  //check the validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //get data from user
  const { email, password } = req.body;

  try {
    //find the user into database
    let user = await User.findOne({ email });

    if (!user) {
     //user does not exist
      return res.status(400).json({ success, error: "please try to login with correct credentails" })
    }

    //match the password
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      let success = false;
      return res.status(400).json({ success, error: "please try to login with correct credentails" })
    }
    const data = {
      user: {
        id: user._id
      }
    }
    const authToken = jwt.sign(data, jwt_secret);
    let success = true;
    res.json({ success, authToken })

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Some error occured" })
  }
})

//Route3: Get user data using api/auth/getuser - Login required
router.post('/getuser', fetchUser, async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({ user });
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "internal server error " });
  }

})



module.exports = router