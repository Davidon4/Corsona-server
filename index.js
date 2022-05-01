const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors());

// Middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use("/public/uploads", express.static(__dirname, +"/public/uploads"));
app.use(authJwt());
app.use(errorHandler);

// Routes
const productsRouter = require("./routes/products");
const categoryRouter = require("./routes/categories");
const orderRouter = require("./routes/orders");
const userRouter = require("./routes/users");

const api = process.env.API_URL;

app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/orders`, orderRouter);
app.use(`${api}/users`, userRouter);

// Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // dbName: "corsona-database",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

// Server
app.listen(5000, () => {
  console.log("server is running http://localhost:5000");
});
