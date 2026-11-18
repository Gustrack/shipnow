const express = require("express");
const loggerController = require("../controllers/logger.controller");
const router = express.Router();

/**
 * @openapi
 * /logger/test:
 *   get:
 *     summary: Endpoint de prueba de logs
 *     description: Herramienta interna para validar la configuración de Winston. Genera logs en todos los niveles.
 *     tags: [Logger]
 *     responses:
 *       200:
 *         description: Logs generados correctamente
 *       500:
 *         description: Error interno al generar logs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/test", loggerController.testLogs);

module.exports = router;
