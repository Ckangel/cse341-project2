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
    "./garden-planner-api/routes/*.js",
    "./garden-planner-api/controllers/*.js",
  ],
};
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
