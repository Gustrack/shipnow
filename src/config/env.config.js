require('dotenv').config();

const REQUIRED_ENV = ['PORT', 'MONGODB_URI', 'NODE_ENV'];

function loadConfig() {
    const missing = REQUIRED_ENV.filter((key) => !process.env[key] || process.env[key].trim() === '');

    if (missing.length > 0) {
        throw new Error(
            `[Config] Faltan variables de entorno requeridas: ${missing.join(', ')}. ` +
            `Revisá tu archivo .env (podés basarte en .env.example).`
        );
    }

    const port = Number(process.env.PORT);
    if (!Number.isInteger(port) || port <= 0) {
        throw new Error(`[Config] PORT debe ser un número entero positivo. Recibido: '${process.env.PORT}'.`);
    }

    const validEnvs = ['development', 'production', 'test'];
    if (!validEnvs.includes(process.env.NODE_ENV)) {
        throw new Error(`[Config] NODE_ENV debe ser uno de: ${validEnvs.join(', ')}.`);
    }

    return Object.freeze({
        port,
        mongoUri: process.env.MONGODB_URI,
        nodeEnv: process.env.NODE_ENV,
        isProduction: process.env.NODE_ENV === 'production'
    });
}

const config = loadConfig();

module.exports = config;
