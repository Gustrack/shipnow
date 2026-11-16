const mongoose = require('mongoose');
const config = require('./config/env.config');
const app = require('./app');

async function start() {
    try {
        await mongoose.connect(config.mongoUri);
        console.log(`[DB] Conectado a MongoDB (${config.nodeEnv})`);

        app.listen(config.port, () => {
            console.log(`[Server] Escuchando en http://localhost:${config.port}`);
        });
    } catch (error) {
        console.error('[Server] Error al arrancar:', error.message);
        process.exit(1);
    }
}

start();
