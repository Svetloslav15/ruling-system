import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Ethereum Transaction Monitoring API",
    version: "1.0.0",
    description:
      "API documentation for the Ethereum transaction monitoring system",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/config/swaggerDefinitions.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
