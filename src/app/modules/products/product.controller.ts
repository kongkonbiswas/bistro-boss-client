import { Request, Response } from "express";

import { IAnyObject } from "../utils/types";
import { zodProduct } from "./product.interface";
import productService from "./product.service";

// **Product services:**
const {
  createProductService,
  deleteSingleProductService,
  getAllProductService,
  getSingleProductService,
  updateSingleProductService,
} = productService;

// **Create a new product controller:**
export const createProductController = async (req: Request, res: Response) => {
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
    const { data, success, error } = zodProduct.safeParse(req.body);
    if (!success) {
      return res.json({
        success: false,
        message: "Invalid product data format. Please refer to the documentation for valid data structure.",
      });
    }

    // Create the new product using product service
    const result = await createProductService(data);
    // Send successful creation response with the newly created product data
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// **Get all products controller:**
export const getAllProductController = async (req: Request, res: Response) => {
  try {
    // Extract search term from query parameters
    const { searchTerm } = req.query;
    // Build query object for filtering products
    const find: IAnyObject = {};
    if (searchTerm) {
      find["$or"] = [
        { name: new RegExp(searchTerm as string, "i") },
        { description: new RegExp(searchTerm as string, "i") },
      ];
    }
    
    const result = await getAllProductService(find);

    const response: IAnyObject = {
      success: result.length > 0,
      message:
        result.length > 0
          ? "Products fetched successfully!"
          : "Product Not found",
    };

    if (result.length > 0) {
      response.data = result;
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "products not found",
    });
  }
};

// get single product
export const getSingleProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const productId = req.params.productId;

    const result = await getSingleProductService(productId);
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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Product not found",
    });
  }
};

// update single product
export const updateSingleProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const productId = req.params.productId;
    const { body } = req;
    if (!body) {
      return res.status(400).json({
        success: false,
        message: "No data found",
      });
    }

    const result = await updateSingleProductService(productId, req.body);

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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Couldn't update data",
    });
  }
};

// **Get single product controller:**
export const deleteSingleProductController = async (
  req: Request,
  res: Response
) => {
  try {
    // Extract product ID from request parameters
    const productId = req.params.productId;
    const result = await deleteSingleProductService(productId);
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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};