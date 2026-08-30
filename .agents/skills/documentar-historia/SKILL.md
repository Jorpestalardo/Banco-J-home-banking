---
name: documentar-historia
description: Documenta una historia de usuario que ya está construida en la aplicación pero no existe como ticket ni como especificación, explorándola en el navegador y dejando la evidencia de lo observado. Úsala cuando el software exista y la documentación no, cuando haya que reconstruir el backlog de un proyecto heredado, cuando una historia esté marcada "Sin verificar", o cuando pidan "documentá esta pantalla", "armá la historia de lo que ya está hecho", "esto no está en Jira" o "andá a ver cómo funciona".
allowed-tools: Bash(node ${CLAUDE_SKILL_DIR}/scripts/verificar-evidencia.js *)
---

# Documentar una historia que ya está construida

En un proyecto heredado el software llegó antes que el papel. La funcionalidad existe, la usan
personas reales, y no hay ni ticket ni criterio de aceptación que diga qué se esperaba de ella.
Esta skill escribe ese papel mirando la aplicación.

**Tres archivos, y cada uno hace una cosa:** este lleva el procedimiento y el criterio;
[`plantilla-historia.md`](plantilla-historia.md) lleva el formato exacto del entregable; y
`scripts/verificar-evidencia.js` comprueba que lo escrito tenga respaldo. **El formato no se
deduce y la evidencia no se declara: uno se copia, la otra se verifica.**

El riesgo no es equivocarse en la redacción. Es este:

> **Que la aplicación haga X no convierte a X en un criterio de aceptación.** Lo convierte en
> un hecho que hay que confirmar. Si contradice a un documento, es un hallazgo. Si ningún
> documento lo respalda, es una pregunta abierta.

**Un defecto documentado como requisito deja de ser un defecto para siempre**, porque nadie lo
vuelve a reportar: el papel dice que funciona así. Es la forma más común de arruinar la
documentación de un proyecto heredado, y es exactamente lo que esta skill podría causar si se
usa sin cuidado.

---

## Antes que nada: cuál es tu trabajo y cuál no

Hay otro flujo en este repositorio que también abre el navegador sobre una historia, y no es
este. La diferencia es qué existe antes y qué queda después:

| | Explora para… | Necesita que el `story.md`… | Deja |
| :--- | :--- | :--- | :--- |
| **Esta skill** | **especificar** lo que nadie escribió | **no** exista, o esté `Sin verificar` | el `story.md` |
| **Testing exploratorio** (Fase 6) | **encontrar defectos** contra lo escrito | **sí** exista y esté refinado | reporte de sesión y bugs |

Una escribe la vara; la otra mide contra ella. **En un proyecto heredado esta corre primero**,
porque sin ella las fases de testing no tienen contra qué contrastar.

Si la historia ya está escrita y refinada, esto no es trabajo para acá: decilo y parás.

---

## Paso 1 · Leé lo que ya está escrito

Antes de preguntar nada:

1. **`.context/PBI/epic-tree.md`** — el backlog. Mostrame las historias con su campo
   `Implementación`, para que elijamos sobre qué trabajar.
2. **`.context/infrastructure/environments.md`** — **de ahí sale la URL y el nombre real del
   entorno.** No me los pidas.
3. **`.context/infrastructure/test-data-strategy.md`** — de ahí salen los usuarios de prueba.
   **Nunca me pidas una contraseña por chat ni abras un archivo de entorno para leerla:** se
   referencia como variable.
4. **La documentación heredada del proyecto** — la misma carpeta que usaron las fases de
   análisis. **Sin esto no podés hacer tu trabajo**, solo describir pantallas: es lo único que
   te permite distinguir *lo que se acordó* de *lo que quedó así*.

Si falta el mapa de entornos, **detenete**: no salgas a adivinar una dirección. Decime qué
archivo falta y qué prompt lo genera.

Solo entonces preguntame lo que no está escrito en ningún lado: **qué funcionalidad vamos a
documentar**.

## Paso 2 · Comprobá que esto sea trabajo para acá

