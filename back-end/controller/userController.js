const factory = require("../controller/handlerFactory");
const User = require("../models/User");

exports.deleteUser = factory.deleteOne(User);

exports.createUser = factory.createOne(User);

exports.getAllUsers = factory.getAll(User);

exports.getOneUser = factory.getOne(User);