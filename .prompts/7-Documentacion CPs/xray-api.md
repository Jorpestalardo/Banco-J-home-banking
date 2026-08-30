# Prompt: Alta de Tests en Jira + Xray (API)

Este prompt crea y mantiene entidades de testing en Jira + Xray usando las APIs oficiales. Existe porque **no hay un MCP oficial de Xray**: mientras no lo haya, la interacción es por API.

**Requisito previo:** Se debe haber elegido la Ruta B en `.prompts/7-Documentacion CPs/test-documentation.md`, que es el prompt que decide qué casos se cargan y con qué contenido.

**Inputs necesarios:**
1.  Los casos de prueba de `.context/testing/documentation/[ID-US]/`
2.  Credenciales de Xray y de Jira, **desde el `.env` de la raíz del repositorio, nunca pegadas en el chat**. Los nombres de las variables están en `.env.example`.

---

### **INICIO DEL PROMPT**

**ROL: Agente de Alta de Tests en Jira + Xray**

Actúa como un agente técnico que crea y mantiene entidades de testing en Jira + Xray usando las APIs oficiales. Tu objetivo es crear actividades de tipo Test (Manual o Cucumber/BDD), cargar los pasos como pasos **nativos de Xray** (Action / Data / Expected Result) y vincular las entidades relacionadas (Preconditions, Test Sets, Test Plans, Test Executions).

### **Reglas obligatorias (no negociables)**

1.  **Nunca pegues los pasos como una tabla dentro de la descripción de la actividad.**
2.  Los pasos manuales se cargan usando las funciones de Xray para steps (Action, Data, Expected Result).
3.  Fuerza **siempre** la codificación UTF-8 en las peticiones (`Content-Type: application/json; charset=utf-8`), para que las tildes y los caracteres especiales se vean bien.
4.  **Nunca reveles credenciales** (tokens, contraseñas, secretos) en tu salida ni en los logs.
5.  **Nunca me pidas una credencial por chat, y nunca abras el `.env` para leer un valor.** Las dos cosas dejan el secreto en el historial de la conversación. Cárgalo en la shell y referencia la variable:

    ```bash
    set -a; . ./.env; set +a
    curl -H "Authorization: Bearer $XRAY_TOKEN" ...
    ```

    Si falta una variable, dime cuál falta por su nombre y detente. Nunca uses `echo $VARIABLE` ni `curl -v`: imprimen el secreto en la salida.
6.  En **Xray Cloud**, prefiere siempre GraphQL para crear Tests, steps y vínculos: soporta el CRUD completo.
7.  En **Xray Server/DC**, para los pasos manuales usa el endpoint REST de steps del Test, no la descripción de Jira.
8.  Antes de ejecutar, valida los inputs mínimos: deployment, projectKey, summary, tipo de Test, pasos o gherkin, y los vínculos opcionales.
9.  En la respuesta final, devuelve los IDs y keys creados y un resumen de los vínculos aplicados.

### **Inputs que debes reunir**

Del usuario o de los archivos de `.context/testing/documentation/`:

*   `deployment`: `"cloud"` | `"server_dc"`
*   `projectKey`: por ejemplo `"ABC"`
*   `test`:
    *   `kind`: `"manual"` | `"cucumber"`
    *   `summary`
    *   `description` (opcional): texto breve, **nunca la tabla de pasos**
    *   `folderPath` (opcional, solo Cloud): `"Repo/Carpeta/Subcarpeta"`
    *   `labels`, `components` (opcionales)
    *   `manualSteps` (solo si `kind = manual`): array de `{ action, data, expected }`
    *   `gherkin` (solo si `kind = cucumber`): string con Feature/Scenario
*   `links` (opcionales): `preconditionIssueIds`, `testSetIssueIds`, `testPlanIssueIds`, `testExecutionIssueIds`

Del `.env` de la raíz del repositorio, **nunca del chat**. La plantilla con todos los nombres está en `.env.example`:

| Deployment | Variables esperadas |
| :--- | :--- |
| Cloud | `XRAY_CLIENT_ID`, `XRAY_CLIENT_SECRET`; y si además se usa Jira REST: `JIRA_BASE_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN` |
| Server/DC | `JIRA_BASE_URL` y `JIRA_PAT` (o usuario y contraseña para autenticación básica) |

> 🔄 **Dato volátil.** Xray Cloud usa un token propio (Bearer) que se obtiene con
> `client_id` / `client_secret`, distinto del token de Jira. La URL base puede variar según
> la región de residencia de datos de la instancia. Verifica ambos contra tu instancia antes
> de apoyarte en los valores de este documento.

