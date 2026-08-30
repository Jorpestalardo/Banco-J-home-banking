# Configuración de MCPs para Antigravity CLI (`agy`)

## Descripción

Antigravity CLI por sí sola lee y escribe archivos de tu proyecto. Para que además
pueda **usar herramientas externas** —Jira, el navegador, una base de datos— se conecta
por **MCP** (*Model Context Protocol*), que es el estándar que usan todos los
proveedores.

> 🔗 Si todavía no instalaste la herramienta, empezá por
> [`instalacion-antigravity-cli.md`](instalacion-antigravity-cli.md).

---

## ⚠️ Si venías de Gemini CLI

La configuración de MCPs de la herramienta vieja **no sirve tal cual**. El formato del
archivo es el estándar MCP y se mantiene, pero **cambia dónde va ubicado y cómo se
gestiona**, porque es otro programa.

La diferencia más práctica: **ya no hace falta editar un archivo a mano.** Antigravity CLI
trae un panel propio.

---

## Requisitos

- **Antigravity CLI** instalada y funcionando (`agy --version` responde).
- **Node.js**, pero solo si vas a usar servidores MCP que se ejecutan con `npx`. La
  mayoría de los del curso son así.
- Las **credenciales** de cada servicio que quieras conectar (token de Jira, de
  Supabase, etc.).

---

## La vía fácil: el panel `/mcp`

Dentro de una sesión de `agy`, escribí:

```
/mcp
```

Se abre un panel para **agregar, ver y gestionar servidores MCP** sin tocar ningún
archivo. Es la forma recomendada, sobre todo si es tu primera vez.

Lo que sigue explica el archivo por debajo, que conviene entender aunque uses el panel.

---

## El archivo de configuración

Los MCPs se declaran en un archivo JSON con esta forma, que es común a todas las
herramientas:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./"]
    }
  }
}
```

Cada entrada tiene:

- **Un nombre** (`playwright`, `filesystem`) — el que vos elijas, para identificarlo.
- **`command` y `args`** — cómo se arranca ese servidor.
- **`env`** (opcional) — las variables de entorno que necesite, típicamente las claves.

En este repositorio tenés un punto de partida armado en
[`antigravity.template.json`](antigravity.template.json), con los servidores que usamos
en el curso.

### Dónde vive la configuración

```
~/.gemini/antigravity-cli/settings.json
```

En Windows, `~` es tu carpeta de usuario: `C:\Users\TU-USUARIO\.gemini\antigravity-cli\`.

> 💡 **Sí, dice `.gemini`.** Es una herencia del nombre anterior de la herramienta. La
> carpeta se llama así, pero el programa es Antigravity CLI. **Ojo con esto si venías de
> Gemini CLI:** la carpeta base es la misma, pero la subcarpeta y el archivo cambiaron, así
> que tu configuración vieja no se toma sola.

---

## ⚠️ Nunca escribas tus claves en el archivo

En el template las claves aparecen como marcadores:

```json
"env": {
  "SUPABASE_ACCESS_TOKEN": "{{SUPABASE_ACCESS_TOKEN}}"
}
```

**Esos `{{...}}` hay que reemplazarlos por variables de entorno, no por la clave real.**

Una clave escrita dentro del archivo de configuración:

- se sube al repositorio si hacés `commit` sin darte cuenta,
- queda en el historial de Git **para siempre**, aunque después la borres,
- y si el repo es compartido, la ve todo el equipo.

**Configurá la variable de entorno en tu máquina:**

```powershell
$env:SUPABASE_ACCESS_TOKEN = "tu-token-aca"
```

Para que quede permanente, agregala desde *Configuración de Windows → Variables de
entorno*, en lugar de escribirla en cada sesión.

> ⚠️ **Si alguna vez subiste una clave por error, no alcanza con borrarla del archivo.**
> Hay que **revocarla** en el servicio que la emitió y generar una nueva. Mientras no la
> revoques, sigue siendo válida.

---

## Servidores MCP del curso

Los comandos de instalación y las variables de entorno de cada uno están en las guías
centralizadas:

- **[PostgreSQL / Supabase](../../mcps/Databases/postgres-mcp-setup.md)**
- **[Playwright (testing de UI)](../../mcps/Testing/playwright-mcp-setup.md)**
- **[Atlassian (Jira)](../../mcps/Atlassian/atlassian-mcp-setup.md)**

Tomá de ahí el bloque `command` / `args` y agregalo a tu archivo de configuración con la
forma de arriba.

---

## Verificación

Pedile algo que **solo pueda resolver con una herramienta externa**:

```
Usá la herramienta de filesystem y listá los archivos de esta carpeta
```

Si responde con la lista, el MCP está conectado. Si dice que no puede, no está tomando
la configuración.

---

## Solución de Problemas

### ❌ "Tool not found" / no encuentra la herramienta

- Verificá que el nombre en el JSON sea el mismo que estás nombrando en el pedido.
- Confirmá que el paquete del servidor se puede ejecutar: probá el `npx ...` suelto en
  la terminal y mirá si arranca.

### ❌ "Connection failed"

- Revisá que `command` y `args` sean ejecutables desde tu terminal, tal cual están.
- **En Windows, cuidado con las rutas:** dentro de un JSON, las barras invertidas se
  escriben dobles (`C:\\Users\\...`) o se usan barras normales (`C:/Users/...`).

### ❌ El servidor arranca pero devuelve error de autenticación

Es la variable de entorno. Comprobá que esté cargada **en la misma terminal** desde la
que lanzás `agy`:

```powershell
echo $env:NOMBRE_DE_LA_VARIABLE
```

Si no devuelve nada, la variable no está en esa sesión.

### ❌ No toma el archivo de configuración

Es el problema más probable si venís de Gemini CLI: **la ruta cambió**. Confirmá que el
archivo esté en `~/.gemini/antigravity-cli/settings.json` y no donde lo tenías antes.

Si dudás, usá el panel `/mcp`: agrega el servidor en el lugar correcto sin que tengas que
buscarlo.

---

> 🔄 **Última revisión: agosto de 2026.** Antigravity CLI es reciente y su configuración
> todavía puede cambiar. Ante una diferencia, la documentación oficial manda.
