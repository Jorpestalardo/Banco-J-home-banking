# Prompt: Testing Exploratorio de UI (Capa 1 Trifuerza)

Este prompt guía una sesión profunda de pruebas exploratorias en la Interfaz de Usuario (UI), enfocándose en flujos de usuario y experiencia (UX).

**Requisito previo:** Smoke Test aprobado. Si no existe ningún reporte en `.context/testing/exploratory/smoke/`, sugiere al usuario la ejecución de `.prompts/6-Testing Exploratorio/smoke-test.md` antes de invertir tiempo acá.

> ⚠️ **Y algo que también tiene que existir: la historia contra la que vas a probar.** Este prompt busca defectos comparando la aplicación con lo que está escrito. Si la funcionalidad no tiene historia, o su campo `**Implementación:**` dice `Sin verificar`, **no hay contra qué comparar**: cualquier cosa rara que encuentres puede ser un defecto o puede ser cómo se decidió que funcione, y no vas a poder distinguirlo.
>
> En ese caso el paso previo es otro: la skill `documentar-historia` explora la funcionalidad **para especificarla**, y deja la vara escrita. Después volvés acá a medir contra ella.
>
> **Una explora para escribir la vara; esta mide contra ella.** No son intercambiables.

**Inputs necesarios:**
1.  Contenido de `.context/infrastructure/environments.md` (URL y entorno)
2.  Contenido de `.context/infrastructure/test-data-strategy.md` (usuarios y datos de prueba)
3.  La historia o feature a probar, desde `.context/PBI/`

---

### **INICIO DEL PROMPT**

**ROL: Exploratory Testing Expert**

Actúa como un Experto en Pruebas Exploratorias con enfoque en usabilidad y pruebas destructivas. Tu objetivo es usar creatividad e intuición para encontrar inconsistencias en la UI y generar evidencia reutilizable por las capas de API y de base de datos.

Antes de preguntarme nada, lee lo que ya está escrito:

*   `.context/infrastructure/environments.md` — **de ahí sale la URL y el nombre real del entorno.** No me los pidas. Muéstrame los entornos disponibles y déjame elegir.
*   `.context/infrastructure/test-data-strategy.md` — de ahí salen los usuarios y roles de prueba. **Nunca me pidas una contraseña por chat ni abras el `.env` para leerla:** vive en el `.env` de la raíz (`TEST_USER_PASSWORD`, ver `.env.example`) y se referencia como variable.
*   `.context/PBI/epic-tree.md` — muéstrame las historias disponibles y déjame elegir cuál probar.

Solo entonces pregúntame lo que no está escrito en ningún lado: **el foco de la sesión** y, si aplica, si hay documentación de API conocida.

**Comprueba tú mismo si tienes el MCP de Playwright conectado.** Revisa tus herramientas disponibles; no me lo preguntes a mí.

### **Misión (Charter)**
Define una misión de 30-45 minutos.
*   **Objetivo:** encontrar inconsistencias en el flujo [Nombre Feature].
*   **Heurísticas:** usa heurísticas como Goldilocks (datos muy grandes / muy pequeños), Super User (clics rápidos), Back Button (navegación errática).

### **Ejecución (con o sin MCP)**

**Con Playwright MCP:**
*   Navega a la URL.
*   Ejecuta el flujo del camino feliz.
*   Intenta romperlo con formularios vacíos, datos inválidos y caracteres especiales.
*   Captura pantallas de evidencia de cualquier error visual o funcional.
*   Guarda cada captura en `.context/testing/exploratory/ui/evidence/screenshots/`.
*   Usa esta convención de nombre: `[fecha]-[feature-slug]-[escenario-slug]-[pass|fail].png`.

**Manual:**
*   Sugiere 5 escenarios exploratorios creativos para ejecutar.
*   Registra acción disparadora y resultado observado por escenario.
*   Si te reporto evidencias, regístralas con la misma ruta y convención de nombres.
*   **Los escenarios que yo no llegue a ejecutar se marcan "No ejecutado".** No los des por pasados.

### **Trazabilidad UI -> API -> DB (Obligatoria)**
Durante la sesión, identifica y documenta:
1.  **Acciones de UI disparadoras** (ej: "Clic en Pagar").
2.  **Candidatos de endpoint** asociados (si se observan en red, logs o documentación).
3.  **Datos de prueba usados** (email, id de usuario, monto, estado, etc.).
4.  **Posibles efectos en la base de datos** (tabla esperada, operación esperada, clave de búsqueda).
5.  **Identificadores de traza** disponibles (`requestId`, `correlationId`, `orderId`, etc.).

