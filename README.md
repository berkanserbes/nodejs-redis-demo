# Node.js Redis & MongoDB Demo

A REST API application demonstrating Redis caching and MongoDB database integration using Node.js.

## 🚀 Features

- REST API with Express.js
- MongoDB database integration
- Performance optimization with Redis caching
- CRUD operations
- Test data with sample products

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis
- npm or yarn

## 🛠️ Installation

1. Clone the project:
```bash
git clone https://github.com/yourusername/nodejs-redis-demo.git
cd nodejs-redis-demo
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file and set required variables:
```env
MONGODB_CONNECTION=mongodb://localhost:27017/your_database
NODE_ENV=development
PORT=3000
REDIS_URL=redis://localhost:6379
```

4. Start the application:
```bash
npm run dev
```

## 🔌 API Endpoints

### Product Operations

- `GET /api/products` - Get all products (Redis cached)
- `GET /api/products/:id` - Get product by ID (Redis cached)
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `DELETE /api/products` - Delete all products
- `POST /api/products/insert-dummy` - Insert sample product data

## 🏗️ Project Structure

```
src/
├── configs/
│   ├── env.config.js
│   ├── mongodb.config.js
│   └── redis.config.js
├── controllers/
│   └── product.controller.js
├── models/
│   └── product.model.js
├── routes/
│   └── product.route.js
├── utils/
│   └── products.json
└── index.js
```

## 🔄 Redis Cache Strategy

- 1-minute cache for GET requests
- Automatic cache invalidation on POST, PUT, DELETE operations
- Separate cache keys for product list and individual products

## 🧪 Testing

To insert sample product data:
```bash
curl -X POST http://localhost:3000/api/products/insert-dummy
```