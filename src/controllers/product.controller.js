import Product from "../models/product.model.js";
import redisClient from "../configs/redis.config.js";
import products from "../utils/products.json" with { type: "json" };

// Get all products with Redis caching
const getAllProducts = async (req, res) => {
  try {
    const cachedProducts = await redisClient.get("products");
    if (cachedProducts) {
      return res.status(200).json(JSON.parse(cachedProducts));
    }

    const products = await Product.find();

    // Store in Redis cache for 1 minutes
    await redisClient.setEx("products", 60, JSON.stringify(products));

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single product with Redis caching
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Try to get from Redis cache first
    const cachedProduct = await redisClient.get(`product:${id}`);
    if (cachedProduct) {
      return res.status(200).json(JSON.parse(cachedProduct));
    }

    // If not in cache, get from database
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Store in Redis cache for 1 min
    await redisClient.setEx(`product:${id}`, 60, JSON.stringify(product));

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const newProduct = await product.save();

    // Invalidate Redis cache
    await redisClient.del("products");

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Invalidate Redis cache
    await redisClient.del("products");
    await redisClient.del(`product:${id}`);

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Invalidate Redis cache
    await redisClient.del("products");
    await redisClient.del(`product:${id}`);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany();

    // Invalidate Redis cache
    await redisClient.del("products");

    // Get all product keys and delete them
    const keys = await redisClient.keys("product:*");
    if (keys.length > 0) {
      await redisClient.del(keys);
    }

    res.status(200).json({ message: "All products deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const insertDummyData = async (req, res) => {
  try {
    await Product.insertMany(products);

    // Invalidate Redis cache
    await redisClient.del("products");

    res.status(201).json({ message: "Dummy data inserted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  insertDummyData,
};
