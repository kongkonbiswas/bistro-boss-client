"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
// **Order Routes:**
// Create a new order (handled by createOrderController)
router.post("/orders", order_controller_1.createOrderController);
// Get all orders (handled by getAllOrderController)
router.get("/orders", order_controller_1.getAllOrderController);
exports.default = router;
