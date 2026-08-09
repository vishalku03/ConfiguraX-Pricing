const express =
  require("express");

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
  createConfigurationValidator,
  updateConfigurationValidator
} = require(
  "../validators/configurationValidator"
);

const controller =
  require(
    "../controllers/configurationController"
  );

const router =
  express.Router();

router.use(
  protect
);

router.get(
  "/",
  controller.list
);

router.get(
  "/:id",
  controller.getOne
);

router.post(
  "/",
  createConfigurationValidator,
  validate,
  controller.create
);

router.put(
  "/:id",
  updateConfigurationValidator,
  validate,
  controller.update
);

router.patch(
  "/:id/archive",
  controller.archive
);

module.exports =
  router;