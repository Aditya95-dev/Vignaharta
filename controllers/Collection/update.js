const Collection = require('../../Models/MonthlyCollection/MonthlyCollection');

// update multiple collections and return updated data
exports.updateCollections = async (req, res) => {
    try {
        const updates = req.body; 
        // Expecting: [{ _id, fieldsToUpdate }, ...]

        if (!Array.isArray(updates) || updates.length === 0) {
            return res.status(400).json({
                message: "Request body must be a non-empty array",
                success: false,
                status: 'error'
            });
        }

        // bulk update operations
        const bulkOps = updates.map(item => ({
            updateOne: {
                filter: { _id: item._id },
                update: { $set: item }
            }
        }));

        await Collection.bulkWrite(bulkOps);

        // get the updated documents
        const ids = updates.map(u => u._id);
        const updatedDocs = await Collection.find({ _id: { $in: ids } });

        res.status(200).json({
            message: "Collections updated successfully",
            success: true,
            status: 'success',
            data: updatedDocs
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false,
            status: 'error'
        });
    }
};
