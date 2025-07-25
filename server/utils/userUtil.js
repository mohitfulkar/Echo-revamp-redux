
export const calculateMonthlyGrowth = async (model) => {
  const now = new Date();

  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfPreviousMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );
  const endOfPreviousMonth = new Date(startOfCurrentMonth);

  const currentMonthItems = await model.countDocuments({
    createdAt: { $gte: startOfCurrentMonth, $lt: now },
  });

  const previousMonthItems = await model.countDocuments({
    createdAt: { $gte: startOfPreviousMonth, $lt: endOfPreviousMonth },
  });

  let changePercentage = 0;

  if (previousMonthItems === 0 && currentMonthItems > 0) {
    changePercentage = 100;
  } else if (previousMonthItems > 0) {
    changePercentage =
      ((currentMonthItems - previousMonthItems) / previousMonthItems) * 100;
  }

  const change_percentage = parseFloat(changePercentage.toFixed(2));
  return change_percentage;
};
