const Loan = require('../../Models/loan/loan')

exports.getLoanById = async (req, res) => {
    try {
        const { id } = req.params
        const loan = await Loan.findById(id)

        if (!loan) {
            return res.status(404).json({
                status: "failed",
                success: false,
                msg: "Loan not found"
            })
        }

        const startDate = new Date(loan.startDate)
        const endDate = new Date(loan.endDate)

        // Calculate loan period in months
        const totalMonths =
            (endDate.getFullYear() - startDate.getFullYear()) * 12 +
            (endDate.getMonth() - startDate.getMonth())

        // EMI Calculation
        const P = loan.amount
        const annualRate = loan.interestRate || 0 // % per year
        const r = annualRate / 12 / 100 // monthly rate
        const n = totalMonths

        let emi = 0
        if (n > 0) {
            if (r > 0) {
                emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
            } else {
                emi = P / n // if no interest
            }
        }

        res.status(200).json({
            status: "success",
            success: true,
            msg: "Data Fetch Successfully",
            data: {
                loan,
                totalInstallment: totalMonths,
                monthlyInstallment: emi.toFixed(2)
            }
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
