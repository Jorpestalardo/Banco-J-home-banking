# Contexto de Mercado: CITA AI

## 1. Panorama Competitivo (Competitive Landscape)
| Competidor | Fortalezas | Debilidades | Diferenciador vs Nosotros |
| :--- | :--- | :--- | :--- |
| **Calendly** | Ampliamente conocido en el mercado corporativo, interfaz ágil y proceso estándar de reserva 1 a 1. | Diseñado para reuniones de trabajo; no gestiona cartera de clientes recurrentes, historial de sesiones ni lógica de servicios. | CITA AI está enfocado en profesionales independientes de servicios (salud, fitness, estética, educación); no requiere registro para el cliente final y gestiona listado de clientes. |
| **Acuity Scheduling** (Squarespace) | Plataforma sumamente robusta, múltiples agendas, pasarelas de pago y opciones avanzadas de parametrización. | Configuración abrumadora y compleja; curva de aprendizaje empinada para profesionales unipersonales. | Simplicidad radical: CITA AI se configura en menos de 5 minutos definiendo únicamente horario y duración del turno. |
| **SimplyBook.me** | Orientado al sector servicios, cuenta con modelo de entrada gratuito. | Interfaz percibida como desactualizada y sistema modular de plugins/features confuso para el usuario. | Interfaz moderna, limpia, sin módulos adicionales ni fricción operativa. |
| **Status Quo (WhatsApp, Google Calendar, Libreta en papel)** | Costo monetario cero, familiaridad absoluta y hábito profundamente arraigado en profesionales y clientes. | Alto costo en tiempo administrativo (2 a 4 horas semanales), errores de doble reserva, cancelaciones imprevistas y no-shows. | Enlace público único (`cita-ai.vercel.app/<slug>`) para auto-reserva inmediata en 30 segundos sin coordinación manual. |

## 2. Oportunidad de Mercado
*   **Tamaño/Tendencia:** El mercado global de software de agendamiento online se estima en torno a los 400 millones de USD (referencia 2024), con un crecimiento anual proyectado de entre el 11 % y el 13 %. El segmento target son profesionales independientes y microempresas (1 a 3 colaboradores) de servicios en mercados hispanohablantes e internacionales, proyectando validar el modelo alcanzando entre 5.000 y 10.000 usuarios activos gratuitos en 2 años.
*   **Gap de Mercado:** Existe una brecha clara entre la excesiva complejidad técnica de herramientas integrales (Acuity) y la insuficiencia funcional para negocios de las herramientas de reuniones ejecutivas (Calendly). CITA AI atiende al profesional que necesita ordenar su cartera de clientes sin intermediación de marketplace ni comisiones por turno.

## 3. Nuestra Ventaja Injusta (Unfair Advantage)
*   **Simplicidad radical con fricción cero:** Puesta en marcha para el profesional en menos de 5 minutos y flujo de reserva para el cliente final en menos de 30 segundos sin necesidad de crear cuenta, descargar aplicaciones ni recordar contraseñas.
*   **Canal propio sin desintermediación:** Provisión de una URL pública personal para colocar en la biografía de redes sociales (Instagram, WhatsApp), ordenando la demanda existente del profesional en lugar de competir por ella.
*   **Gestión ligera de clientes y cancelación autónoma:** Mecanismo de cancelación en un solo clic mediante enlace directo por correo y control de clientes únicos para proteger el negocio del profesional.

## 4. Riesgos y Supuestos
*   **Riesgo de inercia y adopción:** La mayor competencia es la costumbre de coordinar por chat; si la herramienta no ahorra al menos 30 minutos semanales desde el primer día, el usuario retorna al método manual.
*   **Riesgo de producto por deuda técnica (Feature Gap):** La ausencia de recordatorios automáticos previos al turno (postergados por falta de tareas programadas/cron en la infraestructura actual) constituye la causa principal de no-shows y el reclamo más recurrente en soporte.
*   **Riesgo de visibilidad y onboarding:** El panel actual no muestra de forma visible la URL pública asignada al profesional, generando fricción inmediata tras el registro.
*   **Riesgo de monetización:** Incertidumbre en la conversión a planes de pago por falta de definición comercial en precios, pasarelas de pago y características del futuro Plan Pro.
*   **Riesgo de arquitectura ante demanda grupal:** Incompatibilidad del modelo de datos actual para soportar múltiples profesionales o agendas concurrentes (ej. salones o redes de consultorios).

