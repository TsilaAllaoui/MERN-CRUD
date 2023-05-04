const express = require("express");
const Product = require("../models/productsModel");

const getAllProducts = (req, res) => {
    Product.find({})
    .then((products) => {
        res.status(200).json(products);
    })
    .catch((error) => {
        res.status(400).json({error: error.message});
    });
}

module.exports = {
 getAllProducts
};