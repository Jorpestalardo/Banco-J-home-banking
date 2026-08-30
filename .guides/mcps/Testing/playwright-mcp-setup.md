# Guía de Configuración: Playwright MCP (Testing UI)

## 📌 Descripción
El servidor MCP de Playwright le da "ojos y manos" a tu IA. Le permite navegar por sitios web reales, hacer clic en botones, llenar formularios y tomar capturas de pantalla. Es la herramienta principal para la **Fase 6: Testing Exploratorio**.

**Paquete:** `@playwright/mcp` — el oficial, mantenido por el equipo de Playwright en Microsoft.

## 🛠️ Instalación

**No hace falta instalar nada.** `npx` baja el paquete la primera vez que la IA lo necesita y lo deja cacheado. Si querés comprobar que tenés acceso antes de configurarlo, abrí tu terminal (Warp) y ejecutá:

```bash
npx @playwright/mcp@latest --help
```

Si imprime las opciones, está todo listo. Si te pregunta si querés instalar el paquete, respondé que sí.

> 🔄 **Si te falta el navegador.** La primera vez que la IA intente navegar puede avisar que Chromium no está descargado. El servidor trae una herramienta para instalarlo solo, así que alcanza con decirle que lo haga. Si preferís adelantarlo:
> ```bash
> npx playwright install chromium
> ```

## ⚙️ Configuración

Agregá esto a tu archivo JSON de configuración MCP.

```json
"playwright": {
  "command": "npx",
  "args": [
    "@playwright/mcp@latest"
  ]
}
```

## 🚀 Uso en el Curso

Este MCP expone herramientas como:

| Herramienta | Qué hace |
| :--- | :--- |
| `browser_navigate` | Ir a una dirección. |
| `browser_snapshot` | **Leer la página.** Devuelve la estructura de la pantalla como texto, no como imagen. |
| `browser_click` | Hacer clic en un elemento. |
| `browser_type` | Escribir texto en un campo. |
| `browser_take_screenshot` | Sacar una captura, para dejarla como evidencia. |

Trae bastantes más: llenar formularios completos, esperar a que algo aparezca, manejar ventanas emergentes, cambiar de pestaña y mirar las llamadas de red.

> 💡 **El detalle que más confunde al principio: la IA no "mira" la pantalla.** Lee la
> estructura de la página con `browser_snapshot` —los mismos datos que usa un lector de
> pantalla— y por eso puede decirte que un botón existe aunque esté tapado o fuera de la vista.
> Las capturas son para **vos**, como evidencia. Ella trabaja con el texto.

**Ejemplo de Prompt:**
> "Navega a `https://the-internet.herokuapp.com/login`, ingresa el usuario 'tomsmith' y la contraseña 'SuperSecretPassword!', haz clic en Login y dime si aparece el mensaje de éxito."

## 🔒 Seguridad y Sandbox

*   Por defecto, la IA ejecuta esto en tu máquina local.
*   La ventana del navegador puede no ser visible (modo *headless*).
*   **Advertencia:** No le pidas a la IA que navegue a sitios maliciosos o que realice acciones destructivas en cuentas de producción reales.

## 🧪 Verificación

Pídele a la IA:
> "Navega a google.com y dime cuál es el título de la página."
