# Configuración de MCPs para OpenAI

## Descripción
OpenAI no tiene un cliente MCP nativo en su CLI oficial. Para utilizar el **Model Context Protocol (MCP)** con los modelos de OpenAI (GPT-4), utilizaremos un **Cliente MCP** compatible o una herramienta integradora como **Context7**.

## Estrategia de Integración

En este curso, utilizaremos el patrón de **"Cliente Universal"** para conectar herramientas (DB, UI, Filesystem) a OpenAI.

### Opción A: Usando Context7 (Recomendado)

**Context7** es una herramienta diseñada para el curso que actúa como puente entre los LLMs y los servidores MCP.

1. **Instalar Context7:**
   ```bash
   npm install -g context7
   ```

2. **Configurar Proveedor:**
   Crea o edita `~/.context7rc`:
   ```json
   {
     "provider": "openai",
     "apiKey": "env:OPENAI_API_KEY",
     "model": "gpt-4-turbo"
   }
   ```

3. **Configurar Servidores MCP:**
   En el mismo archivo, define tus herramientas:
   ```json
   {
     "mcpServers": {
       "filesystem": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-filesystem", "./"]
       },
       "postgres": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://..."]
       }
     }
   }
   ```

4. **Uso:**
   ```bash
   c7 "Lee el archivo schema.sql y genera un plan de pruebas"
   ```

### Opción B: Usando Herramientas de Desarrollo (Cursor/VS Code)

Si prefieres usar un IDE:

1. Instala la extensión de **"MCP for VS Code"** (o similar).
2. En la configuración de la extensión, añade tus servidores MCP.
3. Configura la API Key de OpenAI en la extensión.
4. Ahora puedes chatear con GPT-4 en el sidebar y él tendrá acceso a tus herramientas.

## Servidores MCP Esenciales para el Curso

Consulta las guías específicas para obtener los comandos de instalación y configuración detallados:

*   **[Sistema de Archivos](../../mcps/Databases/sqlite-mcp-setup.md)** (o SQLite para local)
*   **[PostgreSQL / Supabase](../../mcps/Databases/postgres-mcp-setup.md)**
*   **[Playwright (UI)](../../mcps/Testing/playwright-mcp-setup.md)**
*   **[Postman / OpenAPI](../../mcps/Testing/openapi-postman-setup.md)**

Copia los bloques JSON de esas guías y pégalos en tu archivo `~/.context7rc` o en la configuración de tu IDE.

## Verificación

Para asegurar que OpenAI puede "tocar" tus herramientas:

1. Ejecuta tu cliente (Context7 o IDE).
2. Prompt: *"Lista los archivos en el directorio actual"*.
3. Si responde con la lista real de archivos (no una alucinación), ¡el MCP está conectado!

## Troubleshooting

**Error: "Function call failed"**
- A veces GPT-3.5 falla al llamar herramientas complejas. Asegúrate de usar **GPT-4** o **GPT-4-Turbo** para tareas de MCP, ya que tienen mejor razonamiento para el uso de herramientas.

**Latencia Alta**
- El uso de MCP implica múltiples llamadas a la API (pensar -> llamar herramienta -> procesar resultado -> responder). Es normal que tarde un poco más que un chat simple.
