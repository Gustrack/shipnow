const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const productRouter = require("./routes/product.router");
const userRouter = require("./routes/user.router");
const mockRouter = require("./routes/mock.router");
const loggerRouter = require("./routes/logger.router");
// --- NUEVOS ---
const orderRouter = require("./routes/order.router");
const deliveryRouter = require("./routes/delivery.router");
// -------------

const errorHandler = require("./middlewares/errorHandler");
const logger = require("./config/logger");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  logger.http(`Petición entrante: ${req.method} ${req.url}`);
  next();
});

// Rutas existentes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/mocks", mockRouter);
app.use("/api/logger", loggerRouter);

// --- NUEVAS RUTAS ---
app.use("/api/orders", orderRouter);
app.use("/api/deliveries", deliveryRouter);
// --------------------

// Endpoint para ver la spec cruda en JSON (solo para desarrollo/debug)
app.get("/api/docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Ruta de Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta inexistente (404)
app.use("*", (req, res, next) => {
  logger.warning(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ status: "error", message: "Ruta no encontrada" });
});

// Manejador de errores global
app.use(errorHandler);

module.exports = app;
