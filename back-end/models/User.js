const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const util = require("util");
const hashAsync = util.promisify(bcrypt.hash);

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Please enter a username"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please provide your email"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    img: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await hashAsync(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
