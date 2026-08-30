---
name: commit
description: Agrupa los cambios sin commitear en commits coherentes y los redacta según las convenciones del repositorio. Úsala cuando haya que commitear trabajo, cuando el árbol tenga cambios mezclados de varios temas, o cuando pidan "commiteá esto", "guardá los cambios" o "armá los commits".
allowed-tools: Bash, Read, Grep, Glob, Write
---

# Commits ordenados

El problema que resuelve esta skill **no es redactar el mensaje**: es decidir **dónde
cortar**. Doce archivos nuevos commiteados juntos como *"avances"* pueden tener un mensaje
impecable y aun así dejar una historia inservible, porque ya no se puede preguntar *"¿qué
produjo este paso?"*.

Un commit es una unidad de trabajo que se entiende sola y se puede revertir sola.

---

## Paso 1 · Leé las convenciones de ESTE repositorio

**No asumas convenciones: leelas.** Antes de proponer nada, buscá y leé:

1. `AGENTS.md` — el estilo de mensaje, los nombres de rama y las reglas de trabajo.
2. Si no existe, `CONTRIBUTING.md` o `CLAUDE.md`.
3. Si no hay ninguno, mirá los últimos commits: `git log --format='%s' -20`.

De ahí salen tres cosas que cambian de repositorio en repositorio, y que **nunca** se
hardcodean:

*   **El formato del asunto** (Conventional Commits u otro, y qué *scopes* se usan).
*   **El idioma del mensaje.** Fijate en el historial: puede no ser el del proyecto.
*   **La política de ramas.**

Si el repositorio no declara convenciones y el historial no es concluyente, decilo y usá
Conventional Commits como opción por defecto.

## Paso 2 · Leé el árbol de trabajo

```bash
git status --short
git diff --stat
git diff --stat --cached
git log --format='%s' -15
```

Para los archivos que no entendés por el nombre, mirá el diff real. **No agrupes por
carpeta sin haber visto qué cambió**: dos archivos vecinos pueden ser dos temas distintos,
y dos archivos lejanos pueden ser el mismo cambio.

## Paso 3 · Guardas — antes de proponer, no después

### 3.1 · Secretos

Revisá el contenido que va a entrar, no solo los nombres de archivo:

```bash
git diff | grep -nEi '(secret|token|password|passwd|api[_-]?key|client_secret|bearer )'
git diff | grep -nE '(ghp_|github_pat_|xox[baprs]-|sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|GOCSPX-)'
git diff | grep -nE '://[^/@[:space:]]+:[^/@[:space:]]+@'
```

Esa última busca credenciales embebidas en una URL (`https://usuario:token@host`), que es
la forma más fácil de filtrar un token sin darse cuenta.

**Si aparece algo con forma de secreto, frená.** No commitees, no lo edites por tu cuenta:
mostrá el archivo y la línea, y explicá que si ese valor ya se usó hay que **rotarlo**, no
solo borrarlo. Un secreto commiteado sigue vivo en la historia aunque el archivo cambie.

Verificá también que no se esté por commitear un archivo de credenciales que el
`.gitignore` debería estar frenando (`.env`, `*.pem`, `*.key`, configuraciones locales de
herramientas). Si el `.gitignore` no lo cubre, eso es un hallazgo: decilo.

### 3.2 · Rama

```bash
git branch --show-current
```

**Si estás parado en la rama principal y el repositorio pide no trabajar ahí, creá la rama
antes de commitear.** No preguntes: es lo que las convenciones ya declaran. Usá el patrón
de nombres que el repositorio define y un nombre que describa el trabajo, no la fecha.

Decí en qué rama quedaron los commits y que la rama principal no se tocó.

## Paso 4 · Proponé el corte

Agrupá los cambios y **mostrá el plan antes de ejecutar nada**: qué commits, qué archivos
en cada uno, qué mensaje, y **por qué ese corte**.

### Dónde cortar

*   **Un entregable, un commit.** Si el trabajo produjo varios artefactos independientes,
    cada uno es un commit.
*   **Separá la infraestructura del contenido.** Un cambio de configuración y un cambio de
    contenido se revisan distinto y se revierten por separado.
*   **Separá un movimiento de un cambio.** Un archivo que se renombra y además se edita
    genera un diff ilegible. Primero el movimiento, después la edición.
*   **Lo que tiene que viajar junto, viaja junto.** Si el repositorio exige que dos archivos
    estén sincronizados, un cambio que toca a los dos es **un** commit, nunca dos.

### El orden importa

**Ningún commit puede dejar el repositorio en un estado incoherente.** Si un archivo
referencia algo que llega en otro commit, el referenciado va **primero**.

> Ejemplo: si agregás una plantilla de configuración y además varios archivos que la
> mencionan, la plantilla va en el primer commit. Al revés, hay un punto de la historia
> donde el repositorio se contradice.

### No te pases de fino

Tres commits que hay que leer juntos para entender uno son peores que un commit bien
explicado. Si no podés escribir el asunto de un commit sin nombrar otro, están mal cortados.

## Paso 5 · Redactá

**El asunto dice qué cambia. El cuerpo dice por qué.**

*   Asunto en imperativo, sin punto final, corto.
*   El cuerpo explica el **problema que existía**, no el procedimiento que seguiste. El
    diff ya muestra qué se tocó; lo que no se puede recuperar después es el motivo.
*   Si el cambio corrige algo que estaba mal, describí el síntoma: qué se rompía y cuándo.
*   Nombrá lo que quedó afuera a propósito.
*   Nunca escribas un valor secreto en un mensaje de commit: la historia no se edita.

## Paso 6 · Ejecutá, con confirmación

Recién después de que te confirmen el plan:

1.  **Stageá explícito, archivo por archivo o por ruta.** Nunca `git add -A` ni `git add .`
    para armar un commit temático: arrastran cosas que no mirabas.
2.  **Escribí el mensaje en un archivo temporal y usá `git commit -F <archivo>`.** Pasar un
    mensaje multilínea por `-m` en la línea de comandos se rompe con comillas, acentos y
    saltos de línea, y termina produciendo mensajes truncados.
3.  Repetí por cada commit del plan.

### Nunca

*   `--no-verify` ni saltear hooks. Si un hook falla, el problema es lo que el hook detectó.
*   `--amend` sobre un commit ya publicado.
*   `push --force`.
*   Commitear con el árbol a medio revisar "para no perder el trabajo". Si hay algo sin
    terminar, decilo y dejalo afuera.

## Paso 7 · Verificá y reportá

```bash
git log --oneline -<n>
git status --short
```

Informá:

*   Los commits creados, en orden.
*   La rama, y si la creaste vos.
*   **Qué quedó sin commitear y por qué.**
*   Que el push es una decisión aparte: esta skill no publica nada.
