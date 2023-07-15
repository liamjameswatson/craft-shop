const factory = require("../controller/handlerFactory");
const Order = require("../models/Order");


exports.createOrder = factory.createOne(Order);

exports.getAllOrders = factory.getAll(Order);

exports.getOneOrder = factory.getOne(Order);
