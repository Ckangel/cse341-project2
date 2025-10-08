const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Garden Planner API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      { url: "http://localhost:5000" },
      { url: "https://cse341-project2-8cpj.onrender.com/api-docs/" },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
      schemas: {
        // Your User, Garden schemas here...
      },
    },
  },
  apis: [
    path.join(__dirname, "./garden-planner-api/routes/*.js"),
    path.join(__dirname, "./garden-planner-api/controllers/*.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
