# Prompt: Análisis de Infraestructura y Entornos de Prueba

Este prompt está diseñado para que el QA Augmented "mapee el terreno" donde ejecutará sus pruebas. Define qué tipo de aplicación es, los entornos disponibles y cómo se despliega el código.

**Requisito previo:** Se debe haber completado `system-design.md`. Si no es así, detén la ejecución de este prompt y sugiere al usuario la ejecución de `.prompts/2-Arquitectura/architecture-design.md`.

**Inputs necesarios:**
1.  Contenido de `.context/architecture/system-design.md`
2.  Contenido de `.context/idea/business-model.md` (para el tipo de proyecto)

---

### **INICIO DEL PROMPT**

**ROL: DevOps & Infrastructure Lead**

Actúa como un Ingeniero Líder en DevOps y QA. Tu objetivo es diseñar una estrategia de entornos de prueba robusta que garantice la fiabilidad del software desde el desarrollo local hasta producción.

Primero, lee `.context/architecture/system-design.md`.

**No me preguntes dos cosas que ya están documentadas:**
*   **El tipo de aplicación** (Web, Móvil, Escritorio, híbrida) sale del stack de `system-design.md`.
*   **El tipo de proyecto** (Greenfield o Brownfield) está en el encabezado de `.context/idea/business-model.md`, en el campo `Tipo de proyecto`.

Si alguno de los dos no se puede deducir de los documentos, ahí sí pregúntame, y anota en "Preguntas abiertas" que faltaba.

### **Escenario A: Proyecto Nuevo (Greenfield)**

1.  **Recomendación de Entornos:** propón una estrategia de entornos para QA moderna y explica el propósito de cada uno. Una cadena habitual es Local, Integración, UAT y Producción, pero **adáptala al proyecto y no la impongas**: un producto chico puede necesitar dos entornos y uno regulado, cinco.
2.  **Estrategia de Dispositivos:**
    *   Si es Web: recomienda navegadores y resoluciones clave (Desktop, Mobile Web).
    *   Si es Mobile: sugiere simuladores frente a dispositivos reales (granjas de dispositivos como BrowserStack o SauceLabs).
3.  **CI/CD:** sugiere un pipeline básico de integración continua (ej: GitHub Actions) que ejecute lints y tests unitarios en cada Pull Request.

### **Escenario B: Proyecto Existente (Legacy/Brownfield)**

1.  **Pídeme la documentación técnica y de despliegue.** Pregúntame dónde están las notas técnicas, la documentación de infraestructura o los manuales de despliegue, y pídeme la ruta de la carpeta o de los archivos.
    *   **Si te doy una carpeta, lee todos los archivos que haya adentro, no solo el primero.**
    *   Antes de producir nada, enumérame qué archivos leíste. Si alguno no lo pudiste abrir, dímelo.
2.  **Investigación de Entornos:** identifica en la documentación **qué entornos existen realmente y cómo se llaman en este proyecto**. Usa los nombres reales del equipo (UAT, QA, preproducción, homologación, los que sean); no los renombres a una nomenclatura estándar.
    *   Si la documentación no los menciona, guíame con preguntas concretas, del tipo: ¿hay una URL distinta a la de producción donde se prueba antes de liberar?
    *   **Presta atención a lo que falta.** Un proyecto sin entorno de desarrollo separado, o donde los desarrolladores prueban en el mismo entorno donde certifica QA, es un hallazgo: el terreno se mueve mientras se prueba. Regístralo.
3.  **Acceso y Credenciales:** recuérdame, sin pedirme las claves reales, que debo solicitar accesos a VPNs, bases de datos de prueba o cuentas específicas.
4.  **Pipelines Actuales:** pregúntame si sé cómo se despliega el código hoy. Si no lo sé, sugiéreme revisar archivos como `.github/workflows` o `Jenkinsfile` en el repositorio.
    *   **Si no existe pipeline, eso también se documenta.** "No hay CI" es información de infraestructura, no una omisión del análisis.

---

### **Formato de Salida Requerido**

**Escribe el archivo en `.context/infrastructure/environments.md`.** Si la carpeta no existe, créala. No me devuelvas el contenido como un bloque de código para que yo lo copie: escríbelo tú.

Al terminar, confírmame:
*   La ruta exacta del archivo que escribiste.
*   Qué secciones quedaron incompletas y por qué.

El contenido debe seguir esta estructura:

```markdown
# Estrategia de Infraestructura y Entornos: [Nombre del Proyecto]

## 1. Tipo de Aplicación y Alcance
*   **Plataforma:** [Web / Mobile / Híbrida]
*   **Matriz de Compatibilidad:**
    *   [Navegadores/SO soportados]
    *   [Resoluciones clave]

## 2. Mapa de Entornos (Matriz de URLs)

> Las columnas intermedias se arman con los entornos que el proyecto tiene de verdad, con
> los nombres que usa el equipo. `Local` y `Producción` son las únicas fijas. Si un entorno
> no existe, no inventes la columna: anótalo en "Preguntas abiertas".

| Componente | Local | [Entorno real: UAT / QA / ...] | Producción |
| :--- | :--- | :--- | :--- |
| **Frontend** | `http://localhost:3000` | `[URL]` | `[URL]` |
| **Backend API** | `http://localhost:8080` | `[API Base URL]` | `[API Base URL]` |
| **Base de Datos** | `localhost:5432` | `[Host/Connection]` | `[Restringido]` |

### Detalles de Acceso
*   **Credenciales de Prueba:** [Referencia a Vault/.env, nunca la credencial en claro]
*   **VPN/Restricciones:** [Si aplica]

## 3. Pipeline de CI/CD (Integración Continua)
*   **Trigger:** [Cuándo se ejecutan las pruebas: al hacer Push, al crear PR, etc.]
*   **Pruebas Automáticas:** [Qué tests corren en el pipeline]
*   **Si no hay pipeline:** decirlo explícitamente y describir cómo se libera hoy.

## 4. Herramientas de Infraestructura
*   [Ej: Docker, Kubernetes, Vercel, AWS]

## 5. Riesgos del Mapa de Entornos
*   [Entornos que faltan, entornos compartidos entre roles, ausencia de CI, despliegue manual]

## Fuentes
| Dato / afirmación | De dónde sale |
| :--- | :--- |
| [Entorno o URL] | `archivo.md` · [sección] |
| [Entorno o URL] | **Hipótesis** — no hay documento que lo respalde |

## Contradicciones detectadas
*   [Qué documentos se contradicen, qué dice cada uno, cuál tomaste y por qué]

## Preguntas abiertas
*   [Lo que ningún documento contesta. No lo completes con hipótesis: déjalo como pregunta]
```

**Restricciones:**

- Mantener acotado: 3 páginas máximo.
- **Nunca escribas una credencial en claro**, ni siquiera de un usuario de prueba. Referencia dónde está guardada.
- **Todo entorno o URL que no salga de un documento se marca como hipótesis** en la tabla de Fuentes. Una URL supuesta manda a probar contra el lugar equivocado.
- Las tres últimas secciones nunca se omiten. Si no hay contradicciones o no quedaron preguntas abiertas, escribe *"Ninguna detectada"* y sigue.

Al finalizar sugerir continuar con `.prompts/3-Infraestructura/data-strategy.md`

### **FIN DEL PROMPT**
