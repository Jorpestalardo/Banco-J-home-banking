# Guía de Instalación de OpenAI CLI

## Descripción
La **OpenAI CLI** oficial permite interactuar con los modelos GPT-4 y GPT-3.5 Turbo desde tu terminal. Es ideal para tareas rápidas de generación de texto, scripting y automatización de pruebas.

## Requisitos Previos

- **Python**: Versión 3.7 o superior (Recomendado 3.10+).
- **pip**: Gestor de paquetes de Python.
- **Cuenta de OpenAI**: Con créditos disponibles y una API Key.

## Instalación

### Paso 1: Instalar la librería oficial

El CLI viene incluido en la librería oficial de Python de OpenAI. Ejecuta en Warp:

```bash
pip install openai
```

*(Si tienes problemas de permisos, usa `pip install --user openai`)*.

### Paso 2: Configurar la API Key

La CLI necesita tu clave para funcionar.

1. Ve a [OpenAI API Keys](https://platform.openai.com/api-keys) y crea una nueva.
2. Configura la variable de entorno:

**En Warp (PowerShell):**
```powershell
$env:OPENAI_API_KEY = "sk-..."
```

**En Warp (Bash/Zsh):**
```bash
export OPENAI_API_KEY="sk-..."
```

### Paso 3: Verificar la instalación

Prueba ejecutar un comando básico para asegurar que todo funciona:

```bash
openai api chat.completions.create -m gpt-3.5-turbo -g user "Di hola mundo"
```

*(Nota: La sintaxis del CLI oficial puede ser verbosa. Para el curso, recomendamos crear un alias o usar un wrapper).*

## Configuración de un Alias (Recomendado)

Para trabajar más rápido, crea un alias en tu perfil de PowerShell o Bash.

**En PowerShell (`$PROFILE`):**
```powershell
function ask-gpt {
    param($Prompt)
    openai api chat.completions.create -m gpt-4 -g user "$Prompt"
}
```

Ahora puedes usar:
```bash
ask-gpt "Genera un caso de prueba para login"
```

## Alternativa: Node.js Wrapper

Si prefieres un entorno puramente Node.js (como el resto del curso), puedes instalar una herramienta comunitaria popular:

```bash
npm install -g chatgpt-cli
```

Esto habilita el comando `chatgpt`:
```bash
chatgpt "Analiza este requisito..."
```

## Solución de Problemas

### ❌ Error: "openai" no se reconoce como un comando

**Causa:** La carpeta de Scripts de Python no está en tu PATH.
**Solución:**
1. Busca dónde instala pip los paquetes (ej: `C:\Users\Usuario\AppData\Roaming\Python\Python310\Scripts`).
2. Agrega esa ruta a tus Variables de Entorno de Windows.
3. Reinicia Warp.

### ❌ Error: RateLimitError

**Causa:** Has excedido tu cuota o no tienes créditos.
**Solución:** Verifica tu facturación en `platform.openai.com`.

## Uso en el Curso

Utilizaremos OpenAI CLI principalmente para:
1. **Generar datos de prueba** (scripts rápidos).
2. **Refinar User Stories** (pasando el texto como argumento).
3. **Analizar logs de error** (pipeando la salida de un comando al CLI).

Ejemplo de Pipe en Warp:
```bash
cat error.log | openai api chat.completions.create -m gpt-4 -g user "Explica este error y cómo arreglarlo"
```
