import express, { RequestHandler } from "express";
import Product from "../models/productsModel";
import mongoose from "mongoose";

// GET all products
const getAllProducts: RequestHandler = (req, res) => {
    Product.find({})
    .then((products) => {
        res.status(200).json(products);
    })
    .catch((error) => {
        res.status(400).json({error: error.message});
    });
}

// GET specific product
const getProduct: RequestHandler = (req, res) => {
    const {id} = req.params;
    const result = Product.find({_id: id})
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((error) => {
        res.status(404).json({error: "ID not found"});
    })
}

// POST product
const addProduct: RequestHandler = (req, res) => {
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
};

// DELETE product
const deleteProduct: RequestHandler = (req, res) => {
    const {id} = req.params;
    Product.deleteOne({_id: id})
    .then((product) => {
        res.status(200).json(product);
    })
    .catch((error) => {
        res.status(404).json({error: "ID not found"});
    });
}

// PATCH product
const updateProduct: RequestHandler = (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: "ID not valid"});

    Product.findOne({_id: id})
    .then((product) => {
        product!.updateOne({...req.body}).then((product) => {
            res.status(200).json(product);
        })
        .catch((error) => {
            res.status(404).json({error: error.message});
        });
    })
    .catch((error) => {
        res.status(404).json({error: error.message});
    });
}

export {
 getAllProducts,
 getProduct,
 addProduct,
 deleteProduct,
 updateProduct
};