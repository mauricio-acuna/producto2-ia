
# 📄 PRD — Portal 2 “Agentes y RAG hands-on”

## 1. Introducción

### 1.1 Propósito

El **Portal 2** es el siguiente paso después de los fundamentos. Aquí los alumnos aprenderán a **diseñar y desplegar agentes completos**, con grafos explícitos (LangGraph), herramientas seguras, RAG híbrido y memoria, aplicando prácticas de calidad y evaluaciones rápidas.
El objetivo es que el alumno pueda **crear un agente utilizable en entornos reales**, integrarlo con un **RAG de alto rendimiento** y aplicar **seguridad y métricas básicas**.

### 1.2 Alcance

Este portal cubrirá:

* Construcción de agentes modulares con **LangGraph**.
* Tool calling seguro con contratos explícitos.
* **Memoria de corto y largo plazo**.
* **RAG híbrido (BM25 + vectores + MMR)**.
* Primeras métricas de **evaluación y calidad** integradas en CI local.

No incluye: CI/CD en producción, observabilidad avanzada, compliance (eso va al Portal 3).

---

## 2. Público objetivo y usuarios

### 2.1 Perfil primario

* Devs que completaron el Portal 1 o que ya saben levantar un mini-agente básico y un RAG sencillo.
* Nivel: **mid-level** que buscan dar el salto a prácticas de **arquitectura y prototipado en producción**.

### 2.2 Problemas a resolver

* No saben cómo estructurar agentes más complejos.
* Dificultad para elegir embeddings, chunking y retrieval adecuados.
* Falta de comprensión de memoria en agentes.
* Necesidad de métricas rápidas y confiables para validar calidad.

---

## 3. Objetivos y métricas de éxito

### 3.1 Objetivos de producto

1. Permitir al alumno **construir un agente completo en LangGraph** con 3+ nodos (planificador, ejecutor, crítico).
2. Implementar **tool calling seguro** con *allowlist* y validación de entradas.
3. Crear un **RAG híbrido** con BM25 + embeddings vectoriales + reranking MMR.
4. Integrar **memoria simple** (resúmenes + retrieval).
5. Usar **evals rápidas** para medir precisión, coste y latencia.

### 3.2 KPIs / métricas

* **% de alumnos que completan un agente en LangGraph:** ≥ 60%.
* **% que implementa correctamente un RAG híbrido:** ≥ 50%.
* **Precisión\@k promedio en el capstone:** ≥ 70%.
* **Tasa de uso de memoria en proyectos:** ≥ 40%.

---

## 4. Requisitos funcionales

### 4.1 Currículo

* **Módulo A — Agentes en LangGraph**
  *Concepto de grafo, nodos plan/exec/critic, transiciones.*
* **Módulo B — Tools seguras**
  *Contratos, validación de inputs, `safety.yaml` básico.*
* **Módulo C — Memoria**
  *Short-term (resúmenes de turno), long-term (chunks indexados).*
* **Módulo D — RAG híbrido**
  *BM25, vectores, MMR, re-ranking adaptativo.*
* **Módulo E — Evaluación en CI local**
  *Quick evals automáticas con dataset mini; gates de precisión/coste.*
* **Capstone:** construir un agente con LangGraph + RAG híbrido que pueda responder preguntas sobre un repositorio de código y mantener contexto entre consultas.

### 4.2 Funcionalidades del portal

* **Curriculum interactivo:** cada módulo con prácticas guiadas.
* **Playground integrado (opcional):** ejemplos de LangGraph visualizados.
* **Laboratorios prácticos:** datasets con fragmentos de código/documentación.
* **Descargables:** plantillas `graph.yaml`, `safety.yaml`, `eval-runner.json`.
* **Capstone final:** evaluación automática con quick evals.

### 4.3 Internacionalización (i18n)

* Igual que Portal 1: ES base, EN opcional.

### 4.4 Accesibilidad

* Mantener estándares WCAG AA.

---

## 5. Requisitos no funcionales

### 5.1 UX

* Visualización gráfica de nodos LangGraph (ejemplo SVG o animación).
* Botones de copiar código.
* Checklist al final de cada módulo.

### 5.2 SEO

* Keywords: “LangGraph”, “RAG híbrido”, “memoria agentes IA”, “tool calling seguro”.
* Schema.org: `Course`, `HowTo`, `SoftwareApplication` para demos.

### 5.3 Performance

* Lecciones cargadas progresivamente.
* Ejemplos de LangGraph ligeros.

---

## 6. Roadmap de desarrollo de portal

| Semana | Entregable                             |
| ------ | -------------------------------------- |
| 1      | Landing + Módulo A (LangGraph básico)  |
| 2      | Módulo B (Tools seguras) + laboratorio |
| 3      | Módulo C (Memoria)                     |
| 4      | Módulo D (RAG híbrido)                 |
| 5      | Módulo E (EvalOps local)               |
| 6      | Capstone final + rúbrica               |

---

## 7. Recursos de aprendizaje incluidos

* **Datasets de prueba** con fragmentos de código/documentación.
* **Plantillas:** grafo mínimo en LangGraph, tool calling, `safety.yaml`.
* **Cheat-sheets:** top-k adaptativo, precision\@k, patrones de chunking.
* **Mini-eval set** (10–15 preguntas + respuestas correctas).

---

## 8. Entregables para el alumno

* Repo con agente LangGraph + tools seguras + RAG híbrido.
* Evaluación automática con quick evals.
* Documentación explicando decisiones de memoria y RAG.
* Grabación corta del agente en acción.

---

## 9. Glosario (extracto)

* **LangGraph:** framework para modelar agentes como grafos explícitos de nodos y transiciones.
* **MMR (Maximal Marginal Relevance):** técnica para diversificar resultados de recuperación.
* **Tool calling seguro:** ejecución de funciones bajo contratos claros y reglas de seguridad.
* **Memoria short-term vs long-term:** almacenamiento de contexto reciente vs. histórico.

---

## 10. Riesgos y mitigaciones

* **Riesgo:** complejidad técnica (LangGraph).

  * **Mitigación:** proveer plantillas base y visualizaciones gráficas.
* **Riesgo:** dificultad con embeddings y chunking.

  * **Mitigación:** cheat-sheets con defaults recomendados.
* **Riesgo:** frustración por evals que fallan.

  * **Mitigación:** datasets pequeños y ejemplos paso a paso.

---

## 11. KPI de seguimiento interno

* % de finalización por módulo.
* % de agentes LangGraph entregados.
* Métrica de precisión\@k en capstone.
* Ratio de fallos en eval runner.

---

## 12. Cierre

Este portal convierte al dev en **constructor de agentes reales** con RAG robusto y memoria. Quien lo complete tendrá un **portfolio atractivo** para roles de *AI Engineer* o *Applied AI Dev* en el mercado laboral.

---
