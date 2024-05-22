import { IAnyObject } from "../utils/types";
import IProduct from "./product.interface";
import Product from "./product.model";

// **Product services:**

// Create a new product
const createProductService = async (payload: IProduct) => {
  const result = await Product.create(payload);
  return result;
};

// Get all products with optional query filter
const getAllProductService = async (query: IAnyObject) => {
  const result = await Product.find(query);
  return result;
};

// Get a single product by its ID
const getSingleProductService = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};


// Update a single product by its ID (with optional type safety disabled)
const updateSingleProductService = async (
  id: string,
  updateData: IProduct | any
) => {
  const result = Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// Delete a single product by its ID
const deleteSingleProductService = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

// **Product service object:**
const productService = {
  createProductService,
  getAllProductService,
  getSingleProductService,
  updateSingleProductService,
  deleteSingleProductService,
};

export default productService;