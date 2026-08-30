# Fase 7: Documentación de Casos de Prueba (CPs)

## 🎯 Objetivo de la Fase
Transformar el conocimiento adquirido durante las pruebas exploratorias en activos documentales formales. Aquí creamos la "memoria a largo plazo" del proyecto para futuras regresiones y automatización.

## 🔑 Conceptos Clave

### 1. Candidatos de Prueba
No todo lo que se prueba merece ser documentado. Filtramos por:
*   **Criticidad:** ¿Es vital para el negocio?
*   **Frecuencia:** ¿Se usa mucho?
*   **Complejidad:** ¿Es propenso a fallar?

### 2. ROI de Automatización
Decisión económica sobre qué automatizar.
*   *Alto ROI:* Pruebas repetitivas, estables y críticas -> **Automatizar**.
*   *Bajo ROI:* Pruebas visuales, cambiantes o de una sola vez -> **Manual**.

### 3. Trazabilidad
La capacidad de seguir el rastro:
`User Story` <-> `Test Case` <-> `Bug` <-> `Código`.
Esto asegura que si cambian los requisitos, sabemos qué pruebas actualizar.

## 🛠️ Herramientas Utilizadas
*   **Prompts de IA:** `test-analysis.md`, `test-prioritization.md`, `test-documentation.md`, `xray-api.md`.
*   **Jira / Xray:** Repositorio de casos de prueba.
    *   *Nota:* Si utilizas **Xray** y dado que aun no disponemos de un MCP oficial, utiliza el script `xray-api.md` ubicado en la carpeta de prompts para interactuar con su API.

## 📝 Entregables Esperados
Al finalizar esta fase tendrás, en `.context/testing/documentation/[ID-US]/`:

| Archivo | Lo escribe |
| :--- | :--- |
| `analisis-escenarios.md` | `test-analysis.md` |
| `priorizacion-roi.md` | `test-prioritization.md` |
| `[ID-CP]-[nombre-kebab].md` (uno por caso) | `test-documentation.md` |

Los casos quedan **vinculados a su historia de usuario**: un caso de prueba sin historia vinculada no está terminado.
