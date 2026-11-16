const mongoose = require("mongoose");
const config = require("./config/env.config");
const logger = require("./config/logger"); // <-- NUEVO
const app = require("./app");

async function start() {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info(`Conexión a MongoDB establecida (${config.nodeEnv})`);

    app.listen(config.port, () => {
      logger.info(`Servidor ShipNow escuchando en el puerto ${config.port}`);
    });
  } catch (error) {
    // Error crítico: el servidor no puede arrancar
    logger.fatal(`Error fatal al iniciar el servidor: ${error.message}`);
    process.exit(1);
  }
}

start();
