const { faker } = require("@faker-js/faker");
const mockRepository = require("../repositories/mock.repository");
const {
  USER_ROLES,
  ORDER_STATUS,
  DELIVERY_PRIORITY,
  PRODUCT_STATUS,
} = require("../constants");
const { ERROR_CODES } = require("../constants/errors.constants");
const AppError = require("../utils/AppError");
const logger = require("../config/logger");

class MockService {
  validateQuantity(qty) {
    if (isNaN(qty) || qty <= 0) {
      logger.warning(
        `Intento de generar mocks con cantidad inválida: '${qty}'`,
      );
      throw new AppError(ERROR_CODES.INVALID_QUANTITY);
    }
  }

  generateMockUsers(qty = 10) {
    this.validateQuantity(qty);
    logger.debug(`Generando ${qty} usuarios mock en memoria`);

    const users = [];
    for (let i = 0; i < qty; i++) {
      // 1 de cada 3 es repartidor
      const isCourier = i % 3 === 0;
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        role: isCourier ? USER_ROLES.COURIER : USER_ROLES.USER,
      });
    }
    return users;
  }

  generateMockProducts(qty = 10) {
    this.validateQuantity(qty);
    const products = [];
    for (let i = 0; i < qty; i++) {
      products.push({
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
        stock: faker.number.int({ min: 0, max: 50 }),
        status: PRODUCT_STATUS.AVAILABLE,
      });
    }
    return products;
  }

  generateMockOrdersAndDeliveries(users, products, qty) {
    const orders = [];
    const deliveries = [];

    for (let i = 0; i < qty; i++) {
      const randomUser =
        users.find((u) => u.role === USER_ROLES.USER) || users[0];
      const randomProduct = faker.helpers.arrayElement(products);
      const quantity = faker.number.int({ min: 1, max: 3 });

      // Simulamos el ID para poder relacionarlo con la entrega antes de guardar en Mongo
      const orderId = faker.database.mongodbObjectId();

      orders.push({
        _id: orderId,
        user: randomUser._id,
        items: [{ product: randomProduct._id, quantity }],
        total: randomProduct.price * quantity,
        status: faker.helpers.arrayElement(Object.values(ORDER_STATUS)),
      });

      const randomCourier = users.find((u) => u.role === USER_ROLES.COURIER);
      if (randomCourier) {
        deliveries.push({
          order: orderId,
          courier: randomCourier._id,
          priority: faker.helpers.arrayElement(
            Object.values(DELIVERY_PRIORITY),
          ),
          status: "PENDING",
        });
      }
    }

    return { orders, deliveries };
  }

  async seedDatabase(qty = 10) {
    this.validateQuantity(qty);
    try {
      logger.info(`Iniciando carga de datos de prueba en DB (qty=${qty})`);

      // 1. Generar y guardar usuarios
      const mockUsers = this.generateMockUsers(qty);
      const savedUsers = await mockRepository.insertUsers(mockUsers);

      // 2. Generar y guardar productos
      const mockProducts = this.generateMockProducts(qty);
      const savedProducts = await mockRepository.insertProducts(mockProducts);

      // 3. Generar pedidos y entregas (usando los IDs reales recién guardados)
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
