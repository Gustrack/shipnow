const USER_ROLES = Object.freeze({
  ADMIN: "ADMIN",
  USER: "USER",
  COURIER: "COURIER", // Repartidor
});

const PRODUCT_STATUS = Object.freeze({
  AVAILABLE: "AVAILABLE",
  OUT_OF_STOCK: "OUT_OF_STOCK",
  DISCONTINUED: "DISCONTINUED",
});

// Nuevas constantes para el Módulo 2
const ORDER_STATUS = Object.freeze({
  CREATED: "CREATED",
  IN_PROGRESS: "IN_PROGRESS",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
});

const DELIVERY_PRIORITY = Object.freeze({
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
});

module.exports = {
  USER_ROLES,
  PRODUCT_STATUS,
  ORDER_STATUS,
  DELIVERY_PRIORITY,
};
