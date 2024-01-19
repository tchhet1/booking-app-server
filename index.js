const express = require('express');
const app = express();
const port = 3000;

const usersRoute = require('./routes/users.js');

app.use(express.json());
app.use('/users', usersRoute);

app.post('/', (req, res) => {
    res.send('hello');
    console.log('welcome to my app');
})

app.listen(port, () => {
    console.log('server is running');
})
