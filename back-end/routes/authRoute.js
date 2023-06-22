const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
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
    console.log(req.body.password);
    console.log(user.password);

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        // Handle error
        return res.status(500).json({ message: "Error comparing passwords" });
      }
      if (result) {
        // Passwords match, proceed with login logic
        // ... Send JWT or perform other actions ...
        return res.status(200).json({ message: "Login successful" });
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
