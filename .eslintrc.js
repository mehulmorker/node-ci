module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true, // This enables Jest globals like describe, it, expect
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // Relaxed rules for development
    "no-unused-vars": "warn", // Change from error to warning
    "no-console": "off", // Allow console.log statements
    "no-undef": "error", // Keep this to catch real undefined variables

    // Code style rules (optional - you can adjust these)
    indent: ["warn", 2], // warn only
    "linebreak-style": ["warn", "unix"], // warn only
    quotes: "off", // turn off strict quote checking
    semi: "off", // turn off strict semicolon checking

    // Relaxed rules for common patterns
    "prefer-const": "warn",
    "no-var": "error",
    "object-shorthand": "warn",
    "prefer-template": "warn",
  },
  globals: {
    // Add any additional globals if needed
    process: "readonly",
  },
  overrides: [
    {
      // Special rules for test files
      files: ["**/*.test.js", "**/*.spec.js"],
      rules: {
        "no-unused-vars": "off", // Often have unused variables in tests
        "prefer-const": "off", // Sometimes need to reassign in tests
      },
    },
  ],
};
