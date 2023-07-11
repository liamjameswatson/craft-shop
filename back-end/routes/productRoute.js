const router = require("express").Router();
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { verifyTokenAndRestrictToAdmin } = require("./verifyToken");

//CREATE

router.post(
  "/",
  verifyTokenAndRestrictToAdmin,
  catchAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);

    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  })
);
// Update

router.put(
  "/:id",
  verifyTokenAndRestrictToAdmin,
  catchAsync(async (req, res, next) => {
    updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res
      .status(200)
      .json(updatedProduct, { message: "Product has been updated" });
  })
);

// Delete

router.delete(
  "/:id",
  verifyTokenAndRestrictToAdmin,
  catchAsync(async (req, res, next) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product has been deleted" });
  })
);

// GET PRODUCT
router.get(
  "/find/:id",
  catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    console.log(product);

    if (!product) {
      return next(new AppError("No product found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
      message: "heelooo",
    });
  })
);

// GET ALL PRODUCTS
router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const queryNew = req.query.new;
    const queryCategory = req.query.category;

    let products;
    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCategory) {
      products = await Product.find({
        categories: {
          $in: [queryCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  })
);

module.exports = router;
