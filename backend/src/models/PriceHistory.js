const mongoose = require("mongoose");

const priceHistorySchema =
  new mongoose.Schema(
    {
      component: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Component",
        required: true,
        index: true
      },

      oldPrice: {
        type: Number,
        required: true,
        min: 0
      },

      newPrice: {
        type: Number,
        required: true,
        min: 0
      },

      changedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },

      reason: {
        type: String,
        trim: true,
        maxlength: 500,
        default: ""
      }
    },
    {
      timestamps: true
    }
  );

module.exports =
  mongoose.model(
    "PriceHistory",
    priceHistorySchema
  );