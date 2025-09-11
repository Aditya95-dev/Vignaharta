exports.allowedFields = (obj, fields = [], mode = 'include') => {
    const newObj = {};

    Object.keys(obj).forEach((el) => {
        if (mode === 'include' && fields.includes(el)) newObj[el] = typeof obj[el] === 'string' ? obj[el].trim() : obj[el];
        if (mode === 'exclude' && !fields.includes(el)) newObj[el] = typeof obj[el] === 'string' ? obj[el].trim() : obj[el];
    });

    return newObj;
};
