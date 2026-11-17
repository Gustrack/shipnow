const chai = require("chai");
const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user.model");
const path = require("path");
const fs = require("fs");

const { expect } = chai;

describe("Uploads API", () => {
  let testUserId;

  before(async () => {
    await User.deleteMany({});
    const user = await User.create({
      name: "Upload User",
      email: "upload@test.com",
    });
    testUserId = user._id;
  });

  // Limpiamos los archivos generados en la carpeta uploads después de los tests
  after(async () => {
    const dir = path.join(__dirname, "../uploads/users");
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        fs.unlinkSync(path.join(dir, file));
      }
    }
  });

  describe("POST /api/uploads/user-document", () => {
    it("Debería subir un documento correctamente (PDF simulado)", async () => {
      // Creamos un buffer en memoria que simula un PDF
      const buffer = Buffer.from("%PDF-1.4 fake pdf content");

      const res = await request(app)
        .post("/api/uploads/user-document")
        .field("userId", testUserId.toString())
        .field("documentType", "DNI")
        .attach("file", buffer, "mi-dni.pdf");

      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal("success");
      expect(res.body.data).to.have.property("originalName", "mi-dni.pdf");
      expect(res.body.data).to.have.property("documentType", "DNI");
    });

    it("Debería fallar si falta el archivo", async () => {
      const res = await request(app)
        .post("/api/uploads/user-document")
        .field("userId", testUserId.toString())
        .field("documentType", "DNI");

      expect(res.status).to.equal(400);
      expect(res.body.message).to.include("El archivo es requerido");
    });

    it("Debería fallar si el tipo de documento es inválido", async () => {
      const buffer = Buffer.from("%PDF-1.4 fake pdf content");

      const res = await request(app)
        .post("/api/uploads/user-document")
        .field("userId", testUserId.toString())
        .field("documentType", "TIPO_INVALIDO")
        .attach("file", buffer, "test.pdf");

      expect(res.status).to.equal(400);
      expect(res.body.message).to.include("El tipo de documento no es válido");
    });

    it("Debería fallar si el usuario no existe", async () => {
      const buffer = Buffer.from("%PDF-1.4 fake pdf content");
      const fakeId = "000000000000000000000000";

      const res = await request(app)
        .post("/api/uploads/user-document")
        .field("userId", fakeId)
        .field("documentType", "DNI")
        .attach("file", buffer, "test.pdf");

      expect(res.status).to.equal(404);
      expect(res.body.message).to.include("Usuario no encontrado");
    });
  });
});
