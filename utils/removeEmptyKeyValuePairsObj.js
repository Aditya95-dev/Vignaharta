const removeEmptyKeyValuePairsObj = (obj = {}) => {
  return Object.keys(obj).reduce((acc, val) => {
    if (Array.isArray(obj[val]) && obj[val].length) {
      acc[val] = obj[val];
      return acc;
    } else if (typeof obj[val] === "object" && !Array.isArray(obj[val]) && obj[val] !== null) {
      if (Object.keys(obj[val]).length) {
        acc[val] = obj[val];
        return acc;
      } else {
        return acc;
      }
    } else if (Boolean(obj[val].toString().trim())) {
      acc[val] = obj[val].toString().trim();
      return acc;
    } else {
      return acc;
    }
  }, {});
};

module.exports = removeEmptyKeyValuePairsObj;
