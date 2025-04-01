import express from "express";
import connectDb from "./configs/mongodb.config.js";
import { PORT, MONGODB_CONNECTION } from "./configs/env.config.js";
import productRoutes from "./routes/product.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);

const connectDatabase = async () => {
  try {
    await connectDb(MONGODB_CONNECTION);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database: ", error.message);
  }
};

connectDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
