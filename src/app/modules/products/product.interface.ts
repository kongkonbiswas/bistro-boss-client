import { z } from "zod";


// **Product Interface:**

// Interface for a product variant, defining its type and value
export interface IVariant {
  type: string;
  value: string;
}
// Interface for product inventory, including quantity and availability
export interface IInventory {
  quantity: number;
  inStock: boolean;
}

// Main product interface
interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: IVariant[];
  inventory: IInventory;
}

// Zod schema for validating product variants
const zodVariant = z.object({
  type: z.string(),
  value: z.string(),
});

// Zod schema for validating product inventory
const zodInventory = z.object({
  quantity: z.number().int().nonnegative(),
  inStock: z.boolean(),
});

// Zod schema for validating the entire product object
export const zodProduct = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(zodVariant),
  inventory: zodInventory,
});

export default IProduct;