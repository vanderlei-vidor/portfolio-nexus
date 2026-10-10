# English Tutor — Decisões de Engenharia & Trade-offs

> **Status:** Verified (System Design & Trade-offs)
> **Escopo:** Trade-offs de Arquitetura de IA, Modelos Híbridos e Limites Pedagógicos
> **Última Atualização:** 2026-09-28

---

## 1. Matriz de Decisões e Trade-offs

| Dimensão | Opção Escolhida | Alternativa Rejeitada | Racional / Justificativa | Trade-off Aceito |
| :--- | :--- | :--- | :--- | :--- |
| **Arquitetura Pedagógica** | **Híbrida: Regras Determinísticas + LLM (Rules Before Generation)** | Chatbot LLM puro com System Prompt longo ("You are an English tutor") | Elimina o comportamento caótico dos LLMs (que esquecem regras, aceitam respostas incorretas ou usam vocabulário fora do nível CEFR). | Requer código de engenharia de software tradicional para modelar regras gramaticais e estados de aprendizagem. |
| **Pipeline de Inferência** | **Suporte a LLM Local Quantizado (GGUF) com Fallback Cloud** | Exclusivamente Cloud APIs (OpenAI / Anthropic) | Garante privacidade total dos alunos em modo offline e custo zero de API por sessão. | Modelos locais quantizados (3B a 8B parâmetros) têm menor capacidade de raciocínio complexo que modelos de trilhões de parâmetros. |
| **Síntese de Voz (TTS)** | **TTS Nativo do Sistema Operacional / Piper Local** | ElevenLabs / Serviços Cloud de Ultra-alta fidelidade | Zero latência de rede na emissão do feedback de áudio e funcionamento em modo offline completo. | Voz menos expressiva ou ligeiramente robótica em comparação aos modelos de ponta em nuvem. |
| **Memória do Aluno** | **Tabelas Relacionais Estruturadas (SQLite / Postgres)** | Vector Database com embeddings de texto puro | Facilidade de consulta exata de contagem de erros, intervalos de repetição espaçada e métricas CEFR. | Menor capacidade de inferir relações semânticas sutis não catalogadas no esquema de dados. |

---

## 2. Política de Honestidade Técnica sobre IA

A engenharia deste case rejeita categoricamente claims de marketing infundados comuns em produtos de inteligência artificial:

### 2.1 "Zero Alucinações"
* **Realidade:** Qualquer modelo probabilístico de linguagem pode alucinar ou gerar construções não naturais.
* **Mitigação Real:** O **Teacher Brain** reduz dramaticamente as alucinações pedagógicas porque ele **valida o erro gramatical antes** e injeta a correção pronta no contexto do prompt, transformando o papel do LLM em mero redator da frase de feedback.

### 2.2 Privacidade Absoluta
* **Realidade:** A privacidade só é 100% local quando o aplicativo está configurado em modo Local LLM (llama.cpp). Quando o usuário opta por usar chaves de API remotas para modelos maiores, os dados trafegam pela rede do provedor escolhido.
* **Posicionamento:** O case detalha claramente os dois modos operacionais sem falsas promessas de privacidade irrestrita em qualquer configuração.
