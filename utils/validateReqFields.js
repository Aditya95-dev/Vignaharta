const AppError = require('./appError');

exports.validateReqFields = (data, next, requiredFields, mode = 'body') => {
  for (const field of requiredFields) {
    if (mode === 'body' && !data[field]) throw next(new AppError(`You have to provide ${field} in body`, 400));

    if (mode === 'query' && !data[field]) throw next(new AppError(`You have to provide ${field} in query`, 400));

    if (mode === 'params' && !data[field]) throw next(new AppError(`You have to provide ${field} in params`, 400));
  }

  return true;
};
