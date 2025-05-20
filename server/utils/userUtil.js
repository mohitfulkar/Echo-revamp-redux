import User from "../models/User.js";

export const calculateMonthlyUserGrowth = async () => {
  const now = new Date();

  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfPreviousMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );
  const endOfPreviousMonth = new Date(startOfCurrentMonth);

  const currentMonthUsers = await User.countDocuments({
    createdAt: { $gte: startOfCurrentMonth, $lt: now },
  });

  const previousMonthUsers = await User.countDocuments({
    createdAt: { $gte: startOfPreviousMonth, $lt: endOfPreviousMonth },
  });

  let changePercentage = 0;

  if (previousMonthUsers === 0 && currentMonthUsers > 0) {
    changePercentage = 100;
  } else if (previousMonthUsers > 0) {
    changePercentage =
      ((currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100;
  }

  const change_percentage = parseFloat(changePercentage.toFixed(2));
  return change_percentage;
};
