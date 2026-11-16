const express = require("express");
const productRouter = require("./routes/product.router");
const userRouter = require("./routes/user.router");
const mockRouter = require("./routes/mock.router");
const loggerRouter = require("./routes/logger.router"); // <-- NUEVO
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./config/logger"); // <-- NUEVO

const app = express();
app.use(express.json());

// Middleware HTTP para loguear cada petición entrante (opcional pero recomendado)
app.use((req, res, next) => {
  logger.http(`Petición entrante: ${req.method} ${req.url}`);
  next();
});

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/mocks", mockRouter);
app.use("/api/logger", loggerRouter); // <-- NUEVO

// Manejo de rutas inexistentes (404)
app.use("*", (req, res, next) => {
  logger.warning(`Ruta no encontrada: ${req.method} ${req.originalUrl}`); // <-- NUEVO
  res.status(404).json({ status: "error", message: "Ruta no encontrada" });
});

app.use(errorHandler);

module.exports = app;
