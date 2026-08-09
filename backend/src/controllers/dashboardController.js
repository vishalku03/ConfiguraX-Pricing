const {
  getDashboardStats
} = require(
  "../services/dashboardService"
);

const {
  success
} = require(
  "../utils/apiResponse"
);

const stats =
  async (
    req,
    res,
    next
  ) => {

    try {

      const data =
        await getDashboardStats();

      return success(
        res,
        data,
        "Dashboard statistics fetched."
      );

    } catch (error) {

      next(error);
    }
  };

module.exports = {
  stats
};