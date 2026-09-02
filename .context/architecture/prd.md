# Product Requirement Document (PRD): CITA AI

## 1. Introducción y Objetivos
*   **Visión:** CITA AI es una plataforma web de auto-agendamiento diseñada bajo el principio de **simplicidad radical**, dirigida a profesionales independientes y microempresas (1 a 3 personas) que facturan por hora de servicio (psicólogos, entrenadores, estilistas, profesores particulares). Su objetivo es eliminar el costo administrativo de 2 a 4 horas semanales de coordinación manual por WhatsApp, llamadas y papel, proveyendo un enlace público propio para ordenar la cartera existente de clientes sin intromisión de intermediarios ni cobro de comisiones por turno.
*   **Alcance del Release Actual (MVP / Soft Launch):**
    *   *Incluido en el release:*
        *   Registro y autenticación del profesional mediante correo y contraseña (Supabase Auth).
        *   Generación automática de URL pública única (`cita-ai.vercel.app/<slug>`).
        *   Configuración de disponibilidad semanal recurrente por día y duración única de turnos.
        *   Bloqueo de rangos de fechas y horarios específicos por el profesional.
        *   Portal público de auto-reserva para clientes finales sin requerimiento de registro previo.
        *   Mecanismo de cancelación unilateral (por link único de email para el cliente y desde el panel para el profesional).
        *   Notificaciones transaccionales por correo electrónico (bienvenida, confirmación, aviso de nueva reserva y avisos de cancelación).
        *   Gestión básica de clientes en panel y límite freemium a 10 clientes únicos con bloqueo del cliente número 11 y botón de captura de interés comercial.
    *   *Excluido del release (Fuera de alcance):*
        *   Cobros y pasarelas de pago integradas.
        *   Sincronización con calendarios externos (Google Calendar, Outlook).
        *   Cuentas multi-profesional o múltiples agendas concurrentes.
        *   Servicios con duraciones o tarifas diferenciadas.
        *   Formularios de captura de datos personalizados al reservar.
        *   Recordatorios automáticos 24 horas antes del turno (postergados por falta de infraestructura cron).
        *   Reportes analíticos avanzados y aplicaciones móviles nativas.

---

## 2. User Personas
*   **Profesional Independiente (Admin):**
    *   *Laura (Psicóloga clínica):* Trabaja en consulta privada; cómoda con herramientas digitales pero sin tiempo disponible. Su dolor crítico son las 4 horas semanales perdidas en coordinación de agendas y los solapamientos de turnos.
    *   *Carlos (Entrenador personal):* Poca afinidad técnica, desconfía de software complejo. Su dolor crítico son las cancelaciones imprevistas sobre la hora y los no-shows que le generan huecos no remunerados.
*   **Cliente Final (B2C / Sin cuenta):**
    *   *Sofía (Cliente digital):* Acostumbrada a resolver operaciones desde su teléfono móvil en segundos. Exige inmediatez y abandona procesos que exigen registrarse, recordar contraseñas o esperar respuestas diferidas por chat.

---

## 3. Funcionalidades Principales (Core Features)

### Feature 1: Registro y Autenticación del Profesional
*   **Descripción:** Alta de cuenta con nombre completo (máx. 100 caracteres), correo electrónico válido y contraseña (mínimo 8 caracteres, al menos 1 mayúscula y 1 número). Inicio de sesión seguro con tokens HTTP-only y recuperación de contraseña vía correo con token PKCE de 1 hora de validez. Generación algorítmica de slug único basado en el nombre (ej. `carlos-rojas-2`).
*   **Valor para el usuario:** Puesta en marcha autónoma en menos de 5 minutos sin asistencia técnica.
*   **Criterios de éxito:** Creación exitosa de registro en `auth.users` y tabla `professionals`, generación de slug irrepetible y despacho de correo de bienvenida.

### Feature 2: Configuración de Agenda y Bloqueos
*   **Descripción:** Definición de bloques de disponibilidad horaria por día de la semana (0 = domingo a 6 = sábado) y duración estándar de turno en minutos. El guardado reemplaza íntegramente las reglas anteriores. Capacidad de ingresar bloqueos puntuales (`time_blocks`) por vacaciones o imprevistos.
*   **Valor para el usuario:** Control centralizado del calendario de atención y prevención de turnos en horarios no laborales.
*   **Criterios de éxito:** Cálculo dinámico de franjas disponibles restando turnos confirmados y bloqueos sin persistir slots estáticos en base de datos.

