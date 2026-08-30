# ⚠️ Gemini CLI fue reemplazada por Antigravity CLI

**Esta guía quedó obsoleta. No la sigas.**

> **Google retiró Gemini CLI el 18 de junio de 2026** y la reemplazó por
> **Antigravity CLI**.

## 👉 La guía vigente está acá

### [`../antigravity/instalacion-antigravity-cli.md`](../antigravity/instalacion-antigravity-cli.md)

---

## Qué cambió

No fue un cambio de nombre: **es otro programa.**

| | Gemini CLI *(retirada)* | Antigravity CLI |
|---|---|---|
| **Comando** | `gemini` | **`agy`** |
| **Instalación** | `npm install -g @google/gemini-cli` | Script de una línea |
| **Requiere Node.js** | Sí, v18+ | **No** |
| **Qué es por dentro** | Paquete de Node | Binario compilado |

## Si ya tenías Gemini CLI instalada

```powershell
npm uninstall -g @google/gemini-cli
```

Después instalá la nueva siguiendo la guía vigente, y **cambiá `gemini` por `agy`** en
cualquier apunte, alias o script que tengas.

---

## Por qué dejamos este archivo acá

Porque **casi toda la documentación de internet todavía habla de Gemini CLI**. Si
llegaste hasta acá siguiendo un tutorial, un video o un enlace viejo, la idea es que
encuentres el desvío en lugar de perder una tarde con comandos que ya no existen.

💡 **Si seguiste una guía y no te funcionó nada, no hiciste nada mal.** El material
publicado antes de junio de 2026 tiene los comandos viejos, y hay muchísimo dando
vueltas. Fijate siempre la fecha de lo que estás leyendo — vale para esto y para todo lo
demás del curso.
