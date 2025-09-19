const Loan = require('../../Models/loan/loan');
const Installment = require('../../Models/Installment/Installment');
const MonthlyCollection = require('../../Models/MonthlyCollection/MonthlyCollection')
const moment = require('moment');

exports.getDashbord = async (req, res) => {
  try {
    const loans = await Loan.find();
    const installments = await Installment.find({ status: "paid" });
    const collections = await MonthlyCollection.find();

    let totalPayable = 0;
    let totalPrincipal = 0;
    let totalRecovered = 0;
    let totalBalance = 0;
    let totalMonths = 0;

    for (let loan of loans) {
      totalPayable += loan.recoveryAmount || 0;
      totalPrincipal += loan.amount || 0;
      totalBalance += loan.remainingAmount || 0;

      // calculate months for per month avg
      if (loan.startDate && loan.endDate) {
        totalMonths += moment(loan.endDate).diff(moment(loan.startDate), 'months');
      }
    }

    // Total recovered = sum of paid installments
    totalRecovered = installments.reduce((sum, inst) => sum + (inst.amount || 0), 0);

    // Total interest paid
    const totalInterestPaid = Math.max(totalRecovered - totalPrincipal, 0);

    // Current month interest (collected in current month)
    const currentMonth = moment().month();
    const currentYear = moment().year();
    const currentMonthInterest = installments
      .filter(inst => {
        const instDate = moment(inst.paymentDate);
        return instDate.month() === currentMonth && instDate.year() === currentYear;
      })
      .reduce((sum, inst) => sum + (inst.amount || 0), 0);

    // Avg per month installment
    const perMonthInstallment = totalMonths > 0 ? totalPayable / totalMonths : totalPayable;

    // Total collection amount
    const totalCollectionAmount = collections.reduce((sum, col) => sum + (col.amount || 0), 0);

    res.status(200).json({
      status: "success",
      success: true,
      message: "Dashboard Data Fetched Successfully",
      loanData: {
        totalPayableAmount: totalPayable,
        perMonthInstallment,
        loanAmount: totalPrincipal,
        loanAmountRecovery: totalRecovered,
        loanAmountBalance: totalBalance,
        totalInterestPaid,
        currentMonthInterest
      },
      monthlyCollection: {
        totalCollectionAmount
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
