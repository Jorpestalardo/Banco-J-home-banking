# Estrategia de Datos de Prueba: CITA AI

## 1. Fuentes y Origen de Datos

*   **Estado Actual en Producción (Entorno Único):**
    *   No existen scripts de siembra (*seed scripts*) automatizados ni herramientas de generación sintética integradas en el repositorio.
    *   Los datos de prueba para certificar flujos se generan **al vuelo y manualmente** por los testers/desarrolladores directamente en el entorno de producción (`https://cita-ai.vercel.app/`), conviviendo con citas y usuarios reales.
*   **Estado Histórico del Ambiente UAT (Inactivo):**
    *   La base de UAT se poblaba mediante una **copia directa de la base de datos de producción**.
    *   La anonimización aplicada fue **parcial y deficiente**: únicamente se ofuscaron nombres y correos de la tabla `clients`, manteniendo los nombres, correos electrónicos y credenciales reales de los profesionales en la tabla `professionals` para evitar la rotura de slugs de prueba.

---

## 2. Gestión de Usuarios de Prueba

> 🔒 **Regla de Seguridad:** Nunca registrar contraseñas en texto claro. Las credenciales de prueba deben referenciarse a variables de entorno locales o gestores de secretos (*Vault*).

| Rol | Identificador / Convención de Email | Contraseña | Propósito y Alcance |
| :--- | :--- | :--- | :--- |
| **Profesional (Admin / Proveedor)** | `qa-profesional-[id]@mailinator.com` | *ver `.env` (`QA_PROFESSIONAL_PASSWORD`)* | Validación de registro, configuración de agenda semanal, bloqueos de fechas y visualización de reservas. |
| **Cliente Final (B2C / Sin Cuenta)** | `qa-cliente-[id]@mailinator.com` | *No aplica (Sin autenticación)* | Ejecución del flujo de auto-reserva en portal público, recepción de email y prueba de cancelación unilateral por link. |
| **Cuenta Comercial (Fernando)** | *Cuenta restringida en producción* | *Restringido* | **PROHIBIDO SU USO EN QA:** Contiene profesionales y clientes reales con turnos activos. |

---

## 3. Generación de Datos Sintéticos

*   **Herramientas Recomendadas:**
    *   Librerías como `@faker-js/faker` o *Factory functions* en TypeScript para generar datos semánticamente válidos (nombres en español, correos con formato RFC 5322, fechas dentro de los rangos de atención).
    *   Scripts SQL parametrizados para la creación masiva de citas y clientes en pruebas de estrés y saturación de agenda.
*   **Estrategia de Generación:**
    *   **Casos Borde de Fechas:** Generación de turnos en límites de franja (ej. 09:00 exactas, última hora del día) y verificación de rechazo de reservas que crucen medianoche o días sin disponibilidad.
    *   **Simulación de Concurrencia:** Inyección simultánea de 2 a 5 solicitudes sobre el mismo slot horario para validar la respuesta HTTP y el mensaje de colisión (*"¡Casi! Parece que alguien más..."*).
    *   **Prueba de Límite Freemium:** Creación secuencial de 10 clientes únicos sintéticos para un profesional de prueba y validación del bloqueo estricto (HTTP 403 `LIMIT_REACHED`) al intentar reservar con el cliente número 11.

---

## 4. Privacidad y Seguridad (PII)

> 🚨 **ALERTA CRÍTICA DE PRIVACIDAD (PII):**
> 1. **Convivencia en Producción:** Al ejecutarse las pruebas directamente sobre el entorno productivo único, existe riesgo de interacción accidental con profesionales o clientes reales.
> 2. **Anonimización Parcial Histórica:** Si se reactiva la base de datos de UAT a partir de un respaldo de producción sin una anonimización total (incluyendo la tabla `professionals`), se incurre en una fuga de Información Personal Identificable (PII: nombres completos y casillas de correo reales).

