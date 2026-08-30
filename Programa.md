# **Propuesta de Formación: QA Potenciado con IA**

## **Modernizando el Testing con IA, MCPs y Flujos de Desarrollo**

---

### **1\. Resumen Ejecutivo**

El rol del QA está evolucionando. La brecha entre el testing manual y la automatización se está cerrando gracias a la Inteligencia Artificial Generativa.

Este curso está específicamente dirigido a **QA Manuales y Analistas QA** que ya poseen conocimiento de la teoría del testing o experiencia real. El objetivo es que dominen las herramientas de vanguardia surgidas en el último año y medio, capacitándose para trabajar en sincronización con la IA.

El programa transforma a estos profesionales en perfiles de **QA Augmentation**, capaces de gestionar el ciclo de vida del software utilizando herramientas de nivel desarrollador (**CLI, Git, IDEs**) y orquestando **LLMs** para eliminar la deuda de documentación y acelerar la producción de casos de prueba.

---

### **2\. El Problema y la Solución**

* **La Problemática:** Las grandes empresas sufren de una deuda crónica de documentación. El ritmo de los *sprints* rara vez deja espacio para documentar lo "viejo", y la calidad de los requisitos suele ser pobre, lo que genera retrabajo constante.  
* **La Solución:** Implementar un flujo de trabajo basado en **Context Engineering**. Utilizar LLMs conectados directamente a las herramientas de trabajo (Jira, Playwright) mediante **MCPs (Model Context Protocol)** para automatizar la creación de documentación técnica, análisis de riesgos y ejecución de pruebas exploratorias.

---

### **3\. Stack Tecnológico del Curso**

Para operar como un **"Modern QA"**, utilizaremos herramientas de productividad de alto rendimiento:

| Categoría | Herramientas |
| :---- | :---- |
| **Interfaz de Comando** | Warp (CLI moderna) |
| **Control de Versiones** | Git / GitHub |
| **Entorno de Trabajo** | VS Code o Cursor |
| **LLM (Motor IA)** | OpenAI (GPT-4), Google (Gemini), Anthropic (Claude) |
| **Conectividad AI** | MCP (Model Context Protocol) para Atlassian y Playwright |
| **Gestión** | Jira (Atlassian) |

---

### **4\. Programa Académico (4 Módulos | 8 Sesiones)**

#### **Módulo 1: El Entorno del "Developer-QA" e Intro a IA**

* **Clase 1 (2h \- Demostrativa):**  
  * **La Consola no muerde:** Instalación de Warp y comandos esenciales. Ventajas de la CLI para la IA.  
  * **Git para QA:** Clonado de repositorios, gestión de ramas y Git como base de datos de conocimiento.  
  * **Fundamentos de LLMs:** Tokens, ventanas de contexto y por qué un LLM no es un buscador.  
  * **Conectividad Avanzada:** Introducción a MCPs y RAG (Retrieval-Augmented Generation). Cómo darle "memoria" y "manos" a la IA para actuar sobre Jira o el código.  
* **Clase 2 (2h \- Dudas y Práctica):**  
  * Resolución de problemas técnicos y nivelación de entornos locales para asegurar la paridad con el instructor.

#### **Módulo 2: El Proyecto y el "Prompt Engineering" Estructurado**

* **Clase 1 (2h \- Demostrativa):**  
  * **Presentación del SUT (System Under Test):** Aplicación de gestión de turnos (Vercel/Supabase).  
  * **Metodología Local Mirror:** Sincronización entre archivos locales (prompts/docs) y Jira.  
  * **Fases Iniciales:** Uso de prompts pre-escritos para generar documentos de Constitución, Arquitectura (PRD/SRS) e Infraestructura.  
  * **Laboratorio:** Clonado del "Prompt Template" y configuración del entorno personal de Jira.  
* **Clase 2 (2h \- Dudas y Práctica):**  
  * Taller guiado para la creación del ecosistema de documentación inicial del proyecto.

#### **Módulo 3: Shift-Left Testing y Especificaciones**

