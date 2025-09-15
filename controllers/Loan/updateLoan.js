const Loan = require('../../Models/loan/loan');

exports.updateLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const { } = req.body

        const loan = await Loan.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            status: 'success',
            message: 'Loan updated successfully',
            success: true,
            data: loan,
        });

    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user' });
        console.log(error);
    }
}