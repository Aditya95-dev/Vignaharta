const express = require('express');
const { createLoan } = require('../../controllers/Loan/addLoan');
const { updateLoan } = require('../../controllers/Loan/updateLoan');
const { getAllLoan } = require('../../controllers/Loan/getLoan');
const { getLoanById } = require('../../controllers/Loan/getLoanById');


const router = express.Router();


router.post('/addLoan', createLoan)
router.put('/updateLoan', updateLoan)
router.get('/getLoanList', getAllLoan)
router.get('/by/:id', getLoanById)



module.exports = router;