### Feature 3: Portal Público de Auto-reserva (Sin Registro)
*   **Descripción:** Interfaz pública accesible mediante `cita-ai.vercel.app/<slug>` que visualiza los slots libres de la semana. El cliente selecciona día/hora, completa nombre y correo electrónico, y confirma en menos de 30 segundos. El sistema ejecuta una verificación de concurrencia pre-insert; si el slot fue ocupado, notifica al cliente reteniendo los datos del formulario.
*   **Valor para el usuario:** Eliminación total de fricción para el cliente final y recepción de reservas sin intervención del profesional.
*   **Criterios de éxito:** Registro en tabla `appointments` en estado `confirmed`, decremento de disponibilidad en tiempo real y despacho de correo con enlace directo de autogestión.

### Feature 4: Cancelación Autónoma Desintermediada
*   **Descripción:** El cliente final cancela su turno en un solo clic mediante el enlace único recibido en el correo de confirmación (ejecutado contra `/api/public/appointments/[id]/cancel` con rol de servicio). El profesional puede cancelar cualquier turno desde su dashboard. No se admiten cancelaciones de turnos pasados.
*   **Valor para el usuario:** Liberación inmediata del horario cancelado para que otro cliente lo tome, eliminando la necesidad de llamar o escribir por WhatsApp.
*   **Criterios de éxito:** Actualización de estado a `cancelled`, reapertura inmediata del slot en el calendario público y despacho de email a la parte no canceladora.

### Feature 5: Control de Cartera y Límite Freemium
*   **Descripción:** Visualización de clientes en el panel del profesional. El sistema computa clientes únicos por correo mediante join de `appointments`. Al intentar registrar al cliente número 11 (sea por portal público o carga manual), el sistema rechaza la reserva (HTTP 403 `LIMIT_REACHED`), envía un correo de felicitación comercial al profesional y despliega en el dashboard el botón *"Más información sobre el Plan Pro"*.
*   **Valor para el usuario:** Acceso 100 % gratuito para validar el negocio, permitiendo a los 10 clientes existentes continuar reservando de manera ilimitada.
*   **Criterios de éxito:** Clientes existentes reservan sin límite; cliente 11 bloqueado con mensaje explicativo; captura de métrica de intención comercial en panel.

---

## 4. User Journeys (Flujos Clave)

*   **Flujo 1: Onboarding del Profesional:**
    1. El profesional ingresa a la página principal y completa el formulario de registro.
    2. El sistema crea la cuenta, asigna el slug público y abre sesión automáticamente.
    3. El profesional define sus días/horarios de atención y la duración de sus turnos (ej. 45 min).
    4. El profesional copia su enlace público para compartirlo en su bio de Instagram o WhatsApp.

*   **Flujo 2: Auto-reserva del Cliente Final:**
    1. El cliente abre el enlace público `cita-ai.vercel.app/<slug>` desde su navegador.
    2. Visualiza la disponibilidad de la semana y selecciona un horario libre.
    3. Ingresa su nombre y correo electrónico, y presiona "Confirmar Reserva".
    4. El sistema valida concurrencia y límite de plan, confirmando la cita en pantalla.
    5. El cliente recibe el correo de confirmación con el detalle y el enlace de cancelación.

*   **Flujo 3: Cancelación por el Cliente:**
    1. El cliente abre el correo de confirmación y hace clic en el enlace de cancelación.
    2. El sistema procesa la solicitud mediante token de turno, marca el turno como `cancelled` y muestra confirmación.
    3. El horario queda disponible inmediatamente para otros clientes y se envía un correo de aviso al profesional.

*   **Flujo 4: Bloqueo de Fechas por Vacaciones:**
    1. El profesional inicia sesión en su panel y accede a la sección de disponibilidad.
    2. Define un rango de bloqueo temporal (fecha/hora de inicio y fin) y guarda.
    3. El motor de cálculo de slots omite automáticamente dichos horarios en el portal público.

