const mongoose = require("mongoose");

const configurationComponentSchema =
  new mongoose.Schema(
    {
      componentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Component",
        required: true
      },

      category: {
        type: String,
        required: true
      },

      name: {
        type: String,
        required: true
      },

      priceAtQuotation: {
        type: Number,
        required: true,
        min: 0
      }
    },
    {
      _id: false
    }
  );

const configurationSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
      },

      components: {
        type: [
          configurationComponentSchema
        ],

        required: true,

        validate: {
          validator(items) {
            return items.length === 8;
          },

          message:
            "A configuration must contain exactly 8 components."
        }
      },

      totalPrice: {
        type: Number,
        required: true,
        min: 0
      },

      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
      },

      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },

      status: {
        type: String,
        enum: [
          "draft",
          "saved",
          "archived"
        ],
        default: "saved",
        index: true
      }
    },
    {
      timestamps: true
    }
  );

configurationSchema.index({
  name: "text"
});

configurationSchema.index({
  createdAt: -1
});

module.exports =
  mongoose.model(
    "Configuration",
    configurationSchema
  );