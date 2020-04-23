const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    quantity: {
      type: Number,
      min: 0,
    },
    avaliable: {
      type: Boolean,
      default: true,
    },
    isAdditional: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Producto", productSchema);
