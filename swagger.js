const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Garden Planner API",
      version: "1.0.0",
      description: "API documentation for Garden Planner Project",
    },
    servers: [
      {
        url: "http://localhost:5000", // For local development
      },
      {
        url: "https://cse341-project2-8cpj.onrender.com", // Your deployed URL
      },
    ],
  },
  apis: [
    path.join(__dirname, "./garden-planner-api/routes/*.js"),
    path.join(__dirname, "./garden-planner-api/controllers/*.js"),
    // Add other paths with swagger comments if needed
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
