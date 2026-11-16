# ShipNow — Pre-entrega 1

API de logística refactorizada a arquitectura por capas (Controller → Service → Repository)
con configuración de entorno validada al arranque.

## Requisitos

- Node.js 18+
- MongoDB local o URI de Atlas

## Instalación

```bash
git clone <url-del-repo>
cd shipnow-preentrega-1
npm install
cp .env.example .env
# Editar .env con tus valores reales
npm start
```

## Variables de entorno

| Variable      | Descripción                                 | Ejemplo                             |
| ------------- | ------------------------------------------- | ----------------------------------- |
| `PORT`        | Puerto del servidor                         | `3000`                              |
| `MONGODB_URI` | URI de conexión a MongoDB                   | `mongodb://localhost:27017/shipnow` |
| `NODE_ENV`    | Entorno (`development`/`production`/`test`) | `development`                       |

Si falta alguna, la app **no arranca** y muestra un error descriptivo.

## Endpoints

### Productos

- `GET /api/products` — lista (solo con stock por defecto; `?includeOutOfStock=true` para todos)
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### Usuarios

- `GET /api/users` — lista (filtro opcional `?role=ADMIN`)
- `GET /api/users/:id`
- `POST /api/users`

## Decisiones de diseño

**¿Por qué separé Service y Repository?**
El Repository encapsula el acceso a MongoDB: filtros por defecto (ej. `stock > 0`),
proyecciones (`-__v`) y `lean()` para respuestas más livianas. El Service contiene
las reglas de negocio que no dependen de la base de datos: validación de precio no
negativo, email único, coherencia entre `stock` y `status`, y traducción de "no
encontrado" a un error con `statusCode`. Si mañana cambia la regla de negocio,
solo toco el Service; si cambia cómo se consulta Mongo, solo toco el Repository.
El Controller nunca sabe que existe Mongoose.

## Pruebas Endpoints

Prueba 1: creé producto con stock → status: "AVAILABLE".  
Prueba 2: creé producto con stock: 0 → status: "OUT_OF_STOCK".  
Prueba 3: listé sin query → solo productos con stock.  
Prueba 4: listé con ?includeOutOfStock=true → todos.  
Prueba 5: creé usuario → role: "USER".  
Prueba 6: GET de id inexistente → {"error":"Producto no encontrado"} (404).  
Prueba 7: POST con precio negativo → {"error":"El precio no puede ser negativo"} (400).

## Versión

`v0.1.0-pre1` — Pre-entrega 1
