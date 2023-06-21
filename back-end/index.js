const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const authRoute = require("./routes/authRoute");

const userRoute = require("./routes/userRoute");

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

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log("Backend running");
});
