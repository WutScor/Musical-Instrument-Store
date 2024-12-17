exports.paginate = (items, totalItems, page, limit) => {
  const totalPages = Math.ceil(totalItems / limit);

  return {
    items,
    pagination: {
      page,
      limit,
      totalPages,
      totalItems,
    },
  };
};
