# Music Player — Decisões de Engenharia & Trade-offs

> **Status:** Verified (Architecture & System Design)
> **Escopo:** Decisões Arquiteturais, Limitações de Plataforma e Política de Honestidade Técnica
> **Última Atualização:** 2026-09-28

---

## 1. Matriz de Decisões e Trade-offs

| Dimensão | Opção Escolhida | Alternativa Rejeitada | Racional / Justificativa | Trade-off Aceito |
| :--- | :--- | :--- | :--- | :--- |
| **Arquitetura de Dados** | **Local-First com SQLite** | Nuvem / Sincronização Remota | Privacidade total, zero telemetria de biblioteca e funcionamento 100% offline em qualquer condição. | Sem backup automático na nuvem; migração de aparelho exige export manual de dados. |
| **Mecanismo de Persistência** | **SQLite Relacional (`sqflite`)** | Key-Value NoSQL (Hive / SharedPreferences) | Integridade relacional em cascata (ex: remover faixa de playlists ao deletar arquivo local) e consultas indexadas. | Maior overhead de serialização e escrita em comparação a buffers binários de chave-valor. |
| **Controle de Sessão** | **Camada Nativa de Background (`audio_service`)** | Reprodução confinada ao ciclo de vida da UI | Permite reprodução ininterrupta em background com integração de controles de tela de bloqueio e relógio inteligente. | Exige coordenação de estados entre dois processos/isolates no Android e gerenciamento rigoroso de permissões. |
| **Pipeline de Saída** | **AudioTrack / AVPlayer Nativo** | Engine C++ customizada embarcada (Oboe / Superpowered) | Maior estabilidade, suporte nativo aos codecs do sistema operacional e menor tamanho de binário. | Menor controle de baixo nível sobre bypass do mixer do SO para DACs externos. |

---

## 2. Honestidade Técnica: Limitações e Claims de Plataforma

Um dos princípios fundamentais deste case é a **rejeição da linguagem de marketing vazia**. Diferente de promessas comerciais genéricas, o projeto estabelece limites claros sobre o que é uma garantia de código versus o que depende de hardware externo:

### 2.1 Gapless Playback (Reprodução Sem Pausas)
* **Realidade Técnica:** Gapless perfeito depende do codec de áudio (FLAC e WAV embutem contagem exata de amostras; MP3 possui frames de padding no cabeçalho LAME) e do suporte do pipeline de áudio nativo de cada versão do Android/iOS.
* **Posicionamento:** Tratado como **capacidade condicionada à plataforma e formato**, e não como garantia universal do aplicativo.

### 2.2 Bit-Perfect & DAC Externo
* **Realidade Técnica:** No Android tradicional, todo fluxo de áudio passa pelo mixer do sistema (`AudioFlinger`), que frequentemente reamostra fluxos para 48 kHz. Evitar esse reamostrador para entregar áudio "bit-perfect" a um DAC USB externo exige acesso direto via driver USB nativo (USB Host Mode com driver customizado).
* **Posicionamento:** O case **não alega bit-perfect garantido**. O suporte a DAC externo é documentado como recurso experimental sujeito às políticas de rotação de áudio do sistema operacional.

### 2.3 Equalização e DSP
* **Realidade Técnica:** Efeitos de equalização por software em tempo real aumentam o processamento no processador e podem induzir distorção harmônica se o pré-ganho não for atenuado.
* **Decisão:** Limitar o equalizador a perfis paramétricos padrão do sistema operacional com atenuação de clipping prévia.
