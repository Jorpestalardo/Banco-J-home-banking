# Guía de Configuración: Atlassian MCP (Jira/Confluence)

## 📌 Descripción
Este servidor MCP conecta tu Asistente de IA directamente con tu instancia de Jira y Confluence. Permite a la IA:
*   Leer User Stories y Criterios de Aceptación.
*   Crear Tickets de Bugs.
*   Buscar documentación en Confluence.

**Servidor oficial:** el **Atlassian Remote MCP Server**. No es un paquete que instales: es un servicio al que tu asistente se conecta por internet.

**Dirección:** `https://mcp.atlassian.com/v1/mcp/authv2`

## 🛠️ Requisitos Previos

1.  **Cuenta de Atlassian** con acceso a un sitio de Jira o Confluence **en la nube**.
2.  **Nada más.** No hace falta crear un token.

> 🔒 **Y eso es lo importante.** El servidor autentica con **OAuth**: se abre el navegador, iniciás sesión como siempre, das permiso, y listo. **No pegás ninguna credencial en ningún archivo.**
>
> Además la IA queda con **tus mismos permisos**: si vos no podés ver un proyecto, ella tampoco. No hay forma de que se le escape algo que a vos no te corresponde.

## ⚙️ Configuración

### Opción A: Conexión directa (recomendada)

Si tu asistente soporta servidores MCP remotos, alcanza con darle la dirección.

**Claude Code**, desde la terminal:

```bash
claude mcp add --transport http atlassian https://mcp.atlassian.com/v1/mcp/authv2
```

**Aplicaciones de escritorio y otros clientes**, en el archivo JSON de configuración:

```json
"atlassian": {
  "url": "https://mcp.atlassian.com/v1/mcp/authv2"
}
```

La primera vez que la IA use una herramienta de Jira se va a abrir el navegador pidiéndote que autorices. Aceptá y ya está.

### Opción B: Con puente, si tu asistente solo habla con procesos locales

Algunos clientes todavía no saben conectarse a un servidor remoto y esperan un comando. Para esos hay un puente:

```json
"atlassian": {
  "command": "npx",
  "args": [
    "-y",
    "mcp-remote",
    "https://mcp.atlassian.com/v1/mcp/authv2"
  ]
}
```

Hace exactamente lo mismo —incluida la autenticación por navegador—, solo que corriendo un proceso local que reenvía las llamadas.

> 🔄 **Si usás Jira Server o Data Center** (instalado en tu empresa, no en la nube de Atlassian), el servidor oficial no te sirve: es solo para Cloud. Ahí hace falta un servidor comunitario y sí vas a necesitar un token. Para el curso trabajamos con **Jira Cloud en su plan gratuito**, que es el caso de la Opción A.

## 🧪 Verificación

Pídele a tu IA:
> "Busca en Jira el ticket con clave PROJ-1 y dime su estado."

Si responde con el título y estado del ticket, ¡la conexión es exitosa!

## ⚠️ Solución de Problemas

**Se abre el navegador pero no vuelve, o el asistente sigue diciendo que no está conectado:**
*   Cerrá y volvé a abrir el asistente. La autorización se guarda recién cuando la sesión se reinicia.
*   Fijate que hayas iniciado sesión con **la cuenta que tiene acceso al proyecto**, y no con otra que también tengas abierta en ese navegador.

**Error 401 o 403:**
*   La autorización venció o se revocó. Volvé a conectar el servidor y autorizá de nuevo.
*   Si el error aparece solo con **algunos** proyectos, no es un problema de configuración: es que tu usuario no tiene permiso sobre ellos. El MCP no te da más acceso del que ya tenés.

**La IA no encuentra un ticket que vos sí ves:**
*   Verificá que estés apuntando al sitio correcto. Si tu cuenta tiene más de un sitio de Atlassian, pedile a la IA que te liste los sitios accesibles antes de buscar.
