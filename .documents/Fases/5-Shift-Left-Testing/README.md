# Fase 5: Shift-Left Testing

## 🎯 Objetivo de la Fase
Mover las actividades de prueba "a la izquierda" en la línea de tiempo: encontrar los defectos en los requisitos, antes de gastar una sola ejecución en probarlos. Aquí prevenimos defectos en lugar de solo detectarlos. Tambien se hace una valoracion o calificacion de cada CP propuesto en las US para la etapa de documentacion.

> 🔄 **"Antes" no siempre quiere decir "antes de que exista el código".** En un proyecto nuevo sí: se inspecciona antes de desarrollar. En uno que ya está construido, la izquierda es otra — se inspecciona **antes de escribir el primer caso de prueba**, porque probar contra un requisito ambiguo es gastar el trabajo dos veces.
>
> Y cuando el software ya existe, la inspección gana una referencia más: además de contrastar la historia contra el PRD, se la contrasta contra **lo que la aplicación realmente hace**. Si no coinciden, es un hallazgo — y todavía no sabés si está mal el sistema o el requisito.

## 🔑 Conceptos Clave

### 1. Inspección Estática
Analizar los requisitos (User Stories) buscando:
*   **Ambigüedades:** Palabras vagas ("rápido", "fácil").
*   **Lagunas:** Casos no cubiertos (errores, desconexión).
*   **Contradicciones:** Reglas que chocan entre sí.

### 2. Risk-Based Testing (RBT)
No se puede probar todo exhaustivamente. Priorizamos basándonos en:
*   **Probabilidad:** ¿Qué tan probable es que falle?
*   **Impacto:** ¿Qué tan grave es si falla?

### 3. Estrategia de Prueba (Test Strategy)
Definir **qué** tipos de pruebas (Unitarias, Integración, E2E) y **con qué** herramientas se abordará cada Epic.

## 🛠️ Herramientas Utilizadas
*   **Prompts de IA:** `requirement-inspection.md`, `test-plan-generator.md`.

## 📝 Entregables Esperados
Al finalizar esta fase tendrás:

| Archivo | Lo escribe |
| :--- | :--- |
| `.context/testing/inspections/inspeccion-[ID-US].md` | `requirement-inspection.md` |
| `.context/testing/test-plan-[nombre-epic].md` | `test-plan-generator.md` |

Y además **User Stories corregidas**: las mejoras detectadas se aplican directamente en la fuente (Jira o el `story.md` local), cerrando el ciclo de calidad. Si Jira no está disponible, la corrección queda igual en el reporte, marcada como pendiente de subir.
