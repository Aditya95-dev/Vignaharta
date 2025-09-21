// const Loan = require('../../Models/loan/loan');
// const Installment = require('../../Models/Installment/Installment');
// const MonthlyCollection = require('../../Models/MonthlyCollection/MonthlyCollection')
// const moment = require('moment');

// exports.getDashbord = async (req, res) => {
//   try {
//     const loans = await Loan.find();
//     const installments = await Installment.find({ status: "paid" });
//     const collections = await MonthlyCollection.find();

//     let totalPayable = 0;
//     let totalPrincipal = 0;
//     let totalRecovered = 0;
//     let totalBalance = 0;
//     let totalMonths = 0;

//     for (let loan of loans) {
//       totalPayable += loan.recoveryAmount || 0;
//       totalPrincipal += loan.amount || 0;
//       totalBalance += loan.remainingAmount || 0;


//       if (loan.startDate && loan.endDate) {
//         totalMonths += moment(loan.endDate).diff(moment(loan.startDate), 'months');
//       }
//     }

//     // Total recovered = sum of paid installments
//     totalRecovered = installments.reduce((sum, inst) => sum + (inst.amount || 0), 0);

//     // Total interest paid
//     const totalInterestPaid = Math.max(totalRecovered - totalPrincipal, 0);

//     // Current month interest (collected in current month)
//     const currentMonth = moment().month();
//     const currentYear = moment().year();
//     const currentMonthInterest = installments
//       .filter(inst => {
//         const instDate = moment(inst.paymentDate);
//         return instDate.month() === currentMonth && instDate.year() === currentYear;
//       })
//       .reduce((sum, inst) => sum + (inst.amount || 0), 0);

//     // Avg per month installment
//     const perMonthInstallment = totalMonths > 0 ? totalPayable / totalMonths : totalPayable;

//     // Total collection amount
//     const totalCollectionAmount = collections.reduce((sum, col) => sum + (col.amount || 0), 0);

//     res.status(200).json({
//       status: "success",
//       success: true,
//       message: "Dashboard Data Fetched Successfully",
//       loanData: {
//         totalPayableAmount: totalPayable,
//         perMonthInstallment,
//         loanAmount: totalPrincipal,
//         loanAmountRecovery: totalRecovered,
//         loanAmountBalance: totalBalance,
//         totalInterestPaid,
//         currentMonthInterest
//       },
//       monthlyCollection: {
//         totalCollectionAmount
//       }
//     });

//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       success: false,
//       message: error.message
//     });
//   }
// };


const Loan = require('../../Models/loan/loan');
const Installment = require('../../Models/Installment/Installment');
const MonthlyCollection = require('../../Models/MonthlyCollection/MonthlyCollection');
const moment = require('moment');

