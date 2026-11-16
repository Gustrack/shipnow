const logger = require("../config/logger");

class LoggerController {
  testLogs(req, res, next) {
    try {
      logger.debug("Mensaje de prueba nivel DEBUG");
      logger.http("Mensaje de prueba nivel HTTP");
      logger.info("Mensaje de prueba nivel INFO");
      logger.warning("Mensaje de prueba nivel WARNING");
      logger.error("Mensaje de prueba nivel ERROR");
      logger.fatal("Mensaje de prueba nivel FATAL");

      res
        .status(200)
        .json({ message: "Logs generados correctamente en todos los niveles" });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new LoggerController();
