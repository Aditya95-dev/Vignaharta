const Installment = require('../../../Models/Installment/Installment')
const Loan = require('../../../Models/loan/loan')
exports.getInstallmentsByLoanId = async (req, res) => {
    try {
        const { loanId } = req.params;

        const installments = await Installment.find({ fk_loan: loanId })
            .populate({
                path: 'fk_loan',        
                select: 'loanHolderName',
                populate: {
                    path: 'loanHolderName',  
                    select: 'name'           
                }
            });
        const loan = await Loan.findById({ _id: loanId })

        if (!installments || installments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No installments found for this loan id"
            });
        }
        res.status(200).json({
            success: true,
            status: "success",
            paidInstallmentCount: installments.length,
            remainingAmount: loan.remainingAmount,
            recoveryAmount: loan.recoveryAmount,
            data: installments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

