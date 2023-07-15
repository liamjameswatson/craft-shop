const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { register, login } = require("../controller/authController");

//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

module.exports = router;
