// const Installment = require("../../../Models/Installment/Installment");
// const Loan = require("../../../Models/loan/loan");

// exports.addInstallment = async (req, res) => {
//     try {
//         const { fk_loan, paymentDate, amount } = req.body;

//         if (!fk_loan || !amount) {
//             return res.status(400).json({
//                 success: false,
//                 message: "fk_loan and amount are required"
//             });
//         }

//         const loan = await Loan.findById(fk_loan);
//         if (!loan) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Loan not found"
//             });
//         }

//         if (loan.remainingAmount < amount) {
//             return res.status(400).json({
//                 success: false,
//                 message: `Installment exceeds remaining loan amount. Remaining: ${loan.remainingAmount}`
//             });
//         }


//         const installment = new Installment({
//             fk_loan,
//             paymentDate,
//             amount,
//             status: "paid"
//         });
//         await installment.save();


//         const newRemainingAmount = loan.remainingAmount - amount;


//         let newMonthlyEMI = loan.monthlyEMI;
//         if (newRemainingAmount > 0) {

//             const totalInstallments = await Installment.countDocuments({ fk_loan: fk_loan });
//             const remainingInstallments = loan.totalMonths - totalInstallments;

//             if (remainingInstallments > 0) {
//                 const r = loan.interest / 100;
//                 const P = newRemainingAmount;
//                 const n = remainingInstallments;

//                 if (r > 0) {
//                     newMonthlyEMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
//                 } else {
//                     newMonthlyEMI = P / n;
//                 }
//                 newMonthlyEMI = Math.round(newMonthlyEMI);
//             }
//         } else {

//             newMonthlyEMI = 0;
//         }

//         const updatedLoan = await Loan.findByIdAndUpdate(
//             fk_loan,
//             {
//                 remainingAmount: newRemainingAmount,
//                 monthlyEMI: newMonthlyEMI,
//                 status: newRemainingAmount <= 0 ? 'completed' : 'active'
//             },
//             { new: true }
//         );

//         res.status(201).json({
//             success: true,
//             message: "Installment added successfully",
//             data: {
//                 installment,
//                 remainingAmount: updatedLoan.remainingAmount,
//                 newMonthlyEMI: updatedLoan.monthlyEMI,
//                 status: updatedLoan.status
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

const Installment = require("../../../Models/Installment/Installment");
const Loan = require("../../../Models/loan/loan");

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

        // Add the installment
        const installment = new Installment({
            fk_loan,
            paymentDate,
            amount,
            status: "paid"
        });
        await installment.save();

        // Update remaining amount
        const newRemainingAmount = loan.remainingAmount - amount;

        // Keep the original EMI amount (don't recalculate)
        const fixedMonthlyEMI = loan.monthlyEMI;

        // Update loan with new remaining amount but keep original EMI
        const updatedLoan = await Loan.findByIdAndUpdate(
            fk_loan,
            {
                remainingAmount: newRemainingAmount,
                status: newRemainingAmount <= 0 ? 'completed' : 'active'
            },
            { new: true }
        );

        res.status(201).json({
            success: true,
            message: "Installment added successfully",
            data: {
                installment,
                remainingAmount: updatedLoan.remainingAmount,
                newMonthlyEMI: fixedMonthlyEMI,
                status: updatedLoan.status
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};