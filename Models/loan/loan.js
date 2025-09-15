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
    },
    { timestamps: true }
);

// 🔹 Auto-calculate recoveryAmount before saving
loanSchema.pre('save', function (next) {
    const loan = this;
    // Simple interest: amount + (amount * interest / 100)
    loan.recoveryAmount = loan.amount + (loan.amount * (loan.interest || 0) / 100);
    next();
});
module.exports = mongoose.model('Loan', loanSchema);
