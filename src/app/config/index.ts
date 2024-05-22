import dotenv from "dotenv";
dotenv.config();

// Config object to store configuration settings
const Config = {
  databaseUrl: process.env.DATABASE_URL // Assigning the DATABASE_URL environment variable to the databaseUrl property

};

export default Config;