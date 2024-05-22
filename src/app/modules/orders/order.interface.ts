import { Schema } from "mongoose";
import { z } from "zod";

// **Order Interface:**
interface IOrder {
  email: string;
  productId: string | Schema.Types.ObjectId;
  price: number;
  quantity: number;
}

// order zod validation
export const zodOrder = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number(),
  quantity: z.number(),
});


export default IOrder;
//This code defines the `IOrder` interface and a Zod schema (`zodOrder`) for validating order data. 
//- The interface specifies the expected properties of an order object.
//- Zod schema enforces data type and format for each property during validation.