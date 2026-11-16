const { faker } = require("@faker-js/faker");
const mockRepository = require("../repositories/mock.repository");
const {
  USER_ROLES,
  ORDER_STATUS,
  DELIVERY_PRIORITY,
  PRODUCT_STATUS,
} = require("../constants");

class MockService {
  // Genera datos en memoria, SIN guardarlos en Mongo
  generateMockUsers(qty = 10) {
    const users = [];
    for (let i = 0; i < qty; i++) {
      const isCourier = i % 3 === 0; // 1 de cada 3 es repartidor
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        role: isCourier ? USER_ROLES.COURIER : USER_ROLES.USER,
      });
    }
    return users;
  }

  generateMockProducts(qty = 10) {
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

  // Genera un "paquete" completo de datos relacionados
  generateMockOrdersAndDeliveries(users, products, qty) {
    const orders = [];
    const deliveries = [];

    for (let i = 0; i < qty; i++) {
      // 1. Tomar un usuario aleatorio (que no sea repartidor)
      const randomUser =
        users.find((u) => u.role === USER_ROLES.USER) || users[0];

      // 2. Tomar un producto aleatorio
      const randomProduct = faker.helpers.arrayElement(products);
      const quantity = faker.number.int({ min: 1, max: 3 });

      // 3. Crear el pedido
      const orderId = faker.database.mongodbObjectId(); // Simulamos el ID para el borrador
      orders.push({
        _id: orderId,
        user: randomUser._id, // Usamos el ID del usuario que ya se insertó
        items: [{ product: randomProduct._id, quantity }],
        total: randomProduct.price * quantity,
        status: faker.helpers.arrayElement(Object.values(ORDER_STATUS)),
      });

      // 4. Crear la entrega asociada al pedido
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

  // Método para el POST /api/mocks/seed
  async seedDatabase(qty = 10) {
    // 1. Generar y guardar usuarios
    const mockUsers = this.generateMockUsers(qty);
    const savedUsers = await mockRepository.insertUsers(mockUsers);

    // 2. Generar y guardar productos
    const mockProducts = this.generateMockProducts(qty);
    const savedProducts = await mockRepository.insertProducts(mockProducts);

    // 3. Generar pedidos y entregas vinculados a los IDs reales recién guardados
    const { orders, deliveries } = this.generateMockOrdersAndDeliveries(
      savedUsers,
      savedProducts,
      qty,
    );
    await mockRepository.insertOrders(orders);
    await mockRepository.insertDeliveries(deliveries);

    return {
      users: savedUsers.length,
      products: savedProducts.length,
      orders: orders.length,
      deliveries: deliveries.length,
    };
  }
}

module.exports = new MockService();
