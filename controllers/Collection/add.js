// const collection = require('../../Models/MonthlyCollection/MonthlyCollection');

// // add collection
// exports.addCollection = async (req, res) => {
//     try {
//         const { user, receivedate, month, year, amount } = req.body;
//         const newCollection = new collection({
//             user,
//             receivedate,
//             month,
//             year,
//             amount,

//         });
//         await newCollection.save();
//         res.status(201).json({
//             message: "Collection added successfully",
//             success: true,
//             status: 'success',
//             data: newCollection
//         });
//     }
//     catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }


const Collection = require('../../Models/MonthlyCollection/MonthlyCollection');

// add collection (single or multiple)
exports.addCollection = async (req, res) => {
    try {
        let collections = req.body;

        // if a single object is sent, wrap it into an array
        if (!Array.isArray(collections)) {
            collections = [collections];
        }

        // insert many collections
        const newCollections = await Collection.insertMany(collections);

        res.status(201).json({
            message: "Collection(s) added successfully",
            success: true,
            status: 'success',
            data: newCollections
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false,
            status: 'error'
        });
    }
};
