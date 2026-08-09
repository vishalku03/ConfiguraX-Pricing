const express =
  require("express");

const {
  login,
  getMe
} = require(
  "../controllers/authController"
);

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

const validate =
  require(
    "../middleware/validateMiddleware"
  );

const {
  loginValidator
} = require(
  "../validators/authValidator"
);

const router =
  express.Router();

router.post(
  "/login",
  loginValidator,
  validate,
  login
);

router.get(
  "/me",
  protect,
  getMe
);

module.exports =
  router;