### Política y Método de Sanitización Requerido:
1.  **Aislamiento de Casillas:** Todas las cuentas y reservas creadas por QA deben utilizar exclusivamente dominios de prueba descartables (`@mailinator.com` o casillas internas designadas) para evitar el despacho de correos no solicitados a personas reales.
2.  **Esquema de Anonimización Completa (para futuros entornos no productivos):**
    *   `professionals.name` → Nombres ficticios generados por script.
    *   `professionals.email` → `profesional-[uuid]@test.cita.ai`.
    *   `professionals.slug` → `slug-[uuid]` (actualizando enlaces).
    *   `clients.name` → Nombres sintéticos.
    *   `clients.email` → `cliente-[uuid]@test.cita.ai`.
    *   `appointments` / `availability_rules` / `time_blocks` → Mantener integridad referencial de IDs sin exponer datos personales.

---

## 5. Limpieza y Reseteo de Estado (Teardown)

*   **Estado Actual:** **Inexistente.** La base de datos no cuenta con scripts de limpieza ni capacidad de rollback. Todo registro de prueba insertado persiste indefinidamente en la base productiva de Supabase.
*   **Estrategia de Mitigación de Basura de Datos:**
    *   **Identificación por Prefijo:** Nombrar todos los profesionales y clientes de prueba con el prefijo estandarizado `QA_TEST_` o casillas `*@mailinator.com` para su rápida identificación visual en el dashboard.
    *   **Script de Purga Automatizada (Propuesta):** Desarrollo de un script administrativo ejecutado contra Supabase que elimine en cascada turnos (`appointments`), clientes no compartidos (`clients`), reglas y bloqueos asociados a identificadores `QA_TEST_` al finalizar cada ciclo de certificación.

---

## Fuentes

| Dato / afirmación | De dónde sale |
| :--- | :--- |
| Uso de copia de producción en UAT y anonimización parcial (solo `clients`) | `04-notas-tecnicas.md` · los datos de UAT — leer esto |
| Falta de scripts de seed y migraciones versionadas | `04-notas-tecnicas.md` · los datos de UAT — leer esto |
| Uso de casillas de Mailinator para leer tokens y confirmaciones | `04-notas-tecnicas.md` · los datos de UAT / `nota-ambientes-y-accesos.md` |
| Convivencia de pruebas en producción y datos indelebles | `documentacion para QA/nota-ambientes-y-accesos.md` · lo del ambiente de UAT |
| Restricción de no tocar la cuenta real de Fernando | `documentacion para QA/nota-ambientes-y-accesos.md` · un par de cosas |
| Límite freemium de 10 clientes para pruebas de saturación | `03-especificacion-funcional-v0.3.md` · 8.1 / `04-notas-tecnicas.md` |
| Uso de Faker.js y factories para generación sintética | **Hipótesis** — propuesta metodológica para la automatización de QA |
| Script de purga SQL con prefijo `QA_TEST_` | **Hipótesis** — recomendación técnica para mitigar contaminación de datos |

---

## Contradicciones detectadas

*   **Datos de prueba en UAT (Sintéticos vs. Copia de Producción con PII):**
    *   *Documento 1 (`03-especificacion-funcional-v0.3.md`, sección 11):* Afirma que la validación en UAT se realiza estrictamente contra *"datos de prueba generados para ese fin, ficticios y no pertenecientes a personas reales"*.
    *   *Documento 2 (`04-notas-tecnicas.md`, sección UAT):* Admite que la base de UAT se genera clonando producción y que la anonimización solo se aplicó a la tabla `clients`, dejando correos y nombres reales de profesionales en la tabla `professionals`.
    *   *Resolución:* Se documenta el hallazgo como una **contradicción de seguridad crítica**: el material técnico revela que el entorno no estaba debidamente anonimizado, contraviniendo la especificación de producto.

---

## Preguntas abiertas

*   ¿Se creará un script de *seed* (semilla) reproducible para inicializar esquemas de prueba limpios en local y CI/CD?
*   ¿Cuándo se implementará un endpoint o script administrativo de limpieza (*teardown*) para purgar registros de prueba generados en QA?
*   ¿Se definirá una política formal de retención y anonimización de datos para cumplir con normativas de protección de datos personales en caso de reactivar bases de staging?
