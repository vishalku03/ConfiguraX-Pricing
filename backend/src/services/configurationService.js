const Component =
  require("../models/Component");

const Configuration =
  require("../models/Configuration");

const {
  getPagination,
  getMeta
} = require(
  "../utils/pagination"
);

const CATEGORIES = [
  "Processor",
  "RAM",
  "Storage",
  "Graphics Card",
  "Display",
  "Battery",
  "Keyboard",
  "Operating System"
];

const normalizeIds =
  (ids) =>
    [
      ...new Set(
        ids.map(String)
      )
    ];

const buildSnapshot =
  async (
    componentIds
  ) => {

    const ids =
      normalizeIds(
        componentIds
      );

    if (
      ids.length !== 8
    ) {

      const error =
        new Error(
          "Exactly 8 unique components are required."
        );

      error.statusCode = 400;

      throw error;
    }

    const components =
      await Component.find({
        _id: {
          $in: ids
        },

        isActive: true
      }).lean();

    if (
      components.length !==
      8
    ) {

      const error =
        new Error(
          "One or more selected components are invalid or inactive."
        );

      error.statusCode = 400;

      throw error;
    }

    const categories =
      components.map(
        (item) =>
          item.category
      );

    const hasAllCategories =
      CATEGORIES.every(
        (category) =>
          categories.includes(
            category
          )
      );

    if (
      new Set(
        categories
      ).size !== 8 ||
      !hasAllCategories
    ) {

      const error =
        new Error(
          "Select exactly one component from every category."
        );

      error.statusCode = 400;

      throw error;
    }

    const snapshot =
      components.map(
        (item) => ({
          componentId:
            item._id,

          category:
            item.category,

          name:
            item.name,

          priceAtQuotation:
            item.price
        })
      );

    const totalPrice =
      snapshot.reduce(
        (
          total,
          item
        ) =>
          total +
          item.priceAtQuotation,
        0
      );

    return {
      snapshot,
      totalPrice
    };
  };

const createConfiguration =
  async (
    data,
    userId
  ) => {

    const {
      snapshot,
      totalPrice
    } =
      await buildSnapshot(
        data.componentIds
      );

    const componentIds =
      data.componentIds.map(
        String
      );

    const existing =
      await Configuration.find({
        status: {
          $ne: "archived"
        }
      }).lean();

    const duplicate =
      existing.find(
        (configuration) => {

          const savedIds =
            configuration.components
              .map(
                (item) =>
                  String(
                    item.componentId
                  )
              )
              .sort();

          const requestedIds =
            [
              ...componentIds
            ].sort();

          return (
            JSON.stringify(
              savedIds
            ) ===
            JSON.stringify(
              requestedIds
            )
          );
        }
      );

    if (duplicate) {

      const error =
        new Error(
          "This component combination already exists."
        );

      error.statusCode = 409;

      throw error;
    }

    return Configuration.create({
      name:
        data.name,

      components:
        snapshot,

      totalPrice,

      createdBy:
        userId,

      updatedBy:
        userId,

      status:
        "saved"
    });
  };

const updateConfiguration =
  async (
    configuration,
    data,
    userId
  ) => {

    if (
      data.componentIds
    ) {

      const {
        snapshot,
        totalPrice
      } =
        await buildSnapshot(
          data.componentIds
        );

      configuration.components =
        snapshot;

      configuration.totalPrice =
        totalPrice;
    }

    if (
      data.name !==
      undefined
    ) {
      configuration.name =
        data.name;
    }

    configuration.updatedBy =
      userId;

    return configuration.save();
  };

const listConfigurations =
  async (query) => {

    const {
      page,
      limit,
      skip
    } =
      getPagination(query);

    const filter = {};

    if (
      query.status
    ) {
      filter.status =
        query.status;
    }

    if (
      query.search
    ) {
      filter.name = {
        $regex:
          query.search.trim(),
        $options: "i"
      };
    }

    if (
      query.minPrice !==
        undefined ||
      query.maxPrice !==
        undefined
    ) {

      filter.totalPrice =
        {};

      if (
        query.minPrice !==
        undefined
      ) {
        filter.totalPrice.$gte =
          Number(
            query.minPrice
          );
      }

      if (
        query.maxPrice !==
        undefined
      ) {
        filter.totalPrice.$lte =
          Number(
            query.maxPrice
          );
      }
    }

    const [
      items,
      total
    ] = await Promise.all([

      Configuration.find(
        filter
      )
        .populate(
          "createdBy",
          "name email"
        )
        .populate(
          "updatedBy",
          "name email"
        )
        .sort({
          createdAt: -1
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Configuration.countDocuments(
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

module.exports = {
  buildSnapshot,
  createConfiguration,
  updateConfiguration,
  listConfigurations
};