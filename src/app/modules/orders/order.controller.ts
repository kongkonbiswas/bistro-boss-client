import { Request, Response } from "express";
import { IAnyObject } from "../utils/types";
import { zodOrder } from "./order.interface";
import orderServices from "./order.service";

// **Order service functions:**
const { createOrderService, getAllOrderService } = orderServices;

// **Create Order Controller:**
export const createOrderController = async (req: Request, res: Response) => {
  const { body } = req;
  if (!body) {
    return res.send({
      success: false,
      message: "No content found !",
    });
  }
  const { data, error } = zodOrder.safeParse(body);
  if (error) {
    return res.send({
      success: false,
      message: "Invalid order data format",
      error,
    });
  }

  await createOrderService(data, res);
};

// **Get All Orders Controller:**
export const getAllOrderController = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    // response data

    const find: IAnyObject = {};
    if (email) {
      find.email = email;
    }

    const result = await getAllOrderService(find);

    const response: IAnyObject = {
      success: result.length > 0,
      message:
        result.length > 0 ? "Orders fetched successfully!" : "Order Not found",
    };

    if (result.length > 0) {
      response.data = result;
    }
    res.status(200).json(response);
  } catch {
    res.status(500).json({
      success: false,
      message: "Orders not found",
    });
  }
};