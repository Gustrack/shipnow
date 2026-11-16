const chai = require("chai");
const request = require("supertest");
const app = require("../src/app");

const { expect } = chai;

describe("Swagger API", () => {
  it("Debería servir la UI de Swagger con status 200", async () => {
    const res = await request(app).get("/api/docs/");
    expect(res.status).to.equal(200);
    expect(res.text).to.include("Swagger UI"); // Verifica que es la página de Swagger
  });
});
