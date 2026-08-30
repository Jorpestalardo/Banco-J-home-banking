# Cita.ai — Especificación Funcional

**Versión:** 0.3
**Estado:** BORRADOR — pendiente de revisión con desarrollo
**Autor:** Producto

> Documento de trabajo. Describe el comportamiento funcional esperado del sistema.
> Las secciones marcadas `TBD` están pendientes de definición.

---

## 1. Alcance

Cita.ai es una plataforma web que permite a un **profesional independiente** publicar su
disponibilidad horaria y que sus clientes reserven turnos de forma autónoma, sin
intervención manual.

La diferencia con las herramientas existentes es de enfoque: **simplicidad radical**. El
producto hace una sola cosa —permitir la auto-reserva— y la hace bien. La referencia interna
es que Acuity Scheduling resulta demasiado complejo para este usuario y Calendly demasiado
básico para un negocio.

**Dentro del alcance de esta versión:**

- Registro y autenticación del profesional
- URL pública propia por profesional
- Configuración de disponibilidad y duración de turno
- Bloqueo de horarios y días
- Portal de auto-reserva para el cliente final
- Cancelación por ambas partes
- Notificaciones por correo electrónico
- Listado de clientes y lógica del plan gratuito

**Fuera del alcance:**

- Cobros y pagos en línea
- Sincronización con calendarios externos
- Múltiples profesionales por cuenta
- Servicios con duraciones o precios distintos
- Formularios personalizados al reservar
- Reportes y analíticas
- Aplicaciones móviles nativas

---

## 2. Perfiles de usuario

### 2.1 Profesional (Admin)

Quien ofrece los turnos. Se registra con nombre, correo electrónico y contraseña.

**Perfiles de referencia:** *Laura* (psicóloga clínica, consulta privada, cómoda con la
tecnología pero sin tiempo) y *Carlos* (entrenador personal, desconfía de las herramientas
que requieren configuración).

**Puede:**
- Configurar su disponibilidad recurrente y la duración de sus turnos
- Bloquear horarios o días completos
- Ver su agenda de turnos próximos
- Cancelar un turno
- Ver el listado de sus clientes
- Cargar un cliente manualmente

### 2.2 Cliente final

Quien reserva. **No tiene cuenta ni contraseña.** Accede por la URL pública del profesional,
elige un horario e ingresa nombre y correo electrónico.

**Perfil de referencia:** *Sofía* (acostumbrada a resolver todo online, muy baja tolerancia
a la fricción).

**Puede:**
- Ver la disponibilidad de un profesional
- Reservar un turno
- Cancelar su turno mediante el enlace del correo de confirmación

> ⚠️ **Decisión de producto, no negociable:** el cliente final **no se registra**. Exigir una
> cuenta para sacar un turno hace que una parte relevante abandone el proceso.

---

## 3. Registro y autenticación del profesional

### 3.1 Registro

| Campo | Obligatorio | Validación |
| :--- | :--- | :--- |
| Nombre completo | Sí | No vacío. Máximo 100 caracteres |
| Correo electrónico | Sí | Formato válido. Máximo 254 caracteres. No registrado previamente |
| Contraseña | Sí | Mínimo 8 caracteres, con al menos una mayúscula y un número |

Al completar el registro el sistema:

1. Crea la cuenta y **inicia sesión automáticamente**
2. Genera la **URL pública** del profesional (ver 3.4)
3. Redirige al asistente de configuración inicial
4. Envía un correo de bienvenida

**Errores esperados:** *"El email ya está en uso"* con enlace a recuperación de contraseña ·
*"La contraseña es muy corta"*

### 3.2 Inicio de sesión

Correo y contraseña. Ante credenciales incorrectas el mensaje es genérico —*"Email o
contraseña incorrectos"*— sin indicar cuál de los dos falló.

### 3.3 Recuperación de contraseña

El profesional ingresa su correo y recibe un enlace con un token de un solo uso que **vence
a la hora**.

El mensaje en pantalla es siempre el mismo exista o no la cuenta: *"Si el email existe en
nuestro sistema, recibirás un enlace para recuperar tu contraseña"*. Es deliberado: evita
que alguien pueda averiguar qué correos están registrados.

`TBD` — Comportamiento ante intentos fallidos repetidos. ¿Se bloquea la cuenta? ¿Después de
cuántos intentos?

### 3.4 URL pública

Se genera a partir del nombre:

1. Convertir a minúsculas, quitar acentos, reemplazar espacios por guiones
2. Verificar que no exista otro igual **en toda la plataforma**
3. Si existe, agregar un sufijo numérico incremental: `ana-perez-2`, `ana-perez-3`

