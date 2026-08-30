# Guía de Instalación de Antigravity CLI (`agy`)

## Descripción

**Antigravity CLI** es la herramienta de línea de comandos oficial de Google para
trabajar con IA desde la terminal. Permite conversar con el modelo, leer y escribir
archivos del proyecto y ejecutar tareas, todo sin salir de la consola.

El comando se llama **`agy`**.

---

## ⚠️ Si venías de Gemini CLI

Esto es importante, porque casi toda la documentación que vas a encontrar en internet
todavía habla de la herramienta vieja.

> **Gemini CLI ya no existe.** Google la retiró el **18 de junio de 2026** y la
> reemplazó por Antigravity CLI.

**No fue un cambio de nombre.** Es otro programa, y cambió todo lo que importa:

| | Gemini CLI *(retirada)* | Antigravity CLI |
|---|---|---|
| **Comando** | `gemini` | **`agy`** |
| **Instalación** | `npm install -g @google/gemini-cli` | Script de una línea |
| **Requiere Node.js** | Sí, v18+ | **No** |
| **Qué es por dentro** | Paquete de Node | Binario compilado |

### Qué hacer si tenías la vieja instalada

1. **Desinstalá Gemini CLI** para que no queden dos cosas compitiendo:
   ```powershell
   npm uninstall -g @google/gemini-cli
   ```
2. Instalá Antigravity CLI siguiendo los pasos de abajo.
3. **Cambiá `gemini` por `agy`** en cualquier apunte, alias o script que tengas.

> 💡 **Si seguiste un tutorial y no te funcionó nada, no hiciste nada mal.** Todo el
> material publicado antes de junio de 2026 tiene los comandos viejos, y hay muchísimo
> dando vueltas. Fijate siempre la fecha de lo que estás leyendo.

---

## ⚠️ No confundas "Antigravity" con "Antigravity"

Google usa el mismo nombre para dos productos distintos:

- **Antigravity CLI** (`agy`) — la herramienta de terminal. **Es la de esta guía.**
- **El IDE Antigravity** — un editor con IA integrada, del estilo de Cursor.

Cuando busques documentación, fijate a cuál de los dos se refiere.

---

## Requisitos Previos

- **Windows 10 u 11** con PowerShell (la instalación de abajo es para Windows).
- **Conexión a internet.** La herramienta consulta el modelo en la nube, no funciona
  sin red.
- **Una cuenta de Google.**

> **No hace falta Node.js.** Si lo tenías instalado solo para Gemini CLI, Antigravity ya
> no lo necesita.

---

## Instalación

### Paso 1: Abrir PowerShell

Menú Inicio → escribí `PowerShell` → Enter.

No hace falta abrirlo como Administrador.

### Paso 2: Pegar el comando

```powershell
irm https://antigravity.google/cli/install.ps1 | iex
```

Copiá la línea, pegala en PowerShell y apretá Enter. Eso es toda la instalación.

<details>
<summary>¿Qué hace exactamente ese comando?</summary>

Son dos cosas encadenadas:

- `irm` (*Invoke-RestMethod*) **descarga** el script de instalación desde el sitio de
  Google.
- `| iex` (*Invoke-Expression*) **lo ejecuta**.

Es el método de instalación estándar de muchas herramientas modernas. Vale la pena
saber qué hace, porque **solo deberías correr una línea así cuando la dirección es la
oficial del fabricante** — en este caso, `antigravity.google`.

</details>

> ⚠️ **En una computadora de empresa esto puede estar bloqueado.** Muchas políticas de
> seguridad corporativas impiden descargar y ejecutar scripts. Si el comando falla con
> un error de permisos o de política de ejecución, **no lo fuerces**: hablá con el área
> de sistemas.

### Paso 3: Cerrar y volver a abrir la terminal

Es necesario para que la consola reconozca el comando nuevo. Si no lo hacés, el paso
siguiente va a fallar aunque la instalación haya salido bien.

### Paso 4: Verificar

```powershell
agy --version
```

Si devuelve un número de versión, está listo.

### En macOS y Linux

```bash
curl -fsSL https://antigravity.google/cli/install.sh | bash
```

Misma idea que en Windows: descarga el script oficial y lo ejecuta. Después, cerrá y
volvé a abrir la terminal, y verificá con `agy --version`.

---

## Primer uso

### Iniciar

Parate en la carpeta de tu proyecto y escribí:

```powershell
agy
```

La herramienta arranca **dentro de esa carpeta**, y eso es lo que le da acceso a esos
archivos. Es la diferencia con un chat del navegador.

### Autenticación

**No hace falta configurar ninguna API key a mano.** El proceso es automático:

1. Antigravity CLI busca primero una sesión guardada en el **llavero seguro de tu sistema
   operativo**.
2. Si no encuentra ninguna, **abre el navegador** para que inicies sesión con Google.
3. Listo. La sesión queda guardada para la próxima.

**Si trabajás por SSH o en una máquina remota**, la herramienta lo detecta: en lugar de
abrir un navegador que no existe, te muestra una URL para abrir desde tu computadora y
después pegás el código de autorización en la terminal.

**Para cerrar sesión y borrar las credenciales guardadas:**

```
/logout
```

> 💡 **Cuenta de empresa.** Si tu organización te da acceso por Google Cloud, hay que
> conectar el proyecto de GCP durante el primer arranque. Consultá con quien administre
> las licencias.

### Referenciar un archivo

Escribí `@` y el nombre del archivo. Va autocompletando a medida que tipeás:

```
Leé @requisitos.md y decime qué situaciones no están contempladas
```

