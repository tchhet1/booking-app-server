const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js')
const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRET_KEY



//generate token on login
const generateToken = (email, userId) => {
    return jwt.sign({email, userId}, secretkey, {expiresIn: '24h'});
}

//route to register user
router.post('/register', async (req, res) => {
    const {firstname, lastname, email, password} = req.body;  
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
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        if(await bcrypt.compare(password, user.password)){
            console.log('got it');
            const token = generateToken(email, user._id);
            res.status(200).json({"message": "user is successfully logged in", token, user});
        } else {
            console.log("password doesn't match");
            res.status(401).json({"message": "Username/Password doesn't match"});
        }       
    } else {
        res.status(403).json({"message": "User doesn't exist"});
    }
})




module.exports = router;
