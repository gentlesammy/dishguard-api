// import schema and model from mongoose
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;

const promotionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: " ",
    },
    price: {
      type: Currency,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Promotion", promotionSchema);
