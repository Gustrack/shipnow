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
 */
router.get("/test", loggerController.testLogs);

module.exports = router;
