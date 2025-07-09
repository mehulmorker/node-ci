# E-commerce Product API

A RESTful API for managing products in an e-commerce platform built with Node.js and Express.

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing middleware
- **dotenv** - Environment variable management

## 🚀 How to Run the Project

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Start the production server:**
   ```bash
   npm start
   ```

The API will be available at `http://localhost:3000`

## 📖 API Endpoints

### 1. GET `/products`

Returns a list of all products.

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Wireless Bluetooth Headphones",
      "category": "Electronics",
      "price": 89.99,
      "description": "High-quality wireless headphones with noise cancellation",
      "stock": 50,
      "image": "https://example.com/headphones.jpg"
    }
  ],
  "count": 8
}
```

### 2. GET `/products/:id`

Returns a single product by ID.

**Example:** `GET /products/1`

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Wireless Bluetooth Headphones",
    "category": "Electronics",
    "price": 89.99,
    "description": "High-quality wireless headphones with noise cancellation",
    "stock": 50,
    "image": "https://example.com/headphones.jpg"
  }
}
```

### 3. GET `/products?category=Apparel`

Filters products by category.

**Example:** `GET /products?category=Apparel`

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "name": "Cotton T-Shirt",
      "category": "Apparel",
      "price": 24.99,
      "description": "Comfortable cotton t-shirt in various colors",
      "stock": 100,
      "image": "https://example.com/tshirt.jpg"
    }
  ],
  "count": 3
}
```

### 4. POST `/products` (Bonus Feature)

Adds a new product to the collection.

**Request Body:**

```json
{
  "name": "New Product",
  "category": "Electronics",
  "price": 99.99,
  "description": "Product description",
  "stock": 25,
  "image": "https://example.com/product.jpg"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 9,
    "name": "New Product",
    "category": "Electronics",
    "price": 99.99,
    "description": "Product description",
    "stock": 25,
    "image": "https://example.com/product.jpg"
  }
}
```

### 5. GET `/health`

Health check endpoint.

**Response:**

```json
{
  "success": true,
  "message": "Product API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🧪 Sample cURL Requests

### Get all products:

```bash
curl -X GET http://localhost:3000/products
```

### Get product by ID:

```bash
curl -X GET http://localhost:3000/products/1
```

### Filter products by category:

```bash
curl -X GET "http://localhost:3000/products?category=Apparel"
```

### Add a new product:

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Mouse",
    "category": "Electronics",
    "price": 29.99,
    "description": "Ergonomic wireless mouse",
    "stock": 40,
    "image": "https://example.com/mouse.jpg"
  }'
```

### Health check:

```bash
curl -X GET http://localhost:3000/health
```

## 📋 Available Categories

- Electronics
- Apparel
- Home & Garden

## 🔧 Data Validation

The POST endpoint includes validation for:

- Required fields: name, category, price, description, stock
- Price must be a positive number
- Stock must be a non-negative number

## 🚨 Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created (for POST requests)
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## 📝 Notes

- This is a demo API using in-memory data storage
- In a production environment, you would connect to a database
- The API includes CORS support for cross-origin requests
- All responses follow a consistent JSON structure with `success` and `data` fields
