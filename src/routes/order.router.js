const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();

/**
 * @openapi
 * /orders:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 */
router.get("/", orderController.getAll);

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido no encontrado
 */
router.get("/:id", orderController.getById);

/**
 * @openapi
 *   /orders:
 *     post:
 *       summary: Crear un nuevo pedido
 *       tags: [Orders]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [user, items, total]
 *               properties:
 *                 user: { type: string }
 *                 items: { type: array, items: { $ref: '#/components/schemas/OrderItem' } }
 *                 total: { type: number }
 *       responses:
 *         201:
 *           description: Pedido creado
 *         400:
 *           description: Datos inválidos
 */
router.post("/", orderController.create);

/**
 * @openapi
 * /orders/{id}/status:
 *   patch:
 *     summary: Actualizar el estado de un pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [CREATED, IN_PROGRESS, DELIVERED, CANCELLED]
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       400:
 *         description: Estado inválido
 *       404:
 *         description: Pedido no encontrado
 */
router.patch("/:id/status", orderController.updateStatus);

module.exports = router;
