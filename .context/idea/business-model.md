# Business Model Canvas: CITA AI

**Tipo de proyecto:** Brownfield

## 1. Propuesta de Valor (Value Propositions)
* **Para el Profesional Independiente:**
  * **Simplicidad radical y eliminación de fricción:** Puesta en marcha y disponibilidad funcional en menos de 5 minutos, configurando únicamente disponibilidad semanal recurrente y duración estándar de turnos.
  * **Ahorro de tiempo administrativo cuantificable:** Reducción de entre 30 minutos y 4 horas semanales dedicadas a la coordinación manual por canales fragmentados (WhatsApp, Instagram DMs, llamadas y libretas de papel).
  * **Eliminación de dobles reservas:** Prevención de superposición de turnos mediante asignación en tiempo real y verificación de disponibilidad inmediata.
  * **Reducción de cancelaciones y no-shows:** Notificaciones transaccionales automáticas con enlace directo de autogestión de cancelaciones (con necesidad crítica identificada de recordatorios previos).
  * **Autonomía sin intermediación:** Enlace público propio (`cita-ai.vercel.app/<slug>`) para compartir en biografía de redes sociales, sin comisiones por turno ni intromisión de marketplace ("ordenar los clientes que ya tiene, no traerle nuevos").
* **Para el Cliente Final:**
  * **Reserva autónoma e inmediata:** Proceso de auto-agendamiento en menos de 30 segundos sin necesidad de crear cuenta, recordar contraseñas ni esperar respuestas manuales diferidas.
  * **Visibilidad transparente:** Acceso directo a la disponibilidad horaria real de la semana.
  * **Cancelación sin fricción:** Posibilidad de cancelar su turno en un solo clic mediante el enlace único recibido en el correo de confirmación.

## 2. Segmentos de Clientes (Customer Segments)
* **Segmento Primario (B2B / Profesionales):**
  * Profesionales independientes y microempresas (1 a 3 personas) cuyo producto es su tiempo y facturan por hora de atención.
  * Nichos iniciales validados: Psicólogos y terapeutas clínicos (ej. perfil Laura), entrenadores personales y preparadores físicos (ej. perfil Carlos), estilistas y profesionales de belleza, tutores/profesores particulares y nutricionistas.
  * Mercado hispanohablante inicial (Argentina, México, Chile, Uruguay) con proyección a mercado anglosajón.
* **Usuarios Finales (B2C / Clientes de los profesionales):**
  * Clientes finales habituados a la resolución digital ágil (ej. perfil Sofía), que valoran la inmediatez y rechazan procesos con registro previo o demoras en la atención por chat.

## 3. Canales (Channels)
* **Canales de Distribución del Profesional (Directo / Orgánico):**
  * URL pública personalizada (`cita-ai.vercel.app/<slug>`) distribuida por el propio profesional en su bio de Instagram, estados y mensajes de WhatsApp, sitio web propio o tarjetas de contacto.
* **Canales de Comunicación Transaccional:**
  * Correos electrónicos transaccionales automáticos vía Resend (bienvenida, confirmación de turno con enlace de cancelación, aviso de nueva reserva y aviso de cancelación).
* **Canales de Adquisición y Venta:**
  * Tracción comercial directa, demostraciones personalizadas y boca a boca en comunidades y redes profesionales (liderado comercialmente por Fernando).

## 4. Relación con Clientes (Customer Relationships)
* **Modelo Self-Service Automatizado:**
  * Onboarding ágil y autoservicio sin necesidad de asistencia técnica inicial ni parametrización compleja.
* **Comunicación Empática y Positiva:**
  * Notificaciones de límite de plan gratuitas redactadas con enfoque de crecimiento ("¡Felicitaciones, tu negocio está creciendo!").
* **Soporte y Acompañamiento:**
  * Canal de soporte asistido vía correo electrónico para resolución de incidencias operativas y dudas de configuración.