Mirá si ya existe un `story.md` para esa funcionalidad.

| Lo que encontrás | Qué hacés |
| :--- | :--- |
| No existe nada | Historia nueva. Seguí. |
| Existe con `Implementación: Sin verificar` | Seguí: vas a completar lo observado sobre lo que ya está escrito, **sin borrar lo que dice**. |
| Existe, refinada y verificada | **Parás.** Está documentada. Si lo que hace falta es probarla, es testing exploratorio. |

## Paso 3 · Comprobá vos mismo si tenés navegador

**Revisá tus herramientas disponibles; no me lo preguntes a mí.**

**Con un MCP de navegador (Playwright):** navegás vos y sacás las capturas.

**Sin él:** no te detengas y no me pidas que lo instale. Guiame paso a paso para que lo
recorra yo, y **registrá solamente lo que yo te reporte**. Anotá el modo en el entregable.

> **Sin navegador no inventás comportamiento.** Si no lo viste y yo no te lo conté, no se
> escribe. Un criterio de aceptación deducido de cómo suele funcionar una pantalla de login es
> exactamente el error que esta skill existe para evitar.

## Paso 4 · Explorá para especificar

**No vengas a romper el sistema.** Eso es testing exploratorio y es otro momento. Acá estás
levantando acta de qué hace la funcionalidad cuando se usa como se espera, y de qué defiende
cuando no.

Recorré, en este orden:

1. **El camino principal, completo, hasta el final.** Dónde empieza, qué pide, dónde termina y
   qué queda cambiado después.
2. **Qué datos pide y cuáles son obligatorios.** Qué pasa si dejás uno vacío.
3. **Qué valida y con qué mensaje.** Transcribí los textos **literales**: un mensaje de error
   es un requisito escrito por alguien, aunque ese alguien haya sido el desarrollador.
4. **Qué te impide hacer.** Lo que el sistema rechaza dice tanto como lo que acepta.
5. **A dónde te lleva después** y qué ve el otro rol, si hay más de uno.

Dos límites, y los dos importan:

- **Poné un tope de tiempo y respetalo.** Si a los 30-40 minutos seguís descubriendo, cerrá lo
  que tenés y anotá el resto como pendiente. Una historia documentada hoy vale más que tres a
  medio mirar.
- **Fijate qué entorno estás tocando.** Si el mapa de entornos dice que no hay uno separado,
  **estás en el mismo lugar que los usuarios reales**: lo que cargues queda, y los avisos que
  dispares salen de verdad. Decímelo antes de crear nada.

**La evidencia no es opcional.** Una captura por cada afirmación que vayas a escribir, en
`.context/PBI/epics/[EPIC]/stories/[STORY]/evidence/`, con el nombre
`[fecha]-[escenario-slug].png`. Una afirmación sin captura no se escribe como observada.

## Paso 5 · Clasificá cada dato antes de escribirlo

Este es el paso que hace que el entregable sirva. Para **cada** cosa que vayas a afirmar,
decidí de dónde salió:

| Origen | Cuándo | Cómo se registra |
| :--- | :--- | :--- |
| **Documento** | Un documento del proyecto lo dice | `archivo.md` · sección |
| **Observado** | Lo viste en la aplicación | `**Observado**` — entorno, fecha, ruta de la captura |
| **Hipótesis** | Lo dedujiste, no lo viste ni lo leíste | `**Hipótesis**` — y además una pregunta abierta |

Y después cruzá las dos primeras columnas, porque **ahí está el valor de todo esto**:

- **Coinciden** → criterio de aceptación sólido. Citá las dos fuentes.
- **Se contradicen** → **hallazgo**. Escribí las dos versiones y **no elijas**: no sabés si el
  sistema está mal o el documento quedó viejo. Va a *Contradicciones detectadas* y a
  *Preguntas abiertas*.
- **Observado sin documento** → se escribe como observado, **nunca como acordado**, y genera
  una pregunta abierta. Que funcione así no significa que deba funcionar así.
