# Prompt: Agregar Feature Incremental

Este prompt te ayuda a añadir una nueva funcionalidad al proyecto DESPUÉS de haber creado el backlog inicial. Mantiene la sincronización entre Jira y tu estructura local.

**Requisito previo:** Se debe haber completado `.context/PBI/epic-tree.md`. Si no existe, detén la ejecución de este prompt y sugiere al usuario la ejecución de `.prompts/4-Especificaciones (Backlog)/pbi-product-backlog.md`.

**Inputs necesarios:**
1.  Contenido de `.context/PBI/epic-tree.md`
2.  La descripción de la nueva feature (esto sí me lo tienes que pedir)

---

### **INICIO DEL PROMPT**

**ROL: Agile Product Owner**

Actúa como un Product Owner responsable de la evolución continua del producto. Tu objetivo es integrar nuevas funcionalidades al backlog existente sin romper la coherencia del proyecto ni duplicar esfuerzos.

Primero, lee `.context/PBI/epic-tree.md` para saber qué existe hoy. No me pidas que te lo pegue.

**Comprueba tú mismo si tienes el MCP de Atlassian conectado.** Revisa tus herramientas disponibles; no me lo preguntes a mí.

Después pídeme **la descripción de la nueva feature o idea**. Eso es lo único que no está escrito en ningún lado.

### **Análisis de Impacto**

Antes de clasificar, revisa si la feature **ya está cubierta** total o parcialmente por una Epic o una Story existente. Si lo está, dímelo y no dupliques: proponme extender lo que hay.

Si es genuinamente nueva, clasifícala:
*   **Nivel 1 (Story):** Es pequeña y encaja en una Epic existente. Dime en cuál Epic va y por qué.
*   **Nivel 2 (Epic):** Es grande y requiere su propia Epic. Define el nombre de la nueva Epic.

### **Ejecución**

#### **Si es Nivel 1 (Story en Epic existente):**
1.  Redacta la User Story con sus criterios de aceptación en borrador.
2.  Escribe el archivo local en `.context/PBI/epics/[EPIC-CARPETA]/stories/STORY-[KEY]-[nombre]/story.md`.
3.  Actualiza el índice `epic-tree.md`.

#### **Si es Nivel 2 (Nueva Epic):**
1.  Redacta la Epic y sus User Stories.
2.  Escribe la nueva estructura de carpetas en `.context/PBI/epics/EPIC-[KEY]-[nombre]/`.
3.  Actualiza el índice `epic-tree.md`.

### **Sincronización con Jira**

*   **Si tienes el MCP de Atlassian:** crea la Epic o la Story en Jira y usa las keys reales en los archivos locales.
*   **Si no lo tienes, no hay proyecto en Jira, o el MCP no responde:** no te detengas. Usa un ID temporal (`PBI-0n`), deja el campo `**Estado de sincronización:** PENDIENTE DE SUBIR A JIRA`, anótalo en la sección correspondiente de `epic-tree.md` y **avísame en la confirmación final**.

---

### **Formato de Salida Requerido**

**Escribe los archivos en `.context/PBI/`.** Si las carpetas no existen, créalas. No me devuelvas el contenido como bloques de código para que yo los copie: escríbelos tú.

Usa el mismo formato de `epic.md` y `story.md` que define `.prompts/4-Especificaciones (Backlog)/pbi-product-backlog.md`, **incluida la tabla de Fuentes**.

Al terminar, confírmame:
*   Qué nivel asignaste y por qué.
*   Las rutas exactas de los archivos que escribiste o actualizaste.
*   **Si quedó pendiente de subir a Jira, dímelo aquí.**
*   Si la feature pisa o duplica algo que ya existía.

**Restricciones:**

- **Todo criterio de aceptación que no salga de la descripción que te di se marca como hipótesis** en la tabla de Fuentes.
- **La historia nace con `**Implementación:** Sin verificar`.** Estás escribiendo lo que se pidió, no comprobando lo que existe.
- **Si lo que te describo resulta ser algo que la aplicación ya hace, este no es el prompt.** Una funcionalidad que ya está construida no se documenta de oído: se documenta mirándola. Dímelo y pasamos a la skill `documentar-historia`, que la explora y deja la evidencia.
- No reescribas Epics existentes para hacer entrar la feature nueva. Si no encaja, es Nivel 2.

Al finalizar sugerir refinar la historia nueva con `.prompts/4-Especificaciones (Backlog)/refine-stories.md`

### **FIN DEL PROMPT**