## 5. Fuentes de Ingresos (Revenue Streams)
* **Modelo Freemium (Validación y Adquisición):**
  * Acceso gratuito completo con tope de hasta **10 clientes únicos** por profesional (los clientes existentes pueden reservar ilimitadamente; el cliente número 11 es bloqueado invitando al profesional a escalar).
* **Futuro Plan Pro / Suscripción Recurrente (Monetización proyectada):**
  * Modelo SaaS de suscripción periódica (mensual/anual) para profesionales que superen los 10 clientes únicos o requieran funcionalidades avanzadas (múltiples agendas, recordatorios automatizados, pasarelas de pago).
  * Botón de captura de demanda en panel: *"Más información sobre el Plan Pro"*.

## 6. Recursos Clave (Key Resources)
* **Tecnológicos y Software:**
  * Aplicación web desarrollada con Next.js (App Router), TypeScript, Tailwind CSS y componentes Radix UI.
  * Backend y base de datos: PostgreSQL sobre Supabase (gestión de autenticación, RLS y datos relacionales).
  * Infraestructura de alojamiento: Vercel (CD automatizado conectado a rama main).
  * Infraestructura de mensajería: Resend para despacho de correos transaccionales.
  * Dominio institucional registrado: `cita.ai`.
* **Humanos y Operativos:**
  * Equipo nuclear interdisciplinario: Estrategia de Producto (Mariana), Desarrollo de Software (Diego), Diseño UX/UI y Soporte (Sol), Desarrollo Comercial (Fernando) y Aseguramiento de Calidad (QA).

## 7. Actividades Clave (Key Activities)
* **Desarrollo y Mantenimiento de Software:**
  * Evolución de la plataforma web, optimización del algoritmo de generación dinámica de slots y resolución de deuda técnica.
* **Aseguramiento de Calidad (QA) y Estabilización:**
  * Reconstrucción de especificaciones, diseño y ejecución de pruebas funcionales, y verificación de consistencia entre reglas de negocio y comportamiento desplegado.
* **Operaciones y Soporte al Cliente:**
  * Atención de tickets de soporte a profesionales y clientes finales, seguimiento de entregabilidad de correos y resolución de incidencias.
* **Validación Comercial y Crecimiento:**
  * Ejecución del soft launch (seguimiento de cohortes de 20-50 profesionales durante 8 semanas), medición de métricas de activación (retención a 4 semanas > 40%, ratio de auto-reserva > 60%).

## 8. Socios Clave (Key Partners)
* **Proveedores de Infraestructura Cloud y SaaS:**
  * Vercel (hosting y despliegue continuo de frontend).
  * Supabase (PostgreSQL administrado, servicio de autenticación y seguridad RLS).
  * Resend (proveedor de infraestructura de entrega de correo electrónico).
* **Redes y Comunidades Profesionales:**
  * Redes de consultorios médicos, asociaciones de terapeutas, estudios de entrenamiento y salones de estética para adopción colectiva.

## 9. Estructura de Costos (Cost Structure)
* **Costos de Infraestructura y Servicios SaaS:**
  * Suscripción Vercel (requiere upgrade para soporte de tareas programadas/cron para recordatorios).
  * Suscripción y consumo en Supabase (base de datos y auth).
  * Servicio de envío de correos en Resend.
  * Mantenimiento y renovación anual del dominio `cita.ai`.
* **Costos Operativos y de Talento:**
  * Dedicación horaria del equipo de Producto, Desarrollo, Diseño, QA y Comercial.
* **Costos de Adquisición de Clientes (CAC):**
  * Esfuerzo comercial directo y eventual inversión futura en marketing de contenidos o pauta publicitaria.

---

## Problem Statement (Resumen)
Los profesionales independientes que comercializan su tiempo por horas (psicólogos, entrenadores personales, estilistas, tutores) pierden entre 2 y 4 horas semanales coordinando turnos de forma manual a través de WhatsApp, llamadas y libretas de papel. Esta dispersión genera frecuentes superposiciones de turnos (doble reserva) y altas pérdidas económicas por cancelaciones de último momento o ausencias imprevistas (no-shows). Las herramientas de agendamiento del mercado actual resultan excesivamente complejas de configurar para este perfil (ej. Acuity Scheduling) o están orientadas a reuniones corporativas careciendo de enfoque de negocio (ej. Calendly). 

