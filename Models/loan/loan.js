const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema(
    {
        loanHolderName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        loanID: {
            type: String,
            default: 'VGF2025001'
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
            default: 2, // Fixed 2% monthly interest
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
            type: String,
            default: 'active'
        },
        recoveryAmount: {
            type: Number,
        },
        remainingAmount: {
            type: Number
        },
        totalMonths: {
            type: Number
        },
        monthlyEMI: {
            type: Number
        }
    },
    { timestamps: true }
);

// Calculate EMI and recovery amount before saving
loanSchema.pre('save', function (next) {
    const loan = this;

    if (loan.isNew) {
        // Calculate total months
        const startDate = new Date(loan.startDate);
        const endDate = new Date(loan.endDate);
        const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
            (endDate.getMonth() - startDate.getMonth());

        loan.totalMonths = totalMonths;

        // For reducing balance method with fixed monthly EMI
        const P = loan.amount;
        const r = loan.interest / 100; // 2% = 0.02
        const n = totalMonths;

        if (n > 0 && r > 0) {
            // EMI formula for reducing balance
            const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            loan.monthlyEMI = Math.round(emi);

            // Total recovery amount will be EMI * number of months
            loan.recoveryAmount = loan.monthlyEMI * n;
        } else {
            // If no interest or no months
            loan.monthlyEMI = n > 0 ? P / n : 0;
            loan.recoveryAmount = P;
        }

        loan.remainingAmount = loan.recoveryAmount;
    }

    next();
});

module.exports = mongoose.model('Loan', loanSchema);