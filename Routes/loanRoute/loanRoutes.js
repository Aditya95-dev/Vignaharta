const express = require('express');
const { createLoan } = require('../../controllers/Loan/addLoan');
const { updateLoan } = require('../../controllers/Loan/updateLoan');
const { getAllLoan } = require('../../controllers/Loan/getLoan');
const { getLoanById } = require('../../controllers/Loan/getLoanById');
const { addInstallment } = require('../../controllers/Loan/Installment/addInstallment');
const { getAllInstallments } = require('../../controllers/Loan/Installment/getAllInstallment');
const { getInstallmentById } = require('../../controllers/Loan/Installment/getInstallmentById');
const { updateInstallment } = require('../../controllers/Loan/Installment/updateInstallment');
const { deleteInstallment } = require('../../controllers/Loan/Installment/delete');

const router = express.Router();


router.post('/addLoan', createLoan)
router.put('/updateLoan', updateLoan)
router.get('/getLoanList', getAllLoan)
router.get('/by/:id', getLoanById)


// installment Route

router.post("/addInstallment", addInstallment)
router.get("/get/list", getAllInstallments)
router.get("by/:id", getInstallmentById)
router.put("update/:id", updateInstallment)
router.delete("delete/:id", deleteInstallment)
module.exports = router;