const mongoose = require('mongoose');

const billsSchema = new mongoose.Schema({
    billId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    payable: {
        type: Number,
        required: true
    },
    receivable: {
        type: Number
    }
})

module.exports = mongoose.model('billsSchema', billsSchema)