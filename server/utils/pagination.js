export const getPaginationOptions = (query) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export const buildMeta = ({
  total,
  page,
  limit,
  baseUrl = "",
  queryParams = {},
}) => {
  const pages = Math.ceil(total / limit);

  const buildUrl = (newPage) => {
    const params = new URLSearchParams({
      ...queryParams,
      page: newPage,
      limit,
    }).toString();
    return `${baseUrl}?${params}`;
  };

  const meta = {
    total,
    page,
    limit,
    pages,
    prev: page > 1 ? buildUrl(page - 1) : null,
    next: page < pages ? buildUrl(page + 1) : null,
  };

  return meta;
};
