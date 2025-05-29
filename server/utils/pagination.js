export const getPaginationOptions = (query) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export const buildMeta = ({ total, page, limit }) => {
  const pages = Math.ceil(total / limit);
  return { total, page, limit, pages };
};
