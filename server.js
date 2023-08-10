require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const orderRoute = require("./routes/orderRoute");
var cors = require("cors");
const app = express();

const Order = require("./models/orderModel");
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

var corsOptions = {
  origin: [
    FRONTEND_URL,
    "http://localhost:3000",
    "https://success-page-git-main-nikonaime.vercel.app",
    "https://success-page.vercel.app",
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());

//routes

app.use("/api/order", orderRoute);

app.get("/", (req, res) => {
  res.send("Hello NODE API");
});

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
