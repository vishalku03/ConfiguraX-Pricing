const mongoose =
  require("mongoose");

const Configuration =
  require(
    "../models/Configuration"
  );

const configurationService =
  require(
    "../services/configurationService"
  );

const {
  success
} = require(
  "../utils/apiResponse"
);

const list =
  async (
    req,
    res,
    next
  ) => {

    try {

      const result =
        await configurationService
          .listConfigurations(
            req.query
          );

      return success(
        res,
        result,
        "Configurations fetched."
      );

    } catch (error) {

      next(error);
    }
  };

const getOne =
  async (
    req,
    res,
    next
  ) => {

    try {

      if (
        !mongoose.isValidObjectId(
          req.params.id
        )
      ) {

        const error =
          new Error(
            "Invalid configuration ID."
          );

        error.statusCode =
          400;

        throw error;
      }

      const configuration =
        await Configuration.findById(
          req.params.id
        )
          .populate(
            "createdBy",
            "name email"
          )
          .populate(
            "updatedBy",
            "name email"
          )
          .populate(
            "components.componentId"
          )
          .lean();

      if (!configuration) {

        const error =
          new Error(
            "Configuration not found."
          );

        error.statusCode =
          404;

        throw error;
      }

      return success(
        res,
        { configuration },
        "Configuration fetched."
      );

    } catch (error) {

      next(error);
    }
  };

const create =
  async (
    req,
    res,
    next
  ) => {

    try {

      const configuration =
        await configurationService
          .createConfiguration(
            req.body,
            req.user._id
          );

      return success(
        res,
        { configuration },
        "Configuration saved.",
        201
      );

    } catch (error) {

      next(error);
    }
  };

const update =
  async (
    req,
    res,
    next
  ) => {

    try {

      if (
        !mongoose.isValidObjectId(
          req.params.id
        )
      ) {

        const error =
          new Error(
            "Invalid configuration ID."
          );

        error.statusCode =
          400;

        throw error;
      }

      const configuration =
        await Configuration.findById(
          req.params.id
        );

      if (!configuration) {

        const error =
          new Error(
            "Configuration not found."
          );

        error.statusCode =
          404;

        throw error;
      }

      const updated =
        await configurationService
          .updateConfiguration(
            configuration,
            req.body,
            req.user._id
          );

      return success(
        res,
        { configuration: updated },
        "Configuration updated."
      );

    } catch (error) {

      next(error);
    }
  };

const archive =
  async (
    req,
    res,
    next
  ) => {

    try {

      const configuration =
        await Configuration.findById(
          req.params.id
        );

      if (!configuration) {

        const error =
          new Error(
            "Configuration not found."
          );

        error.statusCode =
          404;

        throw error;
      }

      configuration.status =
        "archived";

      configuration.updatedBy =
        req.user._id;

      await configuration.save();

      return success(
        res,
        { configuration },
        "Configuration archived."
      );

    } catch (error) {

      next(error);
    }
  };

module.exports = {
  list,
  getOne,
  create,
  update,
  archive
};