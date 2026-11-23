const chai = require("chai");
const request = require("supertest");
const app = require("../src/app");

const { expect } = chai;

describe("Mocks API", () => {
  describe("GET /api/mocks/users", () => {
    it("Debería generar usuarios", async () => {
      const res = await request(app).get("/api/mocks/users?qty=3");
      expect(res.status).to.equal(200);
      expect(res.body.data).to.have.lengthOf(3);
    });
    it("Debería fallar con cantidad inválida (con code)", async () => {
      const res = await request(app).get("/api/mocks/users?qty=-1");
      expect(res.status).to.equal(400);
      expect(res.body.code).to.equal("ERR_INVALID_QUANTITY");
    });
  });

  describe("GET /api/mocks/couriers", () => {
    it("Debería generar repartidores", async () => {
      const res = await request(app).get("/api/mocks/couriers?qty=2");
      expect(res.status).to.equal(200);
      expect(res.body.data).to.have.lengthOf(2);
      expect(res.body.data[0]).to.have.property("role", "COURIER");
    });
  });

  describe("GET /api/mocks/products", () => {
    it("Debería generar productos", async () => {
      const res = await request(app).get("/api/mocks/products?qty=2");
      expect(res.status).to.equal(200);
      expect(res.body.data).to.have.lengthOf(2);
    });
  });

  describe("GET /api/mocks/orders", () => {
    it("Debería generar pedidos", async () => {
      const res = await request(app).get("/api/mocks/orders?qty=2");
      expect(res.status).to.equal(200);
      expect(res.body.data).to.have.lengthOf(2);
    });
  });

  describe("GET /api/mocks/deliveries", () => {
    it("Debería generar entregas", async () => {
      const res = await request(app).get("/api/mocks/deliveries?qty=2");
      expect(res.status).to.equal(200);
      expect(res.body.data).to.have.lengthOf(2);
    });
  });

  describe("POST /api/mocks/seed", () => {
    it("Debería insertar datos en la DB", async () => {
      const res = await request(app).post("/api/mocks/seed?qty=2");
      expect(res.status).to.equal(201);
      expect(res.body.insertados.users).to.equal(2);
    });
    it("Debería fallar con cantidad inválida (con code)", async () => {
      const res = await request(app).post("/api/mocks/seed?qty=-5");
      expect(res.status).to.equal(400);
      expect(res.body.code).to.equal("ERR_INVALID_QUANTITY");
    });
  });
});
