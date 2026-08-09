const success = (
  res,
  data = {},
  message = "Success",
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data
  });
};

const failure = (
  res,
  message = "Request failed",
  statusCode = 400,
  errors
) => {
  const response = {
    success: false,
    message
  };

  if (errors) {
    response.errors = errors;
  }

  return res
    .status(statusCode)
    .json(response);
};

module.exports = {
  success,
  failure
};