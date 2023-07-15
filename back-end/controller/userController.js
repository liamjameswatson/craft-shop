const factory = require("../controller/handlerFactory");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

//for the updateMe function. Takes in an object and makes a new object based on allowedFields. Removes all unecessary info, so cannot change role
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.deleteUser = factory.deleteOne(User);

exports.createUser = factory.createOne(User);

exports.getAllUsers = factory.getAll(User);

exports.getOneUser = factory.getOne(User);

exports.updateMe = catchAsync(async (req, res, next) => {
  // If user updates password on this route, send error
  console.log(req.body);
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword",
        400
      )
    );
  }
  // If not, update user information

  //Don't accept everything in the body, only these properties:
  const filteredBody = filterObj(req.body, "userName", "email");

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  u;

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
