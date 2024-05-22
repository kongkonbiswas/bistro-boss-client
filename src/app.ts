import express, { Request, Response } from "express";
import morgan from "morgan";
import order from "./app/modules/orders/order.routes";
import product from "./app/modules/products/product.routes";

const app = express();

// **Middlewares:**

// Parse incoming JSON request bodies
app.use(express.json());

// Log HTTP requests for development (consider a more robust logging solution in production)
app.use(morgan("dev"));

// **API Routes:**

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api", product);
app.use("/api", order);


// **Error Handling:**

// 404 Not Found handler (middleware)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler (middleware)
app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

export default app;