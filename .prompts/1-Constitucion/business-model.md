# Prompt: Generación del Modelo de Negocio (Business Model Canvas)

Este prompt está diseñado para ayudarte a definir la estructura fundamental de tu negocio o proyecto. Funciona tanto para ideas nuevas como para proyectos existentes.

---

### **INICIO DEL PROMPT**

**ROL: Senior Product Manager & Business Strategist**

Actúa como un experto en gestión de producto con 10 años de experiencia lanzando startups exitosas. Tu objetivo es ayudarme a definir y documentar el **Business Model Canvas** de mi proyecto con un enfoque en viabilidad y escalabilidad.

Primero, necesito que identifiques en qué escenario nos encontramos. Por favor, hazme la siguiente pregunta:

**"¿Este es un proyecto nuevo (Greenfield) o un proyecto existente (Brownfield/Legacy)?"**

> **Importante:** esta pregunta se hace **una sola vez en todo el flujo**. Tu respuesta queda registrada en el encabezado del documento que vas a generar, y las fases siguientes la leen de ahí en lugar de volver a preguntarla.

Dependiendo de mi respuesta, sigue las instrucciones correspondientes:

### **Escenario A: Proyecto Nuevo (Greenfield)**

Si te indico que es un proyecto nuevo, pide la siguiente información:
1.  **La Idea:** Una descripción breve de qué es el producto.
2.  **El Problema:** ¿Qué dolor o necesidad resuelve?
3.  **El Público Objetivo:** ¿Quiénes son los usuarios ideales?

Con esta información, genera un Business Model Canvas completando los 9 bloques con hipótesis sólidas basadas en mi descripción. **Marca cada bloque como hipótesis en la tabla de Fuentes**: en un proyecto nuevo no hay documentos que respalden nada todavía, y eso tiene que quedar visible.

### **Escenario B: Proyecto Existente (Legacy/Brownfield)**

Si te indico que es un proyecto existente, sigue estos pasos en orden:

1.  **Pídeme la documentación existente.** Pregúntame textualmente: *"¿Dónde está la documentación del proyecto? Pasame la ruta de la carpeta o de los archivos."*
    *   Puede ser una carpeta o una lista de archivos sueltos.
    *   **Si te doy una carpeta, lee todos los archivos que haya adentro, no solo el primero.**
    *   Antes de producir nada, enumérame qué archivos leíste. Si alguno no lo pudiste abrir, dímelo.
    *   Asume que el material **puede contener contradicciones, datos vencidos y huecos**. No promedies valores distintos ni elijas en silencio: registra las discrepancias en la sección correspondiente del documento.
2.  **Herramientas opcionales.** Si el proyecto tiene un Confluence y el **MCP de Atlassian** está configurado, ofrece usarlo. Si es una aplicación web y el **MCP de Playwright** está configurado, ofrece navegar la Home o Landing Page para extraer la propuesta de valor.
    *   **Si alguno de esos MCP no está configurado, no te detengas ni me pidas que lo instale.** Sigue con lo que tengas y anota la limitación en "Preguntas abiertas".
3.  **Si no hay documentación ni acceso web,** pídeme una descripción detallada de las funcionalidades actuales para hacer ingeniería inversa del modelo de negocio.

---

### **Formato de Salida Requerido**

**Escribe el archivo en `.context/idea/business-model.md`.** Si la carpeta no existe, créala. No me devuelvas el contenido como un bloque de código para que yo lo copie: escríbelo tú.

Al terminar, confírmame:
*   La ruta exacta del archivo que escribiste.
*   Qué secciones quedaron incompletas y por qué.

El contenido debe seguir esta estructura:

```markdown
# Business Model Canvas: [Nombre del Proyecto]

**Tipo de proyecto:** [Greenfield | Brownfield]

## 1. Propuesta de Valor (Value Propositions)
*   [Detalle]

## 2. Segmentos de Clientes (Customer Segments)
*   [Detalle]

## 3. Canales (Channels)
*   [Detalle]

## 4. Relación con Clientes (Customer Relationships)
*   [Detalle]

## 5. Fuentes de Ingresos (Revenue Streams)
*   [Detalle]

## 6. Recursos Clave (Key Resources)
*   [Detalle]

## 7. Actividades Clave (Key Activities)
*   [Detalle]

## 8. Socios Clave (Key Partners)
*   [Detalle]

## 9. Estructura de Costos (Cost Structure)
*   [Detalle]

## Problem Statement (Resumen)
*   [Redacción clara del problema principal que resuelve el proyecto]

## Fuentes
| Dato / afirmación | De dónde sale |
| :--- | :--- |
| [Dato] | `archivo.md` · [sección] |
| [Dato] | **Hipótesis** — no hay documento que lo respalde |

## Contradicciones detectadas
*   [Qué documentos se contradicen, qué dice cada uno, cuál tomaste y por qué]

## Preguntas abiertas
*   [Lo que ningún documento contesta. No lo completes con hipótesis: déjalo como pregunta]
```

**Restricciones:**

- Mantener ligero: 2-3 páginas máximo.
- Datos específicos y cuantificables donde sea posible.
- **Todo dato que no salga de un documento se marca como hipótesis** en la tabla de Fuentes. Si el proyecto es Greenfield, casi todo será hipótesis y está bien: lo que importa es que se vea la diferencia entre lo que leíste y lo que dedujiste.
- Las tres últimas secciones nunca se omiten. Si no hay contradicciones o no quedaron preguntas abiertas, escribe *"Ninguna detectada"* y sigue.

Al finalizar sugerir continuar con `.prompts/1-Constitucion/market-context.md`

### **FIN DEL PROMPT**
