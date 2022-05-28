const billControllers = require('./../Controllers/billsControllers');
const auth = require('./../Middleware/auth')

const express = require('express');
const router = express.Router();

router.post('/bill/create', auth, billControllers.createBill)

router.post('/bill/update', auth, billControllers.editBill)

router.get('/bill/get', billControllers.getBills)

router.get('/bill/get-specific-bills', auth, billControllers.getSpecificUserBills)

module.exports = router