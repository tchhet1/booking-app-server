const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js')

//route to register user
router.post('/register', async (req, res) => {
    const {email, password} = req.body;  
    const userFound = await User.findOne({email});
    const hashedPassword = await bcrypt.hash(password, 10);

    if(userFound){
        res.status(401).json({message: "User already exist. Please login"})
    } else {
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
          });          
        await newUser.save();
        res.status(200).json({"message": "user created successfully", newUser});
    }  
})

//login route
router.post('/login', async (req, res) => {
    
})

module.exports = router;
