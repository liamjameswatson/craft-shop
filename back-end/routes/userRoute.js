const {
  verifyTokenAndAuthorisation,
  verifyTokenAndRestrictToAdmin,
} = require("./verifyToken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = require("express").Router();

// Update

router.put("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  if (req.body.password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete

router.delete("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User has been deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER
router.get("/find/:id", verifyTokenAndRestrictToAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...otherInfo } = user._doc;
    res.status(200).json(otherInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL USERS
router.get("/", verifyTokenAndRestrictToAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER STATS
router.get("/stats", verifyTokenAndRestrictToAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
