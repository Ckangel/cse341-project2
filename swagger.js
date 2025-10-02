const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Garden Planner API",
    version: "1.0.0",
    description: "API documentation for the Garden Planner project",
  },
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        name: "connect.sid",
        in: "cookie", // ✅ This must be inside an object key
        name:"connect.sid"
      },
    },
  },
  security: [
    {
      cookieAuth: [],
    },
  ],


  // ... other config like paths
};

tags: [
  {
    name: "Auth Middleware",
    description: "Middleware functions that protect routes based on authentication and user roles."
  }
]

module.exports = swaggerSpec;
