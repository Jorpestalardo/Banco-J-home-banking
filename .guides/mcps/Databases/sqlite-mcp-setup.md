# Guía de Configuración: SQLite MCP Server

## 📌 Descripción
SQLite es una base de datos ligera que vive en un solo archivo (`.db` o `.sqlite`). Es perfecta para prácticas de curso, aplicaciones móviles o entornos de desarrollo donde no quieres configurar un servidor completo.

**Ideal para:**
*   Analizar bases de datos locales.
*   Practicar SQL sin internet.
*   Validar datos de apps móviles (Android/iOS exportan a SQLite).

**Paquete:** `mcp-server-sqlite-npx` — la versión ejecutable con `npx` del servidor SQLite de referencia.

## 🛠️ Instalación

**No hace falta instalar nada por separado:** `npx` lo baja la primera vez y lo deja cacheado. Si querés comprobarlo antes, abrí tu terminal (Warp):

```bash
npx -y mcp-server-sqlite-npx --help
```

## ⚙️ Configuración

Agrega esto a tu archivo de configuración MCP.

### Estructura del Comando
```json
"sqlite": {
  "command": "npx",
  "args": [
    "-y",
    "mcp-server-sqlite-npx",
    "C:\\Ruta\\Completa\\a\\tu\\archivo.db"
  ]
}
```

*Nota: En Windows, recuerda usar doble barra invertida `\\` en las rutas. **La ruta tiene que ser absoluta**: si ponés una relativa, el servidor arranca pero no encuentra la base.*

> ⚠️ **Este servidor puede escribir, no solo leer.** Además de consultar, sabe insertar filas y crear tablas. En la Fase 6 trabajamos con la base **en modo lectura**: consultamos para verificar qué guardó la aplicación, nunca para arreglar un dato.
>
> Si le pedís a la IA que "corrija" un registro que salió mal, **destruís la evidencia del bug**. Y peor: el bug sigue ahí, pero ya no se puede reproducir.
>
> Trabajá siempre sobre **una copia del archivo**, no sobre el original.

## 🧪 Caso de Uso para QA

Imagina que estás probando una app móvil y encuentras un bug.
1.  Extraes el archivo de base de datos del dispositivo (`app_data.db`).
2.  **Sacás una copia** y configuras este MCP apuntando a la copia.
3.  Le dices a la IA:
    > "Analiza la tabla 'usuarios' en la base de datos sqlite y dime si el usuario 'test' se guardó con el flag 'is_active' en true."

¡Es una forma potentísima de hacer **White Box Testing** sin saber SQL avanzado!

## ⚠️ Solución de Problemas

**El servidor arranca pero la IA dice que no hay tablas:**
*   Casi siempre es la ruta. Verificá que sea absoluta y que el archivo exista tal como lo escribiste.

**En macOS, el asistente no encuentra `npx`:**
*   Algunas aplicaciones de escritorio no heredan tu `PATH`. Poné la ruta completa a `npx` en el campo `command` (la obtenés con `which npx`).