Ejemplo: *Carlos Rojas* → `cita.ai/carlos-rojas`

Es lo que el profesional comparte en su bio de Instagram, su estado de WhatsApp o su web.

---

## 4. Configuración de la agenda

### 4.1 Disponibilidad recurrente

El profesional define bloques de horario **por día de la semana**. Ejemplo típico: lunes a
viernes de 9:00 a 18:00.

**Validaciones:**
- La hora de fin debe ser posterior a la de inicio
- Los bloques de un mismo día no pueden solaparse

> **Comportamiento al guardar:** la operación **reemplaza la configuración completa**. No
> es una modificación parcial: se borran las reglas anteriores y se insertan las nuevas.

### 4.2 Duración del turno

Un valor en minutos, **el mismo para todos los turnos del profesional**. Debe ser mayor a
cero. Valores habituales según el relevamiento: 45 y 60 minutos.

La duración determina cómo se divide la franja horaria. Un profesional que atiende de 9 a 13
con turnos de 30 minutos genera 8 horarios disponibles por día.

`TBD` — ¿Conviene restringir a múltiplos de 5 o 15 minutos? Hoy se acepta cualquier entero.

### 4.3 Bloqueos

El profesional puede bloquear un rango de tiempo puntual —vacaciones, un turno médico
propio— indicando inicio, fin y opcionalmente un motivo. Un horario bloqueado deja de
ofrecerse.

`TBD` — **Qué ocurre si se bloquea un período que ya tiene turnos reservados.** Es la
pregunta abierta más importante de esta sección.

---

## 5. Reserva

### 5.1 Flujo principal

1. El cliente abre la URL pública del profesional
2. Ve un calendario con los horarios disponibles de la semana
3. Selecciona un horario
4. Ingresa nombre y correo electrónico
5. Confirma
6. Ve una página de confirmación y recibe un correo

### 5.2 Reglas

**RN-01 — Sin superposición.** Un horario reservado deja de ofrecerse de inmediato.

**RN-02 — Control de concurrencia.** El sistema debe **volver a verificar la disponibilidad
del horario inmediatamente antes de registrar la reserva**, no solo al mostrarlo. Si en el
intervalo otro cliente lo tomó, la operación falla con el mensaje:

> *"¡Casi! Parece que alguien más reservó este horario. Por favor, elegí otro."*

El calendario se actualiza y **los datos ya ingresados por el cliente se conservan** para
que no tenga que escribirlos de nuevo.

**RN-03 — Solo hacia adelante.** No se pueden reservar horarios pasados.

**RN-04 — Límite del plan gratuito.** Ver sección 8.

`TBD` — **Anticipación máxima.** ¿Hay un tope para reservar a futuro? Hoy el calendario
permite avanzar indefinidamente.

---

## 6. Cancelación

### 6.1 Por parte del cliente

Mediante el **enlace incluido en el correo de confirmación**. No requiere cuenta ni
contraseña: el enlace lleva un identificador único del turno.

### 6.2 Por parte del profesional

Desde su panel, sobre cualquier turno de su agenda.

### 6.3 Reglas comunes

**La única restricción es que el turno no puede estar en el pasado.** No hay ventana mínima:
se puede cancelar hasta el momento del turno.

Al cancelar:
1. El turno pasa a estado *cancelado*
2. El horario vuelve a estar disponible
3. Se notifica **a la parte que no canceló**

`TBD` — ¿Debe el profesional indicar un motivo al cancelar? ¿Se le muestra al cliente?

> 📌 **Nota de discusión.** En la reunión de arranque se planteó exigir una anticipación
> mínima para cancelar —por ejemplo, dos horas—. No se definió y queda así por ahora, pero
> es probable que vuelva: es el problema principal del perfil de Carlos.

---

## 7. Notificaciones por correo

| Evento | Destinatario | Contenido |
| :--- | :--- | :--- |
| Registro | Profesional | Bienvenida |
| Turno reservado | Cliente | Detalle del turno **y enlace de cancelación** |
| Turno reservado | Profesional | Aviso de reserva nueva |
| Turno cancelado | La parte que no canceló | Aviso con quién canceló |
| **Recordatorio** | Cliente | **El día anterior al turno** |
| Recuperación de contraseña | Profesional | Enlace con token |
| Límite alcanzado | Profesional | Ver sección 8 |

