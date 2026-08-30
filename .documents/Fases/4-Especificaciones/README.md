# Fase 4: Especificaciones (Backlog)

## 🎯 Objetivo de la Fase
Crear y refinar las **Historias de Usuario** que guiarán el desarrollo y las pruebas. Aquí traducimos el PRD en tareas accionables.

## 🔑 Conceptos Clave

### 1. INVEST
Criterios de calidad para una User Story:
*   **I**ndependent (Independiente)
*   **N**egotiable (Negociable)
*   **V**aluable (Valiosa)
*   **E**stimable (Estimable)
*   **S**mall (Pequeña)
*   **T**estable (Testeable)

### 2. Gherkin (BDD)
Lenguaje estructurado para definir criterios de aceptación:
*   **Given:** Contexto inicial.
*   **When:** Acción del usuario.
*   **Then:** Resultado esperado.

### 3. Jira-First Workflow
La fuente de la verdad es Jira. La carpeta local `.context/PBI/` es un espejo para que la IA pueda analizar el backlog.

**Pero Jira no bloquea la fase.** Si todavía no hay proyecto en Jira, o el MCP no responde, los prompts escriben igual el backlog local con IDs temporales (`PBI-01`) y marcan cada archivo con `Estado de sincronización: PENDIENTE DE SUBIR A JIRA`. El índice `epic-tree.md` lleva la lista de lo que queda por subir. Se trabaja igual, y no se pierde el rastro de lo que falta sincronizar.

### 4. Reconstruir no es planificar

En un proyecto **Brownfield** el software llegó antes que el papel: la funcionalidad existe y lo que falta es la especificación que explique qué se esperaba de ella. Ahí el backlog no es un plan de construcción, es una **reconstrucción**, y aparecen dos cosas que un proyecto nuevo no tiene:

*   **Un tercer tipo de fuente.** Además de *documentado* e *hipótesis*, existe **`Observado`**: un dato verificado en la aplicación, con entorno, fecha y evidencia.
*   **Un estado de implementación** por historia — `Implementada`, `Parcial`, `No encontrada` o `Sin verificar` —, porque que una historia esté escrita no significa que esté construida.

> **Ninguno de los dos es un campo de la herramienta de gestión, y no hace falta crearlos:** viven en el `story.md`. El tablero lleva el estado del trabajo; el archivo lleva de dónde salió cada afirmación. Lo único que se refleja en el ticket es la etiqueta `sin-verificar`, que funciona en cualquier plan y no necesita permisos de administrador.

> ⚠️ **Y la regla que sostiene todo esto: observado no es acordado.** Que el sistema haga algo no significa que deba hacerlo. Un defecto documentado como criterio de aceptación deja de ser un defecto para siempre, porque el papel pasa a decir que funciona así.

### 5. Identificar no es desglosar

Son dos trabajos distintos y conviene no hacerlos juntos.

**Identificar las Epics es barato y da el mapa completo**: hay que hacerlo entero siempre, porque una Epic que nadie listó es trabajo que nadie va a estimar. **Desglosarlas en historias es caro**, y se puede hacer de a una por sesión.

Por eso `pbi-product-backlog.md` pregunta el alcance antes de empezar, y `epic-tree.md` lleva la lista de las Epics **identificadas y pendientes de desglosar**. Volver a correr el prompt retoma desde ahí en lugar de rehacer todo.

> El alcance **no depende del tipo de proyecto**. Un proyecto nuevo con un PRD grande también conviene desglosarlo por etapas.

## 🛠️ Herramientas Utilizadas
*   **Prompts de IA:** `pbi-product-backlog.md`, `refine-stories.md`, `pbi-add-feature.md`.
*   **Skill `documentar-historia`:** explora la aplicación con el navegador y escribe la historia de una funcionalidad que ya está construida y no está documentada en ningún lado. Trae el formato del entregable en `plantilla-historia.md` y un verificador que comprueba que cada afirmación observada tenga su captura.
*   **Jira / Atlassian MCP:** Para gestión de tickets nativos.


## 📝 Entregables Esperados
Al finalizar esta fase, tendrás en tu carpeta `.context/PBI/`:
1.  Un **Backlog** priorizado en Jira y localmente.
2.  Historias de Usuario refinadas con **Criterios de Aceptación en Gherkin**.
3.  El **estado de implementación** de cada historia, y la lista explícita de las que nadie fue a verificar todavía.
4.  El **mapa completo de Epics**, incluidas las que quedaron identificadas y sin desglosar — con de dónde sale cada una.
