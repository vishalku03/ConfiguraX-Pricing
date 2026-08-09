const getPagination = (
  query
) => {
  const page = Math.max(
    parseInt(query.page, 10) || 1,
    1
  );

  const limit = Math.min(
    Math.max(
      parseInt(query.limit, 10) || 10,
      1
    ),
    100
  );

  return {
    page,
    limit,
    skip:
      (page - 1) * limit
  };
};

const getMeta = (
  page,
  limit,
  total
) => ({
  page,
  limit,
  total,

  totalPages:
    Math.ceil(total / limit),

  hasNextPage:
    page * limit < total,

  hasPreviousPage:
    page > 1
});

module.exports = {
  getPagination,
  getMeta
};