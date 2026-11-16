const productRepository = require('../repositories/product.repository');
const { PRODUCT_STATUS } = require('../constants');

class ProductService {
    async getAll({ includeOutOfStock = false } = {}) {
        const products = await productRepository.findAll({ includeOutOfStock });

        return products.map((p) => ({
            ...p,
            status: p.stock === 0 ? PRODUCT_STATUS.OUT_OF_STOCK : p.status
        }));
    }

    async getById(id) {
        const product = await productRepository.findById(id);
        if (!product) {
            const error = new Error('Producto no encontrado');
            error.statusCode = 404;
            throw error;
        }
        return product;
    }

    async create({ name, price, stock }) {
        if (price < 0) {
            const error = new Error('El precio no puede ser negativo');
            error.statusCode = 400;
            throw error;
        }
        const status = stock === 0 ? PRODUCT_STATUS.OUT_OF_STOCK : PRODUCT_STATUS.AVAILABLE;
        return productRepository.create({ name, price, stock, status });
    }

    async update(id, data) {
        const updated = await productRepository.updateById(id, data);
        if (!updated) {
            const error = new Error('Producto no encontrado');
            error.statusCode = 404;
            throw error;
        }
        return updated;
    }

    async delete(id) {
        const deleted = await productRepository.deleteById(id);
        if (!deleted) {
            const error = new Error('Producto no encontrado');
            error.statusCode = 404;
            throw error;
        }
        return deleted;
    }
}

module.exports = new ProductService();