**Esto reemplaza copiar y pegar.** El archivo no se pega: se lee.

> 💡 **En teclado en español, `@` sale con `AltGr + Q`.** Si estás dentro de Warp y
> AltGr te enciende el dictado por voz, usá **`Ctrl + Alt + Q`**.

### Salir

```
/exit
```

La sesión queda guardada y podés retomarla después. Si además querés **cerrar sesión y
borrar tus credenciales**, usá `/logout`.

### Delegar trabajo en paralelo

Antigravity CLI puede lanzar **subagentes**: tareas que corren en paralelo mientras vos
seguís con otra cosa. Sirve para investigaciones o validaciones largas que no querés estar
esperando.

No hace falta para arrancar, pero conviene saber que está — aparece en el menú `/`.

### Ver los comandos disponibles

Escribí `/` y se despliega el menú. **No hace falta memorizar nada.**

---

## Permisos: qué puede hacer y qué no

Esta parte importa más de lo que parece, porque define **cuánto daño puede hacer la
herramienta si se equivoca**.

### Lo que viene por defecto

- **Lee y escribe solo dentro de las carpetas de tu proyecto.** No ve el resto de tu
  máquina.
- **Pide permiso antes de ejecutar comandos de terminal.** Vos ves qué va a hacer y
  decidís.

> 💡 Eso ya es un punto de partida razonable: podés empezar a trabajar sin tocar nada de
> la configuración.

### Cambiar el nivel de autonomía

```
/permissions
```

| Nivel | Qué hace |
| :--- | :--- |
| `request-review` | Te pide confirmación antes de actuar |
| `always-proceed` | Deja de preguntar. **Solo en entornos descartables.** |
| `strict` | El más restrictivo |

⚠️ **Empezá siempre con confirmación y aflojá cuando entiendas cómo se comporta.** Nunca
`always-proceed` sobre documentación real o sistemas de tu empresa.

### Aislamiento extra para los comandos

Si querés que los comandos corran en un entorno aislado, activá el sandbox de terminal —
viene **desactivado** por defecto:

```json
{
  "enableTerminalSandbox": true
}
```

### Listas de permitidos y bloqueados

Para control más fino, podés declarar qué comandos se permiten y cuáles nunca:

```json
{
  "permissions": {
    "allow": ["command(git)", "command(npm test)"],
    "deny": ["command(rm -rf)"]
  }
}
```

### Dónde vive la configuración

```
~/.gemini/antigravity-cli/settings.json
```

> 💡 **Sí, dice `.gemini`.** Es una herencia del nombre anterior de la herramienta. No te
> confundas: la carpeta se llama así, pero el programa es Antigravity CLI.

---

## Problemas Comunes

### ❌ `agy` no se reconoce como comando

**Síntoma:**
```
agy : El término 'agy' no se reconoce como nombre de un cmdlet...
```

**Causa más probable:** no cerraste y volviste a abrir la terminal después de instalar.

**Solución:** cerrá la ventana de PowerShell, abrí una nueva y probá otra vez. Si sigue
sin funcionar, reiniciá la sesión de Windows.

### ❌ El instalador falla por política de ejecución

**Síntoma:** un error que menciona *execution policy* o *scripts deshabilitados*.

**Causa:** Windows bloquea la ejecución de scripts descargados. Es habitual en equipos
de empresa.

**Solución:** es una restricción de seguridad de tu organización. **No la desactives por
tu cuenta** — consultá con sistemas.

### ❌ No responde o va muy lento

- Verificá tu conexión a internet: sin red no funciona.
- Puede haber límites de uso alcanzados. Revisá tu consumo con el comando de uso.
- Probá con un modelo más chico para tareas simples.

### ❌ Todavía tengo instalada la versión vieja

Si al escribir `gemini` todavía te responde algo, te quedó la herramienta anterior:

```powershell
npm uninstall -g @google/gemini-cli
```

---

## Actualización

> 🔄 **Verificar el comando de actualización** en la documentación oficial.

En general, **volver a correr el comando de instalación actualiza la herramienta** a la
última versión. No hace falta desinstalar nada antes.

---

## Recursos

- **Sitio oficial:** https://antigravity.google/
- **Guía de MCPs para Antigravity:** [`antigravity-mcp-config.md`](antigravity-mcp-config.md)

---

## Consejos para el Curso

1. **Verificá la instalación antes de cada clase práctica.** `agy --version` toma dos
   segundos.
2. **Empezá parándote siempre en la carpeta del proyecto.** Es el error más común al
   arrancar: abrirla en el lugar equivocado y que no encuentre los archivos.
3. **Usá `@` en vez de copiar y pegar.** Es la costumbre que más cambia tu forma de
   trabajar.
4. **Leé lo que propone antes de aprobar.** La herramienta pide permiso antes de
   escribir o ejecutar: ese permiso es tu control de calidad.
5. **Mirá tu consumo de vez en cuando.** Cada consulta cuesta.

---

> 🔄 **Este documento caduca rápido.** Antigravity CLI es reciente y está cambiando.
> Última revisión: **agosto de 2026**. Si algo no coincide con lo que ves en pantalla,
> la documentación oficial manda.
>
> **Procedencia de los datos:** los comandos de instalación se verificaron en agosto de
> 2026. Los detalles de autenticación, permisos y rutas de configuración provienen de un
> relevamiento de la documentación oficial del **25 de mayo de 2026** — son los más
> propensos a haber cambiado.

**¿Encontraste otro problema?** Documentá el error y la solución, así le sirve al resto
del curso.
