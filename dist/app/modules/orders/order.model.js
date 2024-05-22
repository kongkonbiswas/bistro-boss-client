"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the order schema using the IOrder interface
const orderSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    productId: {
        type: String,
        required: true,
    },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
// Create the Order model from the order schema
const Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
