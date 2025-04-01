import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  insertDummyData,
} from "../controllers/product.controller.js";

const router = new Router();

// Get all products
router.get("/", getAllProducts);

// Get single product by ID
router.get("/:id", getProductById);

// Create new product
router.post("/", createProduct);

// Create dummy products
router.post("/dummy", insertDummyData);

// Update product
router.put("/:id", updateProduct);

// Delete all products
router.delete("/", deleteAllProducts);

// Delete single product
router.delete("/:id", deleteProduct);

export default router;
