import express from "express";
import {
  createOrderController,
  getAllOrderController,
} from "./order.controller";

const router = express.Router();
// **Order Routes:**

// Create a new order (handled by createOrderController)
router.post("/orders", createOrderController);
// Get all orders (handled by getAllOrderController)
router.get("/orders", getAllOrderController);

export default router;