const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp")

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controller/errorController");

const app = express();
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

// GLOBAL MIDDLEWARES
// Helmet sets security HTTP headers
app.use(helmet());

// logs api calls in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// apply a limit of 150 per hour to all routes with '/api'
const limiter = rateLimit({
  max: 120,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});
app.use("/api", limiter);

// Enable CORS middleware
app.use(cors());

// Body parser, reading data from body in req.body, with a 10kb limit
app.use(express.json({ limit: "10kb" }));

// Sanatise data against NoSQL query injection (filters our '$' and '.' from a request so mongo operators cannot work)
app.use(mongoSanitize())

// Sanatise data against cross-side-scripting attacks (xss), cannot insert html code into a request
app.use(xss())

// Prevent parameter pollution, so user cannot make lots of query params, and potentially crash the site.
app.use(hpp(
// whitelist: [ /*ADD ALLOW QUERY PARAMS HERE */]
))

// Serve static files
app.use(express.static(`${__dirname}/public`));

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
