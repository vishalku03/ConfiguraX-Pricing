const Component =
  require("../models/Component");

const componentService =
  require("../services/componentService");

const {
  success,
} = require("../utils/apiResponse");



const list =
  async (
    req,
    res,
    next
  ) => {
    try {
      const result =
        await componentService.listComponents(
          req.query
        );

      return success(
        res,
        result,
        "Components fetched."
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
      const component =
        await Component.findById(
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
          .lean();

      if (!component) {
        const error =
          new Error(
            "Component not found."
          );

        error.statusCode = 404;

        throw error;
      }

      return success(
        res,
        { component },
        "Component fetched."
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
      const component =
        await componentService.createComponent(
          req.body,
          req.user._id
        );

      return success(
        res,
        { component },
        "Component created.",
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
      const component =
        await Component.findById(
          req.params.id
        );

      if (!component) {
        const error =
          new Error(
            "Component not found."
          );

        error.statusCode = 404;

        throw error;
      }

      const updated =
        await componentService.updateComponent(
          component,
          req.body,
          req.user._id
        );

      return success(
        res,
        { component: updated },
        "Component updated."
      );
    } catch (error) {
      next(error);
    }
  };



const remove =
  async (
    req,
    res,
    next
  ) => {
    try {
      const component =
        await Component.findById(
          req.params.id
        );

      if (!component) {
        const error =
          new Error(
            "Component not found."
          );

        error.statusCode = 404;

        throw error;
      }

      await Component.findByIdAndDelete(
        req.params.id
      );

      return success(
        res,
        {
          componentId:
            req.params.id,
        },
        "Component deleted successfully."
      );
    } catch (error) {
      next(error);
    }
  };


const deactivate =
  async (
    req,
    res,
    next
  ) => {
    try {
      const component =
        await Component.findById(
          req.params.id
        );

      if (!component) {
        const error =
          new Error(
            "Component not found."
          );

        error.statusCode = 404;

        throw error;
      }

      component.isActive =
        false;

      component.updatedBy =
        req.user._id;

      await component.save();

      return success(
        res,
        { component },
        "Component deactivated."
      );
    } catch (error) {
      next(error);
    }
  };


const activate =
  async (
    req,
    res,
    next
  ) => {
    try {
      const component =
        await Component.findById(
          req.params.id
        );

      if (!component) {
        const error =
          new Error(
            "Component not found."
          );

        error.statusCode = 404;

        throw error;
      }

      component.isActive =
        true;

      component.updatedBy =
        req.user._id;

      await component.save();

      return success(
        res,
        { component },
        "Component activated."
      );
    } catch (error) {
      next(error);
    }
  };



const history =
  async (
    req,
    res,
    next
  ) => {
    try {
      const exists =
        await Component.exists({
          _id:
            req.params.id,
        });

      if (!exists) {
        const error =
          new Error(
            "Component not found."
          );

        error.statusCode = 404;

        throw error;
      }

      const items =
        await componentService.getPriceHistory(
          req.params.id
        );

      return success(
        res,
        { items },
        "Price history fetched."
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
  remove,
  deactivate,
  activate,
  history,
};