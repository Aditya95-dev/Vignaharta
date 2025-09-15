const Installment = require('../../../Models/Installment/Installment')
const Loan = require("../../../Models/loan/loan")

exports.updateInstallment = async (req, res) => {
    try {
        const { id } = req.params
        const { paymentDate, amount, status } = req.body

        const installment = await Installment.findById(id)
        if (!installment) return res.status(404).json({ success: false, message: "Installment not found" })

        if (amount && amount !== installment.amount) {
            const loan = await Loan.findById(installment.fk_loan)
            if (!loan) return res.status(404).json({ success: false, message: "Loan not found" })


            loan.recoveryAmount += installment.amount

            if (loan.recoveryAmount < amount) {
                return res.status(400).json({
                    success: false,
                    message: `Updated amount exceeds recovery amount. Remaining: ${loan.recoveryAmount}`
                })
            }

            // deduct new amount
            loan.recoveryAmount -= amount
            if (loan.recoveryAmount === 0) loan.status = "completed"
            await loan.save()

            installment.amount = amount
        }

        if (paymentDate) installment.paymentDate = paymentDate
        if (status) installment.status = status

        await installment.save()

        res.status(200).json({
            success: true,
            status: "success",
            message: "Installment updated",
            data: installment
        })
    } catch (error) {
        res.status(500).json({
            success: false
            , message: error.message
        })
    }
}