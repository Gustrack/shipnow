const mockService = require("../services/mock.service");

class MockController {
  getMockUsers(req, res, next) {
    try {
      const qty = parseInt(req.query.qty) || 10;
      const users = mockService.generateMockUsers(qty);
      res.status(200).json({ data: users });
    } catch (error) {
      next(error);
    }
  }

  async seedData(req, res, next) {
    try {
      const qty = parseInt(req.query.qty) || 10;
      const result = await mockService.seedDatabase(qty);
      res.status(201).json({
        message: "Datos de prueba insertados con éxito",
        insertados: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MockController();
