import type { Locale } from "@/shared/i18n/LanguageContext";
import type { ProjectSlug } from "./registry";

interface ArchitectureStage {
  title: string;
  description: string;
}

interface TradeOff {
  decision: string;
  benefit: string;
  cost: string;
}

interface NextStep {
  title: string;
  description: string;
}

export interface CaseStudyTechnicalProofContent {
  eyebrow: string;
  title: string;
  intro: string;
  architectureLabel: string;
  architectureDescription: string;
  tradeOffsLabel: string;
  decisionLabel: string;
  benefitLabel: string;
  costLabel: string;
  nextStepsLabel: string;
  nextStepsDescription: string;
  stages: readonly ArchitectureStage[];
  tradeOffs: readonly TradeOff[];
  nextSteps: readonly NextStep[];
}

export const caseStudyTechnicalProofs = {
  en: {
    "music-player": {
      eyebrow: "Technical proof",
      title: "Local playback, explicit platform boundaries.",
      intro: "The architecture separates product intent from capabilities that still require device-level validation.",
      architectureLabel: "Architecture flow",
      architectureDescription: "Playback state moves through isolated responsibilities before reaching native media APIs.",
      tradeOffsLabel: "Trade-offs",
      decisionLabel: "Decision",
      benefitLabel: "Benefit",
      costLabel: "Cost",
      nextStepsLabel: "Next validation steps",
      nextStepsDescription: "These checks must run on representative Android and iOS devices before stronger playback claims are published.",
      stages: [
        { title: "Library UI", description: "Browsing, queue controls and now-playing state." },
        { title: "Playback state", description: "Queue order, recovery, favorites and session state." },
        { title: "Audio service", description: "Background lifecycle, interruptions and routing." },
        { title: "Native media", description: "OS controls, hardware output and platform behavior." },
      ],
      tradeOffs: [
        { decision: "Keep the library local-first.", benefit: "Ownership and offline access remain central.", cost: "Cross-device sync needs a separate product decision." },
        { decision: "Isolate native audio behind a service boundary.", benefit: "UI and queue logic stay testable.", cost: "Android and iOS lifecycle paths still differ." },
        { decision: "Treat gapless and crossfade as validation targets.", benefit: "Public claims remain defensible.", cost: "Release confidence depends on a device matrix." },
      ],
      nextSteps: [
        { title: "Run lifecycle tests", description: "Verify calls, headset removal, background recovery and queue restoration." },
        { title: "Profile playback", description: "Capture memory, battery and frame data during long sessions." },
        { title: "Publish a capability matrix", description: "Record verified behavior by OS version, codec and output route." },
      ],
    },
    "saas-data-control": {
      eyebrow: "Technical proof",
      title: "Authorization belongs to the backend boundary.",
      intro: "The design keeps identity, ownership and tenant scope explicit from the request filter to persistence.",
      architectureLabel: "Architecture flow",
      architectureDescription: "Every data request carries authenticated context through service and repository boundaries.",
      tradeOffsLabel: "Trade-offs",
      decisionLabel: "Decision",
      benefitLabel: "Benefit",
      costLabel: "Cost",
      nextStepsLabel: "Next validation steps",
      nextStepsDescription: "Security and performance statements remain targets until the planned integration evidence is executed.",
      stages: [
        { title: "Client request", description: "The interface sends intent and an authenticated session." },
        { title: "Security filter", description: "Token validation builds trusted user and tenant context." },
        { title: "Service boundary", description: "Business rules and ownership checks authorize the operation." },
        { title: "Scoped persistence", description: "Repository queries constrain access before PostgreSQL." },
      ],
      tradeOffs: [
        { decision: "Use tenant-scoped repository queries.", benefit: "Ownership is enforced close to data access.", cost: "Every query path needs explicit scope coverage." },
        { decision: "Return 404 for out-of-scope resources.", benefit: "Resource enumeration reveals less information.", cost: "Diagnostics require stronger internal observability." },
        { decision: "Start with shared-schema multi-tenancy.", benefit: "Operations and reporting stay simpler initially.", cost: "Isolation depends on disciplined application controls." },
      ],
      nextSteps: [
        { title: "Execute negative tenant tests", description: "Use Testcontainers to prove cross-tenant reads and writes are denied." },
        { title: "Benchmark report queries", description: "Measure indexes, pagination and export behavior with representative data." },
        { title: "Attach CI artifacts", description: "Publish test reports and security evidence from repeatable pipeline runs." },
      ],
    },
    "english-tutor": {
      eyebrow: "Technical proof",
      title: "Rules choose the lesson before the model writes it.",
      intro: "The hybrid flow separates pedagogical decisions, learner memory and language generation.",
      architectureLabel: "Architecture flow",
      architectureDescription: "Deterministic signals shape a constrained generation request and preserve a clear teaching loop.",
      tradeOffsLabel: "Trade-offs",
      decisionLabel: "Decision",
      benefitLabel: "Benefit",
      costLabel: "Cost",
      nextStepsLabel: "Next validation steps",
      nextStepsDescription: "Pedagogical quality, local inference and privacy claims need executed evaluations on real learning sessions.",
      stages: [
        { title: "Learner input", description: "Text or speech enters with scenario and CEFR context." },
        { title: "Signal analysis", description: "Grammar and progress signals are extracted for the lesson." },
        { title: "Teacher Brain", description: "Rules select the next pedagogical action." },
        { title: "Constrained LLM", description: "The model writes within the selected teaching envelope." },
      ],
      tradeOffs: [
        { decision: "Put deterministic rules before generation.", benefit: "Teaching intent stays inspectable and testable.", cost: "The rule set needs careful authoring and maintenance." },
        { decision: "Support local inference first.", benefit: "Learner data can remain on the device.", cost: "Latency and quality vary with available hardware." },
        { decision: "Store structured learning memory.", benefit: "Progress and recurring mistakes become usable signals.", cost: "Retention, migration and deletion policies become product work." },
      ],
      nextSteps: [
        { title: "Run the Teacher Brain matrix", description: "Execute deterministic cases across CEFR levels and recurring errors." },
        { title: "Evaluate teaching quality", description: "Compare guided responses with a reviewed pedagogical rubric." },
        { title: "Profile local inference", description: "Measure latency, memory and battery on representative devices." },
      ],
    },
    "portfolio-nexus": {
      eyebrow: "Technical proof",
      title: "Static delivery with evidence-aware storytelling.",
      intro: "The portfolio separates lightweight discovery, case loading and validation artifacts while keeping every public route exportable.",
      architectureLabel: "Architecture flow",
      architectureDescription: "Typed project metadata becomes static routes, then a stable client runtime adds language and motion.",
      tradeOffsLabel: "Trade-offs",
      decisionLabel: "Decision",
      benefitLabel: "Benefit",
      costLabel: "Cost",
      nextStepsLabel: "Next release steps",
      nextStepsDescription: "The production gate now focuses on browser coverage, accessibility and final claim review.",
      stages: [
        { title: "Typed registry", description: "Metadata and lazy case loaders define the public project set." },
        { title: "Static generation", description: "Next.js exports canonical pages for all known routes." },
        { title: "Stable runtime", description: "Language, motion and navigation mount without changing the root tree." },
        { title: "Evidence gate", description: "Tests and reports constrain what the interface can claim." },
      ],
      tradeOffs: [
        { decision: "Use a complete static export.", benefit: "Hosting stays portable, fast and inexpensive.", cost: "Server-only features require a separate service." },
        { decision: "Keep language switching client-side.", benefit: "The active experience changes without navigation.", cost: "Localized URLs and server metadata are limited." },
        { decision: "Defer non-critical visual effects.", benefit: "The first viewport protects LCP and interaction readiness.", cost: "Late sections need careful loading and visual continuity." },
      ],
      nextSteps: [
        { title: "Close cross-browser QA", description: "Run the release journeys in Chromium, Firefox and WebKit." },
        { title: "Audit keyboard and contrast", description: "Validate focus order, landmarks, motion preferences and WCAG contrast." },
        { title: "Review every public claim", description: "Match visible metrics and status labels to reproducible evidence." },
      ],
    },
  },
  pt: {
    "music-player": {
      eyebrow: "Prova técnica",
      title: "Playback local com limites de plataforma explícitos.",
      intro: "A arquitetura separa intenção de produto das capacidades que ainda exigem validação direta em dispositivos.",
      architectureLabel: "Fluxo de arquitetura",
      architectureDescription: "O estado de reprodução passa por responsabilidades isoladas antes de alcançar as APIs nativas de mídia.",
      tradeOffsLabel: "Trade-offs",
      decisionLabel: "Decisão",
      benefitLabel: "Benefício",
      costLabel: "Custo",
      nextStepsLabel: "Próximas validações",
      nextStepsDescription: "Essas verificações precisam rodar em dispositivos Android e iOS representativos antes de claims mais fortes sobre playback.",
      stages: [
        { title: "Interface da biblioteca", description: "Navegação, controles de fila e estado da faixa atual." },
        { title: "Estado de playback", description: "Ordem da fila, recuperação, favoritos e sessão." },
        { title: "Serviço de áudio", description: "Lifecycle em background, interrupções e roteamento." },
        { title: "Mídia nativa", description: "Controles do sistema, saída de hardware e comportamento da plataforma." },
      ],
      tradeOffs: [
        { decision: "Manter a biblioteca local-first.", benefit: "Propriedade e acesso offline continuam centrais.", cost: "Sincronização entre dispositivos exige outra decisão de produto." },
        { decision: "Isolar áudio nativo atrás de um serviço.", benefit: "Interface e fila permanecem testáveis.", cost: "Android e iOS ainda possuem lifecycles diferentes." },
        { decision: "Tratar gapless e crossfade como metas.", benefit: "Os claims públicos permanecem defensáveis.", cost: "A confiança de release depende de uma matriz de dispositivos." },
      ],
      nextSteps: [
        { title: "Executar testes de lifecycle", description: "Validar chamadas, remoção de fones, background e restauração da fila." },
        { title: "Perfilar o playback", description: "Capturar memória, bateria e frames durante sessões longas." },
        { title: "Publicar matriz de capacidades", description: "Registrar comportamento validado por SO, codec e rota de saída." },
      ],
    },
    "saas-data-control": {
      eyebrow: "Prova técnica",
      title: "A autorização pertence à fronteira do backend.",
      intro: "O desenho mantém identidade, propriedade e escopo de tenant explícitos do filtro da requisição até a persistência.",
      architectureLabel: "Fluxo de arquitetura",
      architectureDescription: "Cada acesso a dados carrega contexto autenticado pelas fronteiras de serviço e repositório.",
      tradeOffsLabel: "Trade-offs",
      decisionLabel: "Decisão",
      benefitLabel: "Benefício",
      costLabel: "Custo",
      nextStepsLabel: "Próximas validações",
      nextStepsDescription: "Afirmações de segurança e performance continuam como metas até a execução das evidências de integração.",
      stages: [
        { title: "Requisição do cliente", description: "A interface envia intenção e uma sessão autenticada." },
        { title: "Filtro de segurança", description: "A validação do token cria contexto confiável de usuário e tenant." },
        { title: "Fronteira de serviço", description: "Regras e checagens de propriedade autorizam a operação." },
        { title: "Persistência com escopo", description: "Consultas limitam o acesso antes do PostgreSQL." },
      ],
      tradeOffs: [
        { decision: "Usar consultas com escopo de tenant.", benefit: "A propriedade é aplicada próxima do acesso aos dados.", cost: "Cada caminho de consulta exige cobertura explícita." },
        { decision: "Retornar 404 para recursos fora do escopo.", benefit: "A enumeração revela menos informação.", cost: "O diagnóstico exige observabilidade interna mais forte." },
        { decision: "Começar com multi-tenancy em schema compartilhado.", benefit: "Operação e relatórios ficam mais simples no início.", cost: "O isolamento depende de controles disciplinados na aplicação." },
      ],
      nextSteps: [
        { title: "Executar testes negativos de tenant", description: "Usar Testcontainers para provar o bloqueio de leituras e escritas cruzadas." },
        { title: "Medir consultas de relatório", description: "Avaliar índices, paginação e exportação com dados representativos." },
        { title: "Anexar artefatos do CI", description: "Publicar relatórios de teste e segurança de execuções reproduzíveis." },
      ],
    },
    "english-tutor": {
      eyebrow: "Prova técnica",
      title: "As regras escolhem a aula antes do modelo escrevê-la.",
      intro: "O fluxo híbrido separa decisões pedagógicas, memória do estudante e geração de linguagem.",
      architectureLabel: "Fluxo de arquitetura",
      architectureDescription: "Sinais determinísticos formam uma requisição de geração restrita e preservam um loop de ensino claro.",
      tradeOffsLabel: "Trade-offs",
      decisionLabel: "Decisão",
      benefitLabel: "Benefício",
      costLabel: "Custo",
      nextStepsLabel: "Próximas validações",
      nextStepsDescription: "Qualidade pedagógica, inferência local e privacidade precisam de avaliações executadas em sessões reais.",
      stages: [
        { title: "Entrada do estudante", description: "Texto ou voz entra com cenário e contexto CEFR." },
        { title: "Análise de sinais", description: "Gramática e progresso geram sinais para a aula." },
        { title: "Teacher Brain", description: "Regras escolhem a próxima ação pedagógica." },
        { title: "LLM restrito", description: "O modelo escreve dentro do envelope de ensino escolhido." },
      ],
      tradeOffs: [
        { decision: "Colocar regras antes da geração.", benefit: "A intenção pedagógica permanece inspecionável e testável.", cost: "O conjunto de regras exige autoria e manutenção cuidadosas." },
        { decision: "Priorizar inferência local.", benefit: "Os dados do estudante podem permanecer no dispositivo.", cost: "Latência e qualidade variam conforme o hardware." },
        { decision: "Armazenar memória estruturada.", benefit: "Progresso e erros recorrentes viram sinais úteis.", cost: "Retenção, migração e exclusão viram trabalho de produto." },
      ],
      nextSteps: [
        { title: "Executar a matriz do Teacher Brain", description: "Rodar casos determinísticos entre níveis CEFR e erros recorrentes." },
        { title: "Avaliar qualidade pedagógica", description: "Comparar respostas guiadas com uma rubrica revisada." },
        { title: "Perfilar inferência local", description: "Medir latência, memória e bateria em dispositivos representativos." },
      ],
    },
    "portfolio-nexus": {
      eyebrow: "Prova técnica",
      title: "Entrega estática com narrativa orientada por evidências.",
      intro: "O portfólio separa descoberta leve, carregamento dos cases e artefatos de validação sem perder a exportação estática.",
      architectureLabel: "Fluxo de arquitetura",
      architectureDescription: "Metadados tipados viram rotas estáticas; depois, um runtime estável adiciona idioma e motion.",
      tradeOffsLabel: "Trade-offs",
      decisionLabel: "Decisão",
      benefitLabel: "Benefício",
      costLabel: "Custo",
      nextStepsLabel: "Próximos passos de release",
      nextStepsDescription: "O gate de produção agora se concentra em browsers, acessibilidade e revisão final de claims.",
      stages: [
        { title: "Registry tipado", description: "Metadados e loaders lazy definem o conjunto público de projetos." },
        { title: "Geração estática", description: "Next.js exporta páginas canônicas para todas as rotas conhecidas." },
        { title: "Runtime estável", description: "Idioma, motion e navegação montam sem trocar a árvore raiz." },
        { title: "Gate de evidência", description: "Testes e relatórios limitam o que a interface pode afirmar." },
      ],
      tradeOffs: [
        { decision: "Usar exportação totalmente estática.", benefit: "A hospedagem permanece portátil, rápida e econômica.", cost: "Recursos exclusivos de servidor exigem outro serviço." },
        { decision: "Manter a troca de idioma no cliente.", benefit: "A experiência muda sem nova navegação.", cost: "URLs localizadas e metadata de servidor ficam limitadas." },
        { decision: "Adiar efeitos visuais não críticos.", benefit: "A primeira viewport protege LCP e interação.", cost: "Seções tardias exigem cuidado com loading e continuidade visual." },
      ],
      nextSteps: [
        { title: "Fechar QA cross-browser", description: "Executar as jornadas de release em Chromium, Firefox e WebKit." },
        { title: "Auditar teclado e contraste", description: "Validar foco, landmarks, preferência de movimento e contraste WCAG." },
        { title: "Revisar cada claim público", description: "Vincular métricas e status visíveis a evidências reproduzíveis." },
      ],
    },
  },
  es: {
    "music-player": {
      eyebrow: "Prueba técnica",
      title: "Playback local con límites de plataforma explícitos.",
      intro: "La arquitectura separa la intención de producto de las capacidades que aún requieren validación directa en dispositivos.",
      architectureLabel: "Flujo de arquitectura",
      architectureDescription: "El estado de reproducción pasa por responsabilidades aisladas antes de llegar a las APIs nativas de medios.",
      tradeOffsLabel: "Trade-offs",
      decisionLabel: "Decisión",
      benefitLabel: "Beneficio",
      costLabel: "Costo",
      nextStepsLabel: "Próximas validaciones",
      nextStepsDescription: "Estas verificaciones deben ejecutarse en dispositivos Android e iOS representativos antes de publicar claims más fuertes.",
      stages: [
        { title: "Interfaz de biblioteca", description: "Navegación, controles de cola y estado de reproducción." },
        { title: "Estado de playback", description: "Orden de cola, recuperación, favoritos y sesión." },
        { title: "Servicio de audio", description: "Lifecycle en background, interrupciones y enrutamiento." },
        { title: "Medios nativos", description: "Controles del sistema, salida de hardware y comportamiento de plataforma." },
      ],
      tradeOffs: [
        { decision: "Mantener la biblioteca local-first.", benefit: "Propiedad y acceso offline siguen siendo centrales.", cost: "La sincronización entre dispositivos exige otra decisión de producto." },
        { decision: "Aislar audio nativo detrás de un servicio.", benefit: "La interfaz y la cola permanecen testeables.", cost: "Android e iOS todavía tienen lifecycles diferentes." },
        { decision: "Tratar gapless y crossfade como metas.", benefit: "Los claims públicos permanecen defendibles.", cost: "La confianza de release depende de una matriz de dispositivos." },
      ],
      nextSteps: [
        { title: "Ejecutar pruebas de lifecycle", description: "Validar llamadas, desconexión de auriculares, background y restauración de cola." },
        { title: "Perfilar el playback", description: "Capturar memoria, batería y frames durante sesiones largas." },
        { title: "Publicar matriz de capacidades", description: "Registrar comportamiento validado por SO, codec y ruta de salida." },
      ],
    },
    "saas-data-control": {
      eyebrow: "Prueba técnica",
      title: "La autorización pertenece a la frontera del backend.",
      intro: "El diseño mantiene identidad, propiedad y alcance de tenant explícitos desde el filtro hasta la persistencia.",
      architectureLabel: "Flujo de arquitectura",
      architectureDescription: "Cada acceso a datos lleva contexto autenticado por las fronteras de servicio y repositorio.",
      tradeOffsLabel: "Trade-offs",
      decisionLabel: "Decisión",
      benefitLabel: "Beneficio",
      costLabel: "Costo",
      nextStepsLabel: "Próximas validaciones",
      nextStepsDescription: "Las afirmaciones de seguridad y rendimiento siguen como metas hasta ejecutar la evidencia de integración.",
      stages: [
        { title: "Solicitud del cliente", description: "La interfaz envía intención y una sesión autenticada." },
        { title: "Filtro de seguridad", description: "La validación del token crea contexto confiable de usuario y tenant." },
        { title: "Frontera de servicio", description: "Reglas y controles de propiedad autorizan la operación." },
        { title: "Persistencia con alcance", description: "Las consultas limitan el acceso antes de PostgreSQL." },
      ],
      tradeOffs: [
        { decision: "Usar consultas con alcance de tenant.", benefit: "La propiedad se aplica cerca del acceso a datos.", cost: "Cada camino de consulta requiere cobertura explícita." },
        { decision: "Responder 404 para recursos fuera de alcance.", benefit: "La enumeración revela menos información.", cost: "El diagnóstico exige observabilidad interna más fuerte." },
        { decision: "Empezar con multi-tenancy en schema compartido.", benefit: "Operación y reportes son más simples al inicio.", cost: "El aislamiento depende de controles disciplinados en la aplicación." },
      ],
      nextSteps: [
        { title: "Ejecutar pruebas negativas de tenant", description: "Usar Testcontainers para probar el bloqueo de lecturas y escrituras cruzadas." },
        { title: "Medir consultas de reportes", description: "Evaluar índices, paginación y exportación con datos representativos." },
        { title: "Adjuntar artefactos de CI", description: "Publicar reportes de pruebas y seguridad de ejecuciones reproducibles." },
      ],
    },
    "english-tutor": {
      eyebrow: "Prueba técnica",
      title: "Las reglas eligen la clase antes de que el modelo la escriba.",
      intro: "El flujo híbrido separa decisiones pedagógicas, memoria del estudiante y generación de lenguaje.",
      architectureLabel: "Flujo de arquitectura",
      architectureDescription: "Señales deterministas forman una solicitud restringida y preservan un loop de enseñanza claro.",
      tradeOffsLabel: "Trade-offs",
      decisionLabel: "Decisión",
      benefitLabel: "Beneficio",
      costLabel: "Costo",
      nextStepsLabel: "Próximas validaciones",
      nextStepsDescription: "La calidad pedagógica, inferencia local y privacidad necesitan evaluaciones ejecutadas en sesiones reales.",
      stages: [
        { title: "Entrada del estudiante", description: "Texto o voz entra con escenario y contexto CEFR." },
        { title: "Análisis de señales", description: "Gramática y progreso generan señales para la clase." },
        { title: "Teacher Brain", description: "Las reglas eligen la siguiente acción pedagógica." },
        { title: "LLM restringido", description: "El modelo escribe dentro del marco de enseñanza elegido." },
      ],
      tradeOffs: [
        { decision: "Colocar reglas antes de la generación.", benefit: "La intención pedagógica sigue siendo inspeccionable y testeable.", cost: "El conjunto de reglas exige autoría y mantenimiento cuidadosos." },
        { decision: "Priorizar inferencia local.", benefit: "Los datos del estudiante pueden permanecer en el dispositivo.", cost: "Latencia y calidad varían según el hardware." },
        { decision: "Guardar memoria estructurada.", benefit: "Progreso y errores recurrentes se convierten en señales útiles.", cost: "Retención, migración y eliminación se vuelven trabajo de producto." },
      ],
      nextSteps: [
        { title: "Ejecutar la matriz del Teacher Brain", description: "Correr casos deterministas entre niveles CEFR y errores recurrentes." },
        { title: "Evaluar calidad pedagógica", description: "Comparar respuestas guiadas con una rúbrica revisada." },
        { title: "Perfilar inferencia local", description: "Medir latencia, memoria y batería en dispositivos representativos." },
      ],
    },
    "portfolio-nexus": {
      eyebrow: "Prueba técnica",
      title: "Entrega estática con narrativa basada en evidencias.",
      intro: "El portfolio separa descubrimiento ligero, carga de casos y artefactos de validación sin perder la exportación estática.",
      architectureLabel: "Flujo de arquitectura",
      architectureDescription: "Metadatos tipados se convierten en rutas estáticas; luego, un runtime estable añade idioma y motion.",
      tradeOffsLabel: "Trade-offs",
      decisionLabel: "Decisión",
      benefitLabel: "Beneficio",
      costLabel: "Costo",
      nextStepsLabel: "Próximos pasos de release",
      nextStepsDescription: "El gate de producción ahora se concentra en browsers, accesibilidad y revisión final de claims.",
      stages: [
        { title: "Registry tipado", description: "Metadatos y loaders lazy definen el conjunto público de proyectos." },
        { title: "Generación estática", description: "Next.js exporta páginas canónicas para todas las rutas conocidas." },
        { title: "Runtime estable", description: "Idioma, motion y navegación montan sin cambiar el árbol raíz." },
        { title: "Gate de evidencia", description: "Pruebas y reportes limitan lo que la interfaz puede afirmar." },
      ],
      tradeOffs: [
        { decision: "Usar exportación totalmente estática.", benefit: "El hosting sigue portátil, rápido y económico.", cost: "Funciones exclusivas de servidor requieren otro servicio." },
        { decision: "Mantener el cambio de idioma en el cliente.", benefit: "La experiencia cambia sin nueva navegación.", cost: "URLs localizadas y metadata de servidor quedan limitadas." },
        { decision: "Diferir efectos visuales no críticos.", benefit: "La primera viewport protege LCP e interacción.", cost: "Las secciones tardías exigen cuidado con loading y continuidad visual." },
      ],
      nextSteps: [
        { title: "Cerrar QA cross-browser", description: "Ejecutar las jornadas de release en Chromium, Firefox y WebKit." },
        { title: "Auditar teclado y contraste", description: "Validar foco, landmarks, preferencia de movimiento y contraste WCAG." },
        { title: "Revisar cada claim público", description: "Vincular métricas y estados visibles con evidencia reproducible." },
      ],
    },
  },
} as const satisfies Record<Locale, Record<ProjectSlug, CaseStudyTechnicalProofContent>>;
