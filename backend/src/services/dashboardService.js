const Component =
  require("../models/Component");

const Configuration =
  require("../models/Configuration");

const getDashboardStats =
  async () => {

    const [
      components,
      activeComponents,
      configurations,
      quotedValue,
      recentConfigurations
    ] =
      await Promise.all([

        Component.countDocuments(),

        Component.countDocuments({
          isActive: true
        }),

        Configuration.countDocuments({
          status: {
            $ne: "archived"
          }
        }),

        Configuration.aggregate([
          {
            $match: {
              status: {
                $ne: "archived"
              }
            }
          },

          {
            $group: {
              _id: null,

              total: {
                $sum:
                  "$totalPrice"
              }
            }
          }
        ]),

        Configuration.find({
          status: {
            $ne: "archived"
          }
        })
          .populate(
            "createdBy",
            "name email"
          )
          .sort({
            createdAt: -1
          })
          .limit(5)
          .lean()
      ]);

    return {

      components,

      activeComponents,

      configurations,

      quotedValue:
        quotedValue[0]?.total ||
        0,

      recentConfigurations:
        recentConfigurations.map(
          (item) => ({
            id:
              item._id,

            name:
              item.name,

            totalPrice:
              item.totalPrice,

            createdAt:
              item.createdAt,

            createdBy:
              item.createdBy
          })
        )
    };
  };

module.exports = {
  getDashboardStats
};