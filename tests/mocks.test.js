const chai = require("chai");
const request = require("supertest");
const app = require("../src/app");

const { expect } = chai;

describe("Mocks API", () => {
  describe("GET /api/mocks/users", () => {
    it("Debería generar la cantidad exacta de usuarios solicitados", async () => {
      const res = await request(app).get("/api/mocks/users?qty=3");
      expect(res.status).to.equal(200);
      expect(res.body.data).to.have.lengthOf(3);
      expect(res.body.data[0]).to.have.property("email");
    });

    it("Debería fallar con cantidad negativa", async () => {
      const res = await request(app).get("/api/mocks/users?qty=-1");
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal("error");
      expect(res.body.message).to.include(
        "La cantidad debe ser un número entero positivo",
      );
    });

    it("Debería fallar con cantidad no numérica", async () => {
      const res = await request(app).get("/api/mocks/users?qty=abc");
      expect(res.status).to.equal(400);
    });
  });

  describe("POST /api/mocks/seed", () => {
    it("Debería insertar los datos en la DB correctamente", async () => {
      const res = await request(app).post("/api/mocks/seed?qty=2");
      expect(res.status).to.equal(201);
      expect(res.body.insertados).to.have.property("users", 2);
      // Aquí podrías hacer un GET a /api/users para verificar que están ahí
    });
  });
});
