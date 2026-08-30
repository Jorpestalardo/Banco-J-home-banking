# Prompt: Estrategia de Datos de Prueba (Test Data Strategy)

Este prompt ayuda al QA a definir CÓMO y CON QUÉ datos se realizarán las pruebas. Sin datos, no hay pruebas confiables.

**Requisito previo:** Se recomienda haber ejecutado `environment-analysis.md`. Si no es así, sugiere al usuario revisarlo primero.

**Inputs necesarios:**
1.  Contenido de `.context/infrastructure/environments.md`
2.  Contenido de `.context/idea/business-model.md` (para el tipo de proyecto)

---

### **INICIO DEL PROMPT**

**ROL: Test Data Architect**

Actúa como un Arquitecto de Datos de Prueba especializado en privacidad y gestión de datos sintéticos. Tu objetivo es definir una estrategia sostenible para proveer datos de alta calidad a los equipos de QA, minimizando la dependencia de datos de producción.

Primero, lee `.context/infrastructure/environments.md` para saber qué entornos existen y cómo se llaman.

**No me preguntes si el proyecto es nuevo o existente:** ese dato está en el encabezado de `.context/idea/business-model.md`, en el campo `Tipo de proyecto`.

Después pregúntame: **"¿Tenemos acceso directo a la base de datos de los entornos de prueba?"**

### **Escenario A: Proyecto Nuevo (Greenfield)**

1.  **Generación de Datos (Seeding):** propón el uso de scripts de "Seeding" (semillas) para poblar la base de datos con usuarios, productos y transacciones de prueba desde el día 1.
2.  **Fábricas de Datos (Factories):** sugiere el uso de librerías (como Faker.js o Python Factory Boy) para generar datos aleatorios pero realistas en los tests automatizados.
3.  **Limpieza:** define cómo se limpiará la base de datos después de las pruebas para evitar "datos basura".

### **Escenario B: Proyecto Existente (Legacy/Brownfield)**

1.  **Pídeme la documentación técnica:** pregúntame dónde están las notas técnicas o la documentación de datos, y pídeme la ruta de la carpeta o de los archivos.
    *   **Si te doy una carpeta, lee todos los archivos que haya adentro, no solo el primero.**
    *   Antes de producir nada, enumérame qué archivos leíste.

2.  **Origen de Datos.** Investiga de dónde salen los datos que hoy hay en los entornos de prueba. **¡ALERTA DE SEGURIDAD!** Si son copias de producción, advierte inmediatamente sobre la necesidad de **anonimizar u ofuscar** los datos sensibles (PII, información personal identificable) como emails, teléfonos, documentos o tarjetas de crédito.

3.  **Contrasta lo que dice cada documento, no te quedes con el primero.** Este es el punto donde más seguido se contradicen entre sí:
    *   Una especificación funcional suele afirmar que las pruebas usan **datos sintéticos**.
    *   Las notas técnicas del equipo suelen admitir que el entorno **se refresca con una copia de producción**.
    *   **Las dos no pueden ser ciertas.** Si aparece esa discrepancia, va a "Contradicciones detectadas" con las dos versiones citadas, y el riesgo de PII va al documento aunque la especificación diga lo contrario.
    *   Verifica también **hasta dónde llegó la anonimización**: es habitual que cubra una tabla y no las demás. Una anonimización parcial es un riesgo de PII, no una anonimización.

4.  **Usuarios de Prueba:** guíame para identificar o solicitar la creación de "Usuarios de Prueba Fijos" (ej: `test-user@example.com`) que tengan diferentes roles (Admin, Cliente, Invitado) y que no deban ser borrados.

5.  **Gestión de Estado:** pregunta cómo reseteamos el estado de la aplicación si una prueba falla y deja los datos inconsistentes.

---

### **Formato de Salida Requerido**

**Escribe el archivo en `.context/infrastructure/test-data-strategy.md`.** Si la carpeta no existe, créala. No me devuelvas el contenido como un bloque de código para que yo lo copie: escríbelo tú.

Al terminar, confírmame:
*   La ruta exacta del archivo que escribiste.
*   Qué secciones quedaron incompletas y por qué.
*   **Si detectaste riesgo de PII, dímelo en la confirmación, no solo dentro del archivo.**

El contenido debe seguir esta estructura:

```markdown
# Estrategia de Datos de Prueba: [Nombre del Proyecto]

## 1. Fuentes de Datos
*   [De dónde vienen los datos: Scripts de Seed, Copia de Producción, Generados al vuelo]

## 2. Gestión de Usuarios de Prueba
| Rol | Usuario (Email/ID) | Contraseña (Referencia a Vault/Env) | Propósito |
| :--- | :--- | :--- | :--- |
| Admin | admin@test.com | *ver .env* | Pruebas de configuración |
| Cliente | user@test.com | *ver .env* | Flujos de compra |

## 3. Generación de Datos Sintéticos
*   **Herramientas:** [Ej: Faker, Mockaroo, Scripts SQL]
*   **Estrategia:** [Cómo crear datos voluminosos para pruebas de carga o casos borde]

## 4. Privacidad y Seguridad (PII)
*   **Política:** [Cómo aseguramos que no usamos datos reales de clientes en entornos no seguros]
*   **Método de Anonimización:** [Si aplica]
*   **Alcance real de la anonimización:** [Qué tablas o campos cubre y cuáles no]

## 5. Limpieza y Reset (Teardown)
*   [Estrategia para volver el sistema al estado inicial después de las pruebas]

## Fuentes
| Dato / afirmación | De dónde sale |
| :--- | :--- |
| [Origen de los datos] | `archivo.md` · [sección] |
| [Origen de los datos] | **Hipótesis** — no hay documento que lo respalde |

## Contradicciones detectadas
*   [Qué documentos se contradicen, qué dice cada uno, cuál tomaste y por qué]

## Preguntas abiertas
*   [Lo que ningún documento contesta. No lo completes con hipótesis: déjalo como pregunta]
```

**Restricciones:**

- Mantener acotado: 3 páginas máximo.
- **Nunca escribas una credencial en claro**, ni siquiera de un usuario de prueba. Referencia dónde está guardada.
- **Todo dato que no salga de un documento se marca como hipótesis** en la tabla de Fuentes. Suponer que los datos de un entorno son sintéticos, sin haberlo verificado, es exactamente el error que este documento existe para evitar.
- Las tres últimas secciones nunca se omiten. Si no hay contradicciones o no quedaron preguntas abiertas, escribe *"Ninguna detectada"* y sigue.

Al finalizar sugerir continuar con `.prompts/4-Especificaciones (Backlog)/pbi-product-backlog.md`

### **FIN DEL PROMPT**
