# Usar en Claude Code las skills que viven en `.agents/`

Este repositorio guarda algunas skills en `.agents/skills/`, que es el formato **portable**:
la misma carpeta la entienden Codex, Copilot y otros agentes. Claude Code, en cambio, solo
busca skills en `.claude/skills/`.

La consecuencia práctica: **al clonar el repositorio, las skills de `.agents/skills/` no le
aparecen a Claude Code.** No da ningún error, simplemente no existen para él.

Esta guía explica cómo conectarlas. Los enlaces son personales de cada computadora, así que
**cada persona que clone el repositorio tiene que hacer este paso una vez**.

---

## 1. Entender el mapa de carpetas

Claude Code lee skills de exactamente dos lugares:

| Ubicación | Alcance | Se versiona en git |
| --- | --- | --- |
| `.claude/skills/<nombre>/SKILL.md` (en el repositorio) | Solo este proyecto | Sí |
| `~/.claude/skills/<nombre>/SKILL.md` (en tu carpeta personal) | Todos tus proyectos | No |

En Windows, `~` es `C:\Users\TuUsuario`. En Mac, `/Users/TuUsuario`.

La carpeta debe estar **exactamente un nivel** debajo de `skills/`. Ni `skills/SKILL.md`
suelto, ni anidado más profundo: en esos casos el archivo nunca se lee y nada avisa.

---

## 2. Elegir cómo conectarlas

Hay dos caminos. Ambos válidos, con distinto mantenimiento.

### 🅰️ Copiar la carpeta (más simple)

Copiás la skill de `.agents/skills/` a `.claude/skills/` y listo.

- ✅ Funciona igual en Windows y Mac, sin comandos raros.
- ❌ Quedan **dos copias**: si alguien edita el original, tu copia se queda vieja.

Recomendado si estás empezando o si la skill casi no cambia.

### 🅱️ Crear un enlace (recomendado)

Creás un "acceso directo" real a nivel de sistema de archivos. Hay un solo archivo
verdadero; Claude Code lo lee a través del enlace.

- ✅ Editás una vez y vale para todos los agentes.
- ❌ El comando es distinto en Windows y en Mac.

---

## 3. Crear el enlace en 🪟 Windows

Windows tiene dos tipos de enlace de carpeta. Usá **junction**: es el único que **no
requiere permisos de administrador** ni activar el modo desarrollador.

Abrí PowerShell, ubicate en la raíz del repositorio y ejecutá:

```powershell
New-Item -ItemType Junction -Path ".claude\skills\saludar-nombre-agents" -Target ".agents\skills\saludar-nombre-agents"
```

Cambiá `saludar-nombre-agents` por el nombre de la skill que quieras conectar.

Si preferís hacerlo desde `cmd` en lugar de PowerShell, el equivalente es:

```text
mklink /J ".claude\skills\saludar-nombre-agents" ".agents\skills\saludar-nombre-agents"
```

> **Nota sobre Google Drive y OneDrive:** si tenés el repositorio dentro de una carpeta
> sincronizada, el enlace **funciona igual** (está probado). Tené en cuenta que el
> sincronizador puede llegar a subir el contenido dos veces, una por cada ruta.

---

## 4. Crear el enlace en 🍎 Mac

En Mac se usa un enlace simbólico, que viene de fábrica y tampoco necesita permisos
especiales. Abrí la Terminal, ubicate en la raíz del repositorio y ejecutá:

```bash
ln -s "../../.agents/skills/saludar-nombre-agents" ".claude/skills/saludar-nombre-agents"
```

Ojo con el `../../` del principio: en un enlace simbólico la ruta de destino se interpreta
**desde la carpeta donde queda el enlace** (`.claude/skills/`), no desde donde estás parado.
Si preferís evitar ese detalle, usá la ruta absoluta:

```bash
ln -s "$(pwd)/.agents/skills/saludar-nombre-agents" ".claude/skills/saludar-nombre-agents"
```

El mismo comando sirve en Linux.

---

## 5. Enlazarlas todas de una vez

Si `.agents/skills/` tiene varias skills, no hace falta repetir el comando una por una. Estos
bucles recorren la carpeta, enlazan lo que falte y **saltean lo que ya existe**, así que
podés volver a correrlos sin miedo cada vez que alguien agregue una skill nueva al
repositorio.

Ubicate en la raíz del repositorio y ejecutá el que corresponda.

### 🪟 Windows (PowerShell)

```powershell
if (-not (Test-Path ".claude\skills")) { New-Item -ItemType Directory ".claude\skills" | Out-Null }
Get-ChildItem ".agents\skills" -Directory | ForEach-Object {
    $destino = ".claude\skills\$($_.Name)"
    if (Test-Path -LiteralPath $destino) {
        Write-Host "ya existe: $($_.Name)"
    } else {
        New-Item -ItemType Junction -Path $destino -Target $_.FullName | Out-Null
        Write-Host "enlazada: $($_.Name)"
    }
}
```

### 🍎 Mac / Linux

```bash
mkdir -p .claude/skills
for skill in .agents/skills/*/; do
  nombre=$(basename "$skill")
  if [ -e ".claude/skills/$nombre" ]; then
    echo "ya existe: $nombre"
  else
    ln -s "$(pwd)/.agents/skills/$nombre" ".claude/skills/$nombre"
    echo "enlazada: $nombre"
  fi
done
```

No hace falta tocar el `.gitignore` después de correrlos: ya ignora por defecto todo lo que
aparezca en `.claude/skills/`. El detalle está en el punto 7.
---

