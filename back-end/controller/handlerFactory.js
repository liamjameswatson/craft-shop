const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.params.id);
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: newDoc,
      },
    });
  });
};

exports.getOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const item = await Model.findById(req.params.id);

    if (!item) {
      return next(new AppError("No item found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        item,
      },
    });
  });
};

exports.getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    const queryNew = req.query.new;
    const queryCategory = req.query.category;

    let items;
    if (queryNew) {
      items = await Model.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCategory) {
      items = await Model.find({
        categories: {
          $in: [queryCategory],
        },
      });
      if (items.length === 0) {
        return next(new AppError("No category found", 404));
      }
    } else {
      items = await Model.find();
    }
    res.status(200).json(items);
  });
};
