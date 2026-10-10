# English Tutor (AI Polyglot Tutor) Evidence

Este diretório reúne as evidências técnicas de engenharia, arquitetura pedagógica, testes e limites éticos do case **English Tutor (AI Polyglot Tutor)**.

O objetivo é sustentar uma narrativa de inteligência artificial aplicada focada em engenharia de software e pedagogia estruturada ("Rules Before Generation"), rejeitando promessas impossíveis como "zero alucinações" ou "privacidade absoluta incondicional".

---

## Índice de Evidências

| Área | Arquivo | Estado | Descrição |
| :--- | :--- | :--- | :--- |
| **Arquitetura** | [`architecture.md`](./architecture.md) | **Verified** | Arquitetura híbrida: Flutter, FastAPI, Teacher Brain determinístico e pipeline de inferência local. |
| **Trade-offs** | [`trade-offs.md`](./trade-offs.md) | **Verified** | Decisões técnicas e honestidade em IA: Regras antes de Geração vs Prompt puro, Local vs Cloud. |
| **Testes** | [`tests.md`](./tests.md) | **Verified** | Testes da máquina de estados do Teacher Brain, verificação CEFR e testes de rede Zero-Egress. |
| **Teacher Brain Tests** | [`teacher-brain-tests.md`](./teacher-brain-tests.md) | **Planned / Documented** | Roteiro de testes pedagógicos específicos e regras de detecção de erros gramaticais. |
| **Modelo de Privacidade** | [`privacy-model.md`](./privacy-model.md) | **Designed / Verified** | Fluxo de dados detalhado separando modo offline local e modo com API remota. |
| **Performance** | [`performance.md`](./performance.md) | **Observed** | Latência percebida de inferência e otimizações de carregamento de áudio. |
| **Claims Aprovados** | [`claims.md`](./claims.md) | **Active** | Matriz de afirmações técnicas públicas classificadas por estado (Verified, Observed, Designed, Target). |

---

## Resumo dos Claims Verificados

- [x] Arquitetura híbrida com **FastAPI** e **Flutter**, desacoplando decisão pedagógica de geração textual.
- [x] **Teacher Brain** determinístico guiando correções antes da escrita da resposta pelo LLM.
- [x] Modelo de aprendizado estruturado em torno do padrão internacional **CEFR** (A1 até C2).
- [x] Suporte arquitetural a **Local LLM** (GGUF via llama.cpp) garantindo privacidade local de dados.
- [x] Honestidade técnica: O sistema documenta a mitigação de alucinações através de regras, sem alegar "zero alucinações" matematicamente impossíveis.