*   **Flujo 5: Detección de Límite Freemium (Cliente #11):**
    1. Un nuevo cliente intenta reservar con un profesional que ya cuenta con 10 clientes únicos registrados.
    2. El sistema detecta el límite y muestra: *"Este profesional no puede aceptar nuevos clientes a través de esta plataforma en este momento. Por favor, contactalo directamente."*
    3. El sistema despacha un correo de celebración al profesional invitándolo a conocer el Plan Pro y activa el aviso en su dashboard.

---

## 5. Requisitos No Funcionales (NFRs)

*   **Seguridad:**
    *   Autenticación gestionada vía Supabase Auth con tokens JWT en cookies `httpOnly` (expiración de sesión a los 15 minutos y refresh token de 7 días).
    *   Políticas de Row Level Security (RLS) activas en las tablas `professionals`, `clients`, `appointments`, `availability_rules` y `time_blocks`.
    *   Operaciones de cancelación pública ejecutadas bajo endpoints específicos utilizando cliente administrativo (`service_role`) para preservar RLS en el resto del sistema.
*   **Rendimiento y Capacidad (Estado Actual Medido vs. Compromisos Pendientes):**
    *   *Métricas de estado actual observadas:* Carga de portal público en <2 s (con caché); llamadas a endpoints de API en 300-500 ms (p95); consultas directas de lectura a base de datos en <100 ms.
    *   *Capacidad estimada de concurrencia:* Aproximadamente 100 usuarios concurrentes sobre infraestructura serverless de Vercel (estimación técnica no validada bajo pruebas de estrés formal).
    *   *Disponibilidad:* Dependiente de los SLAs de infraestructura de Vercel y Supabase (99.9 % teórico no monitoreado internamente).
*   **Compatibilidad y Accesibilidad:**
    *   Diseño web responsive adaptable a dispositivos móviles (smartphones) y navegadores de escritorio modernos (Chrome, Safari, Firefox, Edge).
    *   Componentes de interfaz construidos con Radix UI y Tailwind CSS para garantizar accesibilidad y consistencia visual.
*   **Ambiente de Despliegue:**
    *   Ambiente productivo único alojado en Vercel (`https://cita-ai.vercel.app/`) conectado a PostgreSQL en Supabase.

---

## 6. Riesgos y Mitigaciones

| Riesgo Detectado | Impacto | Mitigación Técnica / de Producto |
| :--- | :--- | :--- |
| **Persistencia de No-Shows por falta de recordatorios** | Alto: Causa principal de quejas en profesionales y deserción hacia métodos manuales. | Implementar tareas programadas (cron jobs vía Vercel Pro o servicio externo como Upstash/QStash) para habilitar el envío automático 24 h antes. |
| **Pérdida de reservas por colisión de concurrencia** | Medio: Ventana de tiempo entre validación e inserción que puede permitir solapamientos en alta demanda. | Encapsular la verificación y creación del turno en una función transaccional de PostgreSQL (`stored procedure`). |
| **Retraso en reservas por despacho síncrono de correo** | Medio: Si el proveedor de correo demora, la pantalla de reserva del cliente se congela. | Desacoplar el envío de correos ejecutándolo en segundo plano (background job / cola asíncrona). |
| **Entregabilidad deficiente de emails (Spam)** | Alto: Clientes no reciben confirmaciones ni links de cancelación al salir desde dominio no verificado. | Completar la verificación DNS de registros SPF/DKIM para el dominio institucional `cita.ai` en Resend. |
| **Falta de visibilidad de la URL pública en el dashboard** | Alto: El profesional no encuentra su enlace para compartir tras registrarse (consulta #1 en soporte). | Incorporar un banner destacado y botón de "Copiar mi enlace" en la cabecera principal del panel. |

---

## Fuentes

| Dato / afirmación | De dónde sale |
| :--- | :--- |
| Propuesta de valor, perfiles Laura y Carlos, simplicidad radical | `01-minuta-kickoff.md` · De dónde sale la idea / `02-notas-entrevistas.md` |
| Regla estricta de no registro para el cliente final | `01-minuta-kickoff.md` · Los dos usuarios del sistema / `03-especificacion-funcional-v0.3.md` · 2.2 |
| Esquema de campos obligatorios de registro y reglas de contraseña | `03-especificacion-funcional-v0.3.md` · 3.1 |
| Lógica de cálculo de slots dinámicos semanales | `03-especificacion-funcional-v0.3.md` · 4.1 / `04-notas-tecnicas.md` · los slots |
| Regla RN-02 y mensaje de error de concurrencia | `03-especificacion-funcional-v0.3.md` · 5.2 RN-02 |
| Límite freemium de 10 clientes únicos y mensajes asociados | `03-especificacion-funcional-v0.3.md` · 8.1 - 8.2 / `04-notas-tecnicas.md` · limite del plan |
| Tablas de PostgreSQL, RLS y endpoints de API | `04-notas-tecnicas.md` · tablas / endpoints |
| Falta de recordatorios por ausencia de cron en Vercel | `04-notas-tecnicas.md` · mails / `05-hilo-mail-cambio-de-alcance.md` / `transcripcion-reunion-2026-05-19.md` |
| URL real del sistema en `https://cita-ai.vercel.app/` y entorno único | `documentacion para QA/nota-ambientes-y-accesos.md` |
| Reclamos de soporte por enlace no visible y correos en spam | `06-tickets-soporte-resumen.md` · Registro y acceso / Cancelaciones |
| Tiempos de respuesta de rendimiento (<2s, 300-500ms API) | `04-notas-tecnicas.md` · numeros de rendimiento (Medición observada por desarrollo, no SLA acordado) |
| Límite de concurrencia de 100 usuarios simultáneos | **Hipótesis** — estimación técnica de desarrollo sin pruebas de carga |
| Modelo de datos para multi-agenda en salones o consultorios | **Hipótesis** — no contemplado en la base de datos actual |

---

## Contradicciones detectadas

*   **Recordatorios del día anterior:** La especificación funcional (`03-especificacion-funcional-v0.3.md`, sección 7) categoriza el recordatorio como un requisito obligatorio e intransferible. Sin embargo, las notas técnicas (`04-notas-tecnicas.md`), el hilo de lanzamiento (`05-hilo-mail-cambio-de-alcance.md`) y la reunión de revisión (`transcripcion-reunion-2026-05-19.md`) confirman que la funcionalidad **no está construida** debido a la falta de cron jobs en el plan básico de Vercel. Se toma como estado real: no implementado.
*   **Existencia de ambiente UAT aislado:** La especificación funcional (sección 11) y notas técnicas tempranas describen un ambiente UAT en `uat.cita.ai` con base de datos propia. La nota técnica final (`nota-ambientes-y-accesos.md`) declara que UAT fue discontinuado y la plataforma opera exclusivamente sobre **un único ambiente productivo** en `https://cita-ai.vercel.app/`. Se adopta esta última como la realidad técnica.
*   **Proveedor de mensajería transaccional:** `01-minuta-kickoff.md` proyectaba SendGrid; `04-notas-tecnicas.md` indicaba el servicio nativo de Supabase; `05-hilo-mail-cambio-de-alcance.md` oficializó el uso de **Resend**. Se consolida Resend como proveedor vigente.
*   **Manejo de husos horarios:** `04-notas-tecnicas.md` indicaba que no se contemplaba conversión de huso horario; los reportes de soporte (`06-tickets-soporte-resumen.md`) y la reunión del 19/05/2026 confirmaron que se aplicó un parche a inicios de abril de 2026 para corregir desajustes con clientes internacionales.

---

## Preguntas abiertas

*   ¿Qué comportamiento exacto debe ejecutar el sistema si un profesional bloquea una fecha u horario que ya contiene turnos reservados previamente? (Hoy los turnos se mantienen confirmados y el cliente no recibe aviso automático).
*   ¿Se definirá una ventana de anticipación mínima obligatoria para cancelaciones por parte del cliente final (ej. 2 o 24 horas antes) para proteger la franja horaria del profesional?
*   ¿Cuál será el límite de anticipación máxima permitido para que los clientes reserven turnos a futuro en el calendario público?
*   ¿Se incorporará el estado de turno *"No se presentó"* (No-show) para que el profesional registre el historial de cumplimiento de sus clientes?
*   ¿Qué proveedor y mecanismo de tareas programadas (cron) se contratará para habilitar el despacho automatizado de los recordatorios 24 h antes?
*   ¿Cuál será el esquema de precios, pasarela de pago (Stripe / Mercado Pago) y conjunto de funcionalidades que compondrán el futuro Plan Pro?
*   ¿Qué mecanismo de protección contra abuso (rate limiting / captcha) se implementará en los endpoints públicos de reserva y cancelación?
