const collection = require('../../Models/MonthlyCollection/MonthlyCollection');

// get collection by user or id
exports.getByUserId = async(req, res) => {
    try {
        const {userId } = req.params;
        const collections = await collection.find({ user: userId });
        res.status(200).json({
            message: "Collections retrieved successfully",
            success: true,
            status: 'success',
            data: collections
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
