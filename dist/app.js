"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const order_routes_1 = __importDefault(require("./app/modules/orders/order.routes"));
const product_routes_1 = __importDefault(require("./app/modules/products/product.routes"));
const app = (0, express_1.default)();
// **Middlewares:**
// Parse incoming JSON request bodies
app.use(express_1.default.json());
// Log HTTP requests for development (consider a more robust logging solution in production)
app.use((0, morgan_1.default)("dev"));
// **API Routes:**
app.get("/", (req, res) => {
    res.send("Hello from server");
});
app.use("/api", product_routes_1.default);
app.use("/api", order_routes_1.default);
// **Error Handling:**
// 404 Not Found handler (middleware)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
// Global error handler (middleware)
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});
exports.default = app;
