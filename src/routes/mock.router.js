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
 *         description: Cantidad de usuarios a generar (por defecto 10)
 *     responses:
 *       200:
 *         description: Lista de usuarios generados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Cantidad inválida (negativa o no numérica)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/users", mockController.getMockUsers);

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error al insertar en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/seed", mockController.seedData);

module.exports = router;
