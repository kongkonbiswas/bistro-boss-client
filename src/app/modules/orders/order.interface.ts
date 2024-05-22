import { z } from "zod";

// **Order Interface:**
interface IOrder {
  email: string;
  productId: string;
  price: number;
  quantity: number;
}

export const zodOrder = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export default IOrder;