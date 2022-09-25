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
/*  */
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use("/public/uploads", express.static(__dirname, +"/public/uploads"));
app.use(authJwt());
app.use(errorHandler);

/* Importing the routes from the routes folder. */
const productsRouter = require("./routes/products");
const categoryRouter = require("./routes/categories");
const orderRouter = require("./routes/orders");
const userRouter = require("./routes/users");

const api = process.env.API_URL;

/* A way to use the api url in the routes. */
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/orders`, orderRouter);
app.use(`${api}/users`, userRouter);

/* Connecting to the database. */
mongoose
  .connect(process.env.CONNECTION_STRING, {})
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

/* Listening to the port 3000. */
app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});

// Production
// var server = app.listen(process.env.PORT || 5000, function() {
//   var port = server.address().port;
//   console.log("Express is working on port " + port)
// })
