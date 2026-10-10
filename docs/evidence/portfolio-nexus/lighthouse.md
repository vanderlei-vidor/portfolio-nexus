# Lighthouse Evidence — Portfolio Nexus

> **Status:** Verified (Sprint 1 Completed)
> **Escopo:** Métricas Reais Observadas, Diagnóstico LCP e Auditoria de Produção
> **Última Execução:** 2026-09-25

---

## 1. Resumo Executivo

Após a investigação forense e a remoção das causas raízes de re-renderização tardia (script de `localStorage` forçado no head, desmontagem global no `AppRuntime`, opacidade inline e desacoplamento dos metadados dos cases), a medição oficial do navegador atingiu índices de excelência.

---

## 2. Comparativo Before vs After

| Métrica | Baseline (2026-09-12) | Sprint 1 Final (2026-09-25) | Status |
| :--- | :--- | :--- | :--- |
| **LCP Real no Browser** | 8.6 s (simulado) / 4.7 s (real) | **1.20 s (1201 ms)** | **Redução de ~75%** 🟢 |
| **FCP Real no Browser** | 1.5 s | **1.20 s (1201 ms)** | **Excelente** 🟢 |
| **Speed Index Real** | 4.0 s | **1.23 s (1238 ms)** | **Excelente** 🟢 |
| **Cumulative Layout Shift (CLS)** | 0.008 | **0.000** | **Perfeito (Zero Shift)** 🟢 |
| **Total Blocking Time (TBT)** | 50 ms | **80 ms** | **Thread Livre (<200ms)** 🟢 |
| **Dom Content Loaded** | ~400 ms | **94 ms** | **Ultrarrápido** 🟢 |
| **Load Completo** | ~1.2 s | **243 ms** | **Ultrarrápido** 🟢 |
| **Accessibility** | 96 | **100 / 100** | **Meta Atingida** 🟢 |
| **SEO** | 100 | **100 / 100** | **Meta Atingida** 🟢 |
| **Best Practices** | 96 | **96 / 100** | **Meta Atingida** 🟢 |
| **Agentic Browsing** | N/A | **100 / 100** | **Meta Atingida** 🟢 |

---

## 3. Artefatos de Evidência

Os relatórios brutos completos em JSON gerados pelo Lighthouse estão preservados neste diretório:
* `docs/evidence/portfolio-nexus/lighthouse-sprint1-final.report.json` — Medição final consolidada da Sprint 1.
* `docs/evidence/portfolio-nexus/lighthouse-home.report.json` — Baseline histórico original.
* `docs/evidence/portfolio-nexus/lighthouse-devtools.report.json` — Diagnóstico de CPU throttling via DevTools.

---

## 4. Diagnóstico Técnico Consolidado

1. **LCP Element Mapeado:** O elemento final é o parágrafo `<p class="text-sm...">` do subtítulo do Hero ("I turn real-world problems into well-structured digital products...").
2. **Eliminação de Hydration Mismatch:** O HTML estático gerado em inglês agora é hidratado em inglês de forma 100% determinística. Nenhuma substituição de texto assíncrona pós-hidratação anula o primeiro paint.
3. **Cadeia Crítica de Imagens:** Redução de peso dos 4 cards de ~340KB para ~68KB total, impedindo contenção de banda no carregamento inicial.
