const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger"); // <-- NUEVO

const productRouter = require("./routes/product.router");
const userRouter = require("./routes/user.router");
const mockRouter = require("./routes/mock.router");
const loggerRouter = require("./routes/logger.router");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./config/logger");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  logger.http(`Petición entrante: ${req.method} ${req.url}`);
  next();
});

// 1. Rutas de la API
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/mocks", mockRouter);
app.use("/api/logger", loggerRouter);

// 2. Ruta de la documentación Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Manejo de rutas inexistentes
app.use("*", (req, res, next) => {
  logger.warning(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ status: "error", message: "Ruta no encontrada" });
});

app.use(errorHandler);

module.exports = app;
