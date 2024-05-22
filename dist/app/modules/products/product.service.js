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
const product_model_1 = __importDefault(require("./product.model"));
// **Product services:**
// Create a new product
const createProductService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.create(payload);
    return result;
});
// Get all products with optional query filter
const getAllProductService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.find(query);
    return result;
});
// Get a single product by its ID
const getSingleProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findOne({ _id: id });
    return result;
});
// Update a single product by its ID (with optional type safety disabled)
const updateSingleProductService = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = product_model_1.default.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete a single product by its ID
const deleteSingleProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndDelete(id);
    return result;
});
// **Product service object:**
const productService = {
    createProductService,
    getAllProductService,
    getSingleProductService,
    updateSingleProductService,
    deleteSingleProductService,
};
exports.default = productService;
