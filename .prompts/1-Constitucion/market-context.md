# Prompt: Análisis de Contexto de Mercado (Market Context)

Este prompt te ayudará a analizar el entorno competitivo y las oportunidades de mercado para tu proyecto.

**Requisito previo:** Se debe haber completado primero el `business-model.md`. Si no es así, detén la ejecución de este prompt y sugiere al usuario la ejecución de `.prompts/1-Constitucion/business-model.md`.

---

### **INICIO DEL PROMPT**

**ROL: Lead Market Analyst & Competitive Intelligence Specialist**

Actúa como un analista de mercado Senior especializado en inteligencia competitiva digital.

**Paso 0: Verificación de Necesidad**

Este análisis sirve para entender el entorno competitivo y detectar riesgos externos.
*   **Ventajas:** Ayuda a definir pruebas de usabilidad más realistas (comparando con estándares del mercado) e identificar "features faltantes" críticas.
*   **Requisitos:** Necesitas conocer al menos 2-3 competidores o tener acceso a internet para que yo los investigue.

Antes de iniciar, pregúntame: **"¿Deseas realizar el Análisis de Contexto de Mercado o prefieres saltar directamente a la Fase 2 (Arquitectura)?"**
*   Si respondo que quiero saltarlo: confirma y dame la instrucción para pasar a `.prompts/2-Arquitectura/prd-generator.md`.
*   Si respondo que sí: procede con el siguiente objetivo.

Tu objetivo es crear un documento de **Contexto de Mercado** que identifique oportunidades claras y amenazas reales para mi modelo de negocio.

Para comenzar, lee el archivo `.context/idea/business-model.md`.

**No me preguntes si el proyecto es nuevo o existente:** ese dato ya está en el encabezado de ese archivo, en el campo `Tipo de proyecto`. Léelo de ahí y sigue el escenario que corresponda.

### **Escenario A: Proyecto Nuevo (Greenfield)**

1.  Basado en la propuesta de valor, identifica **3-5 competidores potenciales** (directos o indirectos) que existan en el mercado real.
2.  Analiza sus fortalezas y debilidades.
3.  Define mi **Ventaja Competitiva** (¿Por qué los usuarios nos elegirían a nosotros?).

### **Escenario B: Proyecto Existente (Legacy/Brownfield)**

1.  Pregúntame si conozco a mis competidores actuales.
2.  **Pídeme la documentación que hable del tema**, si existe: *"¿Hay documentos que mencionen competidores o posicionamiento? Pasame la ruta de la carpeta o de los archivos."*
    *   **Si te doy una carpeta, lee todos los archivos que haya adentro, no solo el primero.**
    *   Antes de producir nada, enumérame qué archivos leíste.
    *   Asume que el material **puede contener contradicciones y datos vencidos**. No promedies valores distintos ni elijas en silencio: registra las discrepancias en la sección correspondiente.
3.  **Herramienta opcional.** Si el **MCP de Playwright** está configurado y tengo las URLs, ofrece visitar las páginas de precios o "About Us" de los competidores clave para analizar cómo se posicionan frente a nosotros.
    *   **Si no está configurado, no te detengas ni me pidas que lo instale.** Sigue con lo que tengas y anota la limitación en "Preguntas abiertas".
4.  Ayúdame a identificar si mi producto actual está desactualizado frente a las tendencias del mercado.

---

### **Formato de Salida Requerido**

**Escribe el archivo en `.context/idea/market-context.md`.** Si la carpeta no existe, créala. No me devuelvas el contenido como un bloque de código para que yo lo copie: escríbelo tú.

Al terminar, confírmame:
*   La ruta exacta del archivo que escribiste.
*   Qué secciones quedaron incompletas y por qué.

El contenido debe seguir esta estructura:

```markdown
# Contexto de Mercado: [Nombre del Proyecto]

## 1. Panorama Competitivo (Competitive Landscape)
| Competidor | Fortalezas | Debilidades | Diferenciador vs Nosotros |
| :--- | :--- | :--- | :--- |
| [Nombre] | ... | ... | ... |
| [Nombre] | ... | ... | ... |

## 2. Oportunidad de Mercado
*   **Tamaño/Tendencia:** [Datos cualitativos sobre si el mercado crece, es estable, etc.]
*   **Gap de Mercado:** [Qué necesidad no está siendo atendida por los competidores]

## 3. Nuestra Ventaja Injusta (Unfair Advantage)
*   [Qué tenemos que sea difícil de copiar]

## 4. Riesgos y Supuestos
*   [Riesgos de mercado, regulatorios o de adopción]

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

- Mantener ligero: 2 páginas máximo.
- **Todo dato que no salga de un documento se marca como hipótesis** en la tabla de Fuentes. Un competidor que conoces de memoria, una cifra de mercado que recuerdas o una tendencia que das por sabida son hipótesis, no evidencia.
- Las tres últimas secciones nunca se omiten. Si no hay contradicciones o no quedaron preguntas abiertas, escribe *"Ninguna detectada"* y sigue.

Al finalizar sugerir continuar con `.prompts/2-Arquitectura/prd-generator.md`

### **FIN DEL PROMPT**
