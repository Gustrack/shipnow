const uploadService = require("../services/upload.service");

class UploadController {
  async uploadUserDoc(req, res, next) {
    try {
      // Multer inyecta el archivo en req.file
      const { userId, documentType } = req.body;
      const result = await uploadService.uploadUserDocument(
        userId,
        req.file,
        documentType,
      );

      res.status(200).json({
        status: "success",
        message: "Documento cargado correctamente",
        data: result.file,
      });
    } catch (error) {
      // Si algo falla (ej. usuario no encontrado), lo mandamos al errorHandler
      next(error);
    }
  }
}

module.exports = new UploadController();
