const notFound = (
  req,
  res
) => {

  res.status(404).json({
    success: false,

    message:
      `Route not found: ${req.method} ${req.originalUrl}`
  });
};

const errorHandler = (
  error,
  req,
  res,
  next
) => {

  console.error(error);

  if (
    error.name ===
    "ValidationError"
  ) {
    return res.status(422).json({
      success: false,

      message:
        "Database validation failed.",

      errors:
        Object.values(
          error.errors
        ).map(
          (item) =>
            item.message
        )
    });
  }

  if (
    error.code === 11000
  ) {
    return res.status(409).json({
      success: false,

      message:
        "Duplicate value already exists."
    });
  }

  const statusCode =
    error.statusCode || 500;

  return res
    .status(statusCode)
    .json({
      success: false,

      message:
        statusCode === 500
          ? "Internal server error."
          : error.message
    });
};

module.exports = {
  notFound,
  errorHandler
};