const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const { promisify } = require("util");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  //Remove password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

//REGISTER
exports.register = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newUser = await User.create({
    userName: req.body.userName,
    email: req.body.email,
    // role: req.body.role,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createAndSendToken(newUser, 201, res);
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

  createAndSendToken(user, 200, res);
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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  console.log(req.body.email);

  // check if user exists
  if (!user) {
    return next(new AppError("There is no email with this email addess", 404));
  }
  // Generate the random token and save to user model in mongoDB, turn off validation for this function
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Send it back to the user by email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  console.log(req.protocol);

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}. \.If you didn't forget your password, please ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token, (valid for 15 mins)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      AppError("There was an error sending the email. Try again later", 500)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // Get User based on Token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // query for token, and compare token, is it greater than now? timestamp is converted by mongo
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // If no user send error
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Log in user

  createAndSendToken(newUser, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1) GET USER from collection
  const user = await User.findById(req.user.id).select("+password");
  //2) Check if posted current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong", 401));
  }
  //3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //User.findByIdAndUpdate will not work. The validation will not be checked, and the pre save middleware will not run.

  //4) Log user in, send JWT
  createAndSendToken(user, 200, res);
});
