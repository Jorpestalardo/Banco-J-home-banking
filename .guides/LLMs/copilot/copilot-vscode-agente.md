# GitHub Copilot en VS Code · Modo agente

## Descripción

Además de la terminal, Copilot funciona **dentro de Visual Studio Code**. Y no solo
completando texto: en **modo agente** puede leer varios archivos del proyecto,
modificarlos, ejecutar comandos y corregirse solo hasta terminar la tarea.

Vos revisás y aprobás cada cambio antes de que quede.

---

## ⚠️ Leé esto antes de elegir esta herramienta

**El curso se dicta sobre Claude Code, Codex y Antigravity CLI**, desde la terminal. Esta
guía es **la alternativa para entornos corporativos** donde no se puede instalar nada
más que la suite de Microsoft.

Si podés instalar las herramientas del curso, usá esas. Si tu empresa solo aprueba
Copilot, esto te deja trabajar igual.

> 💡 **Ventaja real de esta vía:** si tu empresa ya te dio VS Code y Copilot, **no tenés
> que instalar nada ni pedir ninguna aprobación.** Todo lo que sigue se activa con lo que
> ya tenés.

---

## Requisitos

- **Visual Studio Code** actualizado.
- **Una suscripción de Copilot con plan pago** (Individual, Business o Enterprise).
  ⚠️ **El modo agente no está en el plan gratuito.** El gratuito da autocompletado y chat
  básico, pero no el selector de agente. Si tu empresa te dio Copilot, casi seguro es
  Business o Enterprise.
- **Estar autenticado** en VS Code con la cuenta de GitHub que tiene la licencia.

---

## Instalación y conexión

### Paso 1: Instalar la extensión

En VS Code, abrí el panel de extensiones (`Ctrl + Shift + X`) y buscá **GitHub Copilot**.
Instalá la oficial, publicada por GitHub.

Instalá también **GitHub Copilot Chat** si no viene incluida — es la que trae el panel de
conversación.

### Paso 2: Iniciar sesión

Abajo a la derecha, en la barra de estado, va a aparecer el ícono de Copilot pidiendo que
te autentiques. Hacé clic y seguí los pasos: se abre el navegador, autorizás, y volvés a
VS Code.

Si no aparece: paleta de comandos (`Ctrl + Shift + P`) → escribí `Copilot: Sign In`.

### Paso 3: Verificar que la licencia esté activa

El ícono de Copilot en la barra de estado tiene que estar **sin tachar ni advertencias**.
Si muestra un error, lo más probable es que falte asignarte la licencia — eso lo resuelve
quien administre Copilot en tu organización, no vos.

---

## Activar el modo agente

### Paso 1: Abrir el panel de chat

```
Ctrl + Alt + I
```

*(En Mac: `⌃ ⌘ I`.)*

### Paso 2: Elegir "Agent" en el desplegable

Abajo del cuadro de texto hay un selector de modo. Las opciones principales:

| Modo | Qué hace |
|---|---|
| **Ask** | Responde preguntas. No toca archivos. |
| **Agent** | **Planifica, edita varios archivos, ejecuta comandos y se corrige.** |

Elegí **Agent**.

> 🔄 **Si no ves el desplegable.** En las versiones recientes de VS Code el modo agente
> viene activado de fábrica. Si no aparece, abrí la configuración (`Ctrl + ,`), buscá
> `chat.agent.enabled` y activalo. Si sigue sin aparecer, revisá que tu plan de Copilot
> no sea el gratuito.

---

## Usar el modo agente

### Referenciar archivos

Igual que en la terminal: escribí `@` o `#` seguido del nombre del archivo, y el panel te
va autocompletando.

```
Leé #requisitos.md y decime qué situaciones no están contempladas
```

> 💡 **En teclado en español, `@` sale con `AltGr + Q`.**

### Pedirle una tarea completa

El modo agente sirve para pedidos que tocan varias cosas a la vez:

```
Leé #requisitos.md, generá los casos de prueba en una tabla
y guardalos en casos-prueba.md
```

Va a proponerte un plan, ejecutarlo paso a paso, y pedirte confirmación antes de tocar
nada.

### ⚠️ Revisar antes de aceptar — esto es lo importante

Cuando termina, VS Code te muestra **cada archivo modificado con el antes y el después**,
línea por línea. Y podés:

- Revisar **archivo por archivo**.
- **Aceptar o descartar cada cambio por separado**, no todo junto.

> 🎤 **Esta es la parte que más importa del curso, y acá se ve mejor que en ningún otro
> lado.** La IA propone; vos disponés. Aceptar sin leer es peor que no revisar, porque te
> da una sensación falsa de control.

---

## Conectar MCPs

El modo agente de VS Code también se conecta a herramientas externas por MCP: Jira, el
navegador, bases de datos.

> 🔗 La configuración está en [`copilot-mcp-config.md`](copilot-mcp-config.md), y los
> servidores del curso en las
> [guías centralizadas de MCPs](../../mcps/).

⚠️ **En entornos corporativos, consultá antes de conectar un MCP a un sistema real.**
Conectarlo significa que la IA va a leer datos de ese sistema. **Empezá siempre en modo
lectura.**

---

## Solución de Problemas

### ❌ No aparece el selector de modo

1. Actualizá VS Code.
2. Verificá que tu plan de Copilot sea pago: el gratuito no incluye modo agente.
3. Revisá `chat.agent.enabled` en la configuración.

### ❌ El ícono de Copilot muestra error

Falta la licencia o la sesión expiró. Probá `Copilot: Sign Out` y volvé a entrar. Si
persiste, consultá con quien administre Copilot en tu organización.

### ❌ Edita archivos que yo no quería que tocara

Es el comportamiento esperado de un agente: trabaja sobre el proyecto entero.

**Dos formas de acotarlo:**
- **Sé específico**: nombrá los archivos con `#` en lugar de describir la tarea en
  general.
- **Descartá los cambios que no correspondan** en la revisión. Están separados por
  archivo justamente para eso.

### ❌ Mi empresa bloquea algo

Es lo más común en bancos y aseguradoras. Copilot respeta las políticas que configura tu
organización: puede haber modelos, funciones o repositorios restringidos. **No es un
problema de instalación** — consultá con sistemas.

---

## Comparación con la terminal

| | Copilot CLI | Copilot en VS Code |
|---|---|---|
| **Dónde vive** | Terminal | Editor |
| **Revisión de cambios** | En texto | **Visual, lado a lado** |
| **Mejor para** | Tareas rápidas, comandos | Trabajo sobre varios archivos |

**No hay que elegir una.** En el curso usamos la terminal para operar y el editor para
revisar, que es justamente donde cada una rinde más.

---

> 🔄 **Última revisión: agosto de 2026.** VS Code y Copilot se actualizan todos los meses
> y la interfaz cambia. Si algo no coincide con lo que ves en pantalla, la
> [documentación oficial](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode)
> manda.
