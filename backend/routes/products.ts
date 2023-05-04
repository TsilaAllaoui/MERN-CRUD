import express from "express";
import Product from "../models/productsModel";
import mongoose from "mongoose"

const router = express.Router();

// Controllers
const {getAllProducts, getProduct, addProduct, deleteProduct, updateProduct} = require("../controller/productController");

// Get products
router.get("/", getAllProducts);

// Get specific product
router.get("/:id", getProduct);

// Post product
router.post("/", addProduct);

// Delete product
router.delete("/:id", deleteProduct);

// Update product
router.patch("/:id", updateProduct);

export default router;