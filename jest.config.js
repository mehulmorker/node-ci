module.exports = {
  testEnvironment: "node",
  verbose: true,
  collectCoverage: false,
  collectCoverageFrom: [
    "server.js",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!**/*.test.js",
    "!**/jest.config.js",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
  testTimeout: 10000,
  setupFilesAfterEnv: [],
  clearMocks: true,
  restoreMocks: true,
};
