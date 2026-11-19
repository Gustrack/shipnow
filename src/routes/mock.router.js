const express = require("express");
const mockController = require("../controllers/mock.controller");
const router = express.Router();

/**
 * @openapi
 * /mocks/users:
 *   get:
 *     summary: Generar usuarios simulados (sin guardar en DB)
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *         description: Cantidad (por defecto 10)
 *     responses:
 *       200:
 *         description: Lista de usuarios generados
 *       400:
 *         description: Cantidad inválida
 */
router.get("/users", mockController.getMockUsers);

/**
 * @openapi
 * /mocks/couriers:
 *   get:
 *     summary: Generar repartidores simulados (sin guardar en DB)
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *         description: Cantidad (por defecto 10)
 *     responses:
 *       200:
 *         description: Lista de repartidores (rol COURIER)
 */
router.get("/couriers", mockController.getMockCouriers);

/**
 * @openapi
 * /mocks/products:
 *   get:
 *     summary: Generar productos simulados (sin guardar en DB)
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *         description: Cantidad (por defecto 10)
 *     responses:
 *       200:
 *         description: Lista de productos generados
 */
router.get("/products", mockController.getMockProducts);

/**
 * @openapi
 * /mocks/seed:
 *   post:
 *     summary: Insertar datos de prueba en la base de datos
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *         description: Cantidad de registros a insertar (por defecto 10)
 *     responses:
 *       201:
 *         description: Datos insertados correctamente
 *       400:
 *         description: Cantidad inválida
 */
router.post("/seed", mockController.seedData);

module.exports = router;
