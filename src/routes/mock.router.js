const express = require("express");
const mockController = require("../controllers/mock.controller");
const router = express.Router();

/**
 * @openapi
 * /mocks/users:
 *   get:
 *     summary: Generar usuarios simulados
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/users", mockController.getMockUsers);

/**
 * @openapi
 * /mocks/couriers:
 *   get:
 *     summary: Generar repartidores simulados
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de repartidores
 */
router.get("/couriers", mockController.getMockCouriers);

/**
 * @openapi
 * /mocks/products:
 *   get:
 *     summary: Generar productos simulados
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get("/products", mockController.getMockProducts);

/**
 * @openapi
 * /mocks/orders:
 *   get:
 *     summary: Generar pedidos simulados
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get("/orders", mockController.getMockOrders);

/**
 * @openapi
 * /mocks/deliveries:
 *   get:
 *     summary: Generar entregas simuladas
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de entregas
 */
router.get("/deliveries", mockController.getMockDeliveries);

/**
 * @openapi
 * /mocks/seed:
 *   post:
 *     summary: Insertar datos de prueba en la base de datos
 *     tags: [Mocks]
 *     responses:
 *       201:
 *         description: Datos insertados
 */
router.post("/seed", mockController.seedData);

module.exports = router;
