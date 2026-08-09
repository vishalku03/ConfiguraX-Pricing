const {
  body
} = require(
  "express-validator"
);

const createConfigurationValidator = [

  body("name")
    .trim()
    .notEmpty()
    .withMessage(
      "Configuration name is required."
    )
    .isLength({
      max: 150
    }),

  body("componentIds")
    .isArray({
      min: 8,
      max: 8
    })
    .withMessage(
      "Exactly 8 component IDs are required."
    ),

  body("componentIds.*")
    .isMongoId()
    .withMessage(
      "Invalid component ID."
    )
];

const updateConfigurationValidator = [

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .isLength({
      max: 150
    }),

  body("componentIds")
    .optional()
    .isArray({
      min: 8,
      max: 8
    }),

  body("componentIds.*")
    .optional()
    .isMongoId()
];

module.exports = {
  createConfigurationValidator,
  updateConfigurationValidator
};