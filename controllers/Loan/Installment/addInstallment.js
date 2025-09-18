const Installment = require("../../../Models/Installment/Installment")
const Loan = require("../../../Models/loan/loan")



exports.addInstallment = async (req, res) => {
    try {
        const { fk_loan, paymentDate, amount } = req.body;

        if (!fk_loan || !amount) {
            return res.status(400).json({
                success: false,
                message: "fk_loan and amount are required"
            });
        }

        const loan = await Loan.findById(fk_loan);
        if (!loan) {
            return res.status(404).json({
                success: false,
                message: "Loan not found"
            });
        }

   
        if (loan.remainingAmount < amount) {
            return res.status(400).json({
                success: false,
                message: `Installment exceeds remaining loan amount. Remaining: ${loan.remainingAmount}`
            });
        }

  
        const installment = new Installment({
            fk_loan,
            paymentDate,
            amount,
            status: "paid"
        });
        await installment.save();
        const updatedLoan = await Loan.findByIdAndUpdate(
            fk_loan,
            { $inc: { remainingAmount: -amount } }, 
            { new: true }
        );

        res.status(201).json({
            success: true,
            message: "Installment added successfully",
            data: {
                installment,
                remainingAmount: updatedLoan.remainingAmount
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
