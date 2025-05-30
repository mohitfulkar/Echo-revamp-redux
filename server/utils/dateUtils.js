import dayjs from "dayjs";

/**
 * Returns start and end dates for current and previous month.
 */
export const getMonthlyDateRanges = () => {
  const now = dayjs();

  const startOfCurrentMonth = now.startOf("month").toDate();
  const startOfPreviousMonth = now
    .subtract(1, "month")
    .startOf("month")
    .toDate();
  const endOfPreviousMonth = startOfCurrentMonth;

  return {
    startOfCurrentMonth,
    startOfPreviousMonth,
    endOfPreviousMonth,
  };
};
