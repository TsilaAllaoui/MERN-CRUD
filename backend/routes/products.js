const express = require("express");
const Product = require("../models/productsModel");

const router = express.Router();

// Get products
router.get("/", async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// Get specific product
router.get("/:id", async (req, res) => {
    const {id} = req.params;
    if (await Product.findById(id) == undefined)
    {
        res.status(404).json({error: "Id not found in DB"});
        return;
    }
    const product = await Product.find({_id: id})
    res.json(product);
});

// Post product
router.post("/", async (req, res) => {
    const {name, price, description} = req.body;
    
    try {
        const product = await Product.create({
            name, price, description
        });
        res.status(200).json(product);
    }
    catch(error) {
        res.status(400).json({ error: error.message});
    }
});

// Delete product
router.delete("/:id", (req, res) => {
    res.json({msg: "Delete product"});
});

// Update product
router.patch(":/id", (req, res) => {
    res.json({msg: "Update product"})
})

module.exports = router;