* **Clase 1 (2h \- Demostrativa):**  
  * **Análisis Anticipado:** Uso de IA para detectar fallos de lógica antes del desarrollo.  
  * **Refinamiento de User Stories (US):** Transformación de requisitos vagos en historias técnicas con criterios de aceptación sólidos mediante el MCP de Atlassian.  
  * **Context Engineering:** Alimentación de documentación de arquitectura a la IA para optimizar estrategias de prueba.  
* **Clase 2 (2h \- Dudas y Práctica):**  
  * Refinamiento práctico de un backlog de producto utilizando asistentes de IA.

#### **Módulo 4: Ejecución y Cierre del Ciclo de QA**

* **Clase 1 (2h \- Demostrativa):**  
  * **Exploratory Testing 2.0:** Uso del MCP de Playwright para que la IA navegue la app y valide criterios en tiempo real.  
  * **Documentación Asincrónica:** Generación automática de ATCs (Acceptance Test Cases) basados en pruebas exploratorias.  
  * **Cierre de Proyecto:** Automatización de la subida de evidencias y casos de prueba finales a Jira.  
* **Clase 2 (2h \- Dudas y Práctica):**  
  * Consolidación de resultados finales y entrega del repositorio de evidencias.

---

### **5\. Metodología y Objetivo Final**

El curso consta de **16 horas totales** con una metodología **80% práctica** basada en la replicación y mentoría constante:

1. **Sesión Demostrativa:** El instructor ejecuta el flujo en vivo, mostrando el "paso a paso" técnico.  
2. **Sesión de Práctica y Q\&A:** Espacio para resolver bloqueos técnicos y garantizar que cada alumno replique con éxito los resultados.

**Al finalizar, el alumno contará con:**

* Un **repositorio en Git** con toda la lógica de prompts y documentación técnica.  
* Un **tablero de Jira completo** (Épicas, US, ATCs) generado mediante IA.  
* La habilidad de **conectar cualquier LLM** a herramientas externas vía **MCP**.

---

### **6\. Requisitos Previos para el Alumno**

Para asegurar que el ritmo de las sesiones sea fluido, los asistentes deben contar con el siguiente perfil base:

* **Experiencia en QA:** Al menos 1 año de experiencia como QA Manual o Analista de Calidad (conceptos de ciclos de vida, tipos de pruebas y reporte de bugs).   
* **Gestión de Tareas:** Familiaridad básica con **Jira** o herramientas similares.  
* **~~Mentalidad Técnica:~~** ~~No se requiere saber programar, pero sí tener disposición para utilizar la línea de comandos (terminal) y editores de código (VS Code).~~  
* **Acceso a Herramientas:** Cuenta activa en al menos un LLM de nivel profesional (ChatGPT Plus, Claude Pro o Gemini Pro) para el uso de APIs y MCPs.

***Nota:** Al día de hoy (Marzo de 2026), aquellos participantes que no cuenten con una suscripción paga a algún proveedor podrán utilizar la versión gratuita y personal de Google Gemini. Si bien esta versión tiene limitaciones, son suficientes para la realización completa de este curso.*

---

### **7\. Modelo de Evaluación y Certificación**

El curso no se evalúa con un examen teórico, sino mediante la entrega de un **Portafolio de QA Augmentation**. El alumno deberá presentar un proyecto final que demuestre:

1. **Dominio de Contexto:** Un repositorio en GitHub que contenga el "Library de Prompts" estructurado y documentado.  
2. **Evidencia de Integración:** Un tablero de Jira con una Épica completa, sus Historias de Usuario (US) y Criterios de Aceptación (AC) generados y vinculados mediante IA.  
3. **Ejecución Inteligente:** Un reporte de ejecución de pruebas exploratorias asistidas por el MCP de Playwright, incluyendo los casos de prueba (ATCs) generados de forma automática.

**Certificación:** Se otorgará el certificado de *"QA Augmentation Specialist"* a quienes completen el ciclo de sincronización (Local Mirror) entre su documentación local y el entorno de gestión.

