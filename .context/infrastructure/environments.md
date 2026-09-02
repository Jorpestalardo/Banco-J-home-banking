# Estrategia de Infraestructura y Entornos: CITA AI

## 1. Tipo de Aplicación y Alcance

*   **Plataforma:** Aplicación Web responsive (Desktop y Mobile Web) desarrollada con Next.js (App Router), React, Tailwind CSS y componentes Radix UI.
*   **Matriz de Compatibilidad:**
    *   **Navegadores Soportados:** Google Chrome (últimas 2 versiones), Safari (iOS y macOS), Mozilla Firefox, Microsoft Edge.
    *   **Dispositivos y Resoluciones Clave:**
        *   *Mobile Web (Smartphone):* 375x667 (iPhone SE), 390x844 (iPhone 12/13/14), 412x915 (Android estándar). Foco principal para el flujo de auto-reserva del cliente final (acceso desde bio de Instagram / WhatsApp).
        *   *Desktop / Tablet:* 768x1024 (iPad/Tablet), 1280x720 (HD Laptop), 1920x1080 (FHD Desktop). Foco principal para el panel de configuración de agenda del profesional.

---

## 2. Mapa de Entornos (Matriz de URLs)

| Componente | Local (Desarrollo) | UAT (Abandonado / Inactivo) | Producción (Entorno Único Activo) |
| :--- | :--- | :--- | :--- |
| **Frontend Web** | `http://localhost:3000` | `https://uat.cita.ai` *(no operativo)* | `https://cita-ai.vercel.app/` |
| **Backend API (BFF)** | `http://localhost:3000/api` | `https://uat.cita.ai/api` *(no operativo)* | `https://cita-ai.vercel.app/api` |
| **Base de Datos & Auth** | Proyecto Supabase Local / Remoto | Proyecto Supabase UAT *(desactualizado)* | PostgreSQL en Supabase Cloud (Producción) |
| **Servicio de Emails** | Casillas temporales (Mailinator) | Casillas de prueba | Resend (Dominio de prueba del proveedor) |

> ⚠️ **Hallazgo Crítico de QA:** El proyecto opera actualmente bajo un **ambiente productivo único**. Las pruebas de aseguramiento de calidad, el testing exploratorio y el desarrollo local se ejecutan directamente sobre la base de datos y la instancia en vivo utilizada por usuarios reales.

