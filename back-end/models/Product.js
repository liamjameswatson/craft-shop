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
    materials: { type: Array },
    categories: { type: Array },
    tags: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: [true, "A product must have a price"] },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
