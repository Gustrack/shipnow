const mongoose = require("mongoose");
const config = require("../src/config/env.config");

// En Mocha v10+, se usa rootHooks para hooks globales en archivos cargados con --require
exports.mochaHooks = {
  async beforeAll() {
    this.timeout(15000); // Damos más tiempo (15s)
    try {
      console.log(`Conectando a: ${config.mongoUri}`); // Log de debug
      await mongoose.connect(config.mongoUri);
      console.log("Conexión a MongoDB de testing exitosa");
    } catch (error) {
      console.error("Error al conectar a MongoDB de testing:", error.message);
      throw error;
    }
  },
  async afterAll() {
    this.timeout(10000);
    // Limpiamos las colecciones al terminar todos los tests
    if (mongoose.connection.readyState === 1) {
      const collections = mongoose.connection.collections;
      for (const key in collections) {
        await collections[key].deleteMany({});
      }
      await mongoose.disconnect();
    }
  },
};
