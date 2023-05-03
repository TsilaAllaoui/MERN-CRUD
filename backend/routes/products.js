const express = require("express");

const router = express.Router();

// Get products
router.get("/", (req, res) => {
    res.json({msg: "Get products"});
});

// Get specific product
router.get("/:id", (req, res) => {
    res.json({msg: "Get specific product"});
});

// Post product
router.post("/:id", (req, res) => {
    res.json({msg: "Post product"});
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