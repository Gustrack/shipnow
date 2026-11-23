const { faker } = require("@faker-js/faker");
const mockRepository = require("../repositories/mock.repository");
const {
  USER_ROLES,
  ORDER_STATUS,
  DELIVERY_PRIORITY,
  DELIVERY_STATUS,
  PRODUCT_STATUS,
} = require("../constants");
const { ERROR_CODES } = require("../constants/errors.constants");
const AppError = require("../utils/AppError");
const logger = require("../config/logger");

class MockService {
  // Validación estricta de qty (debe ser entero > 0)
  validateQuantity(qty) {
    if (isNaN(qty) || !Number.isInteger(qty) || qty <= 0) {
      logger.warning(
        `Intento de generar mocks con cantidad inválida: '${qty}'`,
      );
      throw new AppError(ERROR_CODES.INVALID_QUANTITY);
    }
  }

  generateMockUsers(qty = 10, role = null) {
    this.validateQuantity(qty);
    const users = [];
    for (let i = 0; i < qty; i++) {
      const isCourier =
        role === USER_ROLES.COURIER || (role === null && i % 3 === 0);
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        role: isCourier ? USER_ROLES.COURIER : USER_ROLES.USER,
      });
    }
    return users;
  }

  generateMockCouriers(qty = 10) {
    return this.generateMockUsers(qty, USER_ROLES.COURIER);
  }

  generateMockProducts(qty = 10) {
    this.validateQuantity(qty);
    const products = [];
    for (let i = 0; i < qty; i++) {
      const stock = faker.number.int({ min: 0, max: 50 });
      products.push({
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
        stock: stock,
        status:
          stock === 0 ? PRODUCT_STATUS.OUT_OF_STOCK : PRODUCT_STATUS.AVAILABLE,
      });
    }
    return products;
  }

  generateMockOrders(qty = 10) {
    this.validateQuantity(qty);
    const orders = [];
    for (let i = 0; i < qty; i++) {
      orders.push({
        _id: faker.database.mongodbObjectId(),
        user: faker.database.mongodbObjectId(),
        items: [
          {
            product: faker.database.mongodbObjectId(),
            quantity: faker.number.int({ min: 1, max: 3 }),
          },
        ],
        total: parseFloat(faker.commerce.price({ min: 50, max: 1000 })),
        status: faker.helpers.arrayElement(Object.values(ORDER_STATUS)),
      });
    }
    return orders;
  }

  generateMockDeliveries(qty = 10) {
    this.validateQuantity(qty);
    const deliveries = [];
    for (let i = 0; i < qty; i++) {
      deliveries.push({
        _id: faker.database.mongodbObjectId(),
        order: faker.database.mongodbObjectId(),
        courier: faker.database.mongodbObjectId(),
        priority: faker.helpers.arrayElement(Object.values(DELIVERY_PRIORITY)),
        status: DELIVERY_STATUS.PENDING,
      });
    }
    return deliveries;
  }

  generateMockOrdersAndDeliveries(users, products, qty) {
    this.validateQuantity(qty);
    const orders = [];
    const deliveries = [];

    for (let i = 0; i < qty; i++) {
      const randomUser = faker.helpers.arrayElement(
        users.filter((u) => u.role === USER_ROLES.USER),
      );
      const randomProduct = faker.helpers.arrayElement(products);
      const quantity = faker.number.int({ min: 1, max: 3 });
      const orderId = faker.database.mongodbObjectId();

      orders.push({
        _id: orderId,
        user: randomUser._id,
        items: [{ product: randomProduct._id, quantity }],
        total: randomProduct.price * quantity,
        status: faker.helpers.arrayElement(Object.values(ORDER_STATUS)),
      });

      const randomCourier = faker.helpers.arrayElement(
        users.filter((u) => u.role === USER_ROLES.COURIER),
      );
      if (randomCourier) {
        deliveries.push({
          order: orderId,
          courier: randomCourier._id,
          priority: faker.helpers.arrayElement(
            Object.values(DELIVERY_PRIORITY),
          ),
          status: DELIVERY_STATUS.PENDING,
        });
      }
    }
    return { orders, deliveries };
  }

  async seedDatabase(qty = 10) {
    this.validateQuantity(qty);
    try {
      logger.info(`Iniciando carga de datos de prueba en DB (qty=${qty})`);
      const mockUsers = this.generateMockUsers(qty);
      const savedUsers = await mockRepository.insertUsers(mockUsers);

      const mockProducts = this.generateMockProducts(qty);
      const savedProducts = await mockRepository.insertProducts(mockProducts);

      const { orders, deliveries } = this.generateMockOrdersAndDeliveries(
        savedUsers,
        savedProducts,
        qty,
      );

      await mockRepository.insertOrders(orders);
      await mockRepository.insertDeliveries(deliveries);

      logger.info(
        `Carga de mocks exitosa: ${savedUsers.length} usuarios, ${orders.length} pedidos.`,
      );

      return {
        users: savedUsers.length,
        products: savedProducts.length,
        orders: orders.length,
        deliveries: deliveries.length,
      };
    } catch (error) {
      if (!error.isOperational) {
        logger.error(
          `Fallo al insertar datos mock en MongoDB: ${error.message}`,
        );
        throw new AppError(ERROR_CODES.SEED_ERROR);
      }
      throw error;
    }
  }
}

module.exports = new MockService();
