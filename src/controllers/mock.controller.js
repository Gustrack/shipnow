const mockService = require("../services/mock.service");

class MockController {
  getMockUsers(req, res, next) {
    try {
      // Si no viene qty, por defecto es 10. Si viene, lo pasamos a número.
      const qty = req.query.qty ? parseInt(req.query.qty) : 10;

      // El Service se encarga de validar si qty es inválido (lanza AppError si es así)
      const users = mockService.generateMockUsers(qty);

      res.status(200).json({ data: users });
    } catch (error) {
      next(error); // Si qty era -5 o "abc", cae acá y va al errorHandler
    }
  }

  async seedData(req, res, next) {
    try {
      const qty = req.query.qty ? parseInt(req.query.qty) : 10;

      const result = await mockService.seedDatabase(qty);

      res.status(201).json({
        message: "Datos de prueba insertados con éxito",
        insertados: result,
      });
    } catch (error) {
      next(error); // Si falló la DB o la validación, se maneja globalmente
    }
  }
}

module.exports = new MockController();
