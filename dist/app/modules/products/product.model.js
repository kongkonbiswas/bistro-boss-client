"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// **Schema for product variants:**
const variantSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    value: { type: String, required: true },
}, { _id: false } // Disable creating a separate _id field for variants
);
const inventorySchema = new mongoose_1.Schema({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
}, { _id: false });
// **Main product schema:**
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: { type: Number, required: true },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    variants: {
        type: [variantSchema],
        required: true,
    },
    inventory: {
        type: inventorySchema,
        required: true,
    },
});
// **Create Mongoose model for "Product" collection:**
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
