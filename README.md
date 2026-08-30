# Curso: QA Manual Potenciado por IA (QA AI-Augmented)

> **Transforma tu perfil de QA tradicional a QA Augmented dominando LLMs, Context Engineering y Protocolos MCP.**

![QA AI Status](https://img.shields.io/badge/Status-Active-success)
![Focus](https://img.shields.io/badge/Focus-Shift%20Left%20%26%20Exploratory-blue)
![Tools](https://img.shields.io/badge/Tools-Gemini%20%7C%20Claude%20%7C%20OpenAI-orange)

---

> ## ⚠️ Antes que nada: este README no es el tuyo
>
> Lo que estás leyendo describe **el repositorio del curso**. En cuanto creaste tu copia
> desde la plantilla, dejó de ser cierto: tu repositorio ya no es un curso, es **el
> repositorio de trabajo de tu proyecto**.
>
> **Reescribilo.** No es un trámite: el README es lo primero que lee una persona que entra
> al proyecto — y también lo primero que lee la IA cuando le pedís que se ubique. Si dice
> que esto es un curso, vas a arrastrar ese malentendido a todo lo que generes.
>
> Qué tiene que salir: el título, las referencias al curso, a las clases y a los alumnos,
> la sección de contribución al repositorio original, y el pie de página. Qué tiene que
> entrar: qué es tu proyecto, para qué sirve cada carpeta y cómo se trabaja acá.
>
> **Pedíselo a tu asistente con algo así:**
>
> ```text
> Reescribí el README.md de este repositorio.
>
> Contexto: este repositorio arrancó como la plantilla de un curso y el README todavía
> describe el curso, no el proyecto. Hoy es el repositorio de trabajo de QA del proyecto
> [NOMBRE DE TU PROYECTO], que [UNA LINEA SOBRE QUE HACE].
>
> Antes de escribir nada, leé AGENTS.md, .context/ai-project-map.md y la estructura de
> carpetas, y basate en lo que encuentres ahí, no en suposiciones.
>
> Quiero que:
> 1. Saques toda referencia al curso, a las clases, a los alumnos y a la contribución al
>    repositorio original, incluido el pie de página.
> 2. Expliques qué es este repositorio hoy y para qué sirve cada carpeta.
> 3. Mantengas los enlaces a las guías de .guides/, que siguen siendo válidos.
> 4. Verifiques lo que afirmes: si decís que una carpeta está vacía, abrila primero.
>
> Mostrame el resultado antes de guardarlo.
> ```
>
> **Y revisá lo que te devuelva antes de aceptarlo.** Es tu primer ejercicio del curso sin
> que nadie te lo pida: leer un documento generado por IA y buscarle los errores. Empezá
> por los que ya tiene este README —dice que `.context/` *"viene vacía"* y no es cierto—.
>
> Cuando termines, borrá este aviso. Es lo único de este archivo que sí es del curso.

---

## 🎯 ¿Qué es este curso?

Este repositorio contiene todo el material práctico, prompts y guías para el curso de **"Modernización del Testing con IA"**.

El objetivo no es que la IA haga tu trabajo, sino que te conviertas en un **Arquitecto de Calidad** que orquesta inteligencias artificiales para:
1.  Analizar requisitos antes de que existan (Shift-Left).
2.  Generar estrategias de prueba robustas en minutos.
3.  Ejecutar pruebas exploratorias asistidas por agentes autónomos.
4.  Documentar casos de prueba y bugs con calidad profesional.

---

## 📂 Estructura del Repositorio

Este proyecto está diseñado para ser tu **"Laboratorio de QA"**.

| Carpeta | Descripción |
| :--- | :--- |
| **`.prompts/`** | 🧠 **El Cerebro:** Librería de prompts de ingeniería listos para usar en cada fase (F1 a F7). |
| **`.context/`** | 🗂️ **La Memoria:** Aquí se guardan los outputs de la IA (PRDs, Planes de Prueba, Bugs). Viene vacía para que tú la llenes. |
| **`.guides/`** | 📚 **El Manual:** Guías técnicas para instalar CLIs, trabajar con Git y conectar LLMs (ver abajo). |
| **`.documents/`** | 📖 **La Teoría:** Explicación conceptual de cada fase del ciclo de vida del QA Augmented. |

---

## 📚 Las Guías

| Guía | Para qué |
| :--- | :--- |
| [Inicio y setup](.guides/guia-inicio-setup.md) | Instalar todo desde cero: VS Code, terminal, Node.js y Git. **Empieza por aquí.** |
| [Git — básico](.guides/Git/git-basico.md) | Los comandos del día a día: clonar, guardar cambios, subir y bajar. |
| [Git — flujo de trabajo](.guides/Git/git-workflow.md) | El ciclo de una tarea de principio a fin y cómo escribir buenos mensajes. |
| [Git — trabajo en equipo](.guides/Git/git-colaboracion.md) | Ramas, Pull Requests, revisión entre pares y por qué `main` está protegida. |
| [`.guides/LLMs/`](.guides/LLMs/) | Instalar y configurar el asistente de IA que elijas. |
| [`.guides/mcps/`](.guides/mcps/) | Conectar herramientas por MCP: Jira, bases de datos, navegador, Postman. |
| [`.guides/postman/`](.guides/postman/) | Preparar Postman para las pruebas de API. |

> La guía de **trabajo en equipo** es la que más se saltea y la que más cuesta después. Aquí
> el repositorio no guarda código: guarda documentos, y un documento equivocado se ve igual
> que uno correcto. La revisión de otra persona es el único control que existe.

---

## 🚀 Cómo empezar

Este repositorio es una **Plantilla (Template)**. No debes trabajar directamente sobre él, sino crear tu propia copia.

### Opción A: Usar como Plantilla (Recomendado)
1.  Haz clic en el botón verde **"Use this template"** (arriba a la derecha en GitHub) -> **"Create a new repository"**.
2.  Dale un nombre a tu proyecto (ej: `mi-proyecto-qa-ia`).
3.  Clona **TU** nuevo repositorio en tu máquina:
    ```bash
    git clone https://github.com/TU-USUARIO/mi-proyecto-qa-ia.git
    cd mi-proyecto-qa-ia
    ```

### Opción B: Clonado Manual
Si prefieres clonarlo manualmente, recuerda cambiar el origen para no intentar subir cambios a este repositorio base:

```bash
# 1. Clona este repo
git clone https://github.com/Ecosistemas-QA/curso-QA-AI-Augmented.git
cd curso-QA-AI-Augmented

# 2. Elimina el vínculo con el origen
git remote remove origin

# 3. Crea tu propio repo vacío en GitHub y conéctalo
git remote add origin https://github.com/TU-USUARIO/tu-repo-nuevo.git
git push -u origin main
```

### 2. Elige tu Motor de IA
Ve a la carpeta `.guides/LLMs/` y sigue la guía de instalación para tu asistente favorito:
**Las tres del curso** — elegí una:

*   [Anthropic — Claude Code](.guides/LLMs/claudeCode/claude-Code-CLI-config.md)
*   [OpenAI — Codex](.guides/LLMs/openAI/openai-cli-config.md)
*   [Google — Antigravity CLI (`agy`)](.guides/LLMs/antigravity/instalacion-antigravity-cli.md) (reemplaza a Gemini CLI, retirada en junio de 2026)

**Alternativa para entornos corporativos** — solo si tu empresa bloquea las tres de
arriba, algo habitual en bancos y aseguradoras:

*   [GitHub Copilot CLI](.guides/LLMs/copilot/copilot-cli-config.md) (terminal)
*   [GitHub Copilot en VS Code — modo agente](.guides/LLMs/copilot/copilot-vscode-agente.md) (sin instalar nada, si ya tenés VS Code y Copilot)

### 3. Ejecuta tu primer Prompt
Abre el archivo `.prompts/1-Constitucion/business-model.md`, copia el contenido y pégalo en tu chat con la IA. ¡Mira cómo genera tu estrategia de negocio!

---

## 🎓 Programa del Curso (Las 7 Fases)

El flujo sigue un ciclo de vida de desarrollo moderno. **Cada fase lee lo que dejó la
anterior y escribe su entregable en `.context/`**, así que la carpeta se va llenando sola a
medida que avanzás:

| # | Fase | Qué produce | Dónde queda |
| :--- | :--- | :--- | :--- |
| **1** | Constitución | Canvas de negocio y análisis de mercado | `.context/idea/` |
| **2** | Arquitectura | PRD y diseño del sistema (con diagramas Mermaid) | `.context/architecture/` |
| **3** | Infraestructura | Mapa de entornos y estrategia de datos de prueba | `.context/infrastructure/` |
| **4** | Especificaciones | Backlog: epics e historias refinadas en Gherkin | `.context/PBI/` |
| **5** | Shift-Left Testing | Inspección de requisitos y matriz de riesgos | `.context/testing/` |
| **6** | Testing Exploratorio | Smoke, sesiones de UI, API y DB, y reportes de bugs | `.context/testing/exploratory/` |
| **7** | Documentación de CPs | Análisis de escenarios, ROI de automatización y casos formales | `.context/testing/documentation/` |

Los prompts de cada fase están en `.prompts/`, numerados igual. **No hace falta acordarse
del orden: al terminar, cada prompt te dice cuál sigue**, y el siguiente se detiene si le
falta lo anterior.

> Las Fases 4 a 7 se apoyan en Jira y en MCPs (Playwright, base de datos), pero **ninguna se
> bloquea si no los tenés**: escriben igual en local y te avisan qué quedó pendiente de
> sincronizar.

---

## 🛠️ Requisitos del Alumno

*   **Rol:** QA Manual, Analista QA o Tester.
*   **Conocimientos:** Conceptos básicos de testing (ISTQB foundation es un plus).
*   **Herramientas:**
    *   Una terminal moderna (Recomendamos **Warp**).
    *   Git instalado.
    *   Cuenta en GitHub.
    *   Acceso a un LLM (Gemini, ChatGPT o Claude).

---

## 🤝 Contribución

Este es un repositorio educativo vivo. Si encuentras un error en un prompt o quieres mejorar una guía:
1.  Crea una rama (`git checkout -b fix/mi-mejora`).
2.  Haz tus cambios.
3.  Envía un Pull Request.

---

**© 2026 Ecosistemas QA.** *QA Augmented methodology.*
