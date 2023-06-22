const { verifyToken, verifyTokenAndAuthorisation } = require("./verifyToken");
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

module.exports = router;
