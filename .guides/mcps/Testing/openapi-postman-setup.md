# Guía de Configuración: OpenAPI/Postman MCP

## 📌 Descripción
Para probar APIs, las IAs necesitan entender "cómo hablar" con ellas. Hay dos caminos, y el que te convenga depende de dónde vive hoy la definición de tu API.

| | Cuándo usarlo | Necesita credencial |
| :--- | :--- | :--- |
| **A · MCP oficial de Postman** | Tus colecciones ya están en Postman y querés que la IA las lea de ahí | Sí, una API key de Postman |
| **B · Servidor de OpenAPI** | Tenés (o podés exportar) un archivo de especificación | No |

Si estás empezando, **la B es más simple** y no expone ninguna credencial.

---

## Opción A · MCP oficial de Postman

**Paquete:** `@postman/postman-mcp-server`

Le da a la IA acceso a tus colecciones, especificaciones y entornos de Postman.

### Preparación
1.  En Postman, andá a tu perfil → **Settings** → **API keys**.
2.  Generá una key y copiala.

### Configuración
```json
"postman": {
  "command": "npx",
  "args": [
    "-y",
    "@postman/postman-mcp-server"
  ],
  "env": {
    "POSTMAN_API_KEY": "PMAK-..."
  }
}
```

> 🔒 **Esa key vive en la configuración de tu asistente, en tu carpeta personal — nunca en el repositorio.** No la pegues en un archivo del proyecto ni en el chat.

---

## Opción B · Servidor de OpenAPI, desde un archivo

**Paquete:** `@ivotoby/openapi-mcp-server`

### Preparación (Desde Postman)

Antes de configurar el MCP, necesitas el "mapa" de tu API.

1.  Abre **Postman**.
2.  Ve a tu Colección de API.
3.  Haz clic en los tres puntos `...` -> **Export**.
4.  Selecciona el formato **OpenAPI 3.0 (JSON)** o **YAML**.
5.  Guarda el archivo como `mi-api.json` en la carpeta de tu proyecto.

### Configuración del MCP

Configura el servidor para que "lea" ese archivo y aprenda los endpoints.

```json
"mi-api": {
  "command": "npx",
  "args": [
    "-y",
    "@ivotoby/openapi-mcp-server",
    "--api-base-url", "https://api.tu-proyecto.com",
    "--openapi-spec", "C:\\Ruta\\a\\tu\\proyecto\\mi-api.json"
  ]
}
```

*Nota: Puedes tener múltiples entradas para diferentes APIs (ej: "api-pagos", "api-usuarios"). En Windows, doble barra invertida `\\` en las rutas.*

> 🔄 **Si la API pide autenticación**, este servidor acepta una cabecera con `--headers`. La cabecera va en la configuración de tu asistente, no en el repositorio, y **el valor sale de una variable de entorno**, nunca escrito en claro.

---

## 🚀 Uso en el Curso (Fase 6)

Una vez conectado, la IA no "adivinará" los endpoints; los **sabrá**.

**Prompt:**
> "Consulta el endpoint `GET /users/{id}` de la API que configuraste para el usuario 123 y valida si la respuesta cumple con el esquema."

**Ventajas sobre usar `curl` suelto:**
*   La IA conoce los tipos de datos esperados.
*   Sabe qué parámetros son obligatorios.
*   Entiende las descripciones de los errores documentados.

> ⚠️ **Alerta de QA.** Que la especificación diga que un endpoint devuelve `200` con cierto esquema **no significa que lo haga**. La diferencia entre lo especificado y lo implementado es exactamente lo que salís a buscar en la Fase 6: no es ruido, es el hallazgo.

## 🧪 Verificación

Pídele a la IA:
> "Lista las operaciones disponibles en la API que acabo de configurar."

Debería responderte con un resumen de los endpoints (GET, POST, PUT) que definiste en tu archivo OpenAPI/Postman.
