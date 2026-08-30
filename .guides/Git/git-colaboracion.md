# Trabajo en Equipo: Ramas, Pull Requests y Revisión

Esta guía cubre lo que pasa **cuando no trabajas solo**: cómo aislar tu trabajo en una rama,
cómo nombrarla para que se entienda, cómo pedir que la incorporen y por qué alguien más
tiene que aprobarla antes de que entre.

> Si nunca usaste Git, empieza por [`git-basico.md`](./git-basico.md). Si ya sabes hacer
> `commit` y `push` pero trabajas con otras personas sobre los mismos archivos, esta guía es
> la que te falta.

---

## 🎯 Por qué esto es distinto cuando el repositorio tiene documentos

Casi todo lo que vas a leer sobre Git está escrito pensando en código. **Aquí el contenido
son documentos**: casos de prueba, planes, historias de usuario, prompts, notas de análisis.
Eso cambia dos cosas importantes.

**No hay nada automático que te avise si te equivocaste.** Cuando alguien rompe código, el
proyecto no compila o los tests fallan. **Un documento equivocado se ve exactamente igual
que uno correcto.** Un caso de prueba que dice "el límite es 20" cuando en realidad son 10
no rompe nada: se lee bien, se ve profesional, y se descubre cuando alguien probó lo que no
era. La única red de seguridad que existe es **otra persona leyéndolo**. Por eso la revisión
importa *más* aquí, no menos.

**El problema que Git resuelve no es técnico, es de coordinación.** Es este:

```
Casos_de_prueba_login.docx
Casos_de_prueba_login_v2.docx
Casos_de_prueba_login_v2_REVISADO.docx
Casos_de_prueba_login_FINAL.docx
Casos_de_prueba_login_FINAL_ok_este_si.docx
```

Todos vimos esa carpeta. El problema no es el desorden: es que **nadie sabe cuál es la
versión buena**, quién cambió qué, ni por qué. Y cuando dos personas editan al mismo tiempo,
el último que guarda pisa al otro sin que nadie se entere.

Git resuelve eso con tres cosas: una sola versión oficial, un historial de quién cambió qué
y por qué, y un mecanismo para que dos personas trabajen a la vez sin pisarse. Las ramas y
los Pull Requests son ese mecanismo.

---

## 🌳 La rama: tu espacio para trabajar tranquilo

Una **rama** (*branch*) es una copia paralela del proyecto. Trabajas ahí, guardas todos los
cambios que quieras, y **nada de eso afecta a los demás** hasta que lo pidas explícitamente.

Mientras tú escribes en tu rama:

- Tus compañeros siguen viendo la versión oficial, sin tus cambios a medio hacer.
- Puedes dejar el trabajo por la mitad y volver mañana. A nadie le molesta.
- Si te equivocaste feo, borras la rama y no pasó nada.

La rama principal —normalmente llamada **`main`**— es **la versión oficial**: lo que está
aprobado y sirve de referencia para todo el equipo. Por eso no se trabaja directamente ahí.

> **La regla:** una rama por tarea. Empiezas la tarea, creas la rama. Terminas la tarea,
> la rama se incorpora y se borra. Una rama que vive tres meses acumulando cosas distintas
> ya no es una tarea: es un cajón.

---

## 🏷️ El nombre de la rama es el relato del trabajo

Esta es la parte que más se subestima y la que más rinde con el tiempo.

Dentro de seis meses, alguien va a mirar la lista de ramas y los cambios incorporados. Si
los nombres son buenos, esa lista **se lee como una bitácora del trabajo del equipo**. Si
son malos, es ruido.

Mira la diferencia:

```
❌  cambios                    ✅  docs/QA-1122-login-mfa
❌  rama-jorge                 ✅  test/QA-1150-regresion-pagos
❌  nueva                      ✅  fix/QA-1163-limite-freemium
❌  actualizaciones            ✅  docs/QA-1170-plan-pruebas-checkout
```

La columna de la derecha te dice **qué se hizo, de qué tipo era, y a qué pedido respondía**,
sin abrir un solo archivo.

### La estructura

```
tipo/ID-DEL-TICKET-descripcion-corta
```

**1 · El tipo** dice de qué se trata el trabajo:

| Prefijo | Cuándo se usa | Ejemplo |
| :--- | :--- | :--- |
| `docs/` | Documentación nueva o actualizada | `docs/QA-1122-plan-de-pruebas` |
| `test/` | Casos de prueba, escenarios, matrices | `test/QA-1150-regresion-pagos` |
| `prompts/` | Prompts nuevos o mejorados | `prompts/QA-1188-analisis-riesgos` |
| `fix/` | Corregir algo que estaba mal | `fix/QA-1163-limite-freemium` |
| `chore/` | Mantenimiento, orden, configuración | `chore/QA-1201-reordenar-carpetas` |

