const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../Models/User/User');

exports.userProtect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError('Please provide token', 401));
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return next(new AppError('Invalid or expired token', 401));
    }

    const user = await User.findById(decoded.id);
    if (!user) {
        return next(new AppError('User does not exist', 401));
    }

    req.user = user;
    next();
});