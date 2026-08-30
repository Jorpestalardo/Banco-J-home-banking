# Guia Basica: Setup de Postman

## Objetivo
Dejar Postman listo para ejecutar casos de prueba API del curso en entornos `dev`, `qa` o `staging`.

## 1. Instalacion
1. Descarga Postman Desktop desde `https://www.postman.com/downloads/`.
2. Instala y abre la aplicacion.
3. Inicia sesion (o crea cuenta) para guardar workspaces y colecciones.

## 2. Crear Workspace de curso
1. Haz clic en `Workspaces`.
2. Crea un workspace llamado `QA-AI-Augmented`.
3. Tipo recomendado: `Personal` (o `Team` si trabajan en equipo).

## 3. Configurar Environment base
1. Ve a `Environments` y crea uno nuevo (por ejemplo `qa`).
2. Define variables iniciales:
- `baseUrl`
- `token`
- `apiKey`
- `timeoutMs`
3. Guarda el environment y seleccionarlo en la esquina superior derecha.

## 4. Validar conectividad minima
1. Crea un request `GET {{baseUrl}}/health` (o endpoint equivalente).
2. Ejecuta `Send`.
3. Espera `200 OK` y confirma tiempo de respuesta razonable.

## 5. Configuracion recomendada
- Usa `Authorization` por collection cuando sea posible.
- Centraliza headers comunes (`Content-Type`, `Accept`) en la collection.
- Evita hardcodear URLs o tokens dentro de requests.
- Usa variables para ids dinamicos (`userId`, `orderId`, etc.).

## 6. Buenas practicas para el curso
- Una collection por dominio funcional o endpoint critico.
- Nombres claros para requests: `GET Users - Happy Path`, `POST Orders - Invalid Payload`.
- Incluye tests minimos por request:
- status code esperado
- validacion basica de schema o campos clave
- Guarda evidencia en `.context/testing/exploratory/api/evidence/`.

## 7. Problemas comunes
- `401/403`: token invalido, vencido o sin permisos.
- `404`: `baseUrl` incorrecta o recurso inexistente.
- `429`: rate limit, espera y reintenta.
- SSL error en ambientes internos: revisar certificado corporativo o configuracion de proxy.
