const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//REGISTER
exports.register = catchAsync(async (req, res, next) => {
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    // role: req.body.role,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //Is there email/password
  if (!email || !password) {
    return next(new AppError("Please provide an email and password", 400));
  }

  //Do the email and password match a user
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

// CHECKS TO SEE IF USER IS LOGGED IN
exports.protect = catchAsync(async (req, res, next) => {
  // GET TOKEN
  let token;
  if (req.headers.token && req.headers.token.startsWith("Bearer")) {
    token = req.headers.token.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  // Validate Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check user has not been deleted
  const validatedUser = await User.findById(decoded.id);
  // console.log(validatedUser);
  if (!validatedUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // Check if user changed password after token was issued
  if (validatedUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password, please log in again", 401)
    );
  }
  //GRANT ACCESS TO PROTECTED ROUTE

  req.user = validatedUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array => ['admin', ...].
    //if role array doesn't include user.role, don't grant access
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    // if permission granted, go to next which is the route handler
    next();
  };
};
