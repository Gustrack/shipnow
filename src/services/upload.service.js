const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const { ERROR_CODES } = require("../constants/errors.constants");
const logger = require("../config/logger");

class UploadService {
  async uploadUserDocument(userId, file, documentType) {
    // 1. Validar que el archivo exista (Multer no lo sube si no viene)
    if (!file) {
      throw new AppError(ERROR_CODES.FILE_REQUIRED);
    }

    // 2. Validar que el tipo de documento sea el permitido
    const validDocTypes = ["DNI", "LICENCIA", "PASAPORTE"];
    if (!validDocTypes.includes(documentType)) {
      // Log de advertencia (Módulo 4)
      logger.warning(
        `Intento de subir documento con tipo inválido: '${documentType}'`,
      );
      throw new AppError(ERROR_CODES.INVALID_DOCUMENT_TYPE);
    }

    // 3. Verificar que el usuario exista
    const user = await User.findById(userId);
    if (!user) {
      // Si el archivo ya se subió al disco (Multer), deberíamos borrarlo, pero por simplicidad lo dejamos así.
      throw new AppError(ERROR_CODES.USER_NOT_FOUND);
    }

    try {
      // 4. Armar el objeto con los metadatos
      const fileData = {
        originalName: file.originalname,
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
        documentType: documentType,
      };

      // 5. Guardar en el array del usuario y persistir en DB
      user.documents.push(fileData);
      await user.save();

      // 6. Log de éxito (Módulo 4)
      logger.info(
        `Documento ${file.originalname} subido exitosamente para el usuario ${userId}`,
      );

      return { user, file: fileData };
    } catch (error) {
      // Log de error interno
      logger.error(
        `Fallo al guardar los metadatos del documento en DB: ${error.message}`,
      );
      throw new AppError(ERROR_CODES.UPLOAD_ERROR);
    }
  }
}

module.exports = new UploadService();
