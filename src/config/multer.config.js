const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AppError = require("../utils/AppError");
const { ERROR_CODES } = require("../constants/errors.constants");

// Asegurar que las carpetas de destino existan
const uploadDirs = [
  path.join(__dirname, "../../uploads/users"),
  path.join(__dirname, "../../uploads/receipts"),
];

uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Decidimos la carpeta según la ruta de la petición
    if (req.baseUrl.includes("users")) {
      cb(null, path.join(__dirname, "../../uploads/users"));
    } else {
      cb(null, path.join(__dirname, "../../uploads/receipts"));
    }
  },
  filename: (req, file, cb) => {
    // Generamos un nombre único: timestamp-nombreOriginal
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

// Filtro de tipos de archivo (solo PDFs e imágenes)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // Lanzamos un error personalizado que capturará el errorHandler
    cb(new AppError(ERROR_CODES.INVALID_FILE_TYPE), false);
  }
};

// Configuración final de Multer con límite de tamaño (ej. 5MB)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

module.exports = upload;