exports.getDashbord = async (req, res) => {
  try {
    const loans = await Loan.find();
    const installments = await Installment.find({ status: "paid" });
    const collections = await MonthlyCollection.find();

    let totalPayable = 0;
    let totalPrincipal = 0;
    let totalBalance = 0;
    let totalMonthlyEMI = 0;
    let activeLoanCount = 0;

    // Calculate totals from loans
    for (let loan of loans) {
      totalPayable += loan.recoveryAmount || 0;
      totalPrincipal += loan.amount || 0;
      totalBalance += loan.remainingAmount || 0;

      // Add monthly EMI only for active loans
      if (loan.status === 'active' && loan.monthlyEMI) {
        totalMonthlyEMI += loan.monthlyEMI;
        activeLoanCount++;
      }
    }

    // Total recovered from installments
    const totalRecovered = installments.reduce((sum, inst) => sum + (inst.amount || 0), 0);

    // Calculate interest breakdown
    let totalInterestReceived = 0;
    let totalPrincipalReceived = 0;

    // For each installment, calculate interest vs principal portion
    for (let installment of installments) {
      const loan = loans.find(l => l._id.toString() === installment.fk_loan.toString());
      if (loan) {
        // Get installment sequence number
        const loanInstallments = installments
          .filter(i => i.fk_loan.toString() === loan._id.toString())
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        const installmentIndex = loanInstallments.findIndex(i => i._id.toString() === installment._id.toString());

        // Calculate remaining balance at the time of this installment
        let remainingAtInstallment = loan.amount;
        for (let i = 0; i < installmentIndex; i++) {
          const prevInterest = remainingAtInstallment * (loan.interest / 100);
          const prevPrincipal = loanInstallments[i].amount - prevInterest;
          remainingAtInstallment -= prevPrincipal;
        }

        // Calculate interest and principal for this installment
        const interestPortion = remainingAtInstallment * (loan.interest / 100);
        const principalPortion = installment.amount - interestPortion;

        totalInterestReceived += Math.max(0, interestPortion);
        totalPrincipalReceived += Math.max(0, principalPortion);
      }
    }

    // Current month calculations
    const currentMonth = moment().month();
    const currentYear = moment().year();

    let currentMonthInterest = 0;
    let currentMonthPrincipal = 0;
    let currentMonthTotal = 0;

    const currentMonthInstallments = installments.filter(inst => {
      const instDate = moment(inst.createdAt); // Using createdAt instead of paymentDate for accuracy
      return instDate.month() === currentMonth && instDate.year() === currentYear;
    });

    for (let installment of currentMonthInstallments) {
      const loan = loans.find(l => l._id.toString() === installment.fk_loan.toString());
      if (loan) {
        // Similar calculation as above for current month
        const loanInstallments = installments
          .filter(i => i.fk_loan.toString() === loan._id.toString())
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        const installmentIndex = loanInstallments.findIndex(i => i._id.toString() === installment._id.toString());

        let remainingAtInstallment = loan.amount;
        for (let i = 0; i < installmentIndex; i++) {
          const prevInterest = remainingAtInstallment * (loan.interest / 100);
          const prevPrincipal = loanInstallments[i].amount - prevInterest;
          remainingAtInstallment -= prevPrincipal;
        }

        const interestPortion = remainingAtInstallment * (loan.interest / 100);
        const principalPortion = installment.amount - interestPortion;

        currentMonthInterest += Math.max(0, interestPortion);
        currentMonthPrincipal += Math.max(0, principalPortion);
        currentMonthTotal += installment.amount;
      }
    }

    // Monthly collection total
    const totalCollectionAmount = collections.reduce((sum, col) => sum + (col.amount || 0), 0);

    // Expected vs Actual calculations
    const expectedMonthlyCollection = totalMonthlyEMI; // Total EMI from all active loans
    const collectionEfficiency = expectedMonthlyCollection > 0 ?
      (currentMonthTotal / expectedMonthlyCollection * 100).toFixed(2) : 0;

    res.status(200).json({
      status: "success",
      success: true,
      message: "Dashboard Data Fetched Successfully",
      loanData: {
        totalPayableAmount: Math.round(totalPayable),
        expectedMonthlyInstallment: Math.round(totalMonthlyEMI), // Total EMI from all active loans
        loanAmount: Math.round(totalPrincipal), // Original loan amounts
        loanAmountRecovery: Math.round(totalRecovered), // Total recovered
        loanAmountBalance: Math.round(totalBalance), // Remaining balance
        totalInterestReceived: Math.round(totalInterestReceived), // Actual interest received
        totalPrincipalReceived: Math.round(totalPrincipalReceived), // Actual principal received
        activeLoanCount,
        completedLoanCount: loans.filter(l => l.status === 'completed').length
      },
      currentMonthData: {
        totalCollection: Math.round(currentMonthTotal),
        interestReceived: Math.round(currentMonthInterest),
        principalReceived: Math.round(currentMonthPrincipal),
        expectedCollection: Math.round(expectedMonthlyCollection),
        collectionEfficiency: collectionEfficiency + '%'
      },
      monthlyCollection: {
        totalCollectionAmount: Math.round(totalCollectionAmount)
      },
      summary: {
        totalLoansIssued: loans.length,
        totalAmountDisbursed: Math.round(totalPrincipal),
        totalAmountToRecover: Math.round(totalPayable),
        totalAmountRecovered: Math.round(totalRecovered),
        recoveryPercentage: totalPayable > 0 ? ((totalRecovered / totalPayable) * 100).toFixed(2) + '%' : '0%',
        outstandingAmount: Math.round(totalBalance)
      }
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      success: false,
      message: error.message
    });
  }
};