**2 · El ID del ticket** es el que más trabaja, y conviene entender por qué.

Ese identificador —`QA-1122`, `PROJ-505`, el número que use tu equipo— es **el hilo que
cose todo lo que rodea al trabajo**:

```
Ticket QA-1122  ──┬──  la rama          docs/QA-1122-login-mfa
                  ├──  los commits      docs: QA-1122 agregar criterios de MFA
                  ├──  el Pull Request  "QA-1122 · Plan de pruebas de login con MFA"
                  └──  el cambio incorporado en main
```

El día que alguien pregunte *"¿por qué este documento dice que el código expira a los 5
minutos?"*, ese ID te lleva de vuelta al ticket, y el ticket tiene la discusión, la decisión
y quién la tomó. **Sin el ID, la respuesta es "no sé, alguien lo cambió".**

Es exactamente la misma lógica de trazabilidad que aplicas cuando vinculas un caso de
prueba a su historia de usuario. Aquí el objeto trazado es el cambio.

### Reglas prácticas

- **Sin espacios, sin acentos, sin eñes.** Las ramas se escriben en la terminal y esos
  caracteres dan problemas. `docs/QA-1122-configuracion`, no `docs/QA-1122 configuración`.
- **Palabras separadas por guiones**, todo en minúscula (salvo el ID, que va como en el
  ticket).
- **Corta.** Si el nombre no entra de un vistazo, es larga.
- **Una rama, un ticket.** Si estás metiendo dos tareas en la misma rama, quien revise va a
  tener que revisar las dos juntas y no va a poder aprobar una sin la otra.
- **¿No hay ticket?** Usa el tipo y una descripción clara: `fix/typo-glosario`. Pero si el
  trabajo es lo bastante grande como para necesitar revisión, casi siempre merece un ticket.

---

## 🔄 El ciclo completo

```
main ──●────────────────────────────────●──▶  versión oficial
        \                              /
         ●───●───●  tu rama  ───▶ PR ─┘
         1   2   3            revisión
                              y aprobación
```

### Paso 1 · Partir de lo último

```bash
git checkout main
git pull origin main
git checkout -b docs/QA-1122-login-mfa
```

**No te saltes el `pull`.** Si partes de una copia vieja, vas a trabajar sobre documentos
desactualizados y después vas a tener que resolver conflictos que no existían.

### Paso 2 · Trabajar y guardar

Editas, y vas guardando con `commit` tantas veces como quieras. Un commit por idea
terminada, no uno por día.

### Paso 3 · Subir tu rama

```bash
git push origin docs/QA-1122-login-mfa
```

Fíjate que sube **tu rama**, no `main`. Tu trabajo ya está en el servidor —no se pierde si
se te rompe la computadora— pero **todavía no forma parte de la versión oficial**.

### Paso 4 · Abrir el Pull Request

Aquí empieza la parte que se hace en la web, no en la terminal.

---

## 📬 El Pull Request

Un **Pull Request** es un pedido formal: *"terminé este trabajo, ¿lo miran y lo incorporan?"*

Suena burocrático y no lo es. Es el lugar donde queda registrada **la conversación sobre el
cambio**: qué se hizo, por qué, quién lo revisó, qué se discutió y qué se decidió. Eso no se
puede reconstruir después de un mensaje de chat.

> **Todo esto se hace desde el navegador.** No hace falta instalar nada ni aprender ningún
> comando nuevo: el Pull Request se abre, se revisa, se comenta y se aprueba desde la web de
> la plataforma. Los únicos comandos que necesitas son los de Git que ya conoces, y el
> último de ellos es el `push` de tu rama. De ahí en adelante, es todo pantalla y ratón.

### Se llama distinto según la plataforma

El concepto es idéntico en las tres. Solo cambia el vocabulario:

| | GitHub | GitLab | Azure DevOps |
| :--- | :--- | :--- | :--- |
| **El pedido** | Pull Request (PR) | Merge Request (MR) | Pull Request (PR) |
| **Quién revisa** | Reviewers | Reviewers / Approvers | Reviewers |
| **Ver los cambios** | Files changed | Changes | Files |
| **Dar el visto bueno** | Approve | Approve | Approve |
| **Incorporar** | Merge pull request | Merge | Complete |

Si tu equipo usa GitLab y lees "Pull Request", traduce a "Merge Request" y sigue: todo lo
demás aplica igual.

