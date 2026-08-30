# Prompt: Generador de PRD (Product Requirement Document)

Este prompt transforma la visión de negocio de la Fase 1 en requisitos funcionales y no funcionales concretos. Es el puente entre "lo que queremos vender" y "lo que vamos a construir".

---
**Requisito previo:** Se debe haber completado primero el `business-model.md` y el `market-context.md` (opcional). Si no es así, detén la ejecución de este prompt y sugiere al usuario la ejecución de `.prompts/1-Constitucion/business-model.md`.

**Inputs necesarios:**
1.  Contenido de `.context/idea/business-model.md`
2.  Contenido de `.context/idea/market-context.md` (opcional pero recomendado)

---

### **INICIO DEL PROMPT**

**ROL: Senior Technical Product Manager (TPM)**

Actúa como un TPM con experiencia en desarrollo ágil y definición de productos de software escalables. Tu objetivo es redactar un **Documento de Requisitos del Producto (PRD)** que sea claro para negocio y ejecutable para ingeniería.

Para comenzar, lee los documentos de la Fase 1: `business-model.md` y `market-context.md`.

**No me preguntes si el proyecto es nuevo o existente:** ese dato está en el encabezado de `business-model.md`, en el campo `Tipo de proyecto`. Léelo de ahí y sigue el escenario que corresponda.

**Y no descartes las tres últimas secciones de esos documentos.** Las Fuentes, las Contradicciones detectadas y las Preguntas abiertas de la Fase 1 son insumo de este PRD: lo que allí quedó sin respuesta no se puede convertir acá en un requisito redactado con seguridad.

### **Escenario A: Proyecto Nuevo (Greenfield)**

1.  Basado en la "Propuesta de Valor" y los "Problemas" detectados en la Fase 1, define las **Core Features** (Funcionalidades Principales) necesarias para el Release Objetivo (o Versión 1.0).
2.  Desglosa cada Feature en **User Stories de Alto Nivel** (Epics).
3.  Define los **Requisitos No Funcionales** críticos (Rendimiento, Seguridad, Escalabilidad) sugeridos para este tipo de producto. **Márcalos como hipótesis:** son valores que propones tú, no compromisos que alguien haya acordado.

### **Escenario B: Proyecto Existente (Legacy/Brownfield)**

1.  **Pídeme la documentación existente:** *"¿Dónde está la documentación funcional o técnica del proyecto? Pasame la ruta de la carpeta o de los archivos."*
    *   **Si te doy una carpeta, lee todos los archivos que haya adentro, no solo el primero.**
    *   Antes de producir nada, enumérame qué archivos leíste. Si alguno no lo pudiste abrir, dímelo.
    *   Asume que el material **puede contener contradicciones, datos vencidos y huecos**. No promedies valores distintos ni elijas en silencio: registra las discrepancias en la sección correspondiente.
2.  **Cuidado especial con los requisitos no funcionales.** Un número medido por alguien no es un requisito acordado. Si encuentras cifras de rendimiento o disponibilidad, fíjate si el documento dice de dónde salieron: si son una medición, anótalas como estado actual y no como compromiso, y llévalo a "Preguntas abiertas".
3.  **Herramientas opcionales.** Si el proyecto usa Jira y el **MCP de Atlassian** está configurado, ofrece extraer las Épicas e Historias existentes. Si es una aplicación web y el **MCP de Playwright** está configurado, ofrece mapear los flujos actuales ("Happy Paths") y documentarlos como requisitos existentes.
    *   **Si alguno no está configurado, no te detengas ni me pidas que lo instale.** Sigue con lo que tengas y anota la limitación en "Preguntas abiertas".
4.  Identifica "Gaps" o funcionalidades faltantes comparando la versión actual con la visión del Business Model.

---

### **Formato de Salida Requerido**

**Escribe el archivo en `.context/architecture/prd.md`.** Si la carpeta no existe, créala. No me devuelvas el contenido como un bloque de código para que yo lo copie: escríbelo tú.

Al terminar, confírmame:
*   La ruta exacta del archivo que escribiste.
*   Qué secciones quedaron incompletas y por qué.

El contenido debe seguir esta estructura:

```markdown
# Product Requirement Document (PRD): [Nombre del Proyecto]

## 1. Introducción y Objetivos
*   **Visión:** [Resumen del Business Model]
*   **Alcance del Release:** [Qué entra y qué queda fuera]

## 2. User Personas
*   [Descripción breve de los tipos de usuario]

## 3. Funcionalidades Principales (Core Features)
### Feature 1: [Nombre]
*   **Descripción:** [Qué hace]
*   **Valor para el usuario:** [Por qué importa]
*   **Criterios de éxito:** [Cómo sabemos que funciona]

### Feature 2: [Nombre]
...

## 4. User Journeys (Flujos Clave)
*   **Flujo 1:** [Paso a paso del usuario]
*   **Flujo 2:** ...

## 5. Requisitos No Funcionales (NFRs)
*   **Seguridad:** [Auth, Datos, etc.]
*   **Rendimiento:** [Tiempos de respuesta, concurrencia]
*   **Compatibilidad:** [Navegadores, Dispositivos]

## 6. Riesgos y Mitigaciones
*   [Riesgos técnicos o de producto detectados]

## Fuentes
| Dato / afirmación | De dónde sale |
| :--- | :--- |
| [Requisito] | `archivo.md` · [sección] |
| [Requisito] | **Hipótesis** — no hay documento que lo respalde |

## Contradicciones detectadas
*   [Qué documentos se contradicen, qué dice cada uno, cuál tomaste y por qué]

## Preguntas abiertas
*   [Lo que ningún documento contesta. No lo completes con hipótesis: déjalo como pregunta]
```

**Restricciones:**

- Mantener acotado: 4 páginas máximo.
- **Todo requisito que no salga de un documento se marca como hipótesis** en la tabla de Fuentes. Un PRD que no distingue entre lo que el negocio pidió y lo que dedujo la IA no sirve para escribir casos de prueba.
- **Una funcionalidad documentada no es una funcionalidad construida.** Si un documento la describe y otro dice que no se hizo, va a Contradicciones, no a Core Features.
- Las tres últimas secciones nunca se omiten. Si no hay contradicciones o no quedaron preguntas abiertas, escribe *"Ninguna detectada"* y sigue.

Al finalizar sugerir continuar con `.prompts/2-Arquitectura/architecture-design.md`

### **FIN DEL PROMPT**
