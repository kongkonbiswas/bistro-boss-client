import { Schema, model } from "mongoose";
import IProduct, { IInventory, IVariant } from "./product.interface";

// **Schema for product variants:**
const variantSchema = new Schema<IVariant>(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false } // Disable creating a separate _id field for variants
);

const inventorySchema = new Schema<IInventory>(
  {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { _id: false }
);

// **Main product schema:**
const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: {
    type: [variantSchema],
    required: true,
  },
  inventory: {
    type: inventorySchema,
    required: true,
  },
});


// **Create Mongoose model for "Product" collection:**
const Product = model("Product", productSchema);

export default Product;