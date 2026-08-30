# Prompt: Documentación Formal de Casos de Prueba (Jira vs Xray)

Este prompt genera la documentación final de los casos de prueba y ejecuta la carga según la disponibilidad de Xray en Jira.

**Requisito previo:** Se debe haber completado `priorizacion-roi.md`. Si no existe, detén la ejecución de este prompt y sugiere al usuario la ejecución de `.prompts/7-Documentacion CPs/test-prioritization.md`.

**Inputs necesarios:**
1.  Contenido de `.context/testing/documentation/[ID-US]/priorizacion-roi.md`
2.  El `story.md` de la historia, desde `.context/PBI/` (criterios de aceptación en Gherkin)

---

### **INICIO DEL PROMPT**

**ROL: QA Documentation Specialist**

Actúa como un Especialista en Documentación QA. Tu objetivo es producir casos de prueba formales y cargarlos en la herramienta correcta sin perder trazabilidad.

Primero, lee `.context/testing/documentation/[ID-US]/priorizacion-roi.md` y el `story.md` de la historia. **De ahí salen los casos a documentar y sus criterios de aceptación:** no me pidas que te los pegue.

**Comprueba tú mismo si tienes el MCP de Atlassian conectado.** Revisa tus herramientas disponibles; no me lo preguntes a mí.

### **Paso 0: Validación de Xray**

Xray no se puede detectar solo, así que esto sí te lo tengo que decir yo. Pregúntame:
1.  Si el proyecto de Jira tiene **Xray disponible y operativo**.
2.  La `Project Key`.
3.  Las historias objetivo (keys de Jira) para vincular los tests.

**Si no te contesto, o no hay Jira configurado, no te detengas:** toma la Ruta A y anota el estado de sincronización como pendiente.

Con esa respuesta, ejecuta una de estas rutas:

### **Ruta A — Sin Xray**
Si **NO** hay Xray disponible:
1.  Documenta los casos de prueba manuales o automatizables.
2.  Si tienes el MCP de Atlassian, **comprueba primero qué tipos de actividad existen en ese espacio** y crea las actividades con el que encuentres, en este orden de preferencia: **`Test Case`**, **`Test`**, o **`Tarea`** con la etiqueta `Test-Case` si no existe ninguno de los dos. **Dime cuál usaste**: si cayeron en `Tarea`, la jerarquía se pierde y no da ningún error.
3.  Vincula **obligatoriamente** cada test a su historia de usuario.
4.  Mantén el formato:
    *   Manual: `Acción -> Resultado Esperado`.
    *   Automatizable: escenario en Gherkin dentro de la descripción o los comentarios de la actividad.
5.  Genera siempre un documento local de respaldo por cada caso creado.

### **Ruta B — Con Xray**
Si **SÍ** hay Xray disponible:
1.  Usa `.prompts/7-Documentacion CPs/xray-api.md` como referencia de la API.
2.  Crea los tests por la API de Xray según el tipo:
    *   **Manual:** crea un Test de tipo Manual y carga los pasos dentro de Xray.
    *   **Cucumber:** crea un Test de tipo Cucumber y carga el escenario Gherkin.
3.  Vincula **obligatoriamente** cada Test a su historia de usuario en Jira.
4.  Reporta el resultado de la creación con los IDs y keys generados.
5.  Genera siempre un documento local de respaldo por cada caso creado.

**Si la API de Xray falla o no tienes las credenciales:** degrada a la Ruta A, documenta local, y anota el motivo en el entregable. No dejes la fase sin salida.

### **Reglas de Documentación**
*   Incluye precondiciones, datos de prueba, prioridad y trazabilidad (historia -> test).
*   Si un caso es automatizable, indícalo explícitamente con una etiqueta.
*   Si tienes MCP o API disponible, pregunta antes de crear de forma masiva.
*   **Un caso de prueba no se considera completo hasta que queda vinculado a su historia de usuario.**

---

### **Formato de Salida Requerido**

**Escribe los archivos en `.context/testing/documentation/[ID-US]/`.** Si la carpeta no existe, créala. No me devuelvas el contenido como bloques de código para que yo los copie: escríbelos tú.

Al terminar, confírmame:
*   La ruta de cada archivo que escribiste.
*   Qué ruta ejecutaste (A o B) y por qué.
*   Cuántos casos quedaron vinculados a su historia y cuántos no.
*   **Si algo quedó pendiente de subir a Jira, dímelo aquí.**
*   **Qué queda para la próxima iteración:** los escenarios que la priorización marcó como "Probar antes de decidir" siguen abiertos y vuelven a la Fase 6.

**1. Decisión de ruta**
*   `Xray disponible: SÍ / NO`
*   `Ruta ejecutada: A (Jira sin Xray) o B (API de Xray)`

**2. Un archivo por caso**, en `.context/testing/documentation/[ID-US]/[ID-CP]-[nombre-kebab].md`

Donde `[ID-US]` es la key de la historia (ej: `PROJ-123`) y `[ID-CP]` es la key del test creado. Si todavía no existe, usa un temporal (`CP-TEMP-01`) y actualízalo después.

```markdown
# Caso de Prueba: [Título]

**ID:** [key del test o ID temporal]
**Historia:** [ID-US]
**Estado de sincronización:** [Sincronizado con Jira | Sincronizado con Xray | PENDIENTE DE SUBIR A JIRA]
**Ruta:** [A / B]
**Tipo:** [Manual / Cucumber]
**Prioridad:** [Alta / Media / Baja]
**Automatizable:** [Sí / No]

## Precondiciones
*   [Estado previo necesario]

## Datos de Prueba
*   [Referencia al usuario o dato, nunca la credencial en claro]

## Pasos
| # | Acción | Resultado Esperado |
| :--- | :--- | :--- |
| 1 | Ir a /login | Se muestra el formulario |
| 2 | Ingresar usuario y contraseña válidos | Redirige al inicio |

## Trazabilidad
| Historia (US) | Caso / escenario | Bug de origen | Evidencia |
| :--- | :--- | :--- | :--- |
| [ID-US] | [este caso] | [ID o "—"] | `analisis-escenarios.md` |

## Origen
*   **Priorización:** `priorizacion-roi.md` · escenario [n], score [x]
*   **Criterio de aceptación cubierto:** `story.md` · [CA-n]
```

**Formato Gherkin (para casos automatizables):**

```gherkin
Feature: Inicio de sesión seguro

  @Automate @Priority:High
  Scenario: Acceso con credenciales válidas
    Given el usuario está en la página de inicio de sesión
    When ingresa un usuario y una contraseña válidos
    Then es redirigido al panel principal
```

**3. Resultado de carga**
*   Keys de los tests creados.
*   Historia vinculada por cada test (obligatorio).
*   Evidencia del vínculo `US <-> Test` (tipo de enlace usado o referencia equivalente).
*   Errores o pendientes, si existen.

**Restricciones:**

- **Cada caso cita su origen:** de qué escenario priorizado sale y qué criterio de aceptación cubre. Un caso de prueba que no cubre ningún criterio es un caso que nadie pidió.
- **Nunca escribas una credencial en claro** en un caso de prueba. Referencia dónde está guardada.
- **Un caso sin historia vinculada no está terminado.** Si no se pudo vincular, dilo explícitamente en el resultado de carga.
- Las secciones de Trazabilidad y Origen nunca se omiten.

Con esto se cierra el ciclo de las siete fases. Si quedaron escenarios en "Probar antes de decidir", el siguiente paso es volver a `.prompts/6-Testing Exploratorio/exploratory-ui-test.md` para cubrirlos.

### **FIN DEL PROMPT**
