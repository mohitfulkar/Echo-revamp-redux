// utils/growthCalculator.js - Generic growth calculation helper

/**
 * Generic function to calculate monthly growth for any model
 * @param {Object} Model - Mongoose model
 * @param {Object} options - Configuration options
 * @param {string} options.field - Field to sum (e.g., 'voteCount', default: count documents)
 * @param {string} options.dateField - Date field to use (default: 'createdAt')
 * @param {Object} options.additionalMatch - Additional match conditions
 * @param {number} options.monthsBack - How many months back to compare (default: 1)
 * @returns {Promise<number>} Growth percentage
 */
export const calculateMonthlyGrowth = async (Model, options = {}) => {
  try {
    const {
      field = null, // null means count documents, string means sum field
      dateField = "createdAt",
      additionalMatch = {},
      monthsBack = 1,
    } = options;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Calculate comparison month/year
    let compareMonth = currentMonth - monthsBack;
    let compareYear = currentYear;

    if (compareMonth <= 0) {
      compareMonth = 12 + compareMonth;
      compareYear = currentYear - 1;
    }

    // Build aggregation pipeline
    const buildPipeline = (month, year) => {
      const pipeline = [
        {
          $match: {
            ...additionalMatch,
            $expr: {
              $and: [
                { $eq: [{ $month: `$${dateField}` }, month] },
                { $eq: [{ $year: `$${dateField}` }, year] },
              ],
            },
          },
        },
      ];

      // Add grouping stage
      if (field) {
        // Sum specific field
        pipeline.push({
          $group: { _id: null, total: { $sum: `$${field}` } },
        });
      } else {
        // Count documents
        pipeline.push({
          $group: { _id: null, total: { $sum: 1 } },
        });
      }

      return pipeline;
    };

    // Get current month data
    const currentMonthData = await Model.aggregate(
      buildPipeline(currentMonth, currentYear)
    );

    // Get comparison month data
    const compareMonthData = await Model.aggregate(
      buildPipeline(compareMonth, compareYear)
    );

    const currentValue = currentMonthData[0]?.total || 0;
    const compareValue = compareMonthData[0]?.total || 0;

    // Calculate growth percentage
    let growthPercentage = 0;
    if (compareValue === 0) {
      growthPercentage = currentValue > 0 ? 100 : 0;
    } else {
      growthPercentage = ((currentValue - compareValue) / compareValue) * 100;
    }

    return Math.round(growthPercentage * 100) / 100;
  } catch (error) {
    console.error("Error calculating monthly growth:", error);
    return 0;
  }
};

/**
 * Calculate growth between any two time periods
 * @param {Object} Model - Mongoose model
 * @param {Object} options - Configuration options
 * @returns {Promise<Object>} Detailed growth data
 */
export const calculateDetailedGrowth = async (Model, options = {}) => {
  try {
    const {
      field = null,
      dateField = "createdAt",
      additionalMatch = {},
      monthsBack = 1,
    } = options;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    let compareMonth = currentMonth - monthsBack;
    let compareYear = currentYear;

    if (compareMonth <= 0) {
      compareMonth = 12 + compareMonth;
      compareYear = currentYear - 1;
    }

    const pipeline = [
      {
        $addFields: {
          month: { $month: `$${dateField}` },
          year: { $year: `$${dateField}` },
        },
      },
      {
        $match: {
          ...additionalMatch,
          $or: [
            { month: currentMonth, year: currentYear },
            { month: compareMonth, year: compareYear },
          ],
        },
      },
      {
        $group: {
          _id: {
            month: "$month",
            year: "$year",
          },
          total: field ? { $sum: `$${field}` } : { $sum: 1 },
        },
      },
    ];

    const results = await Model.aggregate(pipeline);

    const currentData = results.find(
      (r) => r._id.month === currentMonth && r._id.year === currentYear
    );
    const compareData = results.find(
      (r) => r._id.month === compareMonth && r._id.year === compareYear
    );

    const currentValue = currentData?.total || 0;
    const compareValue = compareData?.total || 0;
    const absoluteChange = currentValue - compareValue;

    let growthPercentage = 0;
    if (compareValue === 0) {
      growthPercentage = currentValue > 0 ? 100 : 0;
    } else {
      growthPercentage = (absoluteChange / compareValue) * 100;
    }

    return {
      current: {
        value: currentValue,
        period: `${currentMonth}/${currentYear}`,
      },
      previous: {
        value: compareValue,
        period: `${compareMonth}/${compareYear}`,
      },
      growth: {
        absolute: absoluteChange,
        percentage: Math.round(growthPercentage * 100) / 100,
        isPositive: growthPercentage > 0,
        isNegative: growthPercentage < 0,
        trend:
          growthPercentage > 0
            ? "up"
            : growthPercentage < 0
            ? "down"
            : "stable",
      },
    };
  } catch (error) {
    console.error("Error calculating detailed growth:", error);
    return {
      current: { value: 0, period: "N/A" },
      previous: { value: 0, period: "N/A" },
      growth: {
        absolute: 0,
        percentage: 0,
        isPositive: false,
        isNegative: false,
        trend: "stable",
      },
    };
  }
};

/**
 * Calculate custom date range growth
 * @param {Object} Model - Mongoose model
 * @param {Date} startDate1 - Start of first period
 * @param {Date} endDate1 - End of first period
 * @param {Date} startDate2 - Start of second period
 * @param {Date} endDate2 - End of second period
 * @param {Object} options - Configuration options
 * @returns {Promise<number>} Growth percentage
 */
export const calculateCustomRangeGrowth = async (
  Model,
  startDate1,
  endDate1,
  startDate2,
  endDate2,
  options = {}
) => {
  try {
    const { field = null, additionalMatch = {} } = options;

    const buildQuery = (startDate, endDate) => ({
      ...additionalMatch,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    let period1Value, period2Value;

    if (field) {
      // Sum specific field
      const period1Result = await Model.aggregate([
        { $match: buildQuery(startDate1, endDate1) },
        { $group: { _id: null, total: { $sum: `$${field}` } } },
      ]);
      const period2Result = await Model.aggregate([
        { $match: buildQuery(startDate2, endDate2) },
        { $group: { _id: null, total: { $sum: `$${field}` } } },
      ]);

      period1Value = period1Result[0]?.total || 0;
      period2Value = period2Result[0]?.total || 0;
    } else {
      // Count documents
      period1Value = await Model.countDocuments(
        buildQuery(startDate1, endDate1)
      );
      period2Value = await Model.countDocuments(
        buildQuery(startDate2, endDate2)
      );
    }

    let growthPercentage = 0;
    if (period1Value === 0) {
      growthPercentage = period2Value > 0 ? 100 : 0;
    } else {
      growthPercentage = ((period2Value - period1Value) / period1Value) * 100;
    }

    return Math.round(growthPercentage * 100) / 100;
  } catch (error) {
    console.error("Error calculating custom range growth:", error);
    return 0;
  }
};
