const mongoose = require('mongoose')

const installmentSchema = new mongoose.Schema(
    {
        loanHolderName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true

        },
        fk_loan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Loan',
            require: true
        },
        paymentDate: {
            type: String,

        },
        amount: {
            type: Number
        },
        status: {
            type: String,
            enum: ['pending', 'paid'],
            default: "pending"
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Installment', installmentSchema);
