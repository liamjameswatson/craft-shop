const router = require("express").Router();
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const factory = require("../controller/handlerFactory");
const { verifyTokenAndRestrictToAdmin } = require("./verifyToken");
const {
  createProduct,
  getAllProducts,
  getOneProduct,
  deleteProduct
} = require("../controller/productController");


//CREATE
router.route("/").post(verifyTokenAndRestrictToAdmin, createProduct);

//Get One
router.route("/:id").get(verifyTokenAndRestrictToAdmin, getOneProduct);

//Get All
router.route("/").get(verifyTokenAndRestrictToAdmin, getAllProducts);

//DELETE
router.route("/:id").delete(verifyTokenAndRestrictToAdmin, deleteProduct);

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


module.exports = router;
