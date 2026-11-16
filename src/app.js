const express = require("express");
const productRouter = require("./routes/product.router");
const userRouter = require("./routes/user.router");
const mockRouter = require("./routes/mock.router");
const errorHandler = require("./middlewares/errorHandler"); // <-- NUEVO

const app = express();
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/mocks", mockRouter);

// El middleware de errores SIEMPRE va al final, después de todas las rutas
app.use(errorHandler);

module.exports = app;
