const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Garden Planner API',
      version: '1.0.0',
      description: 'API documentation for Garden Planner',
    },
    servers: [
      { url: 'http://localhost:5000' }, // your local dev url
      { url: 'https://your-production-url.com' }, // your deployed url
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid', // default session cookie name
        },
      },
      schemas: {
        // User schema example; extend as needed
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            githubId: { type: 'string', nullable: true },
            email: { type: 'string' },
            displayName: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            role: { type: 'string', enum: ['user', 'admin'], default: 'user' },
            createdAt: { type: 'string', format: 'date-time' },
          },
          required: ['email'],
        },
      },
    },
  },
  apis: [
    path.join(__dirname, './garden-api/routes/*.js'), // adjust path to your route files
    path.join(__dirname, './garden-api/controllers/*.js'),
  ],
};

module.exports = swaggerJsdoc(options);