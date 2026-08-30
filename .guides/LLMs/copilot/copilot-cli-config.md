# Guía de Instalación de GitHub Copilot CLI

## Descripción

**GitHub Copilot CLI** trae el asistente de IA a tu terminal. No es un buscador de
comandos: es **agéntico**, o sea que puede leer los archivos de tu proyecto, escribirlos
y ejecutar tareas, conversando en lenguaje natural.

El comando se llama **`copilot`**.

---

## ⚠️ Leé esto antes de elegir esta herramienta

**El curso se dicta sobre Claude Code, Codex y Antigravity CLI.** Esas tres son las que
vamos a usar en clase y las que están en los ejercicios.

**Copilot es la alternativa para cuando ninguna de las tres se puede instalar.** Y ese
caso es real: en bancos, aseguradoras y empresas grandes, Copilot suele ser la única
herramienta de IA ya aprobada, porque llega dentro del contrato corporativo de Microsoft
que el área legal ya revisó.

| Si… | Usá |
|---|---|
| Podés instalar lo que quieras | **Claude Code, Codex o Antigravity CLI** — son las del curso |
| Tu empresa bloquea todo salvo la suite de Microsoft | **Copilot** (esta guía) |

**No te quedás afuera de nada.** Los conceptos son los mismos y Copilot resuelve bien lo
que hacemos. Lo que cambia son algunos nombres de comandos, y las diferencias están
señaladas donde corresponde.

---

---

## ⚠️ Si conocías `gh copilot suggest` y `gh copilot explain`

Existía antes una **extensión** de GitHub CLI que solo sugería y explicaba comandos:

```bash
gh extension install github/gh-copilot   # ← deprecada
```

**Esa extensión está deprecada.** La reemplazó esta herramienta, que es otra cosa: la
anterior te *sugería* un comando para que lo corrieras vos; la nueva **trabaja sobre tu
proyecto**.

| | Extensión `gh-copilot` *(deprecada)* | Copilot CLI |
|---|---|---|
| **Qué hacía** | Sugerir y explicar comandos | Leer, escribir y ejecutar sobre tu proyecto |
| **Cómo se invocaba** | `gh copilot suggest "..."` | `copilot` |
| **Instalación** | Extensión de `gh` | winget, npm, Homebrew o `gh copilot` |

Si la tenías instalada, no hace falta que la desinstales, pero **usá la nueva**.

---

## Requisitos Previos

- **Una suscripción activa de GitHub Copilot.** Si tu empresa te la da, ya la tenés:
  verificalo en https://github.com/settings/copilot.
- **PowerShell 6 o superior** en Windows.
- **Una cuenta de GitHub** con acceso a Copilot.

> ⚠️ **En entornos corporativos, revisá esto primero.** Algunas organizaciones
> restringen qué puede hacer Copilot por política. Si algo no funciona y la suscripción
> está activa, probablemente sea una política de tu organización y no un problema de
> instalación.

---

## Instalación

Hay varias vías. **Elegí según lo que tu empresa te permita**, en este orden:

### Opción A — WinGet (Windows) · la recomendada

```powershell
winget install GitHub.Copilot
```

**Es la mejor opción en equipos corporativos:** no necesita Node.js, y WinGet suele estar
permitido porque es el gestor de paquetes de la propia Microsoft.

### Opción B — Desde GitHub CLI

Si ya tenés `gh` instalado y autenticado:

```powershell
gh copilot
```

Se encarga de instalar y arrancar la herramienta.

### Opción C — npm (todas las plataformas)

```powershell
npm install -g @github/copilot
```

> ⚠️ **Requiere Node.js 22 o superior.** Verificá con `node --version`. En muchas
> empresas la instalación de paquetes npm globales está bloqueada — si es tu caso, usá
> la Opción A.

### Opción D — macOS y Linux

Con **Homebrew** o el script de instalación oficial. 🔄 Consultá el comando vigente en
la [documentación oficial](https://docs.github.com/en/copilot/how-tos/copilot-cli/install-copilot-cli).

---

## Primer uso

### Paso 1: Cerrar y volver a abrir la terminal

Necesario para que la consola reconozca el comando nuevo. Si lo salteás, el paso
siguiente falla aunque la instalación haya salido bien.

### Paso 2: Pararte en tu proyecto y arrancar

```powershell
cd C:\ruta\a\tu\proyecto
copilot
```

Arranca **dentro de esa carpeta**, y eso es lo que le da acceso a esos archivos. Es la
diferencia con usar Copilot en una pestaña del navegador.

### Paso 3: Autenticarte

Dentro de la sesión, escribí:

```
/login
```

Y seguí las instrucciones en pantalla.

### Paso 4: Verificar que ve tu proyecto

```
Leé @README.md y decime en dos líneas de qué se trata este proyecto
```

Si responde sobre el contenido real del archivo, está funcionando.

---

## Uso Básico

### Referenciar archivos con `@`

Escribí `@` y el nombre del archivo. Va autocompletando:

```
Leé @requisitos.md y decime qué situaciones no están contempladas
```

**Esto reemplaza copiar y pegar.** El archivo no se pega: se lee.

> 💡 **En teclado en español, `@` sale con `AltGr + Q`.** Si estás dentro de Warp y AltGr
> te enciende el dictado por voz, usá **`Ctrl + Alt + Q`**.

### Ver los comandos disponibles

Escribí `/` y se despliega el menú. **No hace falta memorizar nada.**

### Salir

```
/exit
```

---

## Solución de Problemas

### ❌ `copilot` no se reconoce como comando

**Causa más probable:** no cerraste y volviste a abrir la terminal después de instalar.

**Solución:** cerrá PowerShell, abrí una ventana nueva y probá otra vez.

### ❌ "You are not subscribed to GitHub Copilot"

- Verificá la suscripción en https://github.com/settings/copilot.
- Confirmá que iniciaste sesión con la cuenta correcta: dentro de la sesión, `/login`.
- Si es una cuenta de empresa, puede que falte que te asignen la licencia. Consultá con
  quien administre Copilot en tu organización.

### ❌ WinGet no está disponible

Es raro en Windows 10 y 11 actualizados, pero puede pasar en equipos con políticas
restrictivas. Probá la Opción B (`gh copilot`) o hablá con sistemas.

### ❌ La instalación por npm falla por permisos

Es una restricción de tu equipo. **No la fuerces con permisos de administrador si es una
máquina de la empresa** — usá WinGet.

---

## Uso en el Curso

1. **Analizar requisitos.** *"Leé `@historia.md` y decime qué casos borde no están
   contemplados."*
2. **Generar casos de prueba** a partir de un ticket, con el formato de tu equipo.
3. **Entender comandos** que encontraste en algún lado y no sabés qué hacen.
4. **Documentar**, con la ventaja de que lee los archivos reales del proyecto.

> 🔗 **Para usarlo dentro de VS Code**, que es lo más habitual en empresas con la suite
> de Microsoft, seguí [`copilot-vscode-agente.md`](copilot-vscode-agente.md).

---

> 🔄 **Última revisión: agosto de 2026.** Copilot CLI está cambiando rápido — la
> extensión anterior se deprecó en menos de un año. Ante una diferencia con lo que ves en
> pantalla, la documentación oficial manda.
