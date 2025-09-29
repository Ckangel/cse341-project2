// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Garden Planner API",
      version: "1.0.0",
      description: "API documentation for Garden Planner project",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
      {
        url: "https://cse341-project2-1-xl43.onrender.com",
        description: "Production server",
      },
    ],
  },
  apis: ["./garden-planner-api/routes/*.js"], // swagger will scan route files
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Garden Planner API",
      version: "1.0.0",
      description: "API for managing users, gardens, and authentication.",
    },
    servers: [
      {
        url: "http://localhost:5000", // 👈 matches your dev server
      },
    ],
  },
  apis: ["./garden-planner-api/routes/*.js"], // 👈 absolute/relative path matters
};

module.exports = swaggerSpec;
