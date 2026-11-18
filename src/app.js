const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

// Importación de Routers
const productRouter = require('./routes/product.router');
const userRouter = require('./routes/user.router');
const mockRouter = require('./routes/mock.router');
const loggerRouter = require('./routes/logger.router');
const uploadRouter = require('./routes/upload.router');
const orderRouter = require('./routes/order.router');
const deliveryRouter = require('./routes/delivery.router');

const errorHandler = require('./middlewares/errorHandler');
const logger = require('./config/logger');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    logger.http(`Petición entrante: ${req.method} ${req.url}`);
    next();
});

// Registro de rutas
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/mocks', mockRouter);
app.use('/api/logger', loggerRouter);
app.use('/api/uploads', uploadRouter);
app.use('/api/orders', orderRouter);
app.use('/api/deliveries', deliveryRouter);

// Documentación Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta para ver el JSON crudo (la que agregamos para debug)
app.get('/api/docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// Ruta inexistente
app.use('*', (req, res, next) => {
    logger.warning(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ status: 'error', message: 'Ruta no encontrada' });
});

app.use(errorHandler); 

module.exports = app;