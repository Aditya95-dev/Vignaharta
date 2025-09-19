const mongoose = require('mongoose');
const Loan = require('../../Models/loan/loan');

exports.getLoanByUserId = async (req, res) => {
    try {
        const { loanHolderName } = req.query; // Use req.query here

        if (!loanHolderName || !mongoose.Types.ObjectId.isValid(loanHolderName)) {
            return res.status(400).json({
                status: "error",
                success: false,
                message: "Invalid user ID"
            });
        }

        const loans = await Loan.find({ loanHolderName })
            .populate('loanHolderName', 'name email'); // optional

        if (!loans || loans.length === 0) {
            return res.status(404).json({
                status: "error",
                success: false,
                message: "No loans found for this user"
            });
        }

        res.status(200).json({
            status: "success",
            success: true,
            message: "Loans fetched successfully",
            data: loans
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            success: false,
            message: error.message
        });
    }
};
