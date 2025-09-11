const collection = require('../../Models/MonthlyCollection/MonthlyCollection');

// add collection
exports.addCollection = async (req, res) => {
    try {
        const { user, receivedate, month, year, amount } = req.body;
        const newCollection = new collection({
            user,
            receivedate,
            month,
            year,
            amount,

        });
        await newCollection.save();
        res.status(201).json({
            message: "Collection added successfully",
            success: true,
            status: 'success',
            data: newCollection
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
