const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const util = require("util");
const hashAsync = util.promisify(bcrypt.hash);
const validator = require("validator");

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
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Pleasse provide a valid email"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 9,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      // select: false,
      validate: {
        //ONLY WORKS ON CREATE and SAVE()
        validator: function (el) {
          return el === this.password;
        },
        message: "The Passwords are not the same!",
      },
    },
    img: { type: String },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

// encrypt the password before saving to database
userSchema.pre("save", async function (next) {
  // Only run this if password was modified, else - next()
  if (!this.isModified("password")) return next();
  // Hash password
  this.password = await hashAsync(this.password, 12);
  // remove passwordConfirm (only set for validations)
  this.passwordConfirm = undefined;
  next();
});

// compare both passwords for login
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// to verify a user's JWT
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }
  // False means password has not been changed
  return false;
};

// for forgot password route
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  // save the encryted token to mongoDB
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    console.log({resetToken}, 'password reset token =', this.passwordResetToken)
    

  // TOKEN EXPIRES IN 15 mins
  this.passwordResetExpires = Date.now() + 15 * 60 * 1000;

  // return uncncrypted token to be emailed
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
