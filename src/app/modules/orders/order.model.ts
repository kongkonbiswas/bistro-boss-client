import { Schema, model } from "mongoose";
import IOrder from "./order.interface";

// Define the order schema using the IOrder interface
const orderSchema = new Schema<IOrder>({
  email: { type: String, required: true },
  productId: {
    type: String,
    required: true,
  },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
// Create the Order model from the order schema
const Order = model("Order", orderSchema);
export default Order;