### Cómo se abre

1. **Entra al repositorio en la web.** Después de un `push`, casi siempre aparece un aviso
   arriba del tipo *"tu rama tiene cambios recientes — ¿crear un Pull Request?"*. Ese botón
   es el atajo. Si no aparece, busca la sección **Pull Requests** / **Merge Requests** y
   usa el botón **New**.
2. **Revisa el origen y el destino.** Toda plataforma te muestra dos ramas: **de** tu rama
   **hacia** `main`. Verifica que el destino sea el correcto — es el error más común, y el
   más molesto de deshacer.
3. **Pon un título que se entienda solo.** Empieza por el ID del ticket:
   `QA-1122 · Plan de pruebas de login con MFA`.
4. **Escribe la descripción.** Es lo que hace que la revisión sea rápida o eterna (ver
   abajo).
5. **Asigna revisores.** Elige personas que conozcan el tema. Si tu equipo tiene revisores
   obligatorios configurados, la plataforma los agrega sola.
6. **Vincula el ticket.** En Azure DevOps se enlaza el work item; en GitHub y GitLab
   alcanza con mencionar el ID en el título o la descripción si hay integración con Jira.

### Qué poner en la descripción

Quien revisa no estuvo en tu cabeza. Ayúdalo:

```markdown
## Qué cambia
Plan de pruebas para el login con doble factor (QA-1122).

## Por qué
La historia se refinó la semana pasada y el plan anterior no cubría
el reenvío de código ni el vencimiento.

## Qué mirar con atención
El tiempo de expiración del código: puse 5 minutos según la minuta
del 12/03, pero la especificación funcional dice 10. Lo anoté como
contradicción; hay que confirmarlo con negocio.

## Qué NO entra aquí
Los casos de recuperación de contraseña — van en QA-1131.
```

Esa sección de *"qué mirar con atención"* es la que más ahorra tiempo. **Señalar tus propias
dudas no es mostrar debilidad: es dirigir la revisión al lugar donde hace falta.**

---

## 👀 La revisión entre pares

En un repositorio de documentos, **el revisor es el único control de calidad que existe**.
No hay tests que corran solos. Si el revisor mira por arriba y aprueba, nadie más lo va a
mirar nunca.

### Qué se revisa en un documento

No es lo mismo que revisar código. Preguntas útiles:

- **¿Se puede verificar?** *"El sistema debe responder rápido"* no se puede probar. *"Menos
  de 2 segundos"* sí.
- **¿Contradice a otro documento?** Si el plan dice 10 y la especificación dice 20, uno de
  los dos está mal, y descubrirlo ahora cuesta muchísimo menos que descubrirlo probando.
- **¿Hay algo inventado?** Un dato sin respaldo que se cuela en un documento aprobado se
  convierte en verdad para todos los que lo lean después.
- **¿Falta un caso obvio?** El error, el vacío, el límite, el sin conexión.
- **¿Se coló una credencial?** Una contraseña, un token, una URL con usuario y contraseña
  adentro. Si aparece una, **no alcanza con borrarla**: hay que rotarla, porque queda en el
  historial.
- **¿Se entiende sin contexto?** Alguien que entre al equipo en seis meses, ¿lo va a
  entender?

### Cómo dejar comentarios

- **Sobre el texto, no sobre la persona.** "Aquí falta el caso de timeout", no "te olvidaste
  del timeout".
- **Distingue lo que bloquea de lo que sugieres.** Marca explícitamente cuál es cuál: *"esto
  hay que corregirlo antes de incorporar"* frente a *"idea para más adelante"*. Un revisor
  que mezcla las dos cosas frena trabajo sin necesidad.
- **Pregunta cuando no entiendas.** La mitad de los comentarios buenos son preguntas, no
  correcciones. Si tú no lo entendiste, probablemente no esté claro.

### Cómo recibirlos

Los comentarios son sobre el documento, no sobre ti. Corriges, respondes a cada comentario
—aunque sea "listo" o "lo dejo así por esto otro"— y pides que vuelvan a mirar. Es una
conversación, no un examen.

---

## 🔒 `main` protegida: por qué alguien tiene que autorizar

En un equipo que trabaja bien, `main` está **protegida**. Eso significa, técnicamente, que
la plataforma **rechaza cualquier intento de escribir directo sobre ella**. Si lo intentas,
te va a decir que no:

```
! [remote rejected] main -> main (protected branch hook declined)
```

No es un error tuyo. Es el control funcionando. **La única puerta de entrada a `main` es un
Pull Request aprobado.**

### Las tres razones

