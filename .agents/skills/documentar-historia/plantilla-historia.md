# Plantilla del `story.md`

Este es el formato exacto que produce la skill. **Copialo tal cual y completá los
corchetes** — no lo deduzcas de otros archivos ni lo rearmes de memoria: si cada corrida
inventa su propio orden de secciones, las fases siguientes no lo pueden leer.

Las secciones marcadas con 🔸 son propias de esta skill; el resto es el formato común de la
fase de especificaciones, y por eso no se toca.

---

## El esqueleto

```markdown
# Story: [Título]
**ID:** [KEY de la herramienta de gestión, o ID temporal PBI-01]
**Epic:** [EPIC-KEY]
**Implementación:** [Implementada | Parcial | No encontrada | Sin verificar]
**Modo de exploración:** [Navegador automatizado | Guiada por la persona | Sin explorar]
**Entorno observado:** [nombre del entorno] · [fecha]
**Estado de sincronización:** [Sincronizado | PENDIENTE DE SUBIR]

## Descripción
Como [rol], quiero [acción], para [beneficio].

## Criterios de Aceptación (Borrador)
- [ ] [Criterio, en presente y verificable]
- [ ] [Criterio]

## Comportamiento observado
| Qué hace | Evidencia | Qué decía la documentación |
| :--- | :--- | :--- |
| [Comportamiento, con los textos literales] | `evidence/[archivo].png` | [Cita con archivo y sección, o **nada: ningún documento lo menciona**] |

## Fuentes
| Dato / afirmación | De dónde sale |
| :--- | :--- |
| [Afirmación] | `[archivo].md` · [sección] |
| [Afirmación] | **Observado** — [entorno], [fecha]. Evidencia: `evidence/[archivo].png` |
| [Afirmación] | **Hipótesis** — no hay documento que lo respalde |

## Contradicciones detectadas
*   [Qué dice el documento, qué hace el sistema, y **las dos sin elegir una**]

## Preguntas abiertas
*   [Lo que hace falta y ningún documento contesta]
```

---

## Las reglas de los cuatro campos que se llenan mal

**`Implementación`** — es un veredicto sobre lo que **viste**, no sobre lo que suponés:

| Valor | Cuándo |
| :--- | :--- |
| `Implementada` | Recorriste el camino **entero** y hace lo que la historia describe |
| `Parcial` | Existe, pero le falta algo que los documentos declaran |
| `No encontrada` | La buscaste y no está. **Decí dónde buscaste** — no es lo mismo que no existir |
| `Sin verificar` | No llegaste a mirarla. **No la marques de otra forma para cerrar el archivo** |

**`Modo de exploración`** — si la recorrió la persona y no vos, se escribe. Un dato reportado
por alguien vale, pero no vale lo mismo que uno que viste, y el que lea esto seis meses
después necesita saber cuál de los dos es.

**`Comportamiento observado`** 🔸 — es la sección que ningún otro prompt de la fase produce, y
la razón de existir de la skill. La tercera columna es la que importa: cuando dice
*ningún documento lo menciona*, **acabás de encontrar un hueco de documentación**, y eso va
además a *Preguntas abiertas*.

**`Fuentes`** — una fila por afirmación, y solo tres orígenes posibles:

| Origen | Cuándo | Qué obliga |
| :--- | :--- | :--- |
| Documento | Un documento del proyecto lo dice | Citar archivo y sección |
| **Observado** | Lo viste en la aplicación | Entorno, fecha **y ruta de la captura** |
| **Hipótesis** | Lo dedujiste | Genera **además** una pregunta abierta |

> **Observado no es acordado.** Una afirmación observada que ningún documento respalda se
> escribe como observada y **nunca como criterio de aceptación cerrado**. Que el sistema haga
> algo no significa que deba hacerlo, y un defecto documentado como requisito deja de ser un
> defecto para siempre.

---

## Antes de dar por terminado el archivo

- **Ninguna sección se borra.** Si *Contradicciones detectadas* o *Preguntas abiertas* quedan
  vacías, se escribe *"Ninguna detectada"*. Una sección ausente no se distingue de una
  sección que nadie completó.
- **Ninguna credencial**, ni siquiera de un usuario de prueba. Se referencia la variable.
- **Cada fila `Observado` tiene que tener su captura**, y el archivo tiene que existir de
  verdad. Eso lo comprueba `scripts/verificar-evidencia.js`, y conviene correrlo antes de
  cerrar.
