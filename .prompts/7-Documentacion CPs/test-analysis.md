# Prompt: Análisis de Pruebas (De Exploratorio a Formal)

Este prompt transforma las notas "caóticas" del Testing Exploratorio en una lista estructurada de Escenarios de Prueba candidatos para la regresión.

**Requisito previo:** Se debe haber ejecutado al menos una sesión exploratoria. Si `.context/testing/exploratory/` está vacío, detén la ejecución de este prompt y sugiere al usuario ejecutar alguno de estos:
*   `.prompts/6-Testing Exploratorio/exploratory-ui-test.md`
*   `.prompts/6-Testing Exploratorio/exploratory-api-test.md`
*   `.prompts/6-Testing Exploratorio/exploratory-db-test.md`

**Inputs necesarios:**
1.  Los `session-*.md` de `.context/testing/exploratory/`
2.  Los bugs de `.context/testing/exploratory/bugs/`
3.  El `story.md` de la historia analizada, desde `.context/PBI/`

---

### **INICIO DEL PROMPT**

**ROL: Test Analyst Senior**

Actúa como un Analista de Pruebas Senior. Tu objetivo es sintetizar los hallazgos de las sesiones exploratorias en escenarios de prueba estructurados y reutilizables, separando lo trivial de lo crítico para construir una base de conocimiento sólida.

Primero, lee todo lo que dejó la Fase 6. **No me pidas que te pegue mis notas: ya están escritas en el repositorio.**

*   Busca los `session-*.md` en `.context/testing/exploratory/ui/`, `api/` y `db/`. **Léelos todos**, no solo el primero, y enumérame cuáles leíste antes de producir nada.
*   Lee los bugs de `.context/testing/exploratory/bugs/`.
*   Lee el `story.md` de la historia correspondiente, en `.context/PBI/`.

Si hay sesiones de varias historias, muéstrame la lista y déjame elegir cuál analizar.

### **Análisis de Cobertura**
Basándote en lo que se probó, identifica:
1.  **Escenarios críticos (camino feliz):** el flujo principal que NUNCA debe fallar.
2.  **Escenarios de excepción comunes:** errores de validación o de lógica que ocurren con frecuencia.
3.  **Casos borde relevantes:** los que descubrieron bugs o son de alto riesgo.

*Descartar:* pruebas triviales de un solo uso (ej: "Probé cambiar el color de fondo con F12").

### **Análisis de lo que NO se probó**

Este es el análisis que hace que la Fase 7 sirva, y el que se saltea siempre.

*   **Los escenarios marcados "No ejecutado" en las sesiones no son escenarios pasados.** Recupéralos: son candidatos de primer orden, porque nadie sabe todavía si funcionan.
*   **Cruza los criterios de aceptación del `story.md` contra lo que la sesión efectivamente ejecutó.** Un criterio de aceptación que ninguna sesión tocó es un hueco de cobertura, y tiene que aparecer como candidato.
*   Recupera también lo que quedó en "Sin cobertura" de cada sesión, con el motivo.

---

### **Formato de Salida Requerido**

**Escribe el archivo en `.context/testing/documentation/[ID-US]/analisis-escenarios.md`.** Si la carpeta no existe, créala. No me devuelvas el contenido como un bloque de código para que yo lo copie: escríbelo tú.

Al terminar, confírmame:
*   La ruta exacta del archivo que escribiste.
*   Qué archivos de sesión leíste.
*   Cuántos candidatos salieron de lo ejecutado y cuántos de los huecos de cobertura.

El contenido debe seguir esta estructura:

```markdown
# Análisis de Escenarios: [Historia]

**Historia:** [ID-US]
**Fecha:** [fecha]
**Sesiones analizadas:** [lista de archivos leídos]

## Candidatos para Regresión
| # | Tipo | Escenario | Origen | Estado en la sesión |
| :--- | :--- | :--- | :--- | :--- |
| 1 | E2E | Flujo completo de compra con tarjeta válida | Sesión UI | Ejecutado, PASS |
| 2 | Funcional | Validación de email duplicado en registro | Sesión UI | Ejecutado, FAIL (BUG-03) |
| 3 | Seguridad | Intento de acceso a perfil ajeno (IDOR) | Sesión API | No ejecutado |
| 4 | Funcional | [Criterio de aceptación sin cubrir] | `story.md` · CA-4 | Nunca se probó |

## Huecos de Cobertura
*   [Criterio de aceptación que ninguna sesión tocó, y por qué importa]

## Descartados
*   [Qué se probó pero no merece documentarse, y por qué]

## Trazabilidad
| Historia (US) | Caso / escenario | Bug | Evidencia |
| :--- | :--- | :--- | :--- |
| [ID-US] | [Escenario candidato] | [ID o "—"] | [ruta del reporte de sesión] |

## Sin cobertura
*   [Lo que sigue sin poder probarse y qué haría falta para probarlo]
```

**Restricciones:**

- **Un escenario "No ejecutado" nunca se registra como pasado.** Se registra como candidato pendiente, que es lo que es.
- **Todo candidato dice de dónde sale:** de una sesión ejecutada, de un bug, o de un criterio de aceptación que nadie probó.
- **Nunca copies datos personales reales** de los reportes de sesión al análisis.
- Las dos últimas secciones nunca se omiten. Si no quedó nada sin cubrir, escribe *"Ninguna"* y sigue.

Al finalizar, sugerir priorizar estos casos con `.prompts/7-Documentacion CPs/test-prioritization.md`

### **FIN DEL PROMPT**
