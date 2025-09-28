// const collection = require('../../Models/MonthlyCollection/MonthlyCollection');


// exports.getAllCollection = async(req, res) => {
//     try {
//         const collections = await collection.find()
//         .populate('user')
//         res.status(200).json({
//             message: "Collections retrieved successfully",
//             success: true,
//             status: 'success',
//             data: collections
//         });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }



const Collection = require('../../Models/MonthlyCollection/MonthlyCollection');

exports.getAllCollection = async (req, res) => {
    try {
        let { month, year } = req.query;

        let filter = {};

        if (month && year) {

            let startDate = new Date(year, month - 1, 1);
            let endDate = new Date(year, month, 0, 23, 59, 59, 999);

            filter.receivedate = { $gte: startDate, $lte: endDate };
        } else if (month) {

            let currentYear = new Date().getFullYear();
            let startDate = new Date(currentYear, month - 1, 1);
            let endDate = new Date(currentYear, month, 0, 23, 59, 59, 999);

            filter.receivedate = { $gte: startDate, $lte: endDate };
        }

        const collections = await Collection.find(filter).populate('user');

        res.status(200).json({
            message: "Collections retrieved successfully",
            success: true,
            status: 'success',
            data: collections
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
