# 🎯 E-commerce Product API - Deliverables

## ✅ Requirements Completed

### 1. GET `/products` - Return a list of all products

- ✅ Implemented and tested
- Returns all products with count
- Response format: `{"success": true, "data": [...], "count": 8}`

### 2. GET `/products/:id` - Return a single product by ID

- ✅ Implemented and tested
- Returns specific product by ID
- Includes proper error handling for non-existent products

### 3. GET `/products?category=Apparel` - Filter products by category

- ✅ Implemented and tested
- Case-insensitive category filtering
- Returns filtered products with count

### 4. POST `/products` (Bonus Feature) - Add a new product

- ✅ Implemented with data validation
- Validates required fields: name, category, price, description, stock
- Validates price (must be positive) and stock (must be non-negative)
- Auto-generates unique IDs
- Returns created product with success message

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework for building RESTful APIs
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

## 📁 Project Files

- `server.js` - Main API server with all endpoints
- `package.json` - Project configuration and dependencies
- `README.md` - Comprehensive API documentation
- `test-api.sh` - Test script for all endpoints
- `E-commerce-Product-API.postman_collection.json` - Postman collection
- `.gitignore` - Git ignore rules

## 🔧 Features Implemented

- ✅ RESTful API design
- ✅ Proper HTTP status codes
- ✅ Error handling and validation
- ✅ CORS support
- ✅ Consistent JSON response format
- ✅ Health check endpoint
- ✅ Comprehensive documentation
- ✅ Test scripts and Postman collection

## 📊 API Response Format

All responses follow a consistent format:

```json
{
  "success": true/false,
  "data": {...} or [...],
  "message": "Optional message",
  "count": "Optional count for lists"
}
```

## 🚨 Error Handling

- `200` - Success
- `201` - Created (for POST requests)
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## 📝 Notes

- Uses in-memory data storage for demonstration
- Includes 8 sample products across 3 categories
- Ready for production deployment with database integration
- All endpoints tested and working correctly