- **Documento sin observar** → puede que no esté construido. Eso decide el veredicto del
  Paso 6.

## Paso 6 · Escribí el `story.md`

En `.context/PBI/epics/[EPIC]/stories/STORY-[ID]-[nombre-kebab-case]/story.md`.

**El formato está en [`plantilla-historia.md`](plantilla-historia.md), al lado de este archivo.
Abrilo y copiá el esqueleto — no lo deduzcas ni lo rearmes de otros archivos.** Ahí están
también las reglas de los cuatro campos que se llenan mal: el veredicto de `Implementación`, el
modo de exploración, la sección de contraste y la tabla de Fuentes.

Lo único que va acá, porque es criterio y no formato:

> **El veredicto se elige por lo que recorriste, no por lo que viste de reojo.** `Implementada`
> exige haber llegado al final del camino: que exista el botón no significa que el flujo
> termine bien. Y si no lo miraste, `Sin verificar` — no hay ningún valor intermedio que
> signifique *"me parece que anda"*.

## Paso 7 · Comprobá la evidencia antes de cerrar

Corré el verificador sobre el archivo que acabás de escribir:

```bash
node scripts/verificar-evidencia.js .context/PBI/epics/[EPIC]/stories/[STORY]/story.md
```

Recorre el `story.md`, junta cada afirmación marcada `Observado` y **comprueba que el archivo
de captura exista de verdad**. No opina sobre el contenido: confirma que haya foto.

| Lo que devuelve | Qué hacés |
| :--- | :--- |
| Una afirmación observada **sin captura** | Conseguí la evidencia, **o bajala a `Hipótesis`** y generá la pregunta abierta |
| Una captura nombrada **que no está** | Ruta mal escrita, o la captura nunca se guardó. Arreglá lo que corresponda |
| Capturas que **ninguna fila menciona** | No es error. Pero si documentan algo, ese algo todavía no está escrito |

**No cierres el archivo con el verificador en rojo.** Si algo no tiene respaldo, se corrige el
archivo — no se ignora la salida.

> **Por qué esto lo hace un script y no yo.** Un archivo existe o no existe: no hay criterio,
> no hay redacción, y la respuesta es la misma todas las veces. **Yo escribo lo que observé; el
> script comprueba que haya foto. Una de las dos cosas se puede inventar; la otra no.**

## Paso 8 · Reportá y encadená

Decime, en la confirmación y no solo dentro del archivo:

- **La ruta del archivo** y cuántas capturas dejaste.
- **El veredicto** y en qué te basaste.
- **Cuántas contradicciones** encontraste entre lo que viste y lo que estaba escrito.
- **Qué quedó sin mirar** y por qué.
- **Si esto todavía no está en la herramienta de gestión**, decilo acá: el archivo local no
  avisa solo.
- **Si el ticket tenía la etiqueta `sin-verificar` y el veredicto ya no es `Sin verificar`**,
  avisame para sacarla. Es el único rastro de esto que ve el equipo en el tablero, y una
  etiqueta que quedó vieja miente igual que un documento que quedó viejo.

Y sugerí el paso siguiente: refinar la historia para pasarla a criterios de aceptación
formales, que es el prompt de refinamiento de la fase de especificaciones.

---

## Nunca

- **Nunca escribas un comportamiento como criterio de aceptación sin haberlo contrastado**
  contra la documentación. Ese es el error que esta skill puede causar.
- **Nunca resuelvas vos una contradicción** entre lo que viste y lo que está escrito. Reportala.
- **Nunca inventes el "para qué".** El *"Como… quiero… para…"* necesita un motivo de negocio, y
  eso no se lee en una pantalla. Si ningún documento lo dice, escribilo como pregunta abierta
  en lugar de completarlo con algo plausible.
- **Nunca marques `Implementada` sin haber recorrido el camino entero.** Que exista el botón no
  significa que el flujo termine bien.
- **Nunca cargues datos de prueba masivos** sin avisar antes en qué entorno estás.
- **Nunca escribas una credencial** en el `story.md`, ni siquiera de un usuario de prueba.
