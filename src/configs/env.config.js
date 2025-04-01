import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Export environment variables
export const PORT = process.env.PORT || 3000;
export const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;
export const NODE_ENV = process.env.NODE_ENV || "development";
