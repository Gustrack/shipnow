const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ShipNow API",
      version: "1.0.0",
      description:
        "API profesional para la gestión logística de ShipNow. Incluye gestión de usuarios, productos, pedidos, entregas, generación de datos mock y monitoreo mediante logs.",
      contact: {
        name: "Gustavo (Gustrack)",
        url: "https://github.com/Gustrack/shipnow",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor local de desarrollo",
      },
    ],
    tags: [
      { name: "Users", description: "Gestión de usuarios" },
      { name: "Products", description: "Gestión de productos" },
      { name: "Orders", description: "Gestión de pedidos" },
      { name: "Deliveries", description: "Gestión de entregas" },
      { name: "Mocks", description: "Generación de datos de prueba" },
      {
        name: "Logger",
        description: "Herramienta interna de validación de logs",
      },
      { name: "Uploads", description: "Carga de archivos y documentos" }, // <-- NUEVO
    ],
    components: {
      schemas: {
        // 1. Schemas de Entidades
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "65f1234567890abcdef12345" },
            name: { type: "string", example: "Ana Pérez" },
            email: { type: "string", example: "ana.perez@test.com" },
            role: {
              type: "string",
              enum: ["ADMIN", "USER", "COURIER"],
              example: "USER",
            },
          },
        },
        Product: {
          type: "object",
          properties: {
            _id: { type: "string", example: "65f1234567890abcdef12345" },
            name: { type: "string", example: "Teclado Mecánico" },
            price: { type: "number", example: 50 },
            stock: { type: "number", example: 10 },
            status: {
              type: "string",
              enum: ["AVAILABLE", "OUT_OF_STOCK", "DISCONTINUED"],
              example: "AVAILABLE",
            },
          },
        },
        Order: {
          type: "object",
          properties: {
            _id: { type: "string", example: "65f1234567890abcdef12345" },
            user: { type: "string", example: "65f1234567890abcdef12345" },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  product: {
                    type: "string",
                    example: "65f1234567890abcdef12345",
                  },
                  quantity: { type: "number", example: 2 },
                },
              },
            },
            total: { type: "number", example: 100 },
            status: {
              type: "string",
              enum: ["CREATED", "IN_PROGRESS", "DELIVERED", "CANCELLED"],
              example: "CREATED",
            },
          },
        },
        Delivery: {
          type: "object",
          properties: {
            _id: { type: "string", example: "65f1234567890abcdef12345" },
            order: { type: "string", example: "65f1234567890abcdef12345" },
            courier: { type: "string", example: "65f1234567890abcdef12345" },
            priority: {
              type: "string",
              enum: ["LOW", "MEDIUM", "HIGH"],
              example: "HIGH",
            },
            status: { type: "string", example: "PENDING" },
          },
        },
        // 2. Schemas de Respuestas
        SuccessResponse: {
          type: "object",
          properties: {
            data: { type: "object" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "error" },
            message: { type: "string", example: "Descripción del error" },
          },
        },
      },
    },
  },
  // Le decimos a swagger-jsdoc dónde buscar los comentarios de documentación
  apis: ["./src/routes/*.js"], // Ruta relativa desde la raíz
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
