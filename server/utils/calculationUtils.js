export const getPercentage = (min, max, decimals = 2) => {
  if (min > max) {
    throw new Error("min should not be greater than max");
  }

  const random = Math.random(); // Random number between 0 and 1
  const percentage = (min / max) * 100;
  return Number(percentage.toFixed(decimals));
};
