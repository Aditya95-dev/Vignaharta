const collection = require('../../Models/MonthlyCollection/MonthlyCollection');

// get Collection 
exports.getAllCollection = async(req, res) => {
    try {
        const collections = await collection.find();
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
