const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Please enter a unique name for the product"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description for the product"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "A tour must have a product image"],
    },
    images: [String],
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: [true, "A product must have a price"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