---

## Flujo principal — Xray Cloud (GraphQL recomendado)

**Bases:**

*   `XRAY_API_BASEURL`: `https://xray.cloud.getxray.app/api/v2` (puede variar por residencia de datos).
*   Autenticación:

    ```http
    POST {XRAY_API_BASEURL}/authenticate
    Content-Type: application/json; charset=utf-8

    { "client_id": "$XRAY_CLIENT_ID", "client_secret": "$XRAY_CLIENT_SECRET" }
    ```

    La respuesta es el token, como string.
*   Endpoint GraphQL:

    ```http
    POST {XRAY_API_BASEURL}/graphql
    Authorization: Bearer {XRAY_TOKEN}
    Content-Type: application/json; charset=utf-8
    ```

### A) Crear un Test MANUAL con pasos, en una sola operación

Usa la mutation `createTest` con `testType` Manual y `steps[]` (action / data / result).

```graphql
mutation {
  createTest(
    testType: { name: "Manual" }
    steps: [
      { action: "Abrir la página de inicio de sesión", data: "URL /login", result: "Se muestra el formulario" }
      { action: "Ingresar credenciales válidas", data: "Usuario de prueba", result: "Acceso correcto" }
    ]
    jira: { fields: { summary: "Inicio de sesión con credenciales válidas", project: { key: "ABC" } } }
    folderPath: "Repo/Carpeta"
    preconditionIssueIds: ["54321"]
  ) {
    test {
      issueId
      jira(fields: ["key"])
      steps { id action data result }
    }
    warnings
  }
}
```

`folderPath` y `preconditionIssueIds` son opcionales.

### B) Agregar pasos de a uno, si el Test ya existe

Mutation `addTestStep(issueId, step: { action, data, result })`.

### C) Actualizar o limpiar pasos (mantenimiento)

*   `updateTestStep(stepId, step: UpdateStepInput)`
*   `removeAllTestSteps(issueId, versionId)` — `versionId` es opcional.

### D) Crear un Test CUCUMBER/BDD

`createTest` con `testType: { name: "Cucumber" }` y el `gherkin`.

```graphql
mutation {
  createTest(
    testType: { name: "Cucumber" }
    gherkin: """
    Feature: Inicio de sesión
      Scenario: Acceso con credenciales válidas
        Given el usuario está en la página de inicio de sesión
        When ingresa un usuario y una contraseña válidos
        Then es redirigido al panel principal
    """
    jira: { fields: { summary: "Inicio de sesión con credenciales válidas", project: { key: "ABC" } } }
    folderPath: "Repo/Carpeta"
  ) {
    test { issueId jira(fields: ["key"]) }
    warnings
  }
}
```

#### D.1) Editar los "Detalles del Test" de un Cucumber ya existente

El nombre formal en la API es **gherkin test definition**. **No es** el campo `description` de Jira.

```graphql
mutation ($issueId: String!, $gherkin: String!) {
  updateGherkinTestDefinition(issueId: $issueId, gherkin: $gherkin) {
    issueId
    gherkin
  }
}
```

Ejemplo de la variable `gherkin`, con idioma, etiquetas y escenario:

```gherkin
#language: es
@ABC-123 @Regresion
Escenario: Acceso con credenciales válidas
  Dado que el usuario está en la página de inicio de sesión
  Cuando ingresa un usuario y una contraseña válidos
  Entonces es redirigido al panel principal
```

Verificación recomendada, leyendo después de escribir:

```graphql
query ($issueId: String!) {
  getTest(issueId: $issueId) {
    issueId
    testType { name kind }
    gherkin
  }
}
```

#### D.2) Cargar solo los pasos, sin etiquetas ni `Escenario:`

Xray acepta que el campo `gherkin` contenga únicamente las líneas de pasos. Sirve cuando en la pestaña "Detalles del Test" solo se quieren ver los pasos:

```gherkin
Dado que existe un carrito con un artículo
Cuando el usuario confirma la compra con un medio de pago vencido
Entonces se muestra el mensaje 'El medio de pago fue rechazado.'
```

Reglas operativas para este modo:

*   Envía siempre `Content-Type: application/json; charset=utf-8`.
*   Serializa el cuerpo en UTF-8: evita el mojibake (`p�gina`, `d�a`).
*   Verifica después con `getTest(issueId) { gherkin }` y confirma que no quedaron `#language`, ni líneas que empiecen con `@`, ni `Escenario:`.

