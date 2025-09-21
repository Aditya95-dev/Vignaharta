const Loan = require('../../Models/loan/loan');
const Counter = require('../../Models/Counter/counter')

exports.createLoan = async (req, res) => {
    try {
        const { loanHolderName, guarantorName, amount, interest, startDate, endDate, } = req.body;

        const counter = await Counter.findOneAndUpdate(
            { name: 'loan' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const year = new Date().getFullYear();
        const loanId = `VGN${year}${String(counter.seq).padStart(4, '0')}`;


        const loan = await Loan.create({
            loanHolderName,
            loanId,
            guarantorName,
            amount,
            interest,
            startDate,
            endDate,
            status: 'active',
            remainingAmount: amount

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
