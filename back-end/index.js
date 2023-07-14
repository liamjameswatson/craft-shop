const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controller/errorController");

const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const basketRoute = require("./routes/basketRoute");
const orderRoute = require("./routes/orderRoute");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const stripeRoute = require("./routes/stripeRoute");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_STRING.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("DB Connection success"))
  .catch((err) => {
    console.log(err);
    console.log(DB);
  });

// Enable CORS middleware
app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/baskets", basketRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

// console.log(process.env);
app.listen(process.env.PORT || 8000, () => {
  console.log("Backend running");
});
