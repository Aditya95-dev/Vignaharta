const catchAsync = require("../../../utils/catchAsync");

exports.getMe = catchAsync(async (req, res, next) => {

    res.status(200).json({
        code: 200,
        status: 'success',
        success: true,
        message: 'User found',
        payload: req.user,
    });
})