const Product = require('../models/product.model');

class ProductRepository {
    async findAll({ includeOutOfStock = false } = {}) {
        const filter = includeOutOfStock ? {} : { stock: { $gt: 0 } };
        return Product.find(filter).select('-__v').lean();
    }

    async findById(id) {
        return Product.findById(id).select('-__v').lean();
    }

    async create(data) {
        const product = await Product.create(data);
        return product.toObject({ versionKey: false });
    }

    async updateById(id, data) {
        return Product.findByIdAndUpdate(id, data, { new: true, runValidators: true })
            .select('-__v')
            .lean();
    }

    async deleteById(id) {
        return Product.findByIdAndDelete(id).lean();
    }
}

module.exports = new ProductRepository();
