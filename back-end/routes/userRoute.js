const router = require("express").Router();
const {
  verifyTokenAndAuthorisation,
  verifyTokenAndRestrictToAdmin,
} = require("./verifyToken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {
  createUser,
  getAllUser,
  getOneUser,
  deleteUser,
  getAllUsers,
  updateMe,
  deleteMe,
  unsubscribe
} = require("../controller/userController");
const { protect } = require("../controller/authController");

//Get One
router.route("/:id").get(verifyTokenAndRestrictToAdmin, getOneUser);

//Get All
router.route("/").get(verifyTokenAndRestrictToAdmin, getAllUsers);

//Delete User
router.route("/:id").delete(verifyTokenAndRestrictToAdmin, deleteUser);

// Update
router.route("/updateMe").patch(protect, updateMe);

// Delete
router.route("/deleteMe").delete(deleteMe);

//Unsubscribe
router.route("/unsubscribe").patch(protect, unsubscribe);

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
