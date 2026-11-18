const chai = require("chai");
const request = require("supertest");
const app = require("../src/app");

const { expect } = chai;

describe("Global Errors API", () => {
  it("Debería devolver 404 al pedir un producto inexistente", async () => {
    const res = await request(app).get(
      "/api/products/000000000000000000000000",
    );
    expect(res.status).to.equal(404);
    expect(res.body.status).to.equal("error");
    expect(res.body.message).to.equal("Producto no encontrado");
  });

  it("Debería devolver 404 en una ruta que no existe", async () => {
    const res = await request(app).get("/api/ruta-fantasma");
    expect(res.status).to.equal(404);
    expect(res.body.status).to.equal("error");
    expect(res.body.message).to.equal("Ruta no encontrada");
  });
});
