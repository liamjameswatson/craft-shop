const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
  });
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password = hashedPassword;
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        // Handle error
        return res.status(500).json({ message: "Error comparing passwords" });
      }
      if (result) {
        // Passwords match, proceed with login logic
        const accessToken = jwt.sign(
          {
            id: user._id,
            role: user.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "90d" }
        );
        const { password, ...otherInfo } = user._doc;

        return res
          .status(200)
          .json({ message: "Login successful", otherInfo, accessToken });
      } else {
        // Passwords do not match
        return res.status(401).json({ message: "Invalid password" });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
