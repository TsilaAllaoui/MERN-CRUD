const express = require("express");
const Product = require("../models/productsModel");
const mongoose = require("mongoose");

const router = express.Router();

// Controllers
const {getAllProducts} = require("../controller/productController");

// Get products
router.get("/", getAllProducts);

// Get specific product
router.get("/:id", (req, res) => {
    const {id} = req.params;
    const result = Product.find({_id: id})
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((error) => {
        res.status(404).json({error: "ID not found"});
    })
});

// Post product
router.post("/", (req, res) => {
    const {name, price, description} = req.body;
    
    Product.create({
            name, price, description
        })
        .then((product) => {
            res.status(200).json(product);
        })
        .catch((error) => {
            res.status(400).json({error: error.message});
        });
});

// Delete product
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    Product.deleteOne({_id: id})
    .then((product) => {
        res.status(200).json(product);
    })
    .catch((error) => {
        res.status(404).json({error: "ID not found"});
    });
});

// Update product
router.patch("/:id", (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: error.message});
    }

    Product.findOne({_id: id})
    .then((product) => {
        product.updateOne({...req.body}).then((product) => {
            res.status(200).json(product);
        })
        .catch((error) => {
            res.status(404).json({error: error.message});
        });
    })
    .catch((error) => {
        res.status(404).json({error: error.message});
    });
});

module.exports = router;