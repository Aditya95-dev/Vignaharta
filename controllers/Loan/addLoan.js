const Loan = require('../../Models/loan/loan');

exports.createLoan = async (req, res) => {
    try {
        const { loanHolderName, guarantorName, amount, interest, startDate, endDate, } = req.body;
     
        const loan = await Loan.create({
            loanHolderName,
            guarantorName,
            amount,
            interest,
            startDate,
            endDate,
            status: 'active',
            remainingAmount:amount
            
        });

        res.status(201).json({
            message: 'Loan created successfully',
            status: "success",
            success: true,
            data: loan
        });
    } catch (error) {
        console.error('Error creating loan:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
