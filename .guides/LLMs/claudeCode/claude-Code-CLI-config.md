# Guía de Instalación de Claude Code CLI

## Descripción
**Claude Code** es la interfaz de línea de comandos oficial de Anthropic. Permite a los desarrolladores realizar tareas de ingeniería de software, análisis de código y gestión de proyectos directamente desde la terminal, aprovechando la potencia de los modelos Claude 3.5 Sonnet y Opus.

## Requisitos Previos

- **Node.js**: Versión 18 o superior.
- **Cuenta de Anthropic**: Para obtener acceso a la API.
- **Terminal**: Se recomienda **Warp** para una mejor experiencia de visualización.

## Instalación

### Paso 1: Instalar el paquete

Ejecuta el siguiente comando en tu terminal Warp:

```bash
npm install -g @anthropic-ai/claude-code
```

### Paso 2: Autenticación

Una vez instalado, debes iniciar sesión para vincular tu cuenta:

```bash
claude login
```

Esto abrirá una ventana en tu navegador para autorizar el acceso. Sigue las instrucciones en pantalla.

*Alternativa con API Key:*
Si prefieres usar una variable de entorno (por ejemplo, en servidores de CI/CD):

**En Warp (Bash/Zsh):**
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

**En PowerShell:**
```powershell
$env:ANTHROPIC_API_KEY = "sk-ant-..."
```

### Paso 3: Verificación

Comprueba que la instalación es correcta consultando la versión:

```bash
claude --version
```

## Uso Básico

### Iniciar una sesión interactiva
Simplemente ejecuta:
```bash
claude
```
Esto abrirá el REPL (Read-Eval-Print Loop) donde puedes chatear con Claude sobre tu código.

### Ejecutar un comando rápido
```bash
claude "Explica el propósito del archivo package.json"
```

### Analizar un archivo específico
```bash
claude -f src/app.ts "Encuentra posibles bugs en este archivo"
```

## Configuración de Warp

Para mejorar la experiencia en Warp:
1. Usa **Blocks** para separar las respuestas de Claude.
2. Habilita el modo "AI Command Search" con `Ctrl + ` para buscar comandos de `claude` rápidamente.

## Solución de Problemas

**Error: "command not found: claude"**
- Asegúrate de que la ruta de instalación global de npm esté en tu PATH.
- Intenta reinstalar: `npm uninstall -g @anthropic-ai/claude-code` y luego instala de nuevo.

**Error de Permisos (EACCES)**
- Usa `sudo` en Mac/Linux o ejecuta Warp como Administrador en Windows.

---
**Nota:** Claude Code está optimizado para trabajar con **Model Context Protocol (MCP)**, lo que le permite conectarse a tus herramientas locales y bases de datos. Revisa la guía de configuración de MCP para más detalles.
