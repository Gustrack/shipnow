const mongoose = require("mongoose");
const config = require("../src/config/env.config");

// En Mocha v10+, se usa rootHooks para hooks globales en archivos cargados con --require
exports.mochaHooks = {
  async beforeAll() {
    // Dar tiempo a Mongo a conectar (reemplaza al this.timeout)
    this.timeout(10000);
    await mongoose.connect(config.mongoUri);
  },
  async afterAll() {
    await mongoose.disconnect();
  },
};
