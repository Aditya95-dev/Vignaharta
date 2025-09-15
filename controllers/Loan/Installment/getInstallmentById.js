const Installment = require('../../../Models/Installment/Installment')

exports.getInstallmentById = async (req, res) => {
    try {
        const { id } = req.params
        const installment = await Installment.findById(id)
            .populate("loanHolderName fk_loan")
        if (!installment) return res.status(404).json({
            success: false,
            message: "Installment not found"
        })
        res.status(200).json({
            success: true,
            status: "success",
            data: installment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}