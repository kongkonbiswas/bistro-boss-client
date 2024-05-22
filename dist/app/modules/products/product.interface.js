"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodProduct = void 0;
const zod_1 = require("zod");
// Zod schema for validating product variants
const zodVariant = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string(),
});
// Zod schema for validating product inventory
const zodInventory = zod_1.z.object({
    quantity: zod_1.z.number().int().nonnegative(),
    inStock: zod_1.z.boolean(),
});
// Zod schema for validating the entire product object
exports.zodProduct = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number().nonnegative(),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(zodVariant),
    inventory: zodInventory,
});