### Detalles de Acceso y Gestión de Credenciales
*   **Acceso para Certificación de QA:** Auto-registro como profesional independiente directamente en `https://cita-ai.vercel.app/`.
*   **Gestión de Casillas de Correo:** Utilizar casillas de correo temporales o descartables (ej. Mailinator) para validar la recepción de confirmaciones de reserva, tokens de recuperación y enlaces de cancelación pública.
*   **Restricción Estricta de Cuentas:** Prohibido utilizar o modificar la cuenta de Fernando en producción, dado que contiene registros de profesionales y clientes reales con citas activas.
*   **Almacenamiento de Secretos:** Variables de entorno (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`) configuradas en el panel administrativo de Vercel. Nunca deben incluirse credenciales en el repositorio ni en el historial de chat.

---

## 3. Pipeline de CI/CD (Integración Continua y Despliegue)

*   **Trigger de Despliegue:** Automático al realizar `git push` a la rama `main` en el repositorio de GitHub conectado con Vercel.
*   **Pruebas Automáticas en Pipeline:** **Inexistentes (`0 tests`).** No existen flujos de GitHub Actions ni pipelines de integración continua configurados.
*   **Proceso de Release Actual:**
    1. El desarrollador prueba cambios en su entorno local contra la base de datos remota.
    2. Realiza push directo a la rama `main`.
    3. Vercel compila el proyecto y lo despliega automáticamente a producción en 2-3 minutos.
    4. En caso de fallos graves, la recuperación consiste en ejecutar un rollback manual al deploy previo desde la interfaz web de Vercel.

---

## 4. Herramientas de Infraestructura

*   **Vercel (Hosting Serverless):** Aloja el frontend React y las funciones serverless de Next.js. Provee CDN global, certificados SSL automáticos y despliegue continuo.
*   **Supabase Cloud:** Plataforma backend administrada que aloja PostgreSQL, el servicio de autenticación (`auth.users`) y el motor de Row Level Security (RLS).
*   **Resend:** Infraestructura de despacho de correo electrónico transaccional consumida vía API REST.

---

## 5. Riesgos del Mapa de Entornos

| Riesgo de Infraestructura | Severidad | Impacto Operativo y de Calidad |
| :--- | :--- | :--- |
| **Operación en Ambiente Único de Producción** | **Crítica** | Las pruebas de QA conviven con usuarios reales. Cualquier turno de prueba queda registrado en la base de datos productiva sin posibilidad de borrado masivo o rollback. |
| **Ausencia de Pipeline de CI y Tests Automatizados** | **Alta** | Cualquier commit con errores de lógica o regresiones se despliega inmediatamente a producción sin barreras de calidad previas. |
| **Falta de Tareas Programadas (Cron Jobs)** | **Alta** | La ausencia de cron jobs en el plan básico de Vercel bloquea la ejecución del envío automático de recordatorios 24 horas antes del turno. |
| **Entregabilidad de Correos (Spam)** | **Media** | Los correos se envían desde un dominio de prueba genérico de Resend sin verificación DNS (SPF/DKIM/DMARC) del dominio `cita.ai`, provocando caídas en carpetas de correo no deseado. |
| **Falta de Backups Propios y Versionado de Base de Datos** | **Media** | El esquema de datos no posee scripts de migración formales; reside exclusivamente en la nube de Supabase. |

---

## Fuentes

| Dato / afirmación | De dónde sale |
| :--- | :--- |
| URL única de producción en `https://cita-ai.vercel.app/` y abandono de UAT | `documentacion para QA/nota-ambientes-y-accesos.md` · la direccion / lo del ambiente de UAT |
| Instrucciones de auto-registro en QA con Mailinator | `documentacion para QA/nota-ambientes-y-accesos.md` · como entrar |
| Prohibición de uso de la cuenta productiva de Fernando | `documentacion para QA/nota-ambientes-y-accesos.md` · un par de cosas / `hilo-mail-alcance-qa.md` |
| Despliegue automático de Vercel por push a main y falta de CI/CD | `04-notas-tecnicas.md` · stack / deploy |
| Despacho síncrono de correos y falta de dominio verificado | `04-notas-tecnicas.md` · mails / `nota-ambientes-y-accesos.md` |
| Tiempo de rollback de 2-3 minutos en panel de Vercel | `04-notas-tecnicas.md` · numeros de rendimiento (recuperacion) |
| Matriz de navegadores y resoluciones mobile | **Hipótesis** — recomendación estándar para aplicaciones web orientadas a redes sociales |
| Tiempos de compilación de Next.js en Vercel | **Hipótesis** — comportamiento habitual de la plataforma |

---

## Contradicciones detectadas

*   **Disponibilidad del ambiente UAT:** Mientras la especificación funcional (`03-especificacion-funcional-v0.3.md`, sección 11) y notas tempranas (`04-notas-tecnicas.md`) estipulaban la existencia de `uat.cita.ai` con base de datos anonimizada, la nota técnica operativa (`nota-ambientes-y-accesos.md`) confirmó que UAT fue abandonado por practicidad operativa y que actualmente se prueba directo en producción.
*   **Dominio oficial `cita.ai` vs. Dominio Vercel:** Aunque el dominio `cita.ai` fue adquirido institucionalmente, nunca fue enlazado mediante registros DNS, operando el producto sobre el subdominio gratuito `cita-ai.vercel.app`.

---

## Preguntas abiertas

*   ¿Se habilitará un proyecto secundario en Supabase y un entorno de Preview en Vercel para aislar las pruebas de QA de los datos reales de clientes?
*   ¿Cuándo se configurarán los registros DNS (SPF, DKIM, MX) del dominio `cita.ai` para asegurar la entregabilidad de los correos transaccionales?
*   ¿Qué herramienta o acción de GitHub Actions se integrará para bloquear despliegues que no superen linter y tests unitarios?
