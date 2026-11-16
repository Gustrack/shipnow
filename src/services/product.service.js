const productRepository = require("../repositories/product.repository");
const { PRODUCT_STATUS } = require("../constants");
const { ERROR_CODES } = require("../constants/errors.constants");
const AppError = require("../utils/AppError");

class ProductService {
  async getAll({ includeOutOfStock = false } = {}) {
    const products = await productRepository.findAll({ includeOutOfStock });

    return products.map((p) => ({
      ...p,
      status: p.stock === 0 ? PRODUCT_STATUS.OUT_OF_STOCK : p.status,
    }));
  }

  async getById(id) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new AppError(ERROR_CODES.PRODUCT_NOT_FOUND);
    }
    return product;
  }

  async create({ name, price, stock }) {
    if (price < 0) {
      throw new AppError(ERROR_CODES.NEGATIVE_PRICE);
    }

    const status =
      stock === 0 ? PRODUCT_STATUS.OUT_OF_STOCK : PRODUCT_STATUS.AVAILABLE;

    return productRepository.create({
      name,
      price,
      stock,
      status,
    });
  }

  async update(id, data) {
    // Validación opcional de negocio por si envían un precio negativo en el update
    if (data.price !== undefined && data.price < 0) {
      throw new AppError(ERROR_CODES.NEGATIVE_PRICE);
    }

    const updated = await productRepository.updateById(id, data);
    if (!updated) {
      throw new AppError(ERROR_CODES.PRODUCT_NOT_FOUND);
    }
    return updated;
  }

  async delete(id) {
    const deleted = await productRepository.deleteById(id);
    if (!deleted) {
      throw new AppError(ERROR_CODES.PRODUCT_NOT_FOUND);
    }
    return deleted;
  }
}

module.exports = new ProductService();
