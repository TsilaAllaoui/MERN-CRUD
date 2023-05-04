require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const products = require("./routes/products");

// Express
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/products", products);

// Connection to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Successfully logged in to mangoDB.");
    // Listening on port
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
