const Installment = require('../../../Models/Installment/Installment')


exports.getAllInstallments = async (req, res) => {
    try {
        const installments = await Installment.find()
            .populate("loanHolderName fk_loan")
        res.status(200).json({
            success: true,
            status: "success",
            messaage: 'Fetch List Successfully',
            data: installments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}