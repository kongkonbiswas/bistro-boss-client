import mongoose from "mongoose";
import app from "./app";
import Config from "./app/config";

const port = process.env.PORT || 7000; // Use environment variable for port or default to 7000/9000

const startServer = async () => {
  try {
    // Connect to MongoDB using the database URL from configuration
    await mongoose.connect(Config.databaseUrl as string)
    console.log("Connected to MongoDB");

    // Start the Express server on the specified port
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    // Exit the process with an error code (1) indicating failure
    process.exit(1);
  }
};

// Start the server asynchronously
startServer();