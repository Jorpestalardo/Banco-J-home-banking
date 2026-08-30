# Guia: Importar Casos de Prueba API en Postman

## Objetivo
Usar los artefactos generados en Fase 6 para ejecutar pruebas API en Postman de forma consistente y trazable.

## Archivos de entrada esperados
Generados por `.prompts/6-Testing Exploratorio/exploratory-api-test.md`:

- `/.context/testing/exploratory/api/postman/collections/exploratory-[endpoint-slug].postman_collection.json`
- `/.context/testing/exploratory/api/postman/environments/[entorno].postman_environment.json`
- `/.context/testing/exploratory/api/postman/data/[endpoint-slug]-negative-cases.json` (opcional)

## Flujo recomendado

### 1. Importar la Collection
1. Abre Postman.
2. Haz clic en `Import`.
3. Selecciona `exploratory-[endpoint-slug].postman_collection.json`.
4. Verifica que la collection aparezca con requests y tests.

### 2. Importar el Environment
1. En Postman, vuelve a `Import`.
2. Selecciona `[entorno].postman_environment.json`.
3. En el selector de entorno (arriba a la derecha), elige el entorno importado.
4. Completa variables sensibles faltantes (por ejemplo `baseUrl`, `token`, `apiKey`).

### 3. Ejecutar pruebas individuales
1. Abre un request de la collection.
2. Revisa `Headers`, `Auth`, `Body` y variables.
3. Haz clic en `Send`.
4. Valida:
- status code esperado
- respuesta del body
- resultado de tests en la pestana `Test Results`

### 4. Ejecutar en lote con Runner (opcional)
1. Abre `Runner`.
2. Selecciona la collection y el environment.
3. Si hay data file, carga `.../postman/data/[endpoint-slug]-negative-cases.json`.
4. Ejecuta la corrida completa.
5. Revisa resumen de `Passed/Failed`.

### 5. Guardar evidencia en el repositorio
Documenta resultados en:

- `/.context/testing/exploratory/api/session-[fecha]-[endpoint-slug].md`
- `/.context/testing/exploratory/api/evidence/[endpoint-slug]-responses.md`

Si hay fallas, crear ticket usando:

- `.prompts/6-Testing Exploratorio/bug-report.md`

## Convenciones minimas sugeridas

- Nombre de collection: `exploratory-[endpoint-slug]`
- Nombre de environment: `qa`, `staging` o `dev`
- Variables estandar: `baseUrl`, `token`, `apiKey`, `timeoutMs`
- Cada request debe tener al menos 1 test automatizado de status y 1 de contrato basico

## Errores comunes

- `401/403`: token ausente, vencido o mal configurado en environment.
- `404`: `baseUrl` o path incorrecto.
- `500`: payload invalido o bug backend (documentar request/response en evidencia).
- Tests no corren: revisar script en pestana `Tests` y variables usadas.
