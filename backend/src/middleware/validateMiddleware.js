const {
  validationResult
} = require(
  "express-validator"
);

const validate = (
  req,
  res,
  next
) => {

  const result =
    validationResult(req);

  if (!result.isEmpty()) {

    return res.status(422).json({
      success: false,

      message:
        "Validation failed.",

      errors:
        result.array().map(
          (item) => ({
            field: item.path,
            message: item.msg
          })
        )
    });
  }

  next();
};

module.exports =
  validate;