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
