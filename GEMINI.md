# 🚀 Portfolio AAA - Diretrizes de Desenvolvimento & Contexto (Atualizado)

Este arquivo serve como um diário de bordo técnico e registro de decisões arquiteturais do projeto para **evitar regressões**, quebras de build ou retrabalho. Sempre consulte este arquivo antes de realizar alterações estruturais.

---

## 🛠️ Stack Tecnológica & Versões Críticas

*   **Node.js:** `v24.15.0` (LTS) - *Obrigatório `>=v20.9.0` devido às exigências do Next.js.*
*   **Next.js:** `16.2.6` (Usando Turbopack por padrão)
*   **Tailwind CSS:** `v4.3.0` (Configuração CSS-First, sem arquivo `tailwind.config.js`)
*   **Framer Motion:** `12.39.0` (Animações de componentes e transições)
*   **GSAP:** Para animações complexas baseadas em Scroll (ScrollTrigger)

---

## 📁 Arquitetura de Pastas e Estilos (Tailwind v4)

O Tailwind v4 foi configurado utilizando a nova abordagem baseada em CSS. O arquivo global de estilos foi movido para uma pasta personalizada:

*   **Caminho do CSS:** `src/styles/globals.css` (ou `app/styles/globals.css`, dependendo da sua árvore)
*   **Conteúdo obrigatório na primeira linha:**
    ```css
    @import "tailwindcss";



    ---

## ⚠️ Regras Antiregressão (Erros já Solucionados)

### 1. Contexto Global do Efeito Magnético (`MagneticProvider`)
*   **Problema anterior:** Erros de *Prerendering* na rota raiz `/` (`useMagnetic must be used within a MagneticProvider`) porque componentes como `Cursor` e `Magnetic` eram chamados fora do escopo do contexto.
*   **Solução permanente:** O `MagneticProvider` deve envolver **obrigatoriamente** o `{children}` direto no arquivo raiz **`app/layout.tsx`**. NUNCA remova o Provider do layout global para evitar quebras em subpáginas.
*   **Nota do Arquivo:** O arquivo do contexto (`MagneticContext.tsx`) deve conter obrigatoriamente a diretiva `"use client";` na primeira linha.

### 2. Rotas Dinâmicas Assíncronas (Padrão Next.js 16)
*   **Problema anterior:** Avisos e erros de build na página de detalhes de projetos (`app/projects/[slug]/page.tsx`) por tipagem implícita ou leitura direta de parâmetros da URL.
*   **Solução permanente:** No Next.js 16, os parâmetros de páginas dinâmicas são tratados como Promises. A assinatura do componente deve sempre tipar e aguardar o objeto `params` assincronamente:
    ```typescript
    // app/projects/[slug]/page.tsx

// 1. Definimos a tipagem estrita para os parâmetros assíncronos da URL (Padrão Next.js 16)
interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// 2. Transformamos a função em "async" para poder ler os dados da URL
export default async function ProjectPage({ params }: ProjectPageProps) {
  
  // 3. Aguardamos o Next.js resolver o slug da URL (ex: se o link for /projects/meu-app, o slug será "meu-app")
  const { slug } = await params;

  // Criamos um nome amigável apenas limpando os traços do slug para o título não ficar estático
  const formattedTitle = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <section className="px-6 py-24 max-w-4xl mx-auto text-zinc-100">
      
      {/* Detalhe AAA: Uma tagzinha mostrando o identificador do projeto dinâmico */}
      <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">
        Case Study / {slug}
      </span>

      {/* O título agora muda baseado na página que o usuário clicou! */}
      <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight uppercase">
        {formattedTitle}
      </h1>

      <p className="mb-6 opacity-70 text-lg leading-relaxed">
        The problem we solved for <span className="text-accent font-semibold">{formattedTitle}</span>...
      </p>
      
      <p className="mb-6 opacity-70 text-lg leading-relaxed">
        The solution implemented using cutting-edge frontend technologies...
      </p>

      {/* Placeholder premium para colocar os prints ou mockups do projeto */}
      <div className="my-12 h-80 bg-zinc-950 border border-zinc-900 rounded-xl shadow-2xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.05)_0%,transparent_70%)]" />
       
      </div>

      <div className="inline-block p-6 bg-zinc-950 border border-zinc-900 rounded-xl shadow-lg">
        <p className="text-xl font-semibold text-green-400 font-mono flex items-center gap-2">
          🚀 Result: Increased performance by 40%
        </p>
      </div>
    </section>
  );

