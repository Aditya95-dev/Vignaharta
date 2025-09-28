const Collection = require('../../Models/MonthlyCollection/MonthlyCollection');


exports.addCollection = async (req, res) => {
    try {
        let collections = req.body;

        if (!Array.isArray(collections)) {
            collections = [collections];
        }

        const bulkOps = collections.map(item => {
            return {
                updateOne: {
                    filter: {
                        user: item.user,
                        month: item.month,
                        year: item.year
                    },
                    update: { $set: item },
                    upsert: true
                }
            };
        });

        await Collection.bulkWrite(bulkOps);

        const updatedDocs = await Collection.find({
            $or: collections.map(c => ({
                user: c.user,
                month: c.month,
                year: c.year
            }))
        }).populate('user');

        res.status(200).json({
            message: "Collection(s) added/updated successfully",
            success: true,
            status: "success",
            data: updatedDocs
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false,
            status: "error"
        });
    }
};
