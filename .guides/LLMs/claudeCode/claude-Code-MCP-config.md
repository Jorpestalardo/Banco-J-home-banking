# Configuración de MCPs para Claude Code

## ¿Qué es MCP?
El **Model Context Protocol (MCP)** es un estándar abierto que permite a los asistentes de IA (como Claude) conectarse de forma segura a tus datos y herramientas locales (bases de datos, repositorios, servidores de archivos, etc.).

## Requisitos
- **Claude Code CLI** instalado y autenticado.
- **Node.js** v18+ instalado.

## Guías de Configuración Específicas

Para este curso, hemos preparado guías detalladas para configurar las herramientas clave. Sigue los pasos en estos documentos y luego regresa aquí para integrarlos en tu `claude_config.json`.

*   **Bases de Datos:** [PostgreSQL / Supabase](../../mcps/Databases/postgres-mcp-setup.md)
*   **Testing UI:** [Playwright (Navegador)](../../mcps/Testing/playwright-mcp-setup.md)
*   **Gestión:** [Jira / Confluence](../../mcps/Atlassian/atlassian-mcp-setup.md)
*   **APIs:** [Postman / OpenAPI](../../mcps/Testing/openapi-postman-setup.md)

## Ejemplo de `claude_config.json` Completo

Una vez instalados los servidores, tu archivo de configuración debería verse así:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:\\Ruta\\Al\\Proyecto"]
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://..."]
    },
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

## Verificación

Para verificar que Claude está detectando los MCPs:

1. Inicia Claude Code:
   ```bash
   claude
   ```

2. En el prompt, escribe:
   ```text
   /mcp list
   ```
   Deberías ver una lista de los servidores conectados (ej: `filesystem`, `postgres`) y las herramientas disponibles.

## Uso en el Curso

### Conectar a Supabase (PostgreSQL)
Para probar la base de datos con MCP:
1. Obtén tu string de conexión de Supabase (Settings -> Database -> Connection String).
2. Agrégalo al `claude_config.json` bajo la clave `postgres`.
3. Pídele a Claude: *"Muestrame las tablas de la base de datos"*.

### Conectar a GitHub
Si necesitas que Claude interactúe con issues o PRs:
1. Instala el servidor MCP de GitHub (si está disponible/configurado).
2. Asegúrate de tener el token `GITHUB_TOKEN` en tus variables de entorno.

## Solución de Problemas

**Error: "Connection refused" o "Server not found"**
- Verifica que el comando `npx` funciona en tu terminal.
- Asegúrate de que las rutas en `args` sean absolutas y existan.
- En Windows, usa doble barra invertida `\\` para las rutas en el JSON.

**Los cambios en `claude_config.json` no se aplican**
- Reinicia la sesión de Claude Code (sal con `exit` y vuelve a entrar).
