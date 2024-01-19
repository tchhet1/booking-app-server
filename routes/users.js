const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/register', (req, res) => {
    const {username, password} = req.body;   
    res.json({"message": "user created successfully", username});
    res.send("user created successfully")
})

module.exports = router;
