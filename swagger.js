const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Garden Planner API",
      version: "1.0.0",
      description: "API documentation for Garden Planner",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
      {
        url: "https://cse341-project2-8cpj.onrender.com",
        description: "Production server",
      },
    ],
  },
  apis: ["./garden-planner-api/routes/*.js"], // adjust path if needed
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
