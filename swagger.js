const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Garden Planner API",
      version: "1.0.0",
      description: "API documentation for the Garden Planner project",
    },
    servers: [
      { url: "http://localhost:5000" },
      { url: "https://cse341-project2-8cpj.onrender.com" },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "connect.sid",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            googleId: { type: "string", nullable: true },
            email: { type: "string" },
            displayName: { type: "string", nullable: true },
            firstName: { type: "string", nullable: true },
            lastName: { type: "string", nullable: true },
            role: { type: "string", enum: ["user", "admin"], default: "user" },
            bio: { type: "string", nullable: true },
            preferences: {
              type: "object",
              properties: {
                notifications: { type: "boolean", default: true },
                theme: { type: "string", default: "light" },
              },
            },
            createdAt: { type: "string", format: "date-time" },
          },
          required: ["email"],
        },

        Garden: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            location: { type: "string" },
            size: { type: "number" },
            soilType: { type: "string" },
            plants: { type: "array", items: { type: "string" } },
            createdAt: { type: "string", format: "date-time" },
          },
          required: ["name", "location", "size", "soilType"],
        },

        GardenInput: {
          type: "object",
          required: ["name", "location", "size", "soilType"],
          properties: {
            name: { type: "string" },
            location: { type: "string" },
            size: { type: "number" },
            soilType: { type: "string" },
            plants: { type: "array", items: { type: "string" } },
          },
        },
      },
    },
  },
  apis: [
    path.join(__dirname, "./garden-planner-api/routes/*.js"),
    path.join(__dirname, "./garden-planner-api/controllers/*.js"),
  ],
};

module.exports = swaggerJsdoc(options);
