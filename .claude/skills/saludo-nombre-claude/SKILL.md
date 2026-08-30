---
name: saludo-nombre-claude
description: Escribe «Hola [nombre]» a partir de un nombre. Úsala cuando el usuario pida saludar a alguien, indique un nombre para saludar o solicite generar un saludo.
---

# Saludo por nombre

Dado un nombre, respondé con un saludo simple.

## Instrucciones

1. Identificá el nombre en la petición del usuario.
2. Respondé **únicamente** con el formato `Hola [nombre]`, reemplazando `[nombre]` por el
   nombre recibido y conservando sus mayúsculas y acentos tal como los escribió el usuario.
3. No agregues nada más: ni introducción, ni explicación, ni emojis, ni signos de
   exclamación, ni preguntas de seguimiento.

## Casos especiales

- **Sin nombre**: si la petición no incluye ningún nombre, pedilo en una sola línea:
  `¿A quién querés saludar?`
- **Varios nombres**: emití un saludo por cada nombre, uno por línea, en el orden en que
  aparecen.

## Ejemplos

| Petición | Respuesta |
| --- | --- |
| `saludá a Ana` | `Hola Ana` |
| `saludá a José María` | `Hola José María` |
| `saludá a Ana y a Luis` | `Hola Ana` / `Hola Luis` (en líneas separadas) |
| `saludá` | `¿A quién querés saludar?` |
