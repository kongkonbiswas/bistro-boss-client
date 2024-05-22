"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router(); // Create an Express router
// **Product Routes:**
// Create a new product
router.post("/products", product_controller_1.createProductController);
// Get all products
router.get("/products", product_controller_1.getAllProductController);
// Get a single product by its ID
router.get("/products/:productId", product_controller_1.getSingleProductController);
// Update a single product by its ID
router.put("/products/:productId", product_controller_1.updateSingleProductController);
// Delete a single product by its ID
router.delete("/products/:productId", product_controller_1.deleteSingleProductController);
// **Test Route:**
router.get("/testing", (req, res) => res.send("hello tester"));
exports.default = router;