CITA AI resuelve esta problemática ofreciendo una solución de auto-reserva web con simplicidad radical, permitiendo al profesional publicar su agenda en menos de 5 minutos y facilitando que sus clientes reserven o cancelen turnos en menos de 30 segundos sin necesidad de crear una cuenta ni recordar contraseñas.

---

## Fuentes
| Dato / afirmación | De dónde sale |
| :--- | :--- |
| Origen del problema, dolores (dobles turnos, no-shows) y nombre Cita.ai | `01-minuta-kickoff.md` · De dónde sale la idea |
| Posicionamiento ("Acuity es complejo, Calendly básico", no es marketplace) | `01-minuta-kickoff.md` · Cómo llega el cliente al profesional / Contra quién competimos |
| Regla de no registro para el cliente final y cancelación por link | `01-minuta-kickoff.md` · Los dos usuarios del sistema / `03-especificacion-funcional-v0.3.md` · 2.2 |
| Límite freemium de 10 clientes únicos y bloqueo del cliente 11 | `01-minuta-kickoff.md` · El modelo: freemium / `03-especificacion-funcional-v0.3.md` · 8.1 |
| Métricas objetivo (ahorro 30 min/sem, retención 4 sem > 40%, auto-reserva > 60%) | `01-minuta-kickoff.md` · Qué queremos que pase / `05-hilo-mail-cambio-de-alcance.md` |
| Exclusiones del MVP (pagos, sync Google Calendar, múltiples profesionales) | `01-minuta-kickoff.md` · Qué NO hacemos ahora / `03-especificacion-funcional-v0.3.md` · 1 |
| Cuantificación de tiempos perdidos (Laura: 4 hs/sem, cancelaciones 15 min Carlos) | `02-notas-entrevistas.md` · Entrevista 1 y Entrevista 2 |
| Perfil de cliente final exigente y sin fricción (Sofía: reserva en 30s) | `02-notas-entrevistas.md` · Entrevista 4 |
| Formato y reglas de registro del profesional, validación de contraseñas | `03-especificacion-funcional-v0.3.md` · 3.1 |
| Algoritmo de cálculo de slots y reemplazo de reglas de disponibilidad | `03-especificacion-funcional-v0.3.md` · 4.1 / `04-notas-tecnicas.md` · los slots |
| Verificación de concurrencia al reservar ("¡Casi! Parece que alguien más...") | `03-especificacion-funcional-v0.3.md` · 5.2 RN-02 |
| Stack técnico (Next.js, TypeScript, Supabase, Tailwind, Radix UI, Vercel) | `04-notas-tecnicas.md` · stack |
| Migración de emails a Resend y botón "Más información sobre el Plan Pro" | `05-hilo-mail-cambio-de-alcance.md` · Mariana / Diego |
| Postergar recordatorios automáticos por falta de cron en Vercel | `05-hilo-mail-cambio-de-alcance.md` · Diego / `transcripcion-reunion-2026-05-19.md` |
| Reclamos de soporte (recordatorios ausentes, slug no visible en dashboard) | `06-tickets-soporte-resumen.md` · Recordatorios / Registro y acceso |
| Ambiente único real de producción en `https://cita-ai.vercel.app/` | `documentacion para QA/nota-ambientes-y-accesos.md` · la direccion / lo del ambiente de UAT |
| Interés comercial de redes de consultorios (20 profesionales) | `documentacion para QA/hilo-mail-alcance-qa.md` · Fernando |
| Precios futuros y pasarela de cobro del Plan Pro | **Hipótesis** — pendiente de definición comercial por Producto |
| Costo de Adquisición de Clientes (CAC) y pauta futura | **Hipótesis** — no hay datos documentados sobre inversión comercial |

---

