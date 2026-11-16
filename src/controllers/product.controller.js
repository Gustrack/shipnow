const productService = require("../services/product.service");

class ProductController {
  async getAll(req, res, next) {
    try {
      const includeOutOfStock = req.query.includeOutOfStock === "true";
      const products = await productService.getAll({ includeOutOfStock });
      res.status(200).json({ data: products });
    } catch (error) {
      next(error); // El middleware global se encarga de la respuesta
    }
  }

  async getById(req, res, next) {
    try {
      const product = await productService.getById(req.params.id);
      res.status(200).json({ data: product });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const product = await productService.create(req.body);
      res.status(201).json({ data: product });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const product = await productService.update(req.params.id, req.body);
      res.status(200).json({ data: product });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await productService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
