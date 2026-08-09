const Component =
  require("../models/Component");

const PriceHistory =
  require("../models/PriceHistory");

const {
  getPagination,
  getMeta
} = require(
  "../utils/pagination"
);

const listComponents =
  async (query) => {

    const {
      page,
      limit,
      skip
    } =
      getPagination(query);

    const filter = {};

    if (query.category) {
      filter.category =
        query.category;
    }

    if (
      query.status ===
      "active"
    ) {
      filter.isActive = true;
    }

    if (
      query.status ===
      "inactive"
    ) {
      filter.isActive = false;
    }

    if (query.search) {

      filter.$or = [
        {
          name: {
            $regex:
              query.search.trim(),
            $options: "i"
          }
        },

        {
          description: {
            $regex:
              query.search.trim(),
            $options: "i"
          }
        }
      ];
    }

    const [
      items,
      total
    ] = await Promise.all([

      Component.find(filter)
        .populate(
          "createdBy",
          "name email"
        )
        .populate(
          "updatedBy",
          "name email"
        )
        .sort({
          category: 1,
          name: 1
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Component.countDocuments(
        filter
      )
    ]);

    return {
      items,

      pagination:
        getMeta(
          page,
          limit,
          total
        )
    };
  };

const createComponent =
  async (
    data,
    userId
  ) => {

    return Component.create({
      name:
        data.name,

      category:
        data.category,

      price:
        Number(data.price),

      description:
        data.description || "",

      createdBy:
        userId,

      updatedBy:
        userId
    });
  };

const updateComponent =
  async (
    component,
    data,
    userId
  ) => {

    const oldPrice =
      component.price;

    if (
      data.price !==
      undefined
    ) {
      data.price =
        Number(data.price);
    }

    Object.assign(
      component,
      data
    );

    component.updatedBy =
      userId;

    const updated =
      await component.save();

    if (
      data.price !==
        undefined &&
      oldPrice !==
        updated.price
    ) {

      await PriceHistory.create({
        component:
          updated._id,

        oldPrice,

        newPrice:
          updated.price,

        changedBy:
          userId,

        reason:
          data.priceChangeReason ||
          "Component price updated."
      });
    }

    return updated;
  };

const getPriceHistory =
  async (
    componentId
  ) => {

    return PriceHistory.find({
      component:
        componentId
    })
      .populate(
        "changedBy",
        "name email"
      )
      .sort({
        createdAt: -1
      })
      .lean();
  };

module.exports = {
  listComponents,
  createComponent,
  updateComponent,
  getPriceHistory
};