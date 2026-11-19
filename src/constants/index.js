const USER_ROLES = Object.freeze({
  ADMIN: "ADMIN",
  USER: "USER",
  COURIER: "COURIER",
});

const PRODUCT_STATUS = Object.freeze({
  AVAILABLE: "AVAILABLE",
  OUT_OF_STOCK: "OUT_OF_STOCK",
  DISCONTINUED: "DISCONTINUED",
});

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

// NUEVO: Constante para el estado de las entregas
const DELIVERY_STATUS = Object.freeze({
  PENDING: "PENDING",
  IN_TRANSIT: "IN_TRANSIT",
  DELIVERED: "DELIVERED",
});

module.exports = {
  USER_ROLES,
  PRODUCT_STATUS,
  ORDER_STATUS,
  DELIVERY_PRIORITY,
  DELIVERY_STATUS,
};
