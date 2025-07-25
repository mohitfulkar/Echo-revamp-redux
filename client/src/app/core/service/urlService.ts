export const getTabFromUrl = () => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab");
  }
  return null;
};
