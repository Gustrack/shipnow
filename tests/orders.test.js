const chai = require("chai");
const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user.model");
const Order = require("../src/models/order.model");
const { ORDER_STATUS } = require("../src/constants");

const { expect } = chai;

describe("Orders API", () => {
  let testUserId;
  let testOrderId;

  before(async () => {
    // Limpieza antes de empezar para asegurar idempotencia
    await User.deleteMany({});
    await Order.deleteMany({});

    // Creamos un usuario de prueba para asociar al pedido
    const user = await User.create({
      name: "Order Test User",
      email: "order.test@test.com",
    });
    testUserId = user._id.toString();
  });

  describe("POST /api/orders", () => {
    it("Debería crear un pedido correctamente", async () => {
      const res = await request(app)
        .post("/api/orders")
        .send({
          user: testUserId,
          items: [{ product: "123456789012345678901234", quantity: 2 }],
          total: 100,
        });

      expect(res.status).to.equal(201);
      expect(res.body.data).to.have.property("_id");
      expect(res.body.data.status).to.equal(ORDER_STATUS.CREATED);

      // Guardamos el ID para los siguientes tests
      testOrderId = res.body.data._id;
    });

    it("Debería fallar si faltan datos requeridos (items) con código de error", async () => {
      const res = await request(app)
        .post("/api/orders")
        .send({ user: testUserId, total: 100 });

      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal("error");
      // Validamos el código exacto de validación definido en el diccionario
      expect(res.body.code).to.equal("ERR_VALIDATION");
    });
  });

  describe("GET /api/orders", () => {
    it("Debería listar todos los pedidos", async () => {
      const res = await request(app).get("/api/orders");
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.an("array").that.is.not.empty;
    });
  });

  describe("GET /api/orders/:id", () => {
    it("Debería obtener un pedido por su ID", async () => {
      const res = await request(app).get(`/api/orders/${testOrderId}`);
      expect(res.status).to.equal(200);
      expect(res.body.data._id).to.equal(testOrderId);
    });

    it("Debería devolver 404 si el pedido no existe (con code)", async () => {
      const res = await request(app).get(
        "/api/orders/000000000000000000000000",
      );
      expect(res.status).to.equal(404);
      expect(res.body.code).to.equal("ERR_ORDER_NOT_FOUND");
      expect(res.body.message).to.include("Pedido no encontrado");
    });
  });

  describe("PATCH /api/orders/:id/status", () => {
    it("Debería actualizar el estado del pedido a IN_PROGRESS", async () => {
      const res = await request(app)
        .patch(`/api/orders/${testOrderId}/status`)
        .send({ status: ORDER_STATUS.IN_PROGRESS });

      expect(res.status).to.equal(200);
      expect(res.body.data.status).to.equal(ORDER_STATUS.IN_PROGRESS);
    });

    it("Debería fallar al intentar poner un estado inválido (con code)", async () => {
      const res = await request(app)
        .patch(`/api/orders/${testOrderId}/status`)
        .send({ status: "ESTADO_FALSO" });

      expect(res.status).to.equal(400);
      expect(res.body.code).to.equal("ERR_INVALID_ORDER_STATUS");
      expect(res.body.message).to.include("El estado del pedido no es válido"); // Corregido
    });
  });
});
