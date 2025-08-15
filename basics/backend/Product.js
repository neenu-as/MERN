const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  image: { type: String }, // store file path
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
});

module.exports = mongoose.model("Product", ProductSchema);
