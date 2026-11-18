const express = require("express");
const uploadController = require("../controllers/upload.controller");
const upload = require("../config/multer.config");

const router = express.Router();

/**
 * @openapi
 * /uploads/user-document:
 *   post:
 *     summary: Subir un documento para un usuario
 *     tags: [Uploads]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file, userId, documentType]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: El archivo a subir (PDF, JPG o PNG, máx 5MB)
 *               userId:
 *                 type: string
 *                 description: ID del usuario al que se asocia el documento
 *               documentType:
 *                 type: string
 *                 enum: [DNI, LICENCIA, PASAPORTE]
 *                 description: Tipo de documento
 *     responses:
 *       200:
 *         description: Documento subido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Error de validación (archivo faltante, tipo inválido, tamaño excedido, tipo de doc inválido)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  "/user-document",
  upload.single("file"),
  uploadController.uploadUserDoc,
);

module.exports = router;
