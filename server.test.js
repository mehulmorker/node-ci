const request = require('supertest');
const app = require('./server');

describe('E-commerce Product API', () => {
  // Test GET /products endpoint
  describe('GET /products', () => {
    it('should return all products', async () => {
      const response = await request(app)
        .get('/products')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.count).toBeGreaterThan(0);
      expect(response.body.data[0]).toHaveProperty('id');
      expect(response.body.data[0]).toHaveProperty('name');
      expect(response.body.data[0]).toHaveProperty('category');
      expect(response.body.data[0]).toHaveProperty('price');
      expect(response.body.data[0]).toHaveProperty('description');
      expect(response.body.data[0]).toHaveProperty('stock');
    });

    it('should filter products by category', async () => {
      const response = await request(app)
        .get('/products?category=Electronics')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
      
      // All returned products should be in Electronics category
      response.body.data.forEach(product => {
        expect(product.category.toLowerCase()).toBe('electronics');
      });
    });

    it('should return empty array for non-existent category', async () => {
      const response = await request(app)
        .get('/products?category=NonExistentCategory')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
      expect(response.body.count).toBe(0);
    });

    it('should handle case-insensitive category filtering', async () => {
      const response = await request(app)
        .get('/products?category=electronics')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      
      response.body.data.forEach(product => {
        expect(product.category.toLowerCase()).toBe('electronics');
      });
    });
  });

  // Test GET /products/:id endpoint
  describe('GET /products/:id', () => {
    it('should return a specific product by ID', async () => {
      const response = await request(app)
        .get('/products/1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id', 1);
      expect(response.body.data).toHaveProperty('name');
      expect(response.body.data).toHaveProperty('category');
      expect(response.body.data).toHaveProperty('price');
      expect(response.body.data).toHaveProperty('description');
      expect(response.body.data).toHaveProperty('stock');
    });

    it('should return 404 for non-existent product ID', async () => {
      const response = await request(app)
        .get('/products/999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Product not found');
    });

    it('should handle invalid ID format', async () => {
      const response = await request(app)
        .get('/products/invalid')
        .expect(500);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Internal server error');
    });
  });

  // Test POST /products endpoint
  describe('POST /products', () => {
    it('should create a new product with valid data', async () => {
      const newProduct = {
        name: 'Test Product',
        category: 'Test Category',
        price: 99.99,
        description: 'A test product for testing purposes',
        stock: 10,
        image: 'https://example.com/test.jpg'
      };

      const response = await request(app)
        .post('/products')
        .send(newProduct)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Product created successfully');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.name).toBe(newProduct.name);
      expect(response.body.data.category).toBe(newProduct.category);
      expect(response.body.data.price).toBe(newProduct.price);
      expect(response.body.data.description).toBe(newProduct.description);
      expect(response.body.data.stock).toBe(newProduct.stock);
      expect(response.body.data.image).toBe(newProduct.image);
    });

    it('should create a product with default image when not provided', async () => {
      const newProduct = {
        name: 'Test Product No Image',
        category: 'Test Category',
        price: 49.99,
        description: 'A test product without image',
        stock: 5
      };

      const response = await request(app)
        .post('/products')
        .send(newProduct)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.image).toBe('https://example.com/default.jpg');
    });

    it('should return 400 for missing required fields', async () => {
      const invalidProduct = {
        name: 'Test Product',
        // Missing category, price, description, stock
      };

      const response = await request(app)
        .post('/products')
        .send(invalidProduct)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
      expect(response.body.errors).toContain('category is required');
      expect(response.body.errors).toContain('price is required');
      expect(response.body.errors).toContain('description is required');
      expect(response.body.errors).toContain('stock is required');
    });

    it('should return 400 for invalid price (negative)', async () => {
      const invalidProduct = {
        name: 'Test Product',
        category: 'Test Category',
        price: -10,
        description: 'A test product with negative price',
        stock: 5
      };

      const response = await request(app)
        .post('/products')
        .send(invalidProduct)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
      expect(response.body.errors).toContain('Price must be a positive number');
    });

    it('should return 400 for invalid price (zero)', async () => {
      const invalidProduct = {
        name: 'Test Product',
        category: 'Test Category',
        price: 0,
        description: 'A test product with zero price',
        stock: 5
      };

      const response = await request(app)
        .post('/products')
        .send(invalidProduct)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
      expect(response.body.errors).toContain('Price must be a positive number');
    });

    it('should return 400 for invalid stock (negative)', async () => {
      const invalidProduct = {
        name: 'Test Product',
        category: 'Test Category',
        price: 99.99,
        description: 'A test product with negative stock',
        stock: -5
      };

      const response = await request(app)
        .post('/products')
        .send(invalidProduct)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
      expect(response.body.errors).toContain('Stock must be a non-negative number');
    });

    it('should handle string numbers for price and stock', async () => {
      const newProduct = {
        name: 'Test Product String Numbers',
        category: 'Test Category',
        price: '29.99',
        description: 'A test product with string numbers',
        stock: '15'
      };

      const response = await request(app)
        .post('/products')
        .send(newProduct)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.price).toBe(29.99);
      expect(response.body.data.stock).toBe(15);
    });
  });

  // Test GET /health endpoint
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Product API is running');
      expect(response.body).toHaveProperty('timestamp');
      expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
    });
  });

  // Test 404 handler
  describe('404 Handler', () => {
    it('should return 404 for non-existent endpoints', async () => {
      const response = await request(app)
        .get('/non-existent-endpoint')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Endpoint not found');
    });

    it('should return 404 for POST to non-existent endpoint', async () => {
      const response = await request(app)
        .post('/non-existent-endpoint')
        .send({})
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Endpoint not found');
    });
  });

  // Test CORS headers
  describe('CORS', () => {
    it('should include CORS headers', async () => {
      const response = await request(app)
        .get('/products')
        .expect(200);

      expect(response.headers).toHaveProperty('access-control-allow-origin');
    });
  });

  // Test JSON parsing
  describe('JSON Parsing', () => {
    it('should parse JSON request body', async () => {
      const newProduct = {
        name: 'JSON Test Product',
        category: 'Test Category',
        price: 19.99,
        description: 'Testing JSON parsing',
        stock: 25
      };

      const response = await request(app)
        .post('/products')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(newProduct))
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(newProduct.name);
    });
  });
}); 