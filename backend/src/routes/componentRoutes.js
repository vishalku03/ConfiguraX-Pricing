const express =
  require("express");

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

const authorize =
  require(
    "../middleware/roleMiddleware"
  );

const validate =
  require(
    "../middleware/validateMiddleware"
  );

const {
  createComponentValidator,
  updateComponentValidator
} = require(
  "../validators/componentValidator"
);

const controller =
  require(
    "../controllers/componentController"
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
  "/:id/history",
  controller.history
);

router.get(
  "/:id",
  controller.getOne
);

router.post(
  "/",
  authorize("admin"),
  createComponentValidator,
  validate,
  controller.create
);

router.put(
  "/:id",
  authorize("admin"),
  updateComponentValidator,
  validate,
  controller.update
);

router.patch(
  "/:id/deactivate",
  authorize("admin"),
  controller.deactivate
);

router.patch(
  "/:id/activate",
  authorize("admin"),
  controller.activate
);

router.delete(
  "/:id",
  authorize("admin"),
  controller.deactivate
);

module.exports =
  router;