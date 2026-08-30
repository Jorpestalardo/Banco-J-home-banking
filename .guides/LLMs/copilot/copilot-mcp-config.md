# Configuración de Contexto y Herramientas para Copilot

## Descripción
A diferencia de Claude o Gemini que adoptan el estándar abierto **MCP (Model Context Protocol)**, GitHub Copilot utiliza su propio ecosistema de extensiones y contexto dentro de VS Code y la CLI.

Aunque no usa "MCP" estrictamente, en este curso configuraremos Copilot para que tenga **Contexto Aumentado** de tu proyecto, similar a lo que logramos con MCP en otras herramientas.

## Estrategia de Contexto

Para que Copilot sea un "QA Augmented", necesita ver más allá del archivo abierto. Necesita ver tu base de datos, tus logs y tu documentación.

### 1. Copilot Workspace (VS Code)

La forma más potente de usar Copilot en el curso es a través del chat lateral (`Ctrl+I` o Panel de Chat).

**Habilitar Indexación de Proyecto:**
Asegúrate de que Copilot ha indexado tu repositorio local. Esto le permite entender la estructura completa de carpetas (similar al MCP de Filesystem).

**Uso de `@workspace`:**
Siempre que hagas una pregunta sobre arquitectura o busques bugs globales, inicia tu prompt con:
```text
@workspace ¿Dónde se definen los tests de regresión en este proyecto?
```

### 2. Conexión con Base de Datos (SQL)

Copilot no se conecta "en vivo" a la base de datos para ejecutar queries (por seguridad), pero puede entender tu esquema si tienes los archivos DDL (Data Definition Language) o modelos ORM abiertos.

**Truco para el Curso:**
1. Mantén abierto tu archivo `schema.sql` o `types.ts` (donde definas los modelos de datos).
2. Pregunta a Copilot: *"Genera una query SQL para validar que el usuario X fue creado"*
3. Copilot usará el contexto del archivo abierto para generar la query correcta con los nombres de tablas reales.

### 3. Conexión con Terminal (Logs)

Copilot ahora se integra en la terminal de VS Code.

**Análisis de Errores:**
1. Ejecuta tus tests y espera a que fallen.
2. Selecciona el texto del error en la terminal.
3. Haz clic derecho -> `Copilot: Explain This` (o usa las chispas ✨).
4. Copilot analizará el stack trace y sugerirá la corrección.

## Extensiones Recomendadas para "Simular" MCP

Para lograr capacidades similares a los MCPs de otras IAs, instala estas extensiones en VS Code junto con Copilot:

| Capa | Extensión VS Code | Propósito |
| :--- | :--- | :--- |
| **API** | **Postman** / **Thunder Client** | Copilot puede generar cuerpos JSON basados en la UI de estas extensiones. |
| **DB** | **SQLTools** o **Supabase** | Permite ejecutar las queries que Copilot genera dentro del editor. |
| **Docs** | **Markdown All in One** | Ayuda a Copilot a formatear mejor la documentación de QA. |

## Comparativa: Copilot vs MCP

| Característica | MCP (Claude/Gemini) | GitHub Copilot |
| :--- | :--- | :--- |
| **Acceso a Archivos** | Directo (Server Filesystem) | Vía `@workspace` (Indexación) |
| **Ejecución Real** | Sí (puede ejecutar queries/scripts) | No (solo sugiere código, tú ejecutas) |
| **Seguridad** | Configurable por herramienta | Muy alta (Sandbox) |
| **Uso en Curso** | Ideal para agentes autónomos | Ideal para "Pair Programming" asistido |

## Resumen del Flujo de Trabajo

En las fases del curso (ej: Fase 6 Exploratory Testing):

1. **Usa Copilot** para *generar* los casos de prueba o las queries SQL.
   - *"Genera un script de Playwright para probar el Login"*
2. **Ejecuta tú mismo** el código generado en la terminal o herramienta correspondiente.
3. **Usa Copilot** para *analizar* los resultados o errores.

Aunque no ejecuta por sí solo (como un Agente MCP), es el asistente más rápido para escribir el código que tú ejecutarás.
