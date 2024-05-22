import express from "express";
import {
  createProductController,
  deleteSingleProductController,
  getAllProductController,
  getSingleProductController,
  updateSingleProductController,
} from "./product.controller";
const router = express.Router(); // Create an Express router

// **Product Routes:**

// Create a new product
router.post("/products", createProductController);

// Get all products
router.get("/products", getAllProductController);

// Get a single product by its ID
router.get("/products/:productId", getSingleProductController);

// Update a single product by its ID
router.put("/products/:productId", updateSingleProductController);

// Delete a single product by its ID
router.delete("/products/:productId", deleteSingleProductController);

// **Test Route:**
router.get("/testing", (req, res) => res.send("hello tester"));

export default router;