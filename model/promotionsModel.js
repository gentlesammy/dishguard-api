// import schema and model from mongoose
const { Schema, model } = require("mongoose");

const promotionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  label: [],
  price: [],
  description: {
    type: String,
    required: true,
  },
  featured: {
    type: String,
    enum: [false, true],
  },
});

module.exports = model("Promotion", promotionSchema);
