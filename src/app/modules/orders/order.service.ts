import { Response } from "express";
import { IAnyObject } from "../utils/types";
import Product from "../products/product.model";
import IOrder from "./order.interface";
import Order from "./order.model";

// Service to create an order
const createOrderService = async (orderData: IOrder, res: Response) => {
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

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      response.message = "Invalid product id";
      response.success = false;
      return res.status(400).json(response);
    }

    // Check product availability and stock
    const productObj = product.toObject();
    const availableQntt = productObj.inventory.quantity;
    const isStock = productObj.inventory.inStock;
    if (!isStock || orderData.quantity > availableQntt) {
      response.message = "Insufficient quantity available in inventory";
      response.success = false;
      return res.status(400).json(response);
    }

    // Update product inventory based on order quantity
    const isEqualQuantity = productObj.inventory.quantity === orderData.quantity;

   // Update the isStock property if ordered quantity equals available quantity
    if (isEqualQuantity) {
      await Product.findByIdAndUpdate(
        productId,
        { "inventory.inStock": false, "inventory.quantity": 0 },
        { new: true, runValidators: true }
      );
    } else {
     // Update product quantity with remaining stock
      await Product.findByIdAndUpdate(
        productId,
        {
          "inventory.quantity":
            productObj.inventory.quantity - orderData.quantity,
        },
        { new: true, runValidators: true }
      );
    }

    // Create the order
    const result = await Order.create(orderData);

    response.message = "Order created successfully!";
    response.success = true;
    res.json({
      ...response,
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Cant't create order",

    });
  }
};

// Service to get all orders
const getAllOrderService = async (find: IAnyObject) => {
  const result = await Order.find(find);
  return result;
};

const orderServices = {
  createOrderService,
  getAllOrderService,
};

export default orderServices;