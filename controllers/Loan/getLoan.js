const Loan = require('../../Models/loan/loan');

exports.getAllLoan = async (req, res) => {
    try {

        const { page = 1, limit = 10, search = "" } = req.query;

        const filter = {};
        if (search) {
            filter.loanHolderName = { $regex: search, $options: "i" };
        }

        const skip = (page - 1) * limit;


        const loans = await Loan.find(filter)
            .populate('loanHolderName')
            .skip(skip)
            .limit(parseInt(limit));


        const total = await Loan.countDocuments(filter);

        res.status(200).json({
            status: "success",
            success: true,
            message: "Loans fetched successfully",
            data: loans,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