**1 · Elimina el accidente, no solo la mala intención.** Nadie pisa el trabajo del equipo a
propósito. Se pisa por un `push` en la rama equivocada a las siete de la tarde. Con `main`
protegida ese error **es imposible**, no improbable. Los controles que dependen de que todos
se acuerden siempre, fallan.

**2 · Deja registro.** Cada cambio en la versión oficial queda con autor, revisor, fecha,
motivo y la discusión completa. Sin eso, la pregunta *"¿quién decidió esto y cuándo?"* no
tiene respuesta.

**3 · Es auditable.** En sectores regulados —banca, salud, seguros—, poder demostrar **quién
aprobó qué y cuándo** no es una preferencia del equipo: es un requisito. Un repositorio con
`main` protegida y PRs aprobados responde esa pregunta sola.

### Por qué el que aprueba necesita permisos

Porque **el control solo sirve si el que aprueba no es el mismo que hizo el trabajo.**

Si pudieras aprobar tu propio PR, el mecanismo sería decorativo: seguirías escribiendo
directo en `main`, solo que con más pasos. Por eso las plataformas permiten configurar:

- **Cantidad mínima de aprobaciones** antes de poder incorporar.
- **Que el autor no cuente** como aprobador de su propio cambio.
- **Revisores obligatorios** para ciertas carpetas — por ejemplo, que un cambio en los
  criterios de aceptación lo tenga que aprobar sí o sí el analista funcional.
- **Que las aprobaciones se borren** si subes cambios nuevos después de que te aprobaron
  (para que nadie apruebe una cosa y entre otra).

Es la misma separación de responsabilidades que ya conoces de cualquier proceso de calidad:
**quien ejecuta no es quien valida.**

### Las objeciones de siempre

> *"Es burocracia, yo sé lo que estoy haciendo."*

Probablemente sí. El control no existe porque desconfíen de ti: existe porque **el costo de
un error en la versión oficial lo paga todo el equipo**, y porque el que se equivoca nunca
sabe que se está equivocando en el momento.

> *"Es urgente, no hay tiempo de que alguien revise."*

Una revisión de un documento se hace en diez minutos. Rehacer las pruebas que se ejecutaron
contra un documento equivocado, no.

> *"No hay nadie para revisar mi cambio."*

Eso no es un problema del proceso: es un problema del equipo, y hay que decirlo en voz alta.
Un equipo donde una sola persona puede revisar tiene un cuello de botella y un riesgo si esa
persona se va de vacaciones.

---

## ⚠️ Conflictos: qué son y cómo evitarlos

Un **conflicto** aparece cuando dos personas cambiaron **las mismas líneas** del mismo
archivo y Git no puede decidir cuál vale. No es un error ni un desastre: es Git pidiéndote
que decidas tú.

Con documentos pasa más seguido que con código, porque en un texto no hay dueños claros de
cada párrafo. Tres cosas lo reducen mucho:

- **Ramas cortas.** Cuanto menos vive tu rama, menos probable es que alguien haya tocado lo
  mismo mientras tanto.
- **`git pull origin main` antes de empezar**, y de nuevo si la tarea se estiró varios días.
- **No reformatees archivos enteros.** Si cambias el ancho de línea o el formato de todo un
  documento, el sistema marca **todas** las líneas como modificadas: quien revise no va a
  poder ver qué cambiaste de verdad, y cualquiera que esté tocando ese archivo va a chocar
  contigo. Si hay que reformatear, que sea un cambio aparte y solo, avisando.

Si igual aparece uno, pide ayuda la primera vez. Se resuelve, y es más fácil de lo que
parece.

---

## 📋 Resumen del ciclo

```bash
# 1. Partir de lo último
git checkout main
git pull origin main

# 2. Crear la rama con el ID del ticket
git checkout -b docs/QA-1122-login-mfa

# 3. Trabajar y guardar (las veces que haga falta)
git add <archivos>
git commit -m "docs: agregar criterios de aceptación de MFA"

# 4. Subir la rama
git push origin docs/QA-1122-login-mfa

# 5. Abrir el Pull Request en la web, asignar revisores

# 6. Atender los comentarios, corregir, volver a subir

# 7. Cuando esté aprobado: incorporar (Merge / Complete)

# 8. Volver a main y actualizar
git checkout main
git pull origin main
```

Y la rama ya cumplió su función: se borra.

---

## En una línea

**La rama te deja trabajar sin molestar. El nombre cuenta qué hiciste. El Pull Request
deja registro de por qué. La revisión es el único control real que tiene un documento. Y
`main` protegida es lo que hace que todo lo anterior no dependa de que cada uno se acuerde.**
