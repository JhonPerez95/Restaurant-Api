const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    total: {
      type: Number,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
          require: true,
        },
        quantity: {
          type: Number,
          min: 0,
        },
        isAdditional: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Order", orderSchema);
