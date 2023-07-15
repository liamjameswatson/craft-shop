const router = require("express").Router();
const Order = require("../models/Order");
const {
  verifyTokenAndAuthorisation,
  verifyTokenAndRestrictToAdmin,
} = require("./verifyToken");
const {
  createOrder,
  getAllOrders,
  getOneOrder,
  deleteOrder,
} = require("../controller/orderController");
const { protect, restrictTo } = require("../controller/authController");

//CREATE
router.route("/").post(verifyTokenAndAuthorisation, createOrder);

// router.post("/", verifyTokenAndAuthorisation, async (req, res) => {
//   const newOrder = new Order(req.body);
//   try {
//     const savedOrder = await newOrder.save();
//     res.status(200).json(savedOrder);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Update

router.put("/:id", verifyTokenAndRestrictToAdmin, async (req, res) => {
  updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  try {
    res.status(200).json(updatedOrder, { message: "Order has been updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete

// router.delete("/:id", verifyTokenAndRestrictToAdmin, async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Order has been deleted" });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.route("/:id", verifyTokenAndRestrictToAdmin, deleteOrder);

// GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL ORDERS

router.route("/").get(protect, restrictTo("user"), getAllOrders);
// router.route("/").get(verifyTokenAndRestrictToAdmin, getAllOrders);

// router.get("/", verifyTokenAndRestrictToAdmin, async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// GET ONE ORDER
router.get("/:id", verifyTokenAndAuthorisation, getOneOrder);

// router.get("/:id", verifyTokenAndAuthorisation, async (req, res) => {
//   try {
//     console.log(req.params.id);
//     const order = await Order.findById(req.params.id)
//     res.status(200).json(order)
//   } catch (err) {
//     console.log(err);
//   }
// });

//GET MONTHLY INCOME

router.get("/income", verifyTokenAndRestrictToAdmin, async (req, res) => {
  const productId = req.query.productId;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elementMatch: { productId: productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
