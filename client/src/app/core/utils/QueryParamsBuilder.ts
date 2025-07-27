export const buildSearchParams = (
  queryParams: Record<string, any>
): URLSearchParams => {
  const searchParams = new URLSearchParams();

  for (const key in queryParams) {
    const value = queryParams[key];
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== undefined && v !== null) {
          searchParams.append(key, String(v));
        }
      });
    } else {
      searchParams.set(key, String(value));
    }
  }

  return searchParams;
};
