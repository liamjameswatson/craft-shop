const router = require("express").Router();
const Order = require("../models/Order");
const {
  verifyTokenAndAuthorisation,
  verifyTokenAndRestrictToAdmin,
} = require("./verifyToken");

//CREATE

router.post("/", verifyTokenAndAuthorisation, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

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

router.delete("/:id", verifyTokenAndRestrictToAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order has been deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

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
router.get("/", verifyTokenAndRestrictToAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET MONTHLY INCOME

router.get("/income", verifyTokenAndRestrictToAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
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