## Contradicciones detectadas
* **Ambientes de ejecución (UAT vs. Producción única):**
  * *Documentos involucrados:* `03-especificacion-funcional-v0.3.md` (Sección 11) y `04-notas-tecnicas.md` describen la existencia de dos ambientes separados (`uat.cita.ai` y `cita.ai`).
  * *Discrepancia:* `documentacion para QA/nota-ambientes-y-accesos.md` (21/05/2026) declara explícitamente que UAT fue abandonado y que la plataforma opera en un **único ambiente productivo** en `https://cita-ai.vercel.app/`.
  * *Decisión adoptada:* Se adopta `nota-ambientes-y-accesos.md` por ser la evidencia técnica más reciente y representativa del estado operativo real.
* **Proveedor de correo electrónico transaccional:**
  * *Documentos involucrados:* `01-minuta-kickoff.md` preveía SendGrid; `04-notas-tecnicas.md` indicaba el servicio nativo de Supabase; `05-hilo-mail-cambio-de-alcance.md` oficializó el paso a **Resend**.
  * *Decisión adoptada:* Se consolida **Resend** según lo confirmado en el hilo de lanzamiento y verificado en los reportes de soporte.
* **Presencia del recordatorio del día anterior:**
  * *Documentos involucrados:* `01-minuta-kickoff.md` y `03-especificacion-funcional-v0.3.md` lo categorizan como requisito nuclear del producto; `05-hilo-mail-cambio-de-alcance.md`, `06-tickets-soporte-resumen.md` y `transcripcion-reunion-2026-05-19.md` confirman que **no fue implementado en el soft launch** debido a la falta de cron en el plan básico de Vercel.
  * *Decisión adoptada:* Se registra como funcionalidad no implementada en la aplicación actual, constituyendo el reclamo principal de los usuarios.
* **Texto del botón de límite del plan gratuito:**
  * *Documentos involucrados:* "Solicitar Upgrade" (`01-minuta-kickoff.md`), "Ver Opciones" (`03-especificacion-funcional-v0.3.md`), "Más información sobre el Plan Pro" (`05-hilo-mail-cambio-de-alcance.md`).
  * *Decisión adoptada:* Se toma *"Más información sobre el Plan Pro"* como la última definición consensuada del equipo.
* **Manejo de zonas horarias:**
  * *Documentos involucrados:* `04-notas-tecnicas.md` indicaba que no se contemplaban diferencias de huso horario; `06-tickets-soporte-resumen.md` y `transcripcion-reunion-2026-05-19.md` evidencian incidentes de turnos solapados con clientes en el exterior (México), resueltos a inicios de abril de 2026.
  * *Decisión adoptada:* Se asume la corrección aplicada en abril de 2026 según lo declarado por Diego en la reunión de revisión.

---

## Preguntas abiertas
* ¿Qué comportamiento debe ejecutar el sistema cuando un profesional bloquea un rango de fechas u horas que ya contiene turnos reservados previamente por clientes? (Actualmente los turnos se conservan como confirmados y el cliente no es notificado).
* ¿Se establecerá una ventana temporal mínima para cancelaciones por parte del cliente final (ej. 2 o 24 horas previas al turno) para evitar pérdidas económicas a profesionales de servicios inmediatos?
* ¿Se incorporará soporte para múltiples profesionales o agendas concurrentes bajo una misma cuenta comercial (caso redes de consultorios o salones de belleza)?
* ¿Cómo se resolverá la distinción de identidad en casos donde una persona reserva en representación de otra (ej. tutores para alumnos menores o familiares)?
* ¿Cuál será la arquitectura y el proveedor elegido para habilitar tareas programadas (cron) que permitan despachar los recordatorios automáticos del día anterior?
* ¿Cuáles serán los precios definitivos, límites de uso y pasarela de cobro integrada (Stripe / Mercado Pago) para el futuro Plan Pro?
* ¿Se creará el estado de turno *"No se presentó"* (No-show) para que el profesional mantenga un historial de cumplimiento de sus clientes?
* ¿Cuál será la ventana máxima permitida para agendar citas a futuro en el calendario público?