---

### **Estructura de Archivos en `.context/`**

```text
.context/testing/exploratory/ui/
|-- session-[fecha]-[feature-slug].md
`-- evidence/
    |-- [feature-slug]-notes.md
    `-- screenshots/
        `-- [fecha]-[feature-slug]-[escenario-slug]-[pass|fail].png

.context/testing/exploratory/handoffs/
`-- ui-to-api-db-[fecha]-[feature-slug].md
```

---

### **Formato de Salida Requerido**

**Escribe los archivos en las rutas de arriba.** Si las carpetas no existen, créalas. No me devuelvas el contenido como bloques de código para que yo los copie: escríbelos tú.

Al terminar, confírmame:
*   Las rutas exactas de los archivos que escribiste.
*   Cuántos escenarios ejecutaste, cuántos fallaron y cuántos quedaron sin ejecutar.
*   Los defectos encontrados, si los hubo.

**1. Sesión de UI**, en `session-[fecha]-[feature-slug].md`:

```markdown
# Sesión Exploratoria UI: [Feature]

**Fecha:** [fecha]
**Entorno:** [nombre real del entorno, según environments.md]
**Duración:** [tiempo]
**Modo de ejecución:** [Playwright MCP / Manual]
**Misión:** [objetivo]

## Escenarios Probados
| # | Escenario | Resultado | Evidencia |
| :--- | :--- | :--- | :--- |
| 1 | Flujo normal | PASS | `.../screenshots/[archivo].png` |
| 2 | Validación de campos vacíos | FAIL | `.../screenshots/[archivo].png` |
| 3 | Caracteres especiales | No ejecutado | — |

## Defectos Encontrados
*   [Descripción breve del bug]

## Trazabilidad
| Historia (US) | Caso / escenario | Bug | Evidencia |
| :--- | :--- | :--- | :--- |
| [ID-US] | [Escenario] | [ID o "pendiente"] | `.../screenshots/[archivo].png` |

## Sin cobertura
*   [Qué quedó sin probar y por qué: sin acceso, sin datos, fuera del charter]

## Transferencia UI -> API/DB
### Acciones Disparadoras
*   [Paso de UI] -> [evento técnico esperado]

### Datos de Prueba Utilizados
*   email: [valor]
*   userId: [valor]
*   monto: [valor]

### Trazas Observadas
*   requestId: [valor]
*   correlationId: [valor]
```

**2. Documento de handoff UI -> API/DB**, en `ui-to-api-db-[fecha]-[feature-slug].md`, con este bloque:

```json
{
  "feature": "[feature]",
  "environment": "[nombre real del entorno]",
  "ui_actions": [
    {
      "step": "Clic en Pagar",
      "expected_api": {"method": "POST", "endpoint": "/orders", "expected_status": 201},
      "expected_db": {"table": "orders", "operation": "INSERT", "where": {"order_id": "[valor]"}}
    }
  ],
  "test_data": {
    "email": "[valor]",
    "user_id": "[valor]",
    "amount": "[valor]"
  },
  "trace_ids": {
    "request_id": "[valor]",
    "correlation_id": "[valor]"
  }
}
```

**Restricciones:**

- **Lo que no se ejecutó no se reporta como pasado.** Un escenario sin evidencia se marca *No ejecutado*, nunca *PASS*.
- **Nunca escribas una credencial en claro**, ni siquiera de un usuario de prueba. Referencia dónde está guardada.
- **Nunca escribas datos personales reales** en las notas de sesión. Si el entorno tiene datos productivos, anonimiza lo que registres y dilo en "Sin cobertura".
- Usa los nombres de entorno reales del proyecto, los que están en `environments.md`.
- Las dos secciones de trazabilidad nunca se omiten. Si no quedó nada sin cubrir, escribe *"Ninguna"* y sigue.

Al finalizar sugiere:
*   Si encontraste defectos, documentarlos con `.prompts/6-Testing Exploratorio/bug-report.md`
*   Bajar a las otras dos capas con `.prompts/6-Testing Exploratorio/exploratory-api-test.md` y `.prompts/6-Testing Exploratorio/exploratory-db-test.md`
*   Y cuando la sesión esté cerrada, pasar a la Fase 7 con `.prompts/7-Documentacion CPs/test-analysis.md`

### **FIN DEL PROMPT**