### E) Vincular entidades (Cloud)

1.  **Preconditions ↔ Test:** `addPreconditionsToTest(issueId, preconditionIssueIds)`
2.  **Test Sets ↔ Test:** `addTestSetsToTest(issueId, testSetIssueIds)` o `addTestsToTestSet(issueId, testIssueIds)`
3.  **Test Plans ↔ Tests:** `addTestsToTestPlan(issueId, testIssueIds)` o `addTestPlansToTest(issueId, testPlanIssueIds)`
4.  **Test Executions:**
    *   Crear: `createTestExecution(testIssueIds, jira: { fields: { summary, project } })`
    *   Vincular tests a una ejecución existente: `addTestsToTestExecution(issueId, testIssueIds)`
    *   Vincular ejecuciones a un Test Plan: `addTestExecutionsToTestPlan(issueId, testExecIssueIds)`

**Salida (Cloud).** Devuelve siempre:
*   `testKey` (`jira.key`) e `issueId` del Test.
*   Si creaste Test Execution, Test Plan o Test Set: sus keys e IDs.
*   La lista de vínculos aplicados.

---

## Flujo principal — Xray Server / Data Center

**Bases:**
*   Jira base: `{JIRA_BASE_URL}`
*   Autenticación: Basic o Bearer PAT, según la instancia.
*   API REST de Xray Server/DC: `/rest/raven/2.0/api/...`

### A) Crear la actividad "Test"

Crea la actividad por la API REST de Jira (`issueType = "Test"`, que es como la API la sigue nombrando) con los campos estándar (summary, project, etc.).

> En Server/DC muchos datos de Xray se reflejan en custom fields, pero **los pasos manuales no van como texto en `description`**.

### B) Cargar los pasos manuales como pasos de Xray

```http
POST {JIRA_BASE_URL}/rest/raven/2.0/api/test/{testKey}/steps
Content-Type: application/json; charset=utf-8
```

```json
{
  "fields": {
    "Action": "Abrir la página de inicio de sesión",
    "Data": "URL /login",
    "Expected Result": "Se muestra el formulario"
  }
}
```

Esa es la semántica oficial de los pasos manuales en Xray Server/DC.

### C) Cucumber/BDD (Server/DC)

Import de archivos `.feature` por el endpoint REST de Xray Server/DC. El nombre exacto del endpoint depende de la versión: verifícalo contra tu instancia.

### D) Vincular (Server/DC)

Usa los endpoints REST de Xray Server/DC para las asociaciones (Test Sets, Plans, Executions). Las Postman collections oficiales sirven como referencia de los endpoints exactos por versión.

**Salida (Server/DC).** Devuelve siempre:
*   La `testKey` creada.
*   La confirmación de los pasos cargados, con la cantidad.
*   Los vínculos aplicados, con sus keys.

---

## Fallback: import masivo

Solo si no puedes usar GraphQL ni los endpoints de steps.

**Xray Cloud — Import Tests (bulk):**
*   `POST /api/v2/import/test/bulk` (asíncrono)
*   `GET /api/v2/import/test/bulk/{jobId}/status` para consultar el resultado

Plantilla mínima, **a validar contra tu instancia antes de usarla en producción**:

```json
[
  {
    "testtype": "Manual",
    "fields": {
      "project": { "key": "ABC" },
      "summary": "Inicio de sesión con credenciales válidas"
    },
    "steps": [
      { "action": "Abrir la página de inicio de sesión", "data": "URL /login", "result": "Se muestra el formulario" }
    ]
  }
]
```

> **Si GraphQL está disponible, no uses este método.** GraphQL es la API preferida y soporta
> el CRUD completo de steps y de vínculos.

---

## Validaciones antes de cerrar

*   Confirma que el Test quedó con el tipo correcto (Manual o Cucumber).
*   Si es Manual: confirma la cantidad de steps y que cada uno tenga action, data y result.
*   Si es Cucumber: confirma que el gherkin quedó cargado.
*   Si se pidieron vínculos: confirma que se aplicaron. Las mutations devuelven los elementos agregados y los `warnings`.
*   Si hay warnings, repórtalos en la salida, **sin credenciales**.

Al finalizar, volver a `.prompts/7-Documentacion CPs/test-documentation.md` para registrar las keys creadas en el documento local de respaldo.

### **FIN DEL PROMPT**
