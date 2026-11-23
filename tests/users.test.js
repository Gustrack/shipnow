const chai = require("chai");
const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user.model");

const { expect } = chai;

describe("Users API", () => {
  before(async () => {
    await User.deleteMany({});
  });

  describe("GET /api/users", () => {
    it("Debería devolver un array vacío inicialmente", async () => {
      const res = await request(app).get("/api/users");
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.an("array").that.is.empty;
    });

    it("Debería devolver 400 si el rol filtrado es inválido (con code)", async () => {
      const res = await request(app).get("/api/users?role=INVALIDO");
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal("error");
      expect(res.body.code).to.equal("ERR_INVALID_ROLE");
      expect(res.body.message).to.include("El rol proporcionado no es válido");
    });
  });

  describe("POST /api/users", () => {
    it("Debería crear un usuario correctamente", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({ name: "Test User", email: "test@test.com" });

      expect(res.status).to.equal(201);
      expect(res.body.data).to.have.property("_id");
    });

    it("Debería devolver 409 si el email ya existe (con code)", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({ name: "Test User", email: "test@test.com" });

      expect(res.status).to.equal(409);
      expect(res.body.status).to.equal("error");
      expect(res.body.code).to.equal("ERR_EMAIL_EXISTS");
    });
  });
});
