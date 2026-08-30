# Prompt: Smoke Test (Sanity Check)

Este prompt ejecuta una prueba rápida de "Sanidad" para verificar que el despliegue es estable antes de invertir tiempo en pruebas profundas.

**Requisito previo:** Se debe haber completado `.context/infrastructure/environments.md`. Si no existe, detén la ejecución de este prompt y sugiere al usuario la ejecución de `.prompts/3-Infraestructura/environment-analysis.md`.

**Inputs necesarios:**
1.  Contenido de `.context/infrastructure/environments.md`
2.  Contenido de `.context/infrastructure/test-data-strategy.md` (usuarios de prueba)

---

### **INICIO DEL PROMPT**

**ROL: QA Automation Engineer**

Actúa como un Ingeniero de Automatización QA. Tu objetivo es realizar un **Smoke Test** rápido (prueba de sanidad) para validar que el despliegue es estable y que los servicios críticos responden, antes de proceder con pruebas manuales o profundas.

Primero, lee `.context/infrastructure/environments.md`:

*   **La URL sale de ahí. No me la pidas.** Muéstrame los entornos que el proyecto tiene de verdad, con los nombres que usa el equipo, y déjame elegir contra cuál corro el smoke.
*   Si el archivo no lista ninguna URL para el entorno elegido, ahí sí pregúntame, y anota en el reporte que la URL no estaba documentada.

Lee también `.context/infrastructure/test-data-strategy.md` para saber qué usuario de prueba usar. **Nunca me pidas una contraseña por chat ni abras el `.env` para leerla:** la contraseña vive en el `.env` de la raíz (`TEST_USER_PASSWORD`, ver `.env.example`) y se referencia como variable.

**Comprueba tú mismo si tienes el MCP de Playwright conectado.** Revisa tus herramientas disponibles; no me lo preguntes a mí.

### **Estrategia de Ejecución**

**Con el MCP de Playwright**, ejecuta los siguientes pasos:
1.  **Navegación:** ve a la URL principal y verifica que la página cargue sin error.
2.  **Título:** verifica que el título de la página sea el esperado.
3.  **Captura:** toma una captura de pantalla de la portada y guárdala en `.context/testing/exploratory/smoke/evidence/`.
4.  **Login básico (si aplica):** intenta ingresar con el usuario de prueba. Verifica si redirige al destino esperado.

**Sin el MCP**, guíame paso a paso para que yo lo haga manualmente:
1.  "Abre el navegador en [URL]..."
2.  "Verifica que no haya errores de consola (F12)..."
3.  "Intenta iniciar sesión..."

Y **registra el resultado que yo te reporte**, marcando en el reporte que la ejecución fue manual.

### **Criterio de Éxito**
*   Si todo carga y no hay errores 500/404 -> **PASSED** (podemos seguir con pruebas profundas).
*   Si hay errores críticos -> **FAILED** (reportar Blocker inmediatamente).
*   Si no lo pudiste ejecutar -> **NO EJECUTADO**. No es lo mismo que PASSED, y no autoriza a seguir.

---

### **Formato de Salida Requerido**

**Escribe el archivo en `.context/testing/exploratory/smoke/smoke-[fecha]-[entorno].md`.** Si la carpeta no existe, créala. No me devuelvas el contenido como un bloque de código para que yo lo copie: escríbelo tú.

Al terminar, confírmame:
*   La ruta exacta del archivo que escribiste.
*   El veredicto: PASSED, FAILED o NO EJECUTADO.
*   Si el veredicto no es PASSED, **qué bloquea seguir**.

El contenido debe seguir esta estructura:

```markdown
# Reporte de Smoke Test

**Fecha:** [fecha]
**Entorno:** [nombre real del entorno, según environments.md]
**URL:** [URL]
**Modo de ejecución:** [Playwright MCP / Manual]
**Estado:** [PASSED / FAILED / NO EJECUTADO]

## Verificaciones
| # | Verificación | Resultado | Evidencia |
| :--- | :--- | :--- | :--- |
| 1 | Carga de la portada | PASS / FAIL / No ejecutado | `.../evidence/[archivo].png` |
| 2 | Título de la página | PASS / FAIL / No ejecutado | |
| 3 | Inicio de sesión | PASS / FAIL / No ejecutado | |

## Trazabilidad
| Historia (US) | Caso / escenario | Bug | Evidencia |
| :--- | :--- | :--- | :--- |
| [ID-US o "N/A — sanidad general"] | [Verificación] | [ID o "—"] | [ruta] |

## Sin cobertura
*   [Qué quedó sin verificar y por qué: sin acceso, sin credenciales, sin MCP]
```

**Restricciones:**

- **Lo que no se ejecutó no se reporta como pasado.** Una verificación sin evidencia se marca *No ejecutado*, nunca *PASS*.
- **Nunca escribas una credencial en claro** en el reporte, ni siquiera de un usuario de prueba. Referencia dónde está guardada.
- Usa los nombres de entorno reales del proyecto, los que están en `environments.md`.
- Las dos últimas secciones nunca se omiten. Si no quedó nada sin cubrir, escribe *"Ninguna"* y sigue.

Si el Smoke Test pasa (PASSED), sugerir elegir la siguiente misión exploratoria:
*   Para UI: `.prompts/6-Testing Exploratorio/exploratory-ui-test.md`
*   Para API: `.prompts/6-Testing Exploratorio/exploratory-api-test.md`
*   Para DB: `.prompts/6-Testing Exploratorio/exploratory-db-test.md`

### **FIN DEL PROMPT**