### 3. Arquitetura de Componentes (Server Components vs. Client Components)
*   **Problema anterior:** Mistura de lógica de Server e Client Components em `app/projects/[slug]/page.tsx`, levando a `useState` e `useEffect` em um componente que deveria ser assíncrono e renderizado no servidor.
*   **Solução permanente:** O arquivo `app/projects/[slug]/page.tsx` deve ser um **Server Component** assíncrono, responsável por buscar dados e orquestrar a renderização de **Client Components** especializados.
    *   **`app/projects/[slug]/page.tsx` (Server Component):**
        *   Deve ser `async`.
        *   Desestrutura `slug` diretamente de `await params`.
        *   Não deve conter diretiva `"use client";`.
        *   Importa e renderiza Client Components, passando `props`.
    *   **Client Components Especializados:**
        
        *   São responsáveis por toda a interatividade, animações (`framer-motion`, `gsap`) e lógica de estado.
        *   Recebem os dados necessários via `props` do Server Component pai.
*   **Exemplo de Estrutura (Next.js 16):**
    ```typescript
    // app/projects/[slug]/page.tsx (Server Component)
    import ProjectHeroSection from "@/components/ProjectHeroSection";
    import ProjectContentSection from "@/components/ProjectContentSection";
    

    export default async function ProjectPage({ params }: ProjectPageProps) {
      const { slug } = await params;
      const formattedTitle = slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
      return (
        <main>
          <ProjectHeroSection slug={slug} formattedTitle={formattedTitle} />
          <ProjectContentSection slug={slug} formattedTitle={formattedTitle} />
         
        </main>
      );
    }
    ```

### 4. Implementação de Mockups 3D (Living Mockups)
*   **Stack:** `Three.js`, `@react-three/fiber`, `@react-three/drei`.
*   **Componente:** `ThreeDMockup.tsx` deve ser um Client Component.
*   **Boas Práticas:**
    *   Use o componente `Canvas` para envolver a cena.
    *   Utilize `Float` e `MeshDistortMaterial` da biblioteca `drei` para efeitos cinematográficos de baixa complexidade com alto impacto visual.
    *   Para performance, evite sombras em tempo real pesadas; prefira `ContactShadows`.
*   **Visibilidade do Objeto 3D:**
    *   **Problema:** Objeto 3D invisível devido à cor do material (`#18181b`) ser muito próxima ao fundo (`bg-zinc-950/40`).
    *   **Solução:** Alterar a cor da `MeshDistortMaterial` para um tom mais claro (ex: `#FFFFFF`) para garantir contraste e visibilidade. Ajustes adicionais na opacidade do contêiner ou propriedades `emissive` do material podem ser feitos para maior destaque.





## 🏁 Roadmap para Finalização (Experiência Cinematográfica)

1.  [x] **Mockups Vivos:** Implementar `ThreeDMockup.tsx` com Three.js.

3.  [x] **Transições de Página:** Implementar "Smooth Crossfade" no `layout.tsx` usando `AnimatePresence`.
4.  [x] **Scroll Storytelling Avançado:** Adicionar efeitos de "Pinning" no `ProjectContentSection.tsx`.
5.  [x] **Otimização Extrema:**
    *   [x] Imagens: Converter placeholders para `next/image` com WebP.
    *   [x] 3D: Implementar `Suspense` e `ModelSkeleton` para carregamento de modelos reais.
6.  [ ] **Final Polish:**
    *   [x] Smooth Scroll: Integrar Lenis para fluidez AAA.
    *   [x] SEO: Configurar Meta Tags dinâmicas para compartilhamento social.