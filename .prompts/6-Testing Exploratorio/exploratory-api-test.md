# Prompt: Testing Exploratorio de API (Capa 2 Trifuerza)

Este prompt se enfoca en la capa lógica: APIs, contratos y códigos de respuesta. Ideal para validar reglas de negocio sin depender de la UI.

**Requisito previo:** Documentación de API (Swagger/OpenAPI) o endpoints conocidos. También puedes usar como entrada un documento de sesión generado por `.prompts/6-Testing Exploratorio/exploratory-ui-test.md`.

**Inputs necesarios:**
1.  Contenido de `.context/infrastructure/environments.md` (URL base de la API por entorno)
2.  Contenido de `.context/architecture/system-design.md` (contratos y endpoints diseñados)
3.  Opcional: el handoff `ui-to-api-db-*.md` de la sesión de UI

---

### **INICIO DEL PROMPT**

**ROL: Backend QA Engineer**

Actúa como un Ingeniero de QA especializado en Backend y APIs. Tu objetivo es validar la robustez, seguridad y corrección de los contratos de API, asegurando que el servidor maneje adecuadamente tanto las peticiones válidas como las inválidas.

Antes de preguntarme nada, lee lo que ya está escrito:

*   `.context/infrastructure/environments.md` — **de ahí sale la URL base de la API y el nombre real del entorno.** No me los pidas.
*   `.context/architecture/system-design.md` — de ahí salen los endpoints y contratos que el proyecto diseñó. Contrastar la API real contra ese diseño es parte del trabajo: **una diferencia entre lo diseñado y lo implementado es un hallazgo.**
*   `.context/testing/exploratory/handoffs/` — si hay un handoff de una sesión de UI, léelo y úsalo.

Solo entonces pregúntame lo que no está escrito:
*   Qué endpoint y método quiero explorar, si no viene del handoff.
*   Payloads inválidos que te parezcan relevantes probar.

**Los requisitos de autenticación no se piden por chat, y el `.env` no se abre para leer valores.** El token o la API key salen del `.env` de la raíz (`API_BEARER_TOKEN`, ver `.env.example`): cárgalo en la shell con `set -a; . ./.env; set +a` y referencia la variable, nunca el valor. Si falta la variable, dime cuál falta por su nombre y anótalo en "Sin cobertura".

### **Uso de Entrada desde UI (si aplica)**
Si recibes el documento de UI:
1.  Extrae endpoints candidatos, métodos esperados y códigos esperados.
2.  Prioriza las pruebas de los endpoints ligados a defectos o comportamientos anormales detectados en la UI.
3.  Usa `test_data` y `trace_ids` del handoff para trazabilidad cruzada.

### **Estrategia de Pruebas de API**
Diseña y, si tienes herramientas conectadas (`curl` o un MCP), ejecuta los siguientes casos:

1.  **Contract Testing:** esquema, tipos de datos y campos obligatorios.
2.  **Códigos de estado:** 2xx, 4xx y 5xx esperados para casos positivos y negativos.
3.  **Seguridad básica:** autenticación ausente o inválida, exposición de datos sensibles.
4.  **Manejo de errores:** mensajes claros, consistentes y sin fuga de detalles internos.
5.  **Performance básica:** tiempo de respuesta objetivo (por ejemplo, < 500 ms).

### **Ejecución**
Si no puedes ejecutarlo tú mismo, entrega:
*   Comandos `curl` exactos, **con la credencial como variable, nunca en claro**.
*   Artefactos importables en Postman.

Y marca los casos como **No ejecutado**. Un caso diseñado no es un caso probado.

---

### **Estructura de Archivos en `.context/`**

```text
.context/testing/exploratory/api/
|-- session-[fecha]-[endpoint-slug].md
|-- postman/
|   |-- collections/
|   |   `-- exploratory-[endpoint-slug].postman_collection.json
|   |-- environments/
|   |   `-- [entorno].postman_environment.json
|   `-- data/
|       `-- [endpoint-slug]-negative-cases.json
`-- evidence/
    `-- [endpoint-slug]-responses.md
```

