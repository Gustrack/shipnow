const express = require('express');
const productRouter = require('./routes/product.router');
const userRouter = require('./routes/user.router');

const app = express();
app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

// Middleware centralizado de errores (semilla para la próxima pre-entrega)
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = status === 500 ? 'Error interno del servidor' : err.message;
    if (status === 500) console.error(err);
    res.status(status).json({ error: message });
});

module.exports = app;
