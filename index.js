require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const url = process.env.MONGODB_URI;
const usersRoute = require('./routes/users.js');

app.use(express.json());
app.use('/users', usersRoute);

mongoose.connect(process.env.MONGODB_URI)
.catch(e => console.log("mongoose error " + e))

app.post('/', (req, res) => {
    res.send('hello');
    console.log('welcome to my app');
})

app.listen(port, () => {
    console.log('server is running');
})
