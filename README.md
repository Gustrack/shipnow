## Documentación de la API (Swagger)

La API cuenta con documentación interactiva generada con **Swagger UI** y **OpenAPI 3.0**.

### ¿Cómo acceder?

1. Levantá el servidor con `npm start`.
2. Abrí tu navegador y andá a: **`http://localhost:3000/api/docs`**

### Módulos documentados

- **Users**: Listado, búsqueda y creación de usuarios.
- **Products**: Listado, búsqueda y creación de productos.
- **Orders**: Listado y búsqueda de pedidos.
- **Deliveries**: Listado y búsqueda de entregas.
- **Mocks**: Generación de datos falsos en memoria y carga de datos de prueba en DB.
- **Logger**: Endpoint de prueba interna para validar los niveles de Winston.

### Schemas reutilizables

La documentación incluye schemas de `User`, `Product`, `Order`, `OrderItem`, `Delivery`, `SuccessResponse` y `ErrorResponse`. Todos los errores documentados reflejan la estructura uniforme implementada en el Módulo 3: `{"status": "error", "message": "..."}`.