**El recordatorio del día anterior es un requisito, no un extra.** Los no-shows son la mitad
del problema que el producto viene a resolver, y es el único mecanismo previsto para
reducirlos.

`TBD` — Horario de envío del recordatorio.

> Implementación: el envío se realiza a través del servicio de correo transaccional
> integrado en la plataforma de backend. No requiere un proveedor externo.

---

## 8. Plan gratuito y límite

### 8.1 La regla

Un profesional en plan gratuito puede tener hasta **10 clientes únicos**.

**Precisiones que importan:**

- Se cuentan **clientes distintos**, identificados por su correo electrónico. No se cuentan
  turnos: un cliente que reserva veinte veces sigue siendo un cliente.
- **El límite solo afecta a clientes nuevos.** Quienes ya están dentro de los 10 pueden
  seguir reservando sin restricción alguna.
- Se aplica también a la **carga manual** desde el panel.

### 8.2 Qué pasa al llegar al límite

**Al cliente número 11 que intenta reservar** se le muestra:

> *"Este profesional no puede aceptar nuevos clientes a través de esta plataforma en este
> momento. Por favor, contactalo directamente."*

**Al profesional** se le envía un correo de inmediato, con tono de celebración y no de
restricción:

> *"¡Felicitaciones, tu negocio está creciendo! Alcanzaste el límite de 10 clientes de tu
> plan gratuito. Tus clientes actuales pueden seguir reservando, pero no se pueden agregar
> nuevos. ¿Listo para el siguiente nivel?"*

**En el panel** aparece un aviso permanente, visible pero no invasivo:

> *"Alcanzaste el límite de 10 clientes. Para aceptar clientes ilimitados, conocé nuestros
> planes."* — con un botón **"Ver Opciones"**.

Si el profesional intenta cargar un cliente manualmente, se le muestra el mismo mensaje y no
se guarda.

> 📌 El aviso del panel existe porque **no se puede depender de que el correo se lea**. Es
> el segundo punto de contacto.

### 8.3 Plan pago

No existe todavía. El botón solo registra el interés.

`TBD` — Definir qué incluye, cuánto cuesta y cómo se cobra.

---

## 9. Estados del turno

| Estado | Cuándo |
| :--- | :--- |
| **Confirmado** | Al crearse. **No hay aprobación previa del profesional** |
| **Cancelado** | Cuando cualquiera de las partes cancela |

**El turno nace confirmado.** Se evaluó un paso intermedio de aprobación y se descartó:
agrega una espera que es justamente lo que el producto viene a eliminar.

`TBD` — ¿Hace falta un estado *No se presentó*? Producto dice que sí, para que el
profesional lleve registro de quién no viene. Desarrollo dice que agrega complejidad al
cálculo de disponibilidad. **Sin resolver.**

---

## 10. Requisitos no funcionales

`TBD` — **Sección pendiente.** Hay que definir al menos tiempos de respuesta esperados,
usuarios concurrentes soportados, navegadores y objetivo de disponibilidad. Queda para la
revisión con desarrollo.

Lo único acordado hasta ahora es una promesa de producto: **un profesional debe poder
registrarse y tener su enlace de reservas funcionando en menos de 5 minutos.**

---

## 11. Ambientes y datos de prueba

| Ambiente | Para qué |
| :--- | :--- |
| **UAT** | Donde se valida antes de liberar |
| **Producción** | Los usuarios reales |

La validación funcional se hace en UAT contra **datos de prueba generados para ese fin**.
Los profesionales y clientes cargados ahí son ficticios y no corresponden a personas reales.

`TBD` — Definir con qué frecuencia se refrescan los datos de UAT y quién es responsable.

---

## 12. Preguntas abiertas

Se listan juntas para la revisión con desarrollo:

1. Bloqueo de un período que ya tiene turnos reservados (4.3)
2. Anticipación máxima para reservar (5.2)
3. Ventana mínima de cancelación (6.3)
4. Motivo de cancelación del profesional (6.3)
5. Horario de envío del recordatorio (7)
6. Estado *No se presentó* (9)
7. Requisitos no funcionales completos (10)
8. Refresco de datos de UAT (11)
9. Bloqueo por intentos fallidos de login (3.3)
10. Restricción de la duración del turno a múltiplos (4.2)

---

## Historial de versiones

| Versión | Cambios |
| :--- | :--- |
| 0.1 | Primera redacción a partir de la reunión de arranque |
| 0.2 | Se incorporan las entrevistas. Se agregan estados y notificaciones |
| 0.3 | Se agrega la lógica del plan gratuito y el control de concurrencia |
