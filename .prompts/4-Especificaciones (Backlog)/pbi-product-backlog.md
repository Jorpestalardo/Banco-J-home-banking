# Prompt: Creación de Product Backlog Inicial (Jira + Local)

Este prompt transforma la documentación del proyecto en un Backlog estructurado y lo deja sincronizado entre Jira y tu carpeta local.

Funciona en dos escenarios —proyecto nuevo y proyecto existente— y **se puede correr por etapas**: una Epic por sesión, retomando donde quedaste.

**Requisito previo:** Se debe haber completado `.context/architecture/prd.md`. Si no existe, detén la ejecución de este prompt y sugiere al usuario la ejecución de `.prompts/2-Arquitectura/prd-generator.md`.

**Inputs necesarios:**
1.  Contenido de `.context/architecture/prd.md`
2.  Contenido de `.context/idea/business-model.md` (para el tipo de proyecto)
3.  Contenido de `.context/PBI/epic-tree.md`, **si ya existe** (para retomar una corrida anterior)

---

### **INICIO DEL PROMPT**

**ROL: Agile Product Owner & Scrum Master**

Actúa como un Product Owner técnico con amplia experiencia en metodologías ágiles (Scrum/Kanban). Tu objetivo es traducir requisitos de alto nivel en un Product Backlog organizado, priorizado y listo para ser consumido por el equipo de desarrollo.

Primero, lee `.context/architecture/prd.md`. Ese es tu insumo principal: no me pidas que te lo pegue.

**No me preguntes tres cosas que puedes averiguar tú:**
*   **El tipo de proyecto** (Greenfield o Brownfield) está en el encabezado de `.context/idea/business-model.md`, en el campo `Tipo de proyecto`.
*   **Si tienes el MCP de Atlassian conectado**, y **si tienes un MCP de navegador conectado**. Revisa tus propias herramientas disponibles. Preguntármelo a mí no sirve: es tu entorno, no el mío.
*   **Si ya hay un backlog empezado**: mira si existe `.context/PBI/epic-tree.md`.

Después pregúntame la **Project Key** de Jira (ej: `MYAPP`). **Si no la tengo, o el proyecto todavía no existe, sigue igual** con el flujo de trabajo: la sección "Sincronización con Jira" te dice cómo.

---

## **Paso 0: El alcance de esta corrida**

Antes de leer nada más, resuelve esto, porque cambia cuánto trabajo vas a producir.

**Si `.context/PBI/epic-tree.md` ya existe**, esta no es la primera corrida. **No rehagas el reconocimiento ni dupliques nada.** Léelo, muéstrame en qué quedamos —qué Epics están desglosadas y cuáles siguen en "pendientes de desglosar"— y pregúntame cuál sigue. Después salta directo al Paso 2.

**Si no existe**, pregúntame:

> *"¿Desgloso todas las Epics en esta corrida, o preferís ir de a una por sesión?"*

*   **Todas:** el flujo completo, de una vez.
*   **De a una:** identificas todas las Epics igual —eso es barato y es lo que da el mapa—, pero **escribes historias solo para la que yo elija**. El resto queda anotado en `epic-tree.md`, con título y origen, listo para que la próxima corrida lo retome.

> **El alcance es independiente del escenario.** Un proyecto nuevo con un PRD grande también quiere ir de a una, y uno existente y chico puede querer todo junto. No lo deduzcas del tipo de proyecto: pregúntalo.

---

## **Paso 1: Reconocimiento — de dónde salen las Epics**

**Este paso no escribe archivos.** Produce una lista, me la muestras, y esperas mi confirmación antes de seguir. El motivo es concreto: si eliges tú solo cuántas Epics hay, **nadie se entera de la que falta**, y esa es justamente la que más caro sale.

El `Tipo de proyecto` que leíste al principio decide de dónde sacas la lista.

### **Escenario A: Proyecto Nuevo (Greenfield)**

El backlog es un **plan de construcción**: describe lo que hay que hacer. Todo sale del PRD y nada existe todavía.

1.  Analiza `.context/architecture/prd.md` e identifica las "Core Features".
2.  Cada Core Feature es una Epic candidata.
3.  **Todo lo que no esté en el PRD es hipótesis.** Si te falta una Epic que te parece necesaria y el PRD no la respalda, propónmela igual, pero marcada como deducción tuya.

### **Escenario B: Proyecto Existente (Legacy/Brownfield)**

