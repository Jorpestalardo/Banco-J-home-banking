# Prompt: Priorización y ROI de Automatización

Este prompt te ayuda a decidir inteligentemente: ¿qué automatizamos y qué dejamos manual? Basado en el Retorno de Inversión (ROI).

**Requisito previo:** Se debe haber completado `analisis-escenarios.md`. Si no existe, detén la ejecución de este prompt y sugiere al usuario la ejecución de `.prompts/7-Documentacion CPs/test-analysis.md`.

**Inputs necesarios:**
1.  Contenido de `.context/testing/documentation/[ID-US]/analisis-escenarios.md`
2.  Contenido de `.context/testing/test-plan-[nombre-epic].md` (matriz de riesgos)

---

### **INICIO DEL PROMPT**

**ROL: Test Manager**

Actúa como un Gerente de Pruebas enfocado en la eficiencia y el Retorno de Inversión (ROI). Tu objetivo es tomar decisiones estratégicas sobre qué pruebas deben ser automatizadas, cuáles deben permanecer manuales y cuáles pueden ser descartadas, optimizando los recursos del equipo.

Primero, lee `.context/testing/documentation/[ID-US]/analisis-escenarios.md`. Ahí está la lista de candidatos: **no me pidas que te la pegue.** Si hay análisis de varias historias, muéstrame la lista y déjame elegir.

Lee también `.context/testing/test-plan-[nombre-epic].md`. **La criticidad ya está calculada ahí**, en la matriz de riesgos de la Fase 5: no la vuelvas a estimar de cero. Si un escenario mitiga un riesgo de nivel alto, su criticidad es alta, y la justificación cita ese riesgo por su ID.

Si el plan de pruebas no existe, sigue igual, pero anota que la criticidad se estimó sin la matriz de riesgos.

### **Cálculo de ROI (Score 0-3)**
Para cada escenario, evalúa:
1.  **Frecuencia (0-1):** ¿se ejecutará en cada release? (1 = Sí, 0 = No).
2.  **Criticidad (0-1):** ¿si falla, perdemos dinero o clientes? (1 = Alto, 0 = Bajo). **Sale de la matriz de riesgos.**
3.  **Complejidad de automatizar (0-1):** inverso. ¿Es fácil de scriptear? (1 = Fácil, 0 = Difícil o inestable).

*Fórmula:* `Score = Frecuencia + Criticidad + Complejidad`

### **Reglas de Decisión**
*   **Score > 2.5:** **Candidato a automatización** (prioridad alta).
*   **Score 1.5 - 2.5:** **Regresión manual** (automatizar más adelante si sobra tiempo).
*   **Score < 1.5:** **Ad-hoc o descartado** (no documentar, o mantener al mínimo).

> ⚠️ **Una excepción que conviene respetar.** Un escenario que salió de un **hueco de
> cobertura** —un criterio de aceptación que nunca se probó— no puede quedar descartado por
> score bajo. Todavía no se sabe si funciona: primero se prueba una vez, después se decide
> si vale automatizarlo. Márcalo como **Probar antes de decidir**.

---

### **Formato de Salida Requerido**

**Escribe el archivo en `.context/testing/documentation/[ID-US]/priorizacion-roi.md`.** Si la carpeta no existe, créala. No me devuelvas el contenido como un bloque de código para que yo lo copie: escríbelo tú.

Al terminar, confírmame:
*   La ruta exacta del archivo que escribiste.
*   Cuántos escenarios quedaron en cada categoría.
*   Si algún escenario quedó como "Probar antes de decidir".

El contenido debe seguir esta estructura:

```markdown
# Priorización de Pruebas: [Historia]

**Historia:** [ID-US]
**Fecha:** [fecha]
**Matriz de riesgos usada:** [ruta del test-plan, o "No disponible"]

## Matriz de Priorización
| # | Escenario | Frec. | Crit. | Compl. | Score | Decisión | Justificación |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Flujo de compra | 1 | 1 | 0.8 | 2.8 | AUTOMATIZAR | Crítico y frecuente. Mitiga R1 |
| 2 | Validación de color | 0.2 | 0 | 1 | 1.2 | MANUAL | Visual, difícil de automatizar |
| 3 | [Criterio sin cubrir] | — | — | — | — | PROBAR ANTES DE DECIDIR | Nunca se ejecutó |

## Resumen
*   **Candidatos a automatización:** [n]
*   **Regresión manual:** [n]
*   **Probar antes de decidir:** [n]
*   **Descartados:** [n]

## Trazabilidad
| Historia (US) | Caso / escenario | Riesgo mitigado | Origen |
| :--- | :--- | :--- | :--- |
| [ID-US] | [Escenario] | [R1 del test-plan, o "—"] | `analisis-escenarios.md` |

## Sin cobertura
*   [Escenarios que no se pudieron puntuar y por qué]
```

**Restricciones:**

- **La criticidad se cita, no se inventa.** Si sale de la matriz de riesgos, nombra el riesgo. Si la estimaste tú porque no había matriz, dilo en la justificación.
- **Un escenario nunca ejecutado no se descarta por score.** Va a "Probar antes de decidir".
- Las dos últimas secciones nunca se omiten. Si no quedó nada sin cubrir, escribe *"Ninguna"* y sigue.

Al finalizar, sugerir documentar los casos seleccionados con `.prompts/7-Documentacion CPs/test-documentation.md`

### **FIN DEL PROMPT**
