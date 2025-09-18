// installment Route
const express =require('express');
const { addInstallment } = require('../../controllers/Loan/Installment/addInstallment');
const { getAllInstallments } = require('../../controllers/Loan/Installment/getAllInstallment');
const { getInstallmentsByLoanId } = require('../../controllers/Loan/Installment/getInstallmentById');
const { updateInstallment } = require('../../controllers/Loan/Installment/updateInstallment');
const { deleteInstallment } = require('../../controllers/Loan/Installment/delete');
const router = express.Router();

router.post("/addInstallment", addInstallment)
router.get("/get/list", getAllInstallments)
router.get("/by/:loanId", getInstallmentsByLoanId)
router.put("/update/:id", updateInstallment)
router.delete("/delete/:id", deleteInstallment)
module.exports = router;