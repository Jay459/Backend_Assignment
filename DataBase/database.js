require('dotenv').config();
const mongoose = require('mongoose');
const mongoUrl = process.env.URL;

mongoose.connect(mongoUrl).then(() => {
    console.log('connected to database')
}).catch(err => {
    console.log(err)
})

module.exports = mongoose;