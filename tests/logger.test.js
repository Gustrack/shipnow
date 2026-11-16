const chai = require("chai");
const request = require("supertest");
const app = require("../src/app");

const { expect } = chai;

describe("Logger API", () => {
  it("Debería responder OK al endpoint de prueba de logs", async () => {
    const res = await request(app).get("/api/logger/test");
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal(
      "Logs generados correctamente en todos los niveles",
    );
  });
});
