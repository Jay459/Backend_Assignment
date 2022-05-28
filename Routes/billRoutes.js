const billControllers = require('./../Controllers/billsControllers');
const auth = require('./../Middleware/auth')

const express = require('express');
const router = express.Router();

router.post('/bill/create', auth, billControllers.createBill)

router.post('/bill/update', auth, billControllers.editBill)

router.get('/bill/get', billControllers.getBills)

module.exports = router