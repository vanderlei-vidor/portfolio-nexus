# Portfolio Nexus — Decisões de Engenharia & Trade-offs

> **Status:** Verified
> **Escopo:** Trade-offs Técnicos, Compromissos de Design e Dívida Técnica Consciente
> **Última Atualização:** 2026-09-28

---

## 1. Matriz de Trade-offs Arquiteturais

A construção do **Portfolio Nexus** priorizou confiabilidade, velocidade e apresentação sem atrito para recrutadores e avaliadores técnicos. Cada decisão técnica envolveu uma escolha deliberada entre alternativas concorrentes.

| Dimensão | Opção Escolhida | Alternativa Rejeitada | Racional / Justificativa | Trade-off Aceito |
| :--- | :--- | :--- | :--- | :--- |
| **Geração de Páginas** | **Static Export (SSG Puro)** | Server-Side Rendering (Node.js runtime) | Zero latência de servidor (TTFB < 20ms), hospedável em qualquer CDN estática sem cold start ou falha de infraestrutura. | Perde suporte a rotas de API dinâmicas nativas do Next.js e headers dinâmicos por requisição no edge. |
| **Internacionalização** | **i18n Client-Side com Dicionários Estáticos** | Subpastas de rota (`/pt`, `/en`, `/es`) | Mantém URLs limpas e canônicas para todos os links públicos sem duplicar as 14 páginas estáticas por 3 idiomas. | Exige alinhamento estrito do idioma inicial para evitar reflows de hidratação pós-render. |
| **Scroll & Motion** | **Lenis + GSAP ScrollTrigger** | CSS Scroll Snap nativo ou puro Framer Motion | Controle fino de aceleração inercial e sincronia precisa com pins e timelines de animação complexas. | Adiciona ~45KB de JavaScript ao runtime que precisa ser contido fora do First Contentful Paint. |
| **Organização do Registry** | **Separação Meta vs Component (`projects-meta.ts`)** | Import único centralizado de cases | Impede que a página inicial inclua no seu grafo de chunks os módulos complexos (Three.js/3D) dos 4 cases. | Pequena duplicação de metadados declarativos (slug, título, imagem) em arquivo dedicado. |
| **Otimização de Imagens** | **Pré-processamento Sharp em Build/Assets** | Next.js Image Optimization Server | Permite usar `output: "export"` com geração de arquivos estáticos puros prontos para deploy. | Imagens precisam ser convertidas e dimensionadas antes do deploy (não há redimensionamento on-the-fly pelo servidor). |

---

## 2. Análise Detalhada dos Principais Trade-offs

### 2.1 Static Site Generation vs. Server-Side Rendering
* **Contexto:** Plataformas como Vercel ou VPS suportam Next.js SSR nativo.
* **Trade-off:**
  * O SSR permitiria negociar cabeçalhos `Accept-Language` no servidor para enviar o HTML já no idioma do usuário.
  * No entanto, o SSR introduz dependência de runtime Node.js, risco de cold-start em servidores serverless, e maiores custos de infraestrutura.
  * **Decisão:** Optou-se pelo SSG puro com deploy estático em Edge CDN. O HTML é entregue em menos de 20ms globalmente. O idioma padrão é o inglês (padrão da indústria global), com alternância instantânea para português e espanhol no cliente.

### 2.2 Lenis + GSAP vs. Experiência 100% Nativa
* **Contexto:** Engenheiros puristas frequentemente debatem o custo do "smooth scrolling".
* **Trade-off:**
  * O scroll nativo é imbatível em consumo de thread de layout.
  * Contudo, para um portfólio visual com forte apelo de Design Engineering, o scroll inercial confere acabamento premium indistinguível de produtos Apple/Vercel.
  * **Mitigação:** Desativação automática do smooth scroll quando o sistema operacional sinaliza `prefers-reduced-motion: reduce`, respeitando 100% das preferências de acessibilidade do usuário.

### 2.3 Formulário de Contato: Mailto Estruturado vs. Endpoint Backend
* **Contexto:** Envio de formulário direto na página de contato.
* **Trade-off:**
  * Um endpoint backend (ex: Resend, SendGrid ou serverless function) enviaria a mensagem de forma invisível.
  * Porém, introduziria dependência de chaves de API secretas, riscos de spam público sem captcha pesado e dependência de serviços externos que podem falhar ou exigir plano pago.
  * **Decisão:** Formulário reativo que valida os dados em tempo real e compõe um link `mailto:` perfeitamente estruturado e sanitizado, garantindo que o contato seja enviado diretamente pelo cliente de email preferido do recrutador sem nenhum intermediário.

---

## 3. Dívida Técnica Consciente & Próximas Evoluções

1. **Sub-rotas Estáticas de Idioma:** Caso seja desejado indexação SEO separada para cada idioma no Google (hreflang), as páginas estáticas poderão ser geradas em `/pt/...` e `/es/...` durante o build estático.
2. **Bundle Analysis Contínuo:** Manter `@next/bundle-analyzer` ativo no CI para evitar que novas dependências de visual engineering vazem para o bundle inicial.
