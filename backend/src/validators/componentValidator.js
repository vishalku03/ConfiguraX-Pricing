const {
  body
} = require(
  "express-validator"
);

const categories = [
  "Processor",
  "RAM",
  "Storage",
  "Graphics Card",
  "Display",
  "Battery",
  "Keyboard",
  "Operating System"
];

const createComponentValidator = [

  body("name")
    .trim()
    .notEmpty()
    .withMessage(
      "Component name is required."
    )
    .isLength({
      max: 150
    })
    .withMessage(
      "Component name is too long."
    ),

  body("category")
    .isIn(categories)
    .withMessage(
      "Invalid component category."
    ),

  body("price")
    .isFloat({
      min: 0
    })
    .withMessage(
      "Price must be a non-negative number."
    ),

  body("description")
    .optional()
    .isString()
    .isLength({
      max: 1000
    })
    .withMessage(
      "Description is too long."
    )
];

const updateComponentValidator = [

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .isLength({
      max: 150
    }),

  body("category")
    .optional()
    .isIn(categories),

  body("price")
    .optional()
    .isFloat({
      min: 0
    }),

  body("description")
    .optional()
    .isString()
    .isLength({
      max: 1000
    }),

  body("isActive")
    .optional()
    .isBoolean()
];

module.exports = {
  categories,
  createComponentValidator,
  updateComponentValidator
};