## Fuentes
| Dato / afirmación | De dónde sale |
| :--- | :--- |
| Análisis de competidores (Calendly, Acuity, SimplyBook.me) y posicionamiento | `01-minuta-kickoff.md` · Contra quién competimos |
| WhatsApp y Google Calendar como competencia real por inercia | `01-minuta-kickoff.md` · Contra quién competimos |
| Estimación de mercado (USD 400M, 11-13% crecimiento, target 5k-10k usuarios) | `01-minuta-kickoff.md` · El tamaño de la torta |
| Fricción y abandono de Calendly por falta de gestión de pacientes/clientes | `02-notas-entrevistas.md` · Entrevista 7 (Nutricionista) |
| Necesidad insatisfecha de múltiples agendas para equipos pequeños | `02-notas-entrevistas.md` · Entrevista 5 (Estilista) / `06-tickets-soporte-resumen.md` · #22 |
| Ahorro mínimo prometido de 30 minutos semanales | `02-notas-entrevistas.md` · Lo que saco de las siete |
| Posicionamiento "Acuity complejo / Calendly básico" y enfoque en auto-reserva | `03-especificacion-funcional-v0.3.md` · 1. Introducción y propósito |
| Reclamos de soporte por recordatorios ausentes y enlace público no visible | `06-tickets-soporte-resumen.md` · Recordatorios / Registro y acceso |
| Interés comercial de redes de consultorios (20 profesionales) | `documentacion para QA/hilo-mail-alcance-qa.md` · Fernando |
| Precios y funcionalidades definitivas de la suscripción Pro | **Hipótesis** — pendiente de definición de producto |
| Inversión y costo de adquisición de clientes (CAC) futuro | **Hipótesis** — no hay registro en la documentación disponible |

## Contradicciones detectadas
*   **Presencia de recordatorios automáticos en el alcance:** Mientras la minuta de arranque (`01-minuta-kickoff.md`) y la especificación funcional (`03-especificacion-funcional-v0.3.md`) definían los recordatorios previos como parte nuclear de la propuesta de valor contra los no-shows, las notas de lanzamiento (`05-hilo-mail-cambio-de-alcance.md`) y la reunión de revisión (`transcripcion-reunion-2026-05-19.md`) confirman que quedaron fuera por limitaciones de la infraestructura de Vercel (falta de cron jobs). Se toma el estado real observado en soporte: no están implementados.
*   **Alcance multi-profesional vs. Oportunidad comercial:** Las especificaciones iniciales limitan estrictamente el sistema a un profesional unipersonal; sin embargo, tanto las entrevistas (`02-notas-entrevistas.md`) como la tracción comercial (`hilo-mail-alcance-qa.md`) evidencian demanda no atendida de microempresas y redes de consultorios (20 profesionales) que Diego confirmó no poder soportar sin refactorizar la base de datos.
*   **Manejo de husos horarios:** Las notas técnicas (`04-notas-tecnicas.md`) descartaban la gestión de zonas horarias, pero los incidentes registrados con clientes en el exterior (`06-tickets-soporte-resumen.md`) forzaron una corrección en producción a inicios de abril de 2026. Se adopta la versión corregida reportada por Diego.

## Preguntas abiertas
*   ¿Qué proveedor o arquitectura de tareas programadas (cron) se implementará para resolver el envío de recordatorios automáticos 24 horas antes del turno?
*   ¿Cuándo y cómo se rediseñará el esquema de datos para permitir múltiples agendas o colaboradores bajo una misma cuenta comercial?
*   ¿Qué estructura de precios, límites y pasarela de cobro (Mercado Pago / Stripe) se adoptará para el Plan Pro?
*   ¿Se limitará dinámicamente la ventana temporal de reserva futura para evitar turnos con meses de anticipación no deseada?
*   *Nota sobre validación:* No se realizó verificación dinámica de páginas web de competidores vía Playwright en esta etapa al no disponer de URLs externas provistas en la documentación del repositorio.
