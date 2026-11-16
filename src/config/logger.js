const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");
const config = require("./env.config");

// Definir niveles personalizados (incluyendo http y fatal)
const levels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5,
};

// Colores para la consola (útil en desarrollo)
const colors = {
  fatal: "magenta",
  error: "red",
  warning: "yellow",
  info: "green",
  http: "cyan",
  debug: "blue",
};

winston.addColors(colors);

// Formato personalizado: 2026-08-01 10:12:03 [info] Mensaje
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}] ${message}`;
  }),
);

// Transporte para la consola
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    logFormat,
  ),
});

// Transporte para guardar TODOS los logs (opcional, para desarrollo)
const combinedFileTransport = new DailyRotateFile({
  filename: path.join("logs", "combined-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d", // Guarda 14 días de historial
  level: config.isProduction ? "info" : "debug",
});

// Transporte exclusivo para errores y fatales (requisito de la consigna)
const errorFileTransport = new DailyRotateFile({
  filename: path.join("logs", "error-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  level: "warning", // Solo guardará warning, error y fatal (según la escala 0 a 5)
});

// Configurar el logger principal
const logger = winston.createLogger({
  levels: levels,
  format: logFormat,
  transports: [consoleTransport, combinedFileTransport, errorFileTransport],
  // En producción, el nivel base es 'info' (ignora debug y http)
  // En desarrollo, mostramos todo hasta 'debug'
  level: config.isProduction ? "info" : "debug",
});

module.exports = logger;
