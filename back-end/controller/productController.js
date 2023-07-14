const factory = require("../controller/handlerFactory");
const Product = require("../models/Product");

exports.deleteProduct = factory.deleteOne(Product);

exports.createProduct = factory.createOne(Product);

exports.getAllProducts = factory.getAll(Product);

exports.getOneProduct = factory.getOne(Product);
