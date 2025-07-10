// Import the validateProduct function from server.js
// Since it's not exported, we'll test it through the API endpoints
const request = require("supertest");
const app = require("./server");

describe("Product Validation", () => {
  describe("validateProduct function (tested through POST /products)", () => {
    it("should validate all required fields are present", async () => {
      const testCases = [
        {
          product: {
            name: "Test",
            category: "Test",
            price: 10,
            description: "Test",
            stock: 5,
          },
          shouldPass: true,
          description: "all fields present",
        },
        {
          product: {
            category: "Test",
            price: 10,
            description: "Test",
            stock: 5,
          },
          shouldPass: false,
          description: "missing name",
        },
        {
          product: { name: "Test", price: 10, description: "Test", stock: 5 },
          shouldPass: false,
          description: "missing category",
        },
        {
          product: {
            name: "Test",
            category: "Test",
            description: "Test",
            stock: 5,
          },
          shouldPass: false,
          description: "missing price",
        },
        {
          product: { name: "Test", category: "Test", price: 10, stock: 5 },
          shouldPass: false,
          description: "missing description",
        },
        {
          product: {
            name: "Test",
            category: "Test",
            price: 10,
            description: "Test",
          },
          shouldPass: false,
          description: "missing stock",
        },
      ];

      for (const testCase of testCases) {
        const response = await request(app)
          .post("/products")
          .send(testCase.product);

        if (testCase.shouldPass) {
          expect(response.status).toBe(201);
          expect(response.body.success).toBe(true);
        } else {
          expect(response.status).toBe(400);
          expect(response.body.success).toBe(false);
          expect(response.body.message).toBe("Validation failed");
        }
      }
    });

    it("should validate price is a positive number", async () => {
      const testCases = [
        { price: 10, shouldPass: true, description: "positive integer" },
        { price: 10.5, shouldPass: true, description: "positive decimal" },
        { price: 0, shouldPass: false, description: "zero" },
        { price: -10, shouldPass: false, description: "negative number" },
        {
          price: "invalid",
          shouldPass: false,
          description: "non-numeric string",
        },
        {
          price: "",
          shouldPass: false,
          description: "empty string",
          expectRequired: true,
        },
      ];

      for (const testCase of testCases) {
        const product = {
          name: "Test Product",
          category: "Test Category",
          price: testCase.price,
          description: "Test description",
          stock: 5,
        };

        const response = await request(app).post("/products").send(product);

        if (testCase.shouldPass) {
          expect(response.status).toBe(201);
          expect(response.body.success).toBe(true);
        } else {
          expect(response.status).toBe(400);
          expect(response.body.success).toBe(false);
          expect(response.body.message).toBe("Validation failed");
          if (testCase.expectRequired) {
            expect(response.body.errors).toContain("price is required");
          } else if (testCase.price <= 0) {
            expect(response.body.errors).toContain(
              "Price must be a positive number"
            );
          }
        }
      }
    });

    it("should validate stock is a non-negative number", async () => {
      const testCases = [
        { stock: 10, shouldPass: true, description: "positive integer" },
        { stock: 0, shouldPass: true, description: "zero" },
        { stock: -5, shouldPass: false, description: "negative number" },
        {
          stock: "invalid",
          shouldPass: false,
          description: "non-numeric string",
        },
        { stock: "", shouldPass: false, description: "empty string" },
      ];

      for (const testCase of testCases) {
        const product = {
          name: "Test Product",
          category: "Test Category",
          price: 10,
          description: "Test description",
          stock: testCase.stock,
        };

        const response = await request(app).post("/products").send(product);

        if (testCase.shouldPass) {
          expect(response.status).toBe(201);
          expect(response.body.success).toBe(true);
        } else {
          expect(response.status).toBe(400);
          expect(response.body.success).toBe(false);
          expect(response.body.message).toBe("Validation failed");
          if (testCase.stock < 0) {
            expect(response.body.errors).toContain(
              "Stock must be a non-negative number"
            );
          }
        }
      }
    });

    it("should handle string numbers for price and stock", async () => {
      const product = {
        name: "Test Product",
        category: "Test Category",
        price: "29.99",
        description: "Test description",
        stock: "15",
      };

      const response = await request(app)
        .post("/products")
        .send(product)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.price).toBe(29.99);
      expect(response.body.data.stock).toBe(15);
    });

    it("should handle empty strings and null values", async () => {
      const testCases = [
        {
          product: {
            name: "",
            category: "Test",
            price: 10,
            description: "Test",
            stock: 5,
          },
          shouldPass: false,
          description: "empty name",
        },
        {
          product: {
            name: "Test",
            category: "",
            price: 10,
            description: "Test",
            stock: 5,
          },
          shouldPass: false,
          description: "empty category",
        },
        {
          product: {
            name: "Test",
            category: "Test",
            price: 10,
            description: "",
            stock: 5,
          },
          shouldPass: false,
          description: "empty description",
        },
      ];

      for (const testCase of testCases) {
        const response = await request(app)
          .post("/products")
          .send(testCase.product);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Validation failed");
      }
    });

    it("should handle whitespace-only strings", async () => {
      const product = {
        name: "   ",
        category: "Test",
        price: 10,
        description: "Test",
        stock: 5,
      };

      const response = await request(app)
        .post("/products")
        .send(product)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Validation failed");
      expect(response.body.errors).toContain("name is required");
    });
  });
});
