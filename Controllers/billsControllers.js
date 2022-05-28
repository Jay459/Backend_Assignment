const BillsSchema = require('../Modals/billsModal');

exports.createBill = async (req, res) => {
    const bill = new BillsSchema(req.body)
    try {
        await bill.save();
        res.send({ status: 200, bill })
    } catch (error) {
        res.status(401).send({ error: error.message })
    }
}

exports.editBill = async (req, res) => {
    try {
        const update = req.body
        const billId = req.body.billId;
        await BillsSchema.findOneAndUpdate({ billId: billId }, update);
        const bill = await BillsSchema.find({ billId: billId })
        res.status(200).json({
            data: bill,
            message: 'bill has been updated'
        });

    } catch (error) {
        res.status(401).send({ error: error.message })
    }
}

exports.getBills = async (req, res) => {
    try {
        const bills = await BillsSchema.find({});
        res.status(200).json({
            bills: bills
        })
    } catch (error) {
        res.status(401).send({ error: error.message })
    }
}