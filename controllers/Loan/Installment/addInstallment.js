const Installment = require("../../../Models/Installment/Installment")
const Loan = require("../../../Models/loan/loan")

exports.addInstallment = async (req, res) => {
    try {
        const { loanHolderName, fk_loan, paymentDate, amount, status } = req.body

        if (!loanHolderName || !fk_loan || !amount) {
            return res.status(400).json({
                success: false,
                message: "loanHolderName, fk_loan, and amount are required"
            })
        }

        
        const loan = await Loan.findById(fk_loan)
        if (!loan) {
            return res.status(404).json({
                success: false,
                message: "Loan not found"
            })
        }

        if (loan.recoveryAmount < amount) {
            return res.status(400).json({
                success: false,
                message: `Installment exceeds remaining recovery amount. Remaining: ${loan.recoveryAmount}`
            })
        }

    
        const installment = new Installment({
            loanHolderName,
            fk_loan,
            paymentDate,
            amount,
            status: status || "pending"
        })
        await installment.save()

    
        loan.recoveryAmount -= amount
        await loan.save()

        res.status(201).json({
            success: true,
            message: "Installment added successfully",
            data: {
                installment,
                remainingRecoveryAmount: loan.recoveryAmount
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
