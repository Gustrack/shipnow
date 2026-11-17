## Módulo 4: Logging y Monitoreo Básico

Se implementó **Winston** como logger centralizado para reemplazar los `console.log()` sueltos. Esto permite clasificar los eventos por importancia y guardar los errores en archivos para su posterior análisis.

### Niveles de Log

Se utilizan los siguientes niveles (de menor a mayor importancia):
`debug`, `http`, `info`, `warning`, `error`, `fatal`.

### Endpoint de Prueba

Para verificar que todos los niveles funcionan, podés hacer una petición GET a:
`GET /api/logger/test`

Esto generará mensajes en la consola y en los archivos de log.

### Persistencia y Rotación

Los logs se guardan en la carpeta `logs/` en la raíz del proyecto. Se utiliza rotación diaria (`winston-daily-rotate-file`).

- `logs/error-YYYY-MM-DD.log`: Guarda únicamente los niveles `warning`, `error` y `fatal`.
- `logs/combined-YYYY-MM-DD.log`: Guarda todos los niveles.

> ⚠️ **Nota:** La carpeta `logs/` y los archivos `.log` están incluidos en el `.gitignore` y **no** se suben al repositorio.

### Comportamiento por Entorno

- **Desarrollo (`NODE_ENV=development`)**: Se muestran todos los logs (incluyendo `debug` y `http`).
- **Producción (`NODE_ENV=production`)**: Solo se muestran y guardan logs desde nivel `info` en adelante.

## Módulo 6: Testing Funcional

Se implementó una suite de tests funcionales automatizados para garantizar la estabilidad de la API.

### Herramientas

- **Mocha**: Organización y ejecución de tests.
- **Chai**: Aserciones y validación de respuestas.
- **Supertest**: Simulación de peticiones HTTP sin levantar un servidor real.

### ¿Cómo ejecutar los tests?

1. Asegurarse de tener MongoDB corriendo (la suite usará una base de datos separada llamada `shipnow_test`).
2. En la terminal, ejecutá:
   ```bash
   npm test
   ```

### Entorno de Testing

Los tests se ejecutan con NODE_ENV=test. Las variables de entorno específicas están en el archivo .env.test (el cual apunta a una base de datos separada llamada shipnow_test, manteniendo intactos tus datos de desarrollo).

### Módulos cubiertos por los tests

Users: Listado correcto, manejo de roles inválidos, creación exitosa y errores de validación.  
Mocks: Generación exitosa, validación de cantidad negativa y no numérica, carga exitosa en DB.  
Logger: Endpoint de generación de logs.  
Swagger: Disponibilidad de la interfaz de documentación.  
Global Errors: Rutas inexistentes y recursos no encontrados (404).

### Estrategia de limpieza

Antes de ejecutar los tests, la suite se conecta a la DB de testing y limpia las colecciones (ej. User.deleteMany({})) para asegurar que los datos son controlados, repetibles y no dependen del estado previo.