## 6. Comprobar que funcionó

Primero, que el archivo se lea a través del enlace:

```powershell
Get-Content ".claude\skills\saludar-nombre-agents\SKILL.md" -TotalCount 3
```

```bash
head -3 ".claude/skills/saludar-nombre-agents/SKILL.md"
```

Si ves las primeras líneas del `SKILL.md`, el enlace está bien.

Para ver de un vistazo cuáles de tus skills son enlaces y cuáles carpetas reales:

```powershell
Get-ChildItem ".claude\skills" -Directory | ForEach-Object { "$($_.Name) -> $($_.Target)" }
```

```bash
ls -l .claude/skills
```

Las que muestran un destino a la derecha son enlaces; las que aparecen vacías son carpetas
propias de `.claude/skills/`, que se versionan normalmente.

Después, pedile a Claude Code que liste las skills escribiendo `/`. La skill recién
enlazada suele aparecer **en el momento**, sin reiniciar. Si no la ves, salí con `/exit` y
volvé a entrar.

---

## 7. Por qué los enlaces no se suben a git

Git **no guarda el enlace como enlace**: ve una carpeta normal con archivos adentro. Si
hacés `git add`, subís una copia duplicada de la skill y rompés justamente lo que queríamos
evitar.

El `.gitignore` del repositorio ya se ocupa, ignorando **todo** lo que haya en
`.claude/skills/` y volviendo a incluir solo las excepciones:

```text
.claude/skills/*
!.claude/skills/saludo-nombre-claude/
```

Así, los enlaces que crees quedan afuera **solos**, sin que tengas que agregar nada.

Esto solo te toca si creás una skill **propia de Claude Code** —una que no sea enlace, que
viva de verdad en `.claude/skills/`—: en ese caso agregale su línea con `!` o queda fuera
del repositorio sin ningún aviso.

> ⚠️ **El asterisco no es un detalle de estilo.** Tiene que ser `.claude/skills/*`, no
> `.claude/skills/`. Si se ignora el directorio, Git no entra a mirarlo y las líneas con `!`
> dejan de tener efecto: la excepción se pierde en silencio. Está probado en este
> repositorio.

Antes de commitear, confirmá qué entraría de verdad:

```powershell
git add --dry-run .claude/
```

Es más confiable que `git check-ignore`, que sobre un **directorio** puede dar un falso
positivo. Si lo usás, consultalo sobre el archivo (`.claude/skills/NOMBRE/SKILL.md`), no
sobre la carpeta.

---

## 8. Deshacer el enlace

⚠️ **Cuidado:** borrar mal un enlace puede borrar los archivos originales.

En Windows, `Remove-Item` con `-Recurse` sobre un junction es riesgoso. Usá esta forma, que
elimina únicamente el enlace:

```powershell
[System.IO.Directory]::Delete((Resolve-Path ".claude\skills\saludar-nombre-agents").Path, $false)
```

En Mac o Linux, borralo **sin** barra final y sin `-r`:

```bash
rm ".claude/skills/saludar-nombre-agents"
```

Después confirmá que el original sigue en su lugar:

```powershell
Test-Path ".agents\skills\saludar-nombre-agents\SKILL.md"
```

```bash
ls ".agents/skills/saludar-nombre-agents/SKILL.md"
```

---

## Resumen de comandos

| Tarea | 🪟 Windows (PowerShell) | 🍎 Mac / Linux |
| --- | --- | --- |
| Crear enlace | `New-Item -ItemType Junction -Path ".claude\skills\NOMBRE" -Target ".agents\skills\NOMBRE"` | `ln -s "$(pwd)/.agents/skills/NOMBRE" ".claude/skills/NOMBRE"` |
| Enlazar todas | bucle del punto 5 | bucle del punto 5 |
| Verificar | `Get-Content ".claude\skills\NOMBRE\SKILL.md" -TotalCount 3` | `head -3 ".claude/skills/NOMBRE/SKILL.md"` |
| Borrar enlace | `[System.IO.Directory]::Delete((Resolve-Path ".claude\skills\NOMBRE").Path, $false)` | `rm ".claude/skills/NOMBRE"` |

---

## Qué se validó de esta guía

- Los comandos de **Windows** se ejecutaron en este repositorio, sobre una carpeta
  sincronizada con Google Drive, con Claude Code 2.1.245: el junction se crea sin permisos
  de administrador, el `SKILL.md` se lee a través del enlace y el borrado deja intacto el
  original. Las skills enlazadas aparecieron en la sesión **sin reiniciar**. El bucle del
  punto 5 se corrió con una skill ya enlazada y otra sin enlazar: creó la que faltaba y
  salteó la existente.
- Que Claude Code lee `.claude/skills/` y **no** `.agents/skills/` se verificó sobre la
  versión instalada 2.1.245.
- Las reglas del `.gitignore` del punto 7 se probaron con `git add --dry-run`: con
  `.claude/skills/` (sin asterisco) la excepción `!` **no se aplica** y la skill propia
  queda fuera del repositorio; con `.claude/skills/*` sí se aplica. También se creó una
  skill nueva, se la enlazó y se confirmó que el enlace queda ignorado sin tocar el
  `.gitignore`.
- De los comandos de **Mac / Linux** se probó únicamente el recorrido de carpetas del bucle
  (la detección de skills y de enlaces ya existentes). La creación del enlace con `ln -s`
  sigue el comportamiento estándar, pero **no se ejecutó en una Mac** al escribir esta guía.
