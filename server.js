const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample product data
const products = [
  {
    id: 1,
    name: "Apple Wireless Bluetooth Headphone",
    category: "Electronics",
    price: 90.99,
    description: "High-quality wireless headphones with noise cancellation",
    stock: 30,
    image: "https://example.com/headphones.jpg",
  },
  {
    id: 2,
    name: "Snitch T-Shirt",
    category: "Apparel",
    price: 24.99,
    description: "Comfortable cotton t-shirt in various colors",
    stock: 100,
    image: "https://example.com/tshirt.jpg",
  },
  {
    id: 3,
    name: "Smartphone Case",
    category: "Electronics",
    price: 19.99,
    description: "Protective case for smartphones",
    stock: 75,
    image: "https://example.com/case.jpg",
  },
  {
    id: 4,
    name: "Running Shoes",
    category: "Apparel",
    price: 129.99,
    description: "Professional running shoes with cushioning",
    stock: 30,
    image: "https://example.com/shoes.jpg",
  },
  {
    id: 5,
    name: "Coffee Mug",
    category: "Home & Garden",
    price: 12.99,
    description: "Ceramic coffee mug with handle",
    stock: 200,
    image: "https://example.com/mug.jpg",
  },
  {
    id: 6,
    name: "Laptop Stand",
    category: "Electronics",
    price: 45.99,
    description: "Adjustable laptop stand for ergonomic positioning",
    stock: 25,
    image: "https://example.com/laptopstand.jpg",
  },
  {
    id: 7,
    name: "Denim Jeans",
    category: "Apparel",
    price: 79.99,
    description: "Classic denim jeans in blue wash",
    stock: 60,
    image: "https://example.com/jeans.jpg",
  },
  {
    id: 8,
    name: "Garden Tool Set",
    category: "Home & Garden",
    price: 89.99,
    description: "Complete set of essential garden tools",
    stock: 15,
    image: "https://example.com/gardentools.jpg",
  },
];

// Helper function to validate product data
const validateProduct = (product) => {
  const requiredFields = ["name", "category", "price", "description", "stock"];
  const errors = [];

  requiredFields.forEach((field) => {
    // Check for missing or empty (including whitespace-only) fields
    if (
      product[field] === undefined ||
      product[field] === null ||
      (typeof product[field] === "string" && product[field].trim() === "")
    ) {
      errors.push(`${field} is required`);
    }
  });

  // Only check price if present and not empty string
  if (
    product.price !== undefined &&
    product.price !== null &&
    !(typeof product.price === "string" && product.price.trim() === "")
  ) {
    const price = Number(product.price);
    if (isNaN(price) || price <= 0) {
      errors.push("Price must be a positive number");
    }
  }

  // Only check stock if present and not empty string
  if (
    product.stock !== undefined &&
    product.stock !== null &&
    !(typeof product.stock === "string" && product.stock.trim() === "")
  ) {
    const stock = Number(product.stock);
    if (isNaN(stock) || stock < 0) {
      errors.push("Stock must be a non-negative number");
    }
  }

  return errors;
};

// Routes

// GET /products - Return all products or filter by category
app.get("/products", (req, res) => {
  try {
    const { category } = req.query;

    if (category) {
      const filteredProducts = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      res.json({
        success: true,
        data: filteredProducts,
        count: filteredProducts.length,
      });
    } else {
      res.json({
        success: true,
        data: products,
        count: products.length,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET /products/:id - Return a single product by ID
app.get("/products/:id", (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: "Invalid product ID format",
      });
    }
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// POST /products - Add a new product (bonus feature)
app.post("/products", (req, res) => {
  try {
    const newProduct = req.body;

    // Validate the product data
    const validationErrors = validateProduct(newProduct);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Generate a new ID
    const newId = Math.max(...products.map((p) => p.id)) + 1;

    // Create the product object
    const productToAdd = {
      id: newId,
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      stock: parseInt(newProduct.stock),
      image: newProduct.image || "https://example.com/default.jpg",
    };

    // Add to products array (in a real app, this would be saved to a database)
    products.push(productToAdd);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: productToAdd,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Product API is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Start server only if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Product API server is running on port ${PORT}`);
    console.log(`📖 API Documentation:`);
    console.log(`   GET  http://localhost:${PORT}/products`);
    console.log(`   GET  http://localhost:${PORT}/products/:id`);
    console.log(`   GET  http://localhost:${PORT}/products?category=Apparel`);
    console.log(`   POST http://localhost:${PORT}/products`);
    console.log(`   GET  http://localhost:${PORT}/health`);
  });
}

module.exports = app;
