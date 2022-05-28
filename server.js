require('dotenv').config();
require('./DataBase/database');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const sessions = require('express-session')
const passport = require('passport');

const userRoutes = require('./Routes/userRoutes')
const billRoutes = require('./Routes/billRoutes')

const port = process.env.PORT;

app.use(bodyParser.json())
app.use(sessions({ secret: 'anything' }))
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send({
        status: 200,
        message: 'hello world'
    })
})

app.use(userRoutes);
app.use(billRoutes);


app.listen(port, () => console.log(`server is connected to ${port}`))