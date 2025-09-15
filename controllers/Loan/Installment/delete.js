const Installment = require('../../../Models/Installment/Installment')
const Loan = require("../../../Models/loan/loan")

exports.deleteInstallment = async (req, res) => {
    try {
        const { id } = req.params
        const installment = await Installment.findById(id)
        if (!installment) return res.status(404).json({ success: false, message: "Installment not found" })

        const loan = await Loan.findById(installment.fk_loan)
        if (loan) {
            loan.recoveryAmount += installment.amount // add back to recovery
            if (loan.status === "completed") loan.status = "active"
            await loan.save()
        }

        await installment.deleteOne()

        res.status(200).json({ success: true, message: "Installment deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
