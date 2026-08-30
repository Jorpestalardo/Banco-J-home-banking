# Fase 3: Infraestructura y Entornos (Enfoque QA)

## 🎯 Objetivo de la Fase
Para un QA, esta fase no se trata de *construir* servidores, sino de **mapear y entender** el entorno donde se ejecutarán las pruebas. Necesitamos saber "dónde pisamos".

## 🔑 Conceptos Clave

### 1. Estrategia de Entornos
Un ciclo de vida de desarrollo saludable suele tener:
*   **Local:** Donde el desarrollador escribe código.
*   **Dev/Preview:** Entornos efímeros para probar Pull Requests.
*   **Staging/QA:** Réplica lo más exacta posible de Producción. Aquí se certifica la calidad.
*   **Producción:** Donde viven los usuarios reales.

### 2. Gestión de Datos de Prueba (Test Data)
Sin datos, no hay pruebas.
*   **Seeding:** Scripts para poblar la BD con datos iniciales.
*   **Datos Sintéticos:** Generados por herramientas (Faker) para volumen.
*   **Anonimización:** Proceso crítico de ocultar datos sensibles (PII) si se usan copias de Producción.

## 🛠️ Herramientas Utilizadas
*   **Prompts de IA:** `environment-analysis.md`, `data-strategy.md`.
*   **Herramientas de BD (Ej: Supabase/SQL):** Tecnologías que deberás auditar para entender dónde residen los datos de prueba.
    *   *Nota:* Es posible usar un **MCP de Base de Datos (Opcional)** para que la IA explore esquemas reales si tienes acceso.

## 📝 Entregables Esperados
Al finalizar esta fase, tendrás en tu carpeta `.context/infrastructure/`:
1.  Un mapa de **Entornos y CI/CD**.
2.  Una **Estrategia de Datos de Prueba**.
