const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        reauired: true
    },
    description: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);