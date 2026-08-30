# Flujo de Trabajo y Buenas Prácticas (Workflow QA)

## 🎯 Objetivo
En un equipo de **QA Augmented**, Git no solo guarda código, sino **Conocimiento**. Usamos Git para gestionar Prompts, Documentación de Pruebas y Contexto del Proyecto.

El objetivo es que **todos tengamos la misma información** actualizada y ordenada.

> Esta guía es el resumen del día a día. Para el detalle de cómo nombrar las ramas, cómo se
> abre y se revisa un Pull Request en GitHub, GitLab o Azure DevOps, y por qué `main` está
> protegida, está [`git-colaboracion.md`](./git-colaboracion.md).

---

## 🚫 La Regla de Oro
> **NUNCA trabajes directamente en la rama `main`.**

La rama `main` es sagrada. Debe contener solo documentos aprobados y funcionales. Si subes algo roto a `main`, rompes el trabajo de todo el equipo.

---

## 🌳 Uso de Ramas (Branches)

Una **Rama** es una copia paralela del proyecto donde puedes trabajar tranquilo sin afectar a los demás.

### Nomenclatura Recomendada para QA

El nombre sigue el patrón `tipo/ID-DEL-TICKET-descripcion-corta`:

| Prefijo | Uso | Ejemplo |
| :--- | :--- | :--- |
| **docs/** | Documentación nueva o actualizada | `docs/QA-1122-login-mfa` |
| **prompts/** | Creación o mejora de Prompts | `prompts/QA-1188-analisis-riesgos` |
| **test/** | Casos de prueba o scripts | `test/QA-1150-regresion-pagos` |
| **fix/** | Corrección de errores en docs | `fix/QA-1163-limite-freemium` |
| **chore/** | Mantenimiento, orden, configuración | `chore/QA-1201-reordenar-carpetas` |

**El ID del ticket es lo que más trabaja**: es el hilo que conecta el ticket, la rama, los
commits y el cambio incorporado. Sin él, dentro de seis meses la respuesta a *"¿por qué este
documento dice esto?"* es *"no sé"*.

El porqué completo, las reglas de escritura y los antiejemplos están en
[`git-colaboracion.md`](./git-colaboracion.md), sección *«El nombre de la rama es el relato
del trabajo»*.

### Comandos para Ramas

1.  **Crear una rama nueva:**
    ```bash
    git checkout -b docs/mi-nueva-tarea
    ```
2.  **Cambiar de rama:**
    ```bash
    git checkout main
    ```
3.  **Ver tus ramas:**
    ```bash
    git branch
    ```

---

## 🔄 El Ciclo de Vida de una Tarea

Imagina que te asignan documentar la **Historia de Usuario 505 (Pago con QR)**.

### Paso 1: Actualizar y Crear Rama
Antes de nada, asegúrate de tener lo último de `main`:
```bash
git checkout main
git pull origin main
git checkout -b docs/US-505-pago-qr
```

### Paso 2: Trabajar
Creas los archivos, modificas los prompts, escribes los casos de prueba.
*(Aquí usas `git status`, `git add .` y `git commit -m "..."` tantas veces como necesites)*.

### Paso 3: Subir tu Rama
Cuando termines, sube **tu rama** a la nube (no a `main`):
```bash
git push origin docs/US-505-pago-qr
```

### Paso 4: Pull Request (Revisión de Pares)

Entra al repositorio **en el navegador** y abre el Pull Request desde tu rama hacia `main`.
No hace falta instalar nada ni usar ningún comando nuevo: de acá en adelante es todo web.

*   Esto avisa a tu equipo: *"Terminé los docs de la US-505, ¿alguien puede revisarlos?"*.
*   Un compañero revisa que los prompts sean efectivos y la documentación clara.
*   Si todo está bien, aprueban e incorporan (**Merge**) tu trabajo en `main`.

Cómo se abre en cada plataforma, qué escribir en la descripción, qué mirar al revisar un
documento y por qué el que aprueba no puede ser el autor:
[`git-colaboracion.md`](./git-colaboracion.md), secciones *«El Pull Request»* y
*«`main` protegida»*.

---

## ✨ Buenas Prácticas de Commit

El mensaje del commit debe explicar **QUÉ** hiciste, no solo decir "cambios".

*   ❌ Mal: "archivos subidos", "fix", "listo"
*   ✅ Bien: "docs: Agregar casos de prueba para Login"
*   ✅ Bien: "prompt: Optimizar prompt de análisis de riesgos"

### Estructura Recomendada:
`[tipo]: [descripción breve]`

*   **feat:** Algo nuevo (Feature).
*   **fix:** Corrección.
*   **docs:** Solo documentación.
*   **style:** Formato (espacios, puntos y comas).
*   **refactor:** Mejorar algo que ya existía sin cambiar su función.
