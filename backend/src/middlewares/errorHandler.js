const errorHandler = (err, req, res, next) => {
  console.error(err);
  const message = err.message || "An unexpected error occurred";
  const status = err.status || 500;
  res.status(status).json({ message });
};

module.exports = errorHandler;
