# Guía de Permisos en Antigravity CLI

Referencia rápida para configurar las reglas de permisos del agente dentro de la terminal interactiva de Antigravity (`agy`).

---

## Acceso al panel de permisos

Dentro de `agy`, presionar `/permissions` o acceder desde el menú de configuración. Se presenta una interfaz con tres vistas navegables con las flechas `←` / `→`:

| Vista | Qué hace |
| :--- | :--- |
| **allowlist** | Acciones que el agente ejecuta **sin pedir confirmación** |
| **denylist** | Acciones que el agente **nunca** puede ejecutar |
| **asklist** | Acciones que el agente **siempre pregunta** antes de ejecutar |

---

## Formato de las reglas

Todas las reglas siguen el patrón:

```
acción(objetivo)
```

### Acciones disponibles

| Acción | Controla |
| :--- | :--- |
| `write` | Crear o editar archivos |
| `run` | Ejecutar comandos en la terminal |
| `mcp` | Llamar herramientas de servidores MCP |

### Objetivos (target)

Los objetivos aceptan **patrones glob**:

- `*` — cualquier cosa en un solo nivel
- `**` — cualquier cosa en cualquier nivel de profundidad
- Se pueden combinar con rutas relativas a la raíz del proyecto

---

## Ejemplos útiles para este proyecto

### allowlist (permitir sin preguntar)

```
write(.context/**)          # Escribir en toda la carpeta .context/
write(.guides/**)           # Escribir en toda la carpeta .guides/
write(**.md)                # Escribir cualquier archivo Markdown
run(git *)                  # Ejecutar cualquier comando git
mcp(playwright/*)           # Usar cualquier herramienta de Playwright
run(*)                      # Permitir todos los comandos (usar con cuidado)
```

### denylist (bloquear siempre)

```
write(.env)                 # Nunca tocar el archivo de variables de entorno
run(rm -rf *)               # Nunca ejecutar borrado recursivo forzado
write(.git/**)              # Nunca modificar internos de Git
```

---

## Atajos de teclado en el panel

| Tecla | Acción |
| :--- | :--- |
| `↑` / `↓` | Navegar entre reglas |
| `←` / `→` | Cambiar entre allowlist, denylist y asklist |
| `a` | Agregar una regla nueva |
| `e` | Editar la regla seleccionada |
| `d` / `⌫` | Eliminar la regla seleccionada |
| `Esc` | Cerrar el panel |

---

## Alcance de las reglas

Las reglas pueden definirse a dos niveles:

- **Project:** Aplican únicamente al repositorio actual. Se guardan junto al proyecto.
- **Global:** Aplican a todas las sesiones de `agy`, sin importar el repositorio.

Al agregar una regla, elegir el alcance según la necesidad. Para este proyecto de QA, se recomienda usar reglas de **Project** para mantener los permisos acotados al contexto del repositorio.
