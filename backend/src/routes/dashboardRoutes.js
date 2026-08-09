const express =
  require("express");

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

const controller =
  require(
    "../controllers/dashboardController"
  );

const router =
  express.Router();

router.use(
  protect
);

router.get(
  "/stats",
  controller.stats
);

module.exports =
  router;