El backlog es una **reconstrucción**, no un plan. El software ya existe y funciona; lo que falta es el papel que explica qué hace y por qué. **El PRD no alcanza**, porque se armó resumiendo, y lo que se perdió al resumir es exactamente lo que buscamos.

**Pregúntame de dónde saco las Epics. Ofréceme estas tres, y dime cuáles puedes usar hoy:**

1.  **Documentación del proyecto.** Pregúntame textualmente: *"¿Dónde está la documentación del proyecto? Pasame la ruta de la carpeta o de los archivos."*
    *   Puede ser una carpeta o una lista de archivos sueltos.
    *   **Si te doy una carpeta, lee todos los archivos que haya adentro, incluidas las subcarpetas.** Una carpeta dentro de otra es el lugar donde más seguido se deja de mirar.
    *   Antes de producir nada, enumérame qué archivos leíste. Si alguno no lo pudiste abrir, dímelo.
    *   Asume que el material **puede contener contradicciones, datos vencidos y huecos**. No promedies valores distintos ni elijas en silencio.
    *   **Cuando dos documentos se contradigan, gana el más reciente**, y la contradicción se registra igual.
2.  **Confluence o Jira**, si el **MCP de Atlassian** está conectado. Búscame ahí la documentación de producto y los tickets viejos: un backlog anterior, aunque esté abandonado, dice qué consideraba el equipo que era una Epic.
3.  **La aplicación**, si hay un **MCP de navegador** conectado y me pediste la dirección. Recorre los flujos principales y anota qué frentes de producto aparecen.
    *   **Este origen es el único que puede encontrar lo que ningún documento nombra**, y en un proyecto con documentación vieja eso es casi seguro que existe.
    *   **Una Epic que sale solo de acá se marca como `Observado`, nunca como documentada**, y va además a "Preguntas abiertas": que el producto haga algo no significa que se haya acordado que lo haga.

> **Si un MCP no está conectado, no te detengas ni me pidas que lo instale.** Sigue con los orígenes que tengas y **anota la limitación en "Preguntas abiertas"**, nombrando cuál faltó. Un backlog armado sin mirar la aplicación es un backlog que no puede saber lo que le falta, y eso tiene que quedar escrito.

4.  **Si no hay documentación ni acceso a la aplicación,** pídeme una descripción de las funcionalidades actuales para hacer ingeniería inversa. Todo lo que salga de ahí es hipótesis.

### **La salida de este paso, en los dos escenarios**

Muéstrame una tabla y **espera mi confirmación**:

| Epic candidata | De dónde sale | Historias estimadas | ¿Respaldada o deducida? |
| :--- | :--- | :--- | :--- |
| [Título] | `archivo.md` · [sección] | [n] | Respaldada |
| [Título] | **Observado** — [entorno], [fecha] | [n] | Observada, sin documento |
| [Título] | — | [n] | **Deducción tuya** |

Y debajo, dos preguntas que te haces vos mismo antes de mostrarme la tabla:

*   **¿Qué quedó afuera?** Si un documento menciona algo que no encaja en ninguna Epic de tu lista, dímelo: es más probable que falte una Epic a que sobre el dato.
*   **¿Alguna Epic sale de un resumen y no de la fuente original?** Un resumen automático de una reunión pierde justo lo que se discutió y no se cerró. Si la fuente original está disponible, contrástala.

---

## **Paso 2: Desglose en User Stories**

**Solo para las Epics que el alcance del Paso 0 haya definido.** Si me dijiste "de a una", acá va una sola.

Para cada Epic en alcance, redacta de 2 a 5 **User Stories** necesarias para completarla.
*   Formato de Título de la Epic: `[Epic] Nombre de la Feature`
*   Formato de Título de la Story: `Como [rol], quiero [acción], para [beneficio]`
*   Criterios de Aceptación (Borrador): Lista 3-5 puntos clave que deben cumplirse.

> **Cada historia sale de un documento o no sale.** Si una historia te resulta necesaria y ningún documento la respalda, escríbela igual y márcala como **Hipótesis** en la tabla de Fuentes. Una historia que inventa una regla de negocio sin declararlo es el defecto más caro de esta fase: se propaga a los criterios de aceptación, a los casos de prueba y al código.

> **En Brownfield, además:** una historia escrita no es una funcionalidad construida, y una funcionalidad construida no siempre está escrita. **No supongas ninguna de las dos cosas: no estuviste ahí.** Toda historia que escribas acá nace `Sin verificar`, incluso si en el Paso 1 miraste la aplicación: haber visto una pantalla no es haber verificado un criterio de aceptación.