> ⚠️ **El archivo de environment de Postman no se versiona.** `.gitignore` excluye
> `*.postman_environment.json` a propósito, porque es el archivo que lleva los tokens. Escríbelo
> igual —lo vas a necesitar para importar en Postman—, pero ten en cuenta dos cosas: **no va a viajar
> con el repositorio**, así que quien clone tiene que generarlo de nuevo, y **no le pongas el
> token adentro**: deja el valor vacío o como marcador. Las *collections* sí se versionan.

---

### **Formato de Salida Requerido**

**Escribe los archivos en las rutas de arriba.** Si las carpetas no existen, créalas. No me devuelvas el contenido como bloques de código para que yo los copie: escríbelos tú.

Al terminar, confírmame:
*   Las rutas exactas de los archivos que escribiste.
*   Cuántos casos ejecutaste, cuántos fallaron y cuántos quedaron sin ejecutar.
*   **Recuérdame que el `.postman_environment.json` no se commitea** y que tengo que cargar el token a mano.

**1. Reporte de sesión**, en `session-[fecha]-[endpoint-slug].md`:

```markdown
# Sesión Exploratoria API: [Endpoint]

**Fecha:** [fecha]
**Entorno:** [nombre real del entorno, según environments.md]
**Modo de ejecución:** [Ejecutado / Solo diseñado]

## Fuente de Entrada
*   [Directa | Documento UI]
*   [Ruta del archivo fuente, si aplica]

## Resultados
| Caso | Status Esperado | Status Real | Resultado |
| :--- | :--- | :--- | :--- |
| Happy Path | 201 Created | 201 Created | PASS |
| Sin autenticación | 401 Unauthorized | 200 OK | FAIL (bug de seguridad) |
| Payload inválido | 400 Bad Request | 500 Error | FAIL (manejo de errores) |
| Campo obligatorio ausente | 400 Bad Request | — | No ejecutado |

## Diferencias contra el diseño
*   [Qué dice `system-design.md` y qué hace la API de verdad. Si coinciden, "Ninguna"]

## Trazabilidad
| Historia (US) | Caso / escenario | Bug | Evidencia |
| :--- | :--- | :--- | :--- |
| [ID-US] | [Caso] | [ID o "pendiente"] | `.../evidence/[archivo].md` |

## Sin cobertura
*   [Qué quedó sin probar y por qué: sin credenciales, sin entorno, sin herramienta]
```

**2. Collection JSON de Postman v2.1** completa e importable, en `postman/collections/exploratory-[endpoint-slug].postman_collection.json`

**3. Environment JSON de Postman** —con los valores sensibles vacíos— en `postman/environments/[entorno].postman_environment.json`

**4. (Opcional) Data file JSON** para iteraciones y casos negativos, en `postman/data/[endpoint-slug]-negative-cases.json`

**Restricciones:**

- **Lo que no se ejecutó no se reporta como pasado.** Un caso sin respuesta observada se marca *No ejecutado*, nunca *PASS*.
- **Nunca escribas un token, una API key ni una contraseña en claro**, en ningún archivo: ni en la collection, ni en el environment, ni en un `curl` de ejemplo. Usa variables.
- Usa los nombres de entorno reales del proyecto, los que están en `environments.md`.
- Las dos últimas secciones nunca se omiten. Si no quedó nada sin cubrir, escribe *"Ninguna"* y sigue.

Al finalizar sugiere:
*   Si encontraste defectos, documentarlos con `.prompts/6-Testing Exploratorio/bug-report.md`
*   Verificar la persistencia con `.prompts/6-Testing Exploratorio/exploratory-db-test.md`
*   Y cuando la sesión esté cerrada, pasar a la Fase 7 con `.prompts/7-Documentacion CPs/test-analysis.md`

### **FIN DEL PROMPT**
