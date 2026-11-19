const mockService = require("../services/mock.service");

class MockController {
  getMockUsers(req, res, next) {
    try {
      const qty = req.query.qty ? parseInt(req.query.qty) : 10;
      const users = mockService.generateMockUsers(qty);
      res.status(200).json({ data: users });
    } catch (error) {
      next(error);
    }
  }

  getMockCouriers(req, res, next) {
    try {
      const qty = req.query.qty ? parseInt(req.query.qty) : 10;
      const couriers = mockService.generateMockCouriers(qty);
      res.status(200).json({ data: couriers });
    } catch (error) {
      next(error);
    }
  }

  getMockProducts(req, res, next) {
    try {
      const qty = req.query.qty ? parseInt(req.query.qty) : 10;
      const products = mockService.generateMockProducts(qty);
      res.status(200).json({ data: products });
    } catch (error) {
      next(error);
    }
  }

  async seedData(req, res, next) {
    try {
      const qty = req.query.qty ? parseInt(req.query.qty) : 10;
      const result = await mockService.seedDatabase(qty);
      res.status(201).json({ message: "Datos insertados", insertados: result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MockController();
