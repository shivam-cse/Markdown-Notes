const express = require('express');
const { route } = require('express/lib/application');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {body, validationResult } = require('express-validator');
const User = require('../models/Users');
const fetchUser = require('../middleware/fetchUser')
const router = express.Router();
const jwt_secret = "shivamsahucse2019iiitg.ac.inb.tech";

//create a user using api/auth/createUser
router.post('/createUser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('password', 'Password must be atleast 5 characters ').isLength({ min: 5 }),
  body('email', 'Enter a valid email id').isEmail()
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {

  let success = false;
  return res.status(400).json({success, error: "this email id already exits!" })
  }
  try {
    const salt = await bcrypt.genSalt(10)
    secPass = await bcrypt.hash(req.body.password, salt);
    // console.log("secPass  :", salt, " " , secPass);
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })

    // .then(user => res.json(user)).catch((err) => {
    //   console.log(err)
    //   res.json({error:"Please enter unique value"})
    // })
    const data = {
      data:{
        id:user.id
      }
    }
    success = true;
    const authToken = jwt.sign(data, jwt_secret);
    res.json({success, authToken})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Some error occured" })
  }

})

//authentication a using : POST api/auth/login - Login not required
router.post('/login', [
  body('password', "password can't blank").exists(),
  body('email', "enter valid email").isEmail()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  
  try {
    let user = await User.findOne({ email});
    if (!user) {
      let success = false;
      return res.status(400).json({ success, error: "please try to login with correct credentails" })
    }
    
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      let success = false;
      return res.status(400).json({success, error: "please try to login with correct credentails" })
    }
    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data, jwt_secret);
    let success = true;
    res.json({success, authToken})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Some error occured" })
  }
})

//Get user data using api/auth/getuser - Login required

router.post('/getuser', fetchUser, async (req, res) => {
      
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({user});
    
  } catch (error) {
    console.log(error);
    res.status(500).send({error:"internal server error-"});
  }

})



module.exports = router