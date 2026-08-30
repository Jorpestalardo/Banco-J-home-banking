# Guía Básica de Git para QA Augmented

## ¿Qué es Git?
Piensa en Git como el botón de **"Guardar Partida"** de los videojuegos, pero superpoderoso. Te permite guardar versiones de tu trabajo (documentos, prompts, casos de prueba) y volver atrás si te equivocas, además de colaborar con otros QAs sin pisarse el trabajo.

---

## 🚀 Configuración Inicial (Solo la primera vez)

Antes de empezar, dile a Git quién eres para que tus compañeros sepan quién hizo los cambios.

Abre tu terminal (Warp/PowerShell) y escribe:

```bash
# Tu nombre (aparecerá en el historial)
git config --global user.name "Tu Nombre"

# Tu correo (el mismo de GitHub)
git config --global user.email "tu-correo@empresa.com"
```

---

## 📥 Comandos de Supervivencia (Día a Día)

### 1. Clonar un Repositorio (`git clone`)
Es como descargar una carpeta de la nube a tu computadora.
*   **Cuándo:** Al empezar un proyecto nuevo.
*   **Comando:**
    ```bash
    git clone https://github.com/tu-organizacion/tu-proyecto.git
    ```

### 2. Ver el Estado (`git status`)
Es tu mejor amigo. Te dice qué archivos modificaste, cuáles son nuevos y en qué rama estás.
*   **Cuándo:** Siempre, antes de hacer cualquier cosa.
*   **Comando:**
    ```bash
    git status
    ```
    *   🔴 Rojo: Cambios sin guardar.
    *   🟢 Verde: Cambios listos para guardar.

### 3. Guardar Cambios (`git add` + `git commit`)
El proceso de guardar tiene dos pasos:
1.  **Preparar (Add):** Eliges qué archivos quieres guardar.
2.  **Confirmar (Commit):** Guardas la versión con un mensaje explicativo.

*   **Comando:**
    ```bash
    # 1. Preparar TODO lo modificado
    git add .
    
    # 2. Guardar con mensaje (¡Sé claro!)
    git commit -m "docs: Agregar casos de prueba para Login"
    ```

### 4. Subir a la Nube (`git push`)
Envía tus commits guardados localmente al servidor (GitHub) para que otros los vean.
*   **Cuándo:** Al terminar una tarea o al final del día.
*   **Comando:**
    ```bash
    git push origin main
    ```

### 5. Traer Cambios (`git pull`)
Descarga el trabajo que tus compañeros subieron a la nube y lo mezcla con el tuyo.
*   **Cuándo:** Cada mañana, antes de empezar a trabajar.
*   **Comando:**
    ```bash
    git pull origin main
    ```

---

## 🆘 Solución de Problemas Comunes

**Error: "Merge Conflict"**
*   **Qué significa:** Tú y otro QA editaron la misma línea del mismo archivo.
*   **Solución:** Abre el archivo en VS Code, verás marcas `<<<<` y `>>>>`. Elige qué versión quieres mantener, guarda y haz commit de nuevo.

**Error: "Permission denied"**
*   **Qué significa:** No tienes permiso para subir.
*   **Solución:** Revisa que tengas acceso al repositorio y que hayas iniciado sesión (o configurado tu Token).
