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

export function formatTimestampToDate(timestamp) {
  if (!timestamp) return "-";

  const date = new Date(timestamp);

  const options = {
    year: "numeric",
    month: "short", // e.g., Jan, Feb
    day: "numeric",
  };

  return date.toLocaleString("en-IN", options); // You can change locale as needed
}
export function formatTimestampToTime(timestamp) {
  if (!timestamp) return "-";

  const date = new Date(timestamp);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleString("en-IN", options); // You can change locale as needed
}
