# Guía de Inicio: Preparando tu Entorno de QA Augmented

¡Bienvenido! Antes de empezar a usar la Inteligencia Artificial para probar software, necesitamos preparar tu "caja de herramientas".

No te preocupes si nunca has usado estas herramientas. Esta guía te llevará paso a paso para instalar todo lo necesario desde cero.

---

## 1. Tu Centro de Mando: Visual Studio Code (VS Code)

VS Code no es solo para programadores. Es un editor de texto superpoderoso donde escribirás tus prompts, leerás la documentación y verás los resultados de la IA.

### 📥 Instalación
1.  Ve a [code.visualstudio.com](https://code.visualstudio.com/).
2.  Descarga la versión para tu sistema (Windows o Mac).
3.  Instálalo como cualquier otro programa (Siguiente -> Siguiente -> Instalar).

### 🧩 Extensiones Recomendadas (Plugins)
VS Code se puede mejorar con "accesorios". Para este curso, te recomendamos instalar estos (son gratis):

1.  Abre VS Code.
2.  Haz clic en el ícono de "cuadritos" en la barra lateral izquierda (o presiona `Ctrl+Shift+X`).
3.  Busca e instala estas extensiones:
    *   **Markdown All in One:** Te ayuda a escribir documentación con negritas, listas y tablas más rápido.
    *   **Markdown Preview Mermaid Support:** **¡Vital!** Permite que VS Code "dibuje" los diagramas que la IA genera con código. Sin esto, solo verás texto.
    *   **Material Icon Theme:** Hace que los íconos de las carpetas se vean bonitos y fáciles de distinguir.

---

## 2. Tu Consola Moderna: Warp (Recomendado)

La "pantalla negra" (terminal) asusta a muchos, pero es necesaria para hablar con las herramientas de IA. **Warp** es una terminal moderna que funciona como un chat: puedes usar el mouse, copiar y pegar fácilmente, y tiene IA integrada.


### 📥 Instalación
1.  Ve a [warp.dev](https://www.warp.dev/).
2.  Descárgalo e instálalo.
3.  Regístrate (es gratis para uso personal).

---

## 3. El Motor: Node.js

Muchas herramientas modernas (incluyendo los CLIs de IA) funcionan sobre una base llamada Node.js. No necesitas saber programar en él, solo tenerlo instalado.

### 📥 Instalación
1.  Ve a [nodejs.org](https://nodejs.org/).
2.  Descarga la versión **LTS** (Long Term Support) - es la más estable.
3.  Instálalo y acepta las opciones por defecto.

---

## 4. La Máquina del Tiempo: Git

Git es la herramienta que guarda el historial de tu trabajo. Es lo que nos permite subir todo a la nube (GitHub) y trabajar en equipo.

### 📥 Instalación en Windows
1.  Ve a [git-scm.com/download/win](https://git-scm.com/download/win).
2.  Descarga el instalador "Standalone Installer".
3.  ¡Ojo! El instalador tiene muchas opciones. **Dale a "Next" a todo** sin miedo, la configuración por defecto está bien.

### 📥 Instalación en Mac
Si instalaste Warp o las herramientas de desarrollador de Apple, probablemente ya lo tienes. Para verificar, abre Warp y escribe:
```bash
git --version
```
Si te sale un número, ¡ya lo tienes!

### 📖 Y después de instalarlo

Tener Git instalado no es lo mismo que saber trabajar con él. Hay tres guías en `.guides/Git/`, pensadas para leerse en este orden:

| Guía | Para qué |
| :--- | :--- |
| [`git-basico.md`](./Git/git-basico.md) | Los comandos del día a día: clonar, guardar cambios, subir y bajar. Empieza por aquí. |
| [`git-workflow.md`](./Git/git-workflow.md) | El ciclo de una tarea de principio a fin, y cómo escribir buenos mensajes. |
| [`git-colaboracion.md`](./Git/git-colaboracion.md) | Cuando trabajas con otras personas: ramas, Pull Requests, revisión entre pares y por qué `main` está protegida. |

Si vas a trabajar solo, con las dos primeras alcanza. **La tercera se vuelve indispensable en cuanto haya alguien más tocando los mismos documentos**, que es el caso normal en un equipo.

---

## ✅ Verificación Final

Para asegurarte de que todo quedó bien, abre tu terminal (Warp o PowerShell) y escribe estos comandos uno por uno. Si te devuelven un número de versión, ¡estás listo!

```bash
node --version
git --version
code --version
```

**¿Todo listo?** Ahora puedes ir a la carpeta `.guides/LLMs/` para instalar la Inteligencia Artificial que prefieras (Gemini, Claude o GPT).
