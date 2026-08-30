# Guía de Configuración: PostgreSQL MCP Server

## 📌 Descripción
El servidor MCP de PostgreSQL es la herramienta oficial para conectar tu Asistente de IA (Claude, Gemini, etc.) a bases de datos relacionales modernas.

**Compatible con:**
*   PostgreSQL Local
*   **Supabase** (La BD oficial del curso)
*   AWS RDS / Aurora
*   Neon / Render / Heroku Postgres

**Paquete:** `@modelcontextprotocol/server-postgres`

> 🔄 **Dato volátil: este paquete ya no se mantiene.** Sigue publicado y sigue funcionando —y **es de solo lectura, que es exactamente lo que necesitamos para QA**—, pero quedó archivado junto con el resto de los servidores de referencia. Si algún día deja de andar, hay reemplazos comunitarios activos; el que uses tiene que **seguir siendo de solo lectura**, o perdés la garantía de que la IA no pueda tocar los datos.

## 🛠️ Instalación

Necesitas tener **Node.js** instalado. No hace falta instalarlo aparte: `npx` lo baja solo la primera vez. Si querés comprobarlo antes, abre tu terminal (Warp) y ejecuta:

```bash
npx -y @modelcontextprotocol/server-postgres --help
```

## ⚙️ Configuración

Dependiendo de tu cliente de IA (Claude Desktop, Context7, Gemini CLI), deberás agregar esta configuración en tu archivo JSON correspondiente.

### Estructura del Comando
```json
"postgres": {
  "command": "npx",
  "args": [
    "-y",
    "@modelcontextprotocol/server-postgres",
    "TU_STRING_DE_CONEXION"
  ]
}
```

### Ejemplos de Strings de Conexión

**1. Supabase (Nube):**
`postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres`
*(Encuéntralo en Supabase -> Project Settings -> Database -> Connection String -> URI)*

**2. Local (Docker/PC):**
`postgresql://usuario:password@localhost:5432/mi_base_de_datos`

## 🔒 Seguridad (Crucial para QA)

Como QA, tu prioridad es no romper nada.
1.  **Nunca** uses el usuario `postgres` (root) para pruebas exploratorias si puedes evitarlo.
2.  **Crea un usuario de Solo Lectura** en tu base de datos para dárselo a la IA:

```sql
-- Ejecuta esto en tu BD
CREATE USER qa_bot WITH PASSWORD 'seguro123';
GRANT CONNECT ON DATABASE mi_db TO qa_bot;
GRANT USAGE ON SCHEMA public TO qa_bot;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO qa_bot;
```

## 🧪 Verificación

Para probar que funciona, pide a tu IA:
> "Usa la herramienta de base de datos para listar las tablas del esquema public."

Si responde con la lista de tablas, ¡estás conectado!