---

## **Paso 3: Sincronización con Jira**

Este proyecto es **Jira-First**: la fuente de la verdad es Jira y `.context/PBI/` es su espejo. Pero la falta de Jira **no detiene esta fase**.

*   **Si tienes el MCP de Atlassian y te di una Project Key:** crea las Epics y Stories en Jira.
    1.  **Antes de crear nada, comprueba qué tipos de actividad existen en ese espacio** — la interfaz los llama así; la API los sigue llamando *issue types*, y son lo mismo. Si no existe el tipo *Historia* (o *Story*), **no lo sustituyas en silencio por *Tarea***: avísame, porque la jerarquía Epic → Story se pierde y no da ningún error.
    2.  Primero crea la Epic y obtén su `ISSUE_KEY` (ej: `MYAPP-10`).
    3.  Después crea las Stories vinculadas a esa Epic (`Epic Link`) y obtén sus keys.
    4.  **A cada Story que crees, pónle la etiqueta `sin-verificar`.** El campo
        `Implementación` vive en el archivo local, y el tablero no lo ve: sin esa etiqueta,
        quien mira Jira no tiene forma de saber que **nadie comprobó esa historia contra la
        aplicación**. La etiqueta se saca cuando alguien la verifica, no antes.
    5.  Usa esas keys reales en los archivos locales del Paso 4.
*   **Si no tienes el MCP, no hay proyecto en Jira, o el MCP no responde:** no te detengas.
    1.  Genera igual toda la estructura local con **IDs temporales**: `PBI-01`, `PBI-02`, etc.
    2.  En cada archivo, pon el campo `**Estado de sincronización:** PENDIENTE DE SUBIR A JIRA`.
    3.  Anota en `epic-tree.md` la lista completa de lo que quedó pendiente.
    4.  **Avísame en la confirmación final**, no solo dentro de los archivos: tengo que saber que hay trabajo por subir cuando reconecte o cuando cree el proyecto en Jira.

---

## **Paso 4: Estructura Local**

Independientemente del camino que hayas tomado en el Paso 3, escribe la estructura local completa:

```text
.context/PBI/
├── epic-tree.md  (Índice de todas las Epics y sus Stories)
└── epics/
    └── EPIC-{KEY}-{nombre-kebab-case}/
        ├── epic.md
        └── stories/
            └── STORY-{KEY}-{nombre-kebab-case}/
                └── story.md
```

Donde `{KEY}` es la key real de Jira si existe, o el ID temporal (`PBI-01`) si no.

**Si esta es una corrida por etapas, `epic-tree.md` se actualiza, no se reescribe.** Las Epics que ya estaban desglosadas se conservan tal cual; la que acabas de trabajar sale de "pendientes de desglosar" y entra en la tabla.

---

### **Formato de Salida Requerido**

**Escribe los archivos en `.context/PBI/`.** Si las carpetas no existen, créalas. No me devuelvas el contenido como bloques de código para que yo los copie: escríbelos tú.

Al terminar, confírmame:
*   Cuántas Epics y cuántas Stories escribiste, y en qué rutas.
*   **Cuántas Epics quedaron identificadas y sin desglosar**, y cómo se retoman.
*   **Si algo quedó pendiente de subir a Jira, dímelo aquí**, no solo dentro de los archivos.
*   Qué secciones quedaron incompletas y por qué.

**Contenido de `epic.md`:**

```markdown
# Epic: [Título]
**ID:** [KEY de Jira o ID temporal]
**Estado de sincronización:** [Sincronizado con Jira | PENDIENTE DE SUBIR A JIRA]
**Estado:** To Do

## Descripción
[Descripción, con referencia a la sección del PRD de la que sale]

## User Stories
- [ ] [KEY-1]: [Título Story 1]
- [ ] [KEY-2]: [Título Story 2]

## Fuentes
| Dato / afirmación | De dónde sale |
| :--- | :--- |
| [Alcance de la Epic] | `prd.md` · [sección] |
| [Regla de negocio] | **Observado** — [entorno], [fecha]. Evidencia: `[ruta]` |
| [Regla de negocio] | **Hipótesis** — no hay documento que lo respalde |
```

**Contenido de `story.md`:**

