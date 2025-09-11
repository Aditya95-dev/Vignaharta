const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receivedate: {
        type: Date,
        // required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
    }

}, { timestamps: true });

module.exports = mongoose.model('MonthlyCollection', collectionSchema);
