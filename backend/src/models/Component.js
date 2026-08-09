const mongoose = require("mongoose");

const COMPONENT_CATEGORIES = [
  "Processor",
  "RAM",
  "Storage",
  "Graphics Card",
  "Display",
  "Battery",
  "Keyboard",
  "Operating System"
];

const componentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },

    category: {
      type: String,
      required: true,
      enum: COMPONENT_CATEGORIES,
      index: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: ""
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

componentSchema.index({
  name: "text",
  description: "text"
});

componentSchema.index({
  category: 1,
  isActive: 1
});

module.exports = mongoose.model(
  "Component",
  componentSchema
);

module.exports.COMPONENT_CATEGORIES =
  COMPONENT_CATEGORIES;