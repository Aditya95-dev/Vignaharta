const logger = require('../logger');
const AppError = require('./appError'); // adjust path if needed

module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            logger.error(err);

            // Only modify the error if it's an Axios error and NOT a custom AppError
            if (err?.isAxiosError && !(err instanceof AppError)) {
                err.message = err.response?.data?.message ?? 'Something went wrong';
                err.statusCode = err.response?.status ?? 400;
            }

            next(err);
        });
    };
};

