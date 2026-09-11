# ADR 0002: Hub de Contato Direto Client-Side (Zero Custo / Mailto) vs. API Serverless Paga

- **Status:** Aceito
- **Data:** 2026-07-22
- **Decisores:** Vanderlei Vidor

## 1. Contexto
A aplicação necessita de um canal de contato direto e intuitivo para recrutadores, CTOs e parceiros comerciais. As arquiteturas tradicionais costumam utilizar serviços SaaS de envio de e-mail (Resend, SendGrid, Formspree ou EmailJS) acoplados a rotas de API Serverless ou Server Actions.

Essa abordagem tradicional introduz desvantagens técnicas e operacionais:
1. **Custos Recorrentes e Tiers Restritivos:** Limites mensais de requisições e cobranças por escalabilidade.
2. **Exposição a Abusos e Spam:** Endpoints públicos de envio necessitam de proteção robusta (CAPTCHA, rate limiting com Redis/Upstash), aumentando o acoplamento arquitetural.
3. **Ponto Único de Falha (SPOF):** Se a API do fornecedor cair ou o domínio entrar em lista cinza de entrega, o contato é perdido silenciosamente.

## 2. Decisão
Implementar um **Hub de Contato Direto Inteligente (Zero Runtime Cost)** encapsulado no componente `DirectContactForm.tsx`:
- **Protocolo RFC 6068 (`mailto:`):** O usuário preenche Nome, Assunto e Mensagem na interface estilizada Glassmorphic, gerando dinamicamente uma URI `mailto:` pré-formatada e codificada via `encodeURIComponent`.
- **Ativação Nativa em 1-Clique:** Abre diretamente a aplicação de e-mail padrão do sistema operacional do visitante (Apple Mail, Outlook, Thunderbird, etc.).
- **Fallback para Webmail com Clipboard API:** Para visitantes que utilizam Gmail/Outlook Web sem aplicativo de desktop configurado, é disponibilizado um botão de cópia formatada em 1-clique com feedback tátil e visual imediato.

## 3. Consequências

### Positivas
- **Custo Operacional Zero:** Nenhuma infraestrutura backend, serviço SaaS ou chave de API de terceiros necessária.
- **Privacidade & Segurança Absolutas:** Nenhum dado pessoal trafega em servidores intermediários; nenhuma credencial de e-mail precisa ser armazenada ou gerenciada em variáveis de ambiente.
- **Resiliência Máxima:** Funciona sem latência e sem depender de estabilidade de conexões com provedores de mensageria.

### Negativas / Trade-offs
- O envio efetivo da mensagem depende da ação final do visitante dentro de seu cliente de e-mail, em vez de um envio transparente em segundo plano.
