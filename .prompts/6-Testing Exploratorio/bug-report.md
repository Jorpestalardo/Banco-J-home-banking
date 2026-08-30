# Prompt: Reporte de Bugs (Jira + Local)

Este prompt toma defectos detectados en testing exploratorio y los convierte en un Bug Report profesional, listo para Jira y para documentación local.

**Requisito previo:** Haber encontrado un defecto en UI, API o DB. Los reportes de sesión de `.prompts/6-Testing Exploratorio/` son la entrada natural de este prompt.

**Inputs necesarios:**
1.  El reporte de sesión exploratoria donde apareció el defecto
2.  Contenido de `.context/infrastructure/environments.md` (nombre real del entorno)

---

### **INICIO DEL PROMPT**

**ROL: QA Lead**

Actúa como un Líder de QA con altos estándares de documentación. Tu objetivo es redactar un Reporte de Defecto claro, conciso y reproducible.

Primero, revisa si hay reportes de sesión en `.context/testing/exploratory/`. Si los hay, **muéstrame la lista de defectos que ya están registrados ahí y déjame elegir cuál documentar**: no me pidas que te pegue algo que ya está escrito.

Si no hay ninguno, pídeme la descripción libre del bug.

**Comprueba tú mismo si tienes el MCP de Atlassian conectado.** Revisa tus herramientas disponibles; no me lo preguntes a mí.

### **Si la entrada viene de un reporte exploratorio**
Extrae automáticamente:
*   Título sugerido del bug.
*   Pasos para reproducir.
*   Resultado esperado frente al resultado real.
*   Entorno y datos de prueba.
*   IDs de traza (`requestId`, `correlationId`, etc.).
*   **La historia de usuario asociada**, que es lo que después sostiene la trazabilidad.

Además, busca la evidencia asociada en:
*   Capturas de UI: `.context/testing/exploratory/ui/evidence/screenshots/`
*   Notas de UI: `.context/testing/exploratory/ui/evidence/`
*   Evidencia de API: `.context/testing/exploratory/api/evidence/`
*   Evidencia de DB: `.context/testing/exploratory/db/evidence/`

Si el reporte menciona archivos específicos, lístalos explícitamente en la sección de evidencia del bug. **Si no hay evidencia, dilo:** un bug sin evidencia se discute, uno con evidencia se arregla.

### **Estructura del Bug**
1.  **Título:** `[Componente] descripción corta y clara del fallo`.
2.  **Descripción:** contexto breve.
3.  **Pasos para reproducir:** lista numerada, clara e imperativa.
4.  **Resultado esperado:** qué debería pasar según las reglas de negocio, **citando el documento** que lo dice.
5.  **Resultado real:** qué pasó de verdad.
6.  **Evidencia:** rutas de capturas, logs y reportes fuente.
7.  **Entorno:** navegador, sistema operativo, versión de la aplicación y nombre real del entorno.
8.  **Severidad y prioridad:** clasificación sugerida por impacto.

### **Sincronización con Jira**

*   **Si tienes el MCP de Atlassian:** pregúntame si quiero crearlo en Jira.
    1.  **Antes de crear nada, comprueba qué tipos de actividad existen en ese espacio.** El tipo de un defecto se llama **`Error`** en la interfaz en español y `Bug` en la inglesa — son el mismo. **Si no existe ninguno de los dos, avísame y no lo sustituyas en silencio por `Tarea`.**
    2.  Créalo con el tipo que exista, devuélveme la `ISSUE_KEY` y el resumen de campos cargados, y usa esa key en el archivo local.
*   **Si no lo tienes, no hay proyecto en Jira, o el MCP no responde:** no te detengas. Escribe igual el archivo local con un ID temporal (`BUG-01`), deja el campo `**Estado de sincronización:** PENDIENTE DE SUBIR A JIRA` y **avísame en la confirmación final**.

---

### **Formato de Salida Requerido**

**Escribe el archivo en `.context/testing/exploratory/bugs/bug-[fecha]-[bug-slug].md`.** Si la carpeta no existe, créala. No me devuelvas el contenido como un bloque de código para que yo lo copie: escríbelo tú.

Al terminar, confírmame:
*   La ruta exacta del archivo que escribiste.
*   La severidad y prioridad que asignaste, y por qué.
*   **Si quedó pendiente de subir a Jira, dímelo aquí.**

El contenido debe seguir esta estructura:

```markdown
# Bug: [Título]

**ID:** [ISSUE_KEY de Jira o ID temporal]
**Estado de sincronización:** [Sincronizado con Jira | PENDIENTE DE SUBIR A JIRA]
**Fecha:** [fecha]
**Entorno:** [nombre real del entorno, según environments.md]
**Severidad:** [Crítica / Alta / Media / Baja]
**Prioridad:** [Alta / Media / Baja]

## Descripción
[Contexto breve]

## Pasos para Reproducir
1.  Ir a ...
2.  Hacer clic en ...
3.  ...

## Resultados
*   **Esperado:** [qué debería pasar] — según `[archivo]` · [sección]
*   **Real:** [qué pasó]

## Evidencia
*   `.context/testing/exploratory/ui/evidence/screenshots/[archivo].png`
*   `.context/testing/exploratory/api/evidence/[archivo].md`

## Trazabilidad
| Historia (US) | Caso / escenario | Bug | Evidencia |
| :--- | :--- | :--- | :--- |
| [ID-US] | [Escenario que lo destapó] | [ID de este bug] | [ruta] |

## Referencia Cruzada
*   **Sesión de origen:** [ruta del reporte exploratorio]
*   **Datos de prueba usados:** [resumen, sin datos personales reales]
*   **IDs de traza:** requestId / correlationId
```

**Restricciones:**

- **El "Resultado esperado" se cita.** Si ningún documento dice qué debería pasar, no es un bug confirmado: es una pregunta abierta, y hay que escribirla como tal.
- **Nunca escribas una credencial en claro** ni datos personales reales en los pasos de reproducción. Usa el usuario de prueba y su referencia.
- Usa los nombres de entorno reales del proyecto, los que están en `environments.md`.

Al finalizar sugiere:
*   Documentar otro defecto de la misma sesión, si quedaron pendientes.
*   Y cuando la sesión esté cerrada, pasar a la Fase 7 con `.prompts/7-Documentacion CPs/test-analysis.md`

### **FIN DEL PROMPT**
