---
name: revisar-requisito-qa
description: Revisa una historia de usuario o requisito desde QA para detectar ambigüedades, contradicciones, datos faltantes y criterios no verificables. Úsala cuando pidan analizar, refinar o preparar un requisito para diseñar pruebas; no la uses para inventar requisitos ni para ejecutar pruebas.
---

# Revisar un requisito desde QA

## Contexto

1. Lee `AGENTS.md` y respeta las convenciones del repositorio.
2. Identifica la fuente del requisito y cualquier documentación relacionada.
3. Prioriza la evidencia más reciente. Si dos fuentes discrepan, registra el hallazgo y explica cuál utilizaste y por qué.

## Análisis

1. Separa actor, objetivo, precondiciones, flujo, reglas y resultados esperados.
2. Distingue siempre entre información documentada, comportamiento observado e hipótesis.
3. Busca contradicciones, términos ambiguos, permisos, datos necesarios, errores esperados, límites y requisitos no funcionales.
4. Formula preguntas concretas para cada vacío que impida verificar el requisito.
5. Propone criterios candidatos trazables a la fuente, sin presentarlos como aprobados.

## Entrega

Presenta el resultado en este orden:

1. Resumen del requisito.
2. Tabla de hallazgos con tipo, evidencia e impacto en pruebas.
3. Preguntas abiertas.
4. Criterios candidatos en formato `Given/When/Then`, solo cuando exista evidencia suficiente.
5. Fuentes consultadas.

Usa `Pendiente` cuando falte información. No inventes prioridad, severidad, comportamiento esperado ni evidencia. No accedas a herramientas externas salvo que la solicitud lo requiera explícitamente.
