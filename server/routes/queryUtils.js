/**
 * Builds a search filter for MongoDB $or query across multiple fields.
 * @param {string} searchValue - The value to search for.
 * @param {string[]} fields - The fields to apply regex search on.
 * @returns {Object} - MongoDB filter with $or condition.
 */


export const buildSearchFilter = (searchValue, fields) => {
  if (!searchValue || !fields.length) return {};

  const regex = new RegExp(searchValue, "i");
  return {
    $or: fields.map((field) => ({
      [field]: { $regex: regex },
    })),
  };
};
