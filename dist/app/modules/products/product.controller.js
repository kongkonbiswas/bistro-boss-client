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
exports.deleteSingleProductController = exports.updateSingleProductController = exports.getSingleProductController = exports.getAllProductController = exports.createProductController = void 0;
const product_interface_1 = require("./product.interface");
const product_service_1 = __importDefault(require("./product.service"));
// **Product services:**
const { createProductService, deleteSingleProductService, getAllProductService, getSingleProductService, updateSingleProductService, } = product_service_1.default;
// **Create a new product controller:**
const createProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract product data from request body
        const { body } = req;
        // Check for missing data in request body
        if (!body) {
            return res.status(400).send({
                success: false,
                message: "No product data provided in request body",
            });
        }
        // Validate product data using Zod schema
        const { data, success, error } = product_interface_1.zodProduct.safeParse(req.body);
        if (!success) {
            return res.json({
                success: false,
                message: "Invalid product data format. Please refer to the documentation for valid data structure.",
            });
        }
        // Create the new product using product service
        const result = yield createProductService(data);
        // Send successful creation response with the newly created product data
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
        });
    }
});
exports.createProductController = createProductController;
// **Get all products controller:**
const getAllProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract search term from query parameters
        const { searchTerm } = req.query;
        // Build query object for filtering products
        const find = {};
        if (searchTerm) {
            find["$or"] = [
                { name: new RegExp(searchTerm, "i") },
                { description: new RegExp(searchTerm, "i") },
            ];
        }
        const result = yield getAllProductService(find);
        const response = {
            success: result.length > 0,
            message: result.length > 0
                ? "Products fetched successfully!"
                : "Product Not found",
        };
        if (result.length > 0) {
            response.data = result;
        }
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "products not found",
        });
    }
});
exports.getAllProductController = getAllProductController;
// get single product
const getSingleProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield getSingleProductService(productId);
        if (!result) {
            return res.json({
                success: false,
                message: "Product not found",
            });
        }
        res.send({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Product not found",
        });
    }
});
exports.getSingleProductController = getSingleProductController;
// update single product
const updateSingleProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const { body } = req;
        if (!body) {
            return res.status(400).json({
                success: false,
                message: "No data found",
            });
        }
        const result = yield updateSingleProductService(productId, req.body);
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Failed to update",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Couldn't update data",
        });
    }
});
exports.updateSingleProductController = updateSingleProductController;
// **Get single product controller:**
const deleteSingleProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract product ID from request parameters
        const productId = req.params.productId;
        const result = yield deleteSingleProductService(productId);
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Failed to delete product",
            });
        }
        res.status(200).send({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to delete product",
        });
    }
});
exports.deleteSingleProductController = deleteSingleProductController;
