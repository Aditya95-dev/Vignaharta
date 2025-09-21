
const Loan = require('../../Models/loan/loan');
const Installment = require('../../Models/Installment/Installment');

exports.getLoanById = async (req, res) => {
    try {
        const { id } = req.params;
        const loan = await Loan.findById(id);

        if (!loan) {
            return res.status(404).json({
                status: "failed",
                success: false,
                msg: "Loan not found"
            });
        }

        const installments = await Installment.find({ fk_loan: id }).sort({ createdAt: 1 });


        const totalInstallmentsPaid = installments.length;
        const remainingInstallments = loan.totalMonths - totalInstallmentsPaid;


        const totalPaidAmount = installments.reduce((sum, installment) => sum + installment.amount, 0);

        const amortizationSchedule = [];
        let currentBalance = loan.remainingAmount;
        const monthlyRate = loan.interest / 100;

        for (let i = 1; i <= remainingInstallments && currentBalance > 0; i++) {
            const interestAmount = currentBalance * monthlyRate;
            const principalAmount = loan.monthlyEMI - interestAmount;
            const remainingBalance = currentBalance - principalAmount;

            amortizationSchedule.push({
                installmentNumber: totalInstallmentsPaid + i,
                emi: loan.monthlyEMI,
                principalAmount: Math.round(principalAmount),
                interestAmount: Math.round(interestAmount),
                remainingBalance: Math.round(Math.max(0, remainingBalance))
            });

            currentBalance = remainingBalance;
        }

        res.status(200).json({
            status: "success",
            success: true,
            msg: "Data Fetch Successfully",
            data: {
                loan: {
                    ...loan.toObject(),
                    totalInstallmentsPaid,
                    remainingInstallments,
                    totalPaidAmount
                },
                installmentHistory: installments,
                upcomingSchedule: amortizationSchedule,
                summary: {
                    originalAmount: loan.amount,
                    totalRecoveryAmount: loan.recoveryAmount,
                    currentRemainingAmount: loan.remainingAmount,
                    totalPaidAmount,
                    currentMonthlyEMI: loan.monthlyEMI,
                    interestRate: loan.interest + "% per month"
                }
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};