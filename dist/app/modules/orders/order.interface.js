"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodOrder = void 0;
const zod_1 = require("zod");
// order zod validation
exports.zodOrder = zod_1.z.object({
    email: zod_1.z.string().email(),
    productId: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
//This code defines the `IOrder` interface and a Zod schema (`zodOrder`) for validating order data. 
//- The interface specifies the expected properties of an order object.
//- Zod schema enforces data type and format for each property during validation.
