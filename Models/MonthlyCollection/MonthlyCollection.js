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
        // required: true
    },
    totalAmount: {
        type: Number,
    }

}, { timestamps: true });

//🔹 Pre-save hook to increment totalAmount
collectionSchema.pre('save', async function (next) {
    const collection = this;

    if (collection.isNew) {
        collection.totalAmount = collection.amount;
    } else {
        collection.totalAmount = (collection.totalAmount || 0) + collection.amount;
    }

    next();
});
module.exports = mongoose.model('MonthlyCollection', collectionSchema);
