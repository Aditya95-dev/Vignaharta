const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema(
    {
        loanHolderName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true

        },
        guarantorName: {
            type: String,
            required: true,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        interest: {
            type: Number,
            min: 0,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date
        },
        status: {
            type: String
        },
        recoveryAmount: {
            type: Number,

        },
        remainingAmount: {
            type: Number
        }
    },
    { timestamps: true }
);


loanSchema.pre('save', function (next) {
    const loan = this;

    if (loan.isNew) {
        loan.recoveryAmount = loan.amount + (loan.amount * (loan.interest || 0) / 100);
        loan.remainingAmount = loan.recoveryAmount; 
    }

    next();
});

module.exports = mongoose.model('Loan', loanSchema);
