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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema'
    }
})

module.exports = mongoose.model('billsSchema', billsSchema)