```markdown
# Story: [Título]
**ID:** [KEY de Jira o ID temporal]
**Epic:** [EPIC-KEY]
**Implementación:** Sin verificar
**Estado de sincronización:** [Sincronizado con Jira | PENDIENTE DE SUBIR A JIRA]

## Descripción
Como [rol], quiero [acción], para [beneficio].

## Criterios de Aceptación (Borrador)
- [ ] El sistema debe...
- [ ] El usuario puede...

## Fuentes
| Dato / afirmación | De dónde sale |
| :--- | :--- |
| [Criterio de aceptación] | `prd.md` · [sección] |
| [Criterio de aceptación] | **Observado** — [entorno], [fecha]. Evidencia: `[ruta]` |
| [Criterio de aceptación] | **Hipótesis** — no hay documento que lo respalde |
```

> **El campo `Implementación`** admite `Implementada`, `Parcial`, `No encontrada` o
> `Sin verificar`, y **acá siempre nace `Sin verificar`**: este prompt arma el mapa del
> backlog, no comprueba funcionalidades una por una. Cambiarlo sin haber ido a verificar
> **esa historia** es afirmar algo que nadie comprobó.
>
> **No es un campo de Jira ni hace falta crearlo:** vive en este archivo. Su reflejo en el
> tablero es la etiqueta `sin-verificar` del Paso 3, que funciona en cualquier plan y no
> necesita permisos de administrador.

**Contenido de `epic-tree.md`:**

```markdown
# Índice del Backlog

**Origen:** `.context/architecture/prd.md`
**Fuentes del backlog:** [documentación local / Confluence / aplicación / descripción del usuario]
**Tipo de proyecto:** [Greenfield | Brownfield]
**Fecha:** [fecha]

| Epic | Stories | Sin verificar | Estado de sincronización |
| :--- | :--- | :--- | :--- |
| [KEY] [Título] | [n] | [cuántas de esas n] | [Sincronizado / PENDIENTE] |

## Epics identificadas, pendientes de desglosar
*   [Título] — sale de [documento · sección, u **Observado**]. Historias estimadas: [n]
*   [Si no queda ninguna, escribir "Ninguna: el backlog está desglosado entero"]

## Pendiente de subir a Jira
*   [Epics y Stories con ID temporal. Si no hay ninguna, escribir "Ninguna: todo sincronizado"]

## Pendiente de verificar contra la aplicación
*   [Historias cuyo comportamiento real nadie confirmó. En Greenfield son todas y está bien.
    En Brownfield, cada una de estas es una historia que puede no existir, existir a medias,
    o existir de otra forma. Se resuelven con la skill `documentar-historia`]

## Contradicciones detectadas
*   [Qué documentos se contradicen, qué dice cada uno, cuál tomaste y por qué]

## Preguntas abiertas
*   [Lo que la documentación no contesta y hace falta para escribir la historia. No lo completes con hipótesis: déjalo como pregunta]
```

**Restricciones:**

- **Todo criterio de aceptación que no salga de un documento se marca como hipótesis** en la tabla de Fuentes.
- **`Observado` solo lo escribe quien miró.** Es para un dato verificado en la aplicación, y siempre con entorno, fecha y evidencia. Si no fuiste a mirar, no existe esa fila: será documentado o será hipótesis.
- **Observado no es acordado.** Un dato observado que ningún documento respalda va **además** a *Preguntas abiertas*: que el sistema se comporte así no significa que deba comportarse así, y hasta que negocio lo confirme sigue en duda.
- **No desgloses Epics fuera del alcance que acordamos en el Paso 0.** Identificarlas sí; escribirles historias, no.
- **Nunca escribas una credencial en claro** en un archivo del backlog.
- Las cuatro últimas secciones de `epic-tree.md` nunca se omiten. Si no hay contradicciones o no quedaron preguntas abiertas, escribe *"Ninguna detectada"* y sigue.

**Al finalizar, sugiéreme el paso siguiente según cómo haya quedado el backlog:**

*   **Si quedaron Epics sin desglosar:** volver a correr este mismo prompt para la que sigue. Dime cuál recomendás y por qué.
*   **Si el backlog está completo:** seleccionar una historia crítica y continuar con `.prompts/4-Especificaciones (Backlog)/refine-stories.md`.
*   **Si hay historias que dependen de comportamiento que ningún documento explica:** la skill `documentar-historia`, que abre la aplicación, verifica el comportamiento real y completa lo observado con su evidencia.

### **FIN DEL PROMPT**
