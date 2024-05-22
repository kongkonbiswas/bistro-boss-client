"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../products/product.model"));
const order_model_1 = __importDefault(require("./order.model"));
// Service to create an order
const createOrderService = (orderData, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = orderData.productId;
        const response = {
            success: false,
            message: "",
        };
        // Validate order quantity (should be at least 1)
        if (orderData.quantity < 1) {
            response.message = "Insufficient order quantity";
            response.success = false;
            return res.status(400).send(response);
        }
        /// Find the product by ID
        const product = yield product_model_1.default.findById(productId);
        if (!product) {
            response.message = "Invalid product id";
            response.success = false;
            return res.status(400).json(response);
        }
        // Check product availability and stock
        const productObj = product.toObject();
        const availableQuantity = productObj.inventory.quantity;
        const isStock = productObj.inventory.inStock;
        if (!isStock || orderData.quantity > availableQuantity) {
            response.message = "Insufficient quantity available in inventory";
            response.success = false;
            return res.status(400).json(response);
        }
        // Update product inventory based on order quantity
        const isEqualQuantity = productObj.inventory.quantity === orderData.quantity;
        // Update product inventory based on order quantity
        if (isEqualQuantity) {
            yield product_model_1.default.findByIdAndUpdate(productId, { "inventory.inStock": false, "inventory.quantity": 0 }, { new: true, runValidators: true });
        }
        else {
            // set new product Quantity
            yield product_model_1.default.findByIdAndUpdate(productId, {
                "inventory.quantity": productObj.inventory.quantity - orderData.quantity,
            }, { new: true, runValidators: true });
        }
        // Create the order
        const result = yield order_model_1.default.create(orderData);
        response.message = "Order created successfully!";
        response.success = true;
        res.json(Object.assign(Object.assign({}, response), { data: result }));
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: "Cant't create order",
        });
    }
});
// Service to get all orders
const getAllOrderService = (find) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find(find);
    return result;
});
const orderServices = {
    createOrderService,
    getAllOrderService,
};
exports.default = orderServices;
