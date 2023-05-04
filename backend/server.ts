import { config } from "dotenv";

import express from "express";
import mongoose from "mongoose";
import products from "./routes/products";

// Environment configuration
config();
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://<user>:<password>@products.xraj6ik.mongodb.net/?retryWrites=true&w=majority";

// Express
const app = express();

// Middleware
// app.use(express.json());

// Routes
app.use("/products", products);

// Connection to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Successfully logged in to mangoDB.");
    // Listening on port
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((err: any) => {
    console.log(err);
  });
