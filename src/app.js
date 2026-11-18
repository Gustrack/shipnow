const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

// Routers
const productRouter = require("./routes/product.router");
const userRouter = require("./routes/user.router");
const mockRouter = require("./routes/mock.router");
const loggerRouter = require("./routes/logger.router");
const uploadRouter = require("./routes/upload.router");
const orderRouter = require("./routes/order.router");

const errorHandler = require("./middlewares/errorHandler");
const logger = require("./config/logger");

const app = express();
app.use(express.json());

// Middleware de logs HTTP
app.use((req, res, next) => {
  logger.http(`Petición entrante: ${req.method} ${req.url}`);
  next();
});

// Rutas de la API
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/mocks", mockRouter);
app.use("/api/logger", loggerRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/orders", orderRouter);

// Ruta de Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta inexistente
app.use("*", (req, res, next) => {
  logger.warning(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ status: "error", message: "Ruta no encontrada" });
});

// Manejador de errores global
app.use(errorHandler);

